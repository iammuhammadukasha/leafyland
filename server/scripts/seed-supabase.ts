/**
 * Seed Supabase Auth users + Prisma catalog data.
 * Requires server/.env with DATABASE_URL, DIRECT_URL, SUPABASE_* set.
 *
 * Run: npm run db:seed
 */
import { config } from 'dotenv';
import { resolve } from 'path';

// Override stale shell env (e.g. old SQLite DATABASE_URL)
config({ path: resolve(__dirname, '../.env'), override: true });

import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { CATALOG_PRODUCTS } from '../data/catalog-products';
import { MARKETPLACE_CATEGORIES, MARKETPLACE_PRODUCTS } from '../data/marketplace-catalog';
import { serializeImages, slugify } from '../src/common/utils';

const prisma = new PrismaClient();

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=512&fit=crop`;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

async function provisionUser(params: {
  email: string;
  password: string;
  name: string;
  role: string;
  shopName?: string;
  approved?: boolean;
}) {
  const { data: list } = await supabase.auth.admin.listUsers();
  const existing = list.users.find((u) => u.email === params.email);

  let sbUser = existing;
  if (!sbUser) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: params.email,
      password: params.password,
      email_confirm: true,
      user_metadata: { name: params.name, role: params.role },
      app_metadata: { role: params.role },
    });
    if (error) throw error;
    sbUser = data.user;
  } else {
    const { error } = await supabase.auth.admin.updateUserById(sbUser.id, {
      password: params.password,
      email_confirm: true,
      user_metadata: { name: params.name, role: params.role },
      app_metadata: { role: params.role },
    });
    if (error) throw error;
  }

  if (!sbUser) throw new Error(`Failed to provision ${params.email}`);

  await prisma.user.upsert({
    where: { email: params.email },
    update: {
      supabaseId: sbUser.id,
      name: params.name,
      role: params.role,
      ...(params.role === 'VENDOR' && params.shopName
        ? {
            vendor: {
              upsert: {
                create: {
                  shopName: params.shopName,
                  approved: params.approved ?? false,
                },
                update: {
                  shopName: params.shopName,
                  approved: params.approved ?? false,
                },
              },
            },
          }
        : {}),
    },
    create: {
      supabaseId: sbUser.id,
      email: params.email,
      name: params.name,
      role: params.role,
      ...(params.role === 'VENDOR'
        ? {
            vendor: {
              create: {
                shopName: params.shopName ?? 'My Shop',
                approved: params.approved ?? false,
              },
            },
          }
        : {}),
    },
  });

  console.log(`✓ ${params.role} ${params.email}`);
}

async function main() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env');
  }

  await provisionUser({
    email: 'admin@leafyland.com',
    password: 'admin123',
    name: 'LeafyLand Admin',
    role: 'ADMIN',
  });

  await provisionUser({
    email: 'vendor@leafyland.com',
    password: 'vendor123',
    name: 'Green Nursery',
    role: 'VENDOR',
    shopName: 'Green Nursery Mumbai',
    approved: true,
  });

  const vendor = await prisma.user.findUnique({
    where: { email: 'vendor@leafyland.com' },
    include: { vendor: true },
  });

  // 31 product categories — garden/eco (11) + marketplace (20).
  const gardenCategories: { name: string; slug: string }[] = [
    { name: 'Plants', slug: 'plants' },
    { name: 'Seeds & Bulbs', slug: 'seeds-bulbs' },
    { name: 'Soil & Fertilizers', slug: 'soil-fertilizers' },
    { name: 'Garden Tools', slug: 'garden-tools' },
    { name: 'Solar & Renewable', slug: 'solar-renewable' },
    { name: 'Eco Products', slug: 'eco-products' },
    { name: 'Electrical & Lighting', slug: 'electrical-lighting' },
    { name: 'Plumbing & Bath', slug: 'plumbing-bath' },
    { name: 'Paint & Hardware', slug: 'paint-hardware' },
    { name: 'Home Essentials', slug: 'home-essentials' },
    { name: 'Furniture & Decor', slug: 'furniture-decor' },
  ];
  const productCategories = [...gardenCategories, ...MARKETPLACE_CATEGORIES];
  const allProducts = [...CATALOG_PRODUCTS, ...MARKETPLACE_PRODUCTS];

  // Clean slate: remove products first (FK), then all existing categories.
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  const slugToCategoryId = new Map<string, string>();
  let sortOrder = 1;
  for (const c of productCategories) {
    const created = await prisma.category.create({
      data: { name: c.name, slug: c.slug, type: 'PRODUCT', sortOrder: sortOrder++ },
    });
    slugToCategoryId.set(c.slug, created.id);
  }
  console.log(`✓ ${productCategories.length} product categories`);

  let seeded = 0;
  for (const row of allProducts) {
    const categoryId = slugToCategoryId.get(row.categorySlug);
    if (!categoryId) {
      console.warn(`⚠ Skip "${row.name}": category "${row.categorySlug}" not found`);
      continue;
    }

    const slug = slugify(row.name);
    const images = serializeImages([row.imageUrl]);
    await prisma.product.upsert({
      where: { slug },
      update: {
        name: row.name,
        description: row.description,
        price: row.price,
        comparePrice: row.comparePrice ?? null,
        stock: row.stock,
        unit: row.unit,
        categoryId,
        vendorId: vendor!.vendor!.id,
        status: 'PUBLISHED',
        images,
      },
      create: {
        name: row.name,
        slug,
        description: row.description,
        price: row.price,
        comparePrice: row.comparePrice ?? null,
        stock: row.stock,
        unit: row.unit,
        categoryId,
        vendorId: vendor!.vendor!.id,
        status: 'PUBLISHED',
        images,
      },
    });
    seeded += 1;
  }
  console.log(`✓ ${seeded} catalog products (5 per category, ${productCategories.length} categories)`);

  // 18 services — 3 per service category. The storefront maps service slugs to
  // categories (client/src/data/categoryNav.ts) for filtering.
  const services = [
    // Landscaping
    { name: 'Landscape Design', slug: 'landscape-design', description: 'Bespoke 2D & 3D landscape design for homes and estates.', price: 4999, image: px(2879824) },
    { name: 'Garden Development', slug: 'garden-development', description: 'Complete garden setup with softscape and planting.', price: 8999, image: px(4920288) },
    { name: 'Terrace & Balcony Garden', slug: 'terrace-balcony-garden', description: 'Rooftop and balcony garden design & installation.', price: 6999, image: px(2123766) },
    // Corporate Greening
    { name: 'Office Landscaping', slug: 'office-landscaping', description: 'Indoor & outdoor greening for offices and campuses.', price: 12999, image: px(9412413) },
    { name: 'Corporate Plant Rental', slug: 'corporate-plant-rental', description: 'Monthly indoor plant rental with maintenance.', price: 2999, image: px(5858757) },
    { name: 'Campus Greening', slug: 'campus-greening', description: 'Large-scale campus landscape solutions.', price: 24999, image: px(2879824) },
    // Civil & Construction
    { name: 'Civil Works', slug: 'civil-works', description: 'Foundation to finishing civil construction services.', price: 49999, image: px(8280957) },
    { name: 'Interior Design', slug: 'interior-design', description: 'Residential & commercial interior design.', price: 19999, image: px(6585750) },
    { name: 'Renovation & Repair', slug: 'renovation-repair', description: 'Remodeling, electrical & plumbing repair works.', price: 14999, image: px(8280957) },
    // Hardscape
    { name: 'Fencing & Railing', slug: 'fencing-railing', description: 'Boundary walls, railings and gates installation.', price: 8999, image: px(2879824) },
    { name: 'Paving & Pathways', slug: 'paving-pathways', description: 'Stone, brick & concrete pathway construction.', price: 11999, image: px(2879824) },
    { name: 'Swimming Pool', slug: 'swimming-pool', description: 'Pool design, build and maintenance services.', price: 99999, image: px(2123766) },
    // Waterscaping
    { name: 'Water Fountain Design', slug: 'water-fountain-design', description: 'Custom sculptural fountains for gardens.', price: 15999, image: px(35634634) },
    { name: 'Garden Pond', slug: 'garden-pond', description: 'Koi ponds and natural water streams.', price: 22999, image: px(35634634) },
    { name: 'Irrigation System', slug: 'irrigation-system', description: 'Drip, sprinkler and smart irrigation setup.', price: 5999, image: px(37720375) },
    // Maintenance
    { name: 'Garden AMC', slug: 'garden-amc', description: 'Annual maintenance contract for gardens.', price: 24999, image: px(4920288) },
    { name: 'Lawn Mowing', slug: 'lawn-mowing', description: 'Regular lawn care, trimming and cleanup.', price: 1499, image: px(4920288) },
    { name: 'Pest & Watering Service', slug: 'pest-watering-service', description: 'Garden pest control and scheduled watering.', price: 1999, image: px(4503261) },
  ];

  await prisma.serviceBooking.deleteMany({});
  await prisma.service.deleteMany({});
  for (const s of services) {
    await prisma.service.create({
      data: { ...s, status: 'PUBLISHED' },
    });
  }
  console.log(`✓ ${services.length} services (3 per category)`);

  await prisma.shippingZone.upsert({
    where: { id: 'default-zone' },
    update: {},
    create: {
      id: 'default-zone',
      name: 'All India',
      pinPrefix: '',
      flatRate: 99,
      freeAbove: 999,
      isDefault: true,
    },
  });

  console.log('\nSeed complete!');
  console.log('Admin: admin@leafyland.com / admin123');
  console.log('Vendor: vendor@leafyland.com / vendor123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
