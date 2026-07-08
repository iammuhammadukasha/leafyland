import type { FeedProduct, FeedShelf } from '../data/zeptoFeedData';
import type { Product } from './api';

export function toFeedProduct(p: Product): FeedProduct {
  const imgs = Array.isArray(p.images) ? p.images : [];
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    comparePrice: p.comparePrice ?? undefined,
    unit: p.unit ?? '1 pc',
    image: imgs[0] ?? '/images/hero-garden.jpg',
    deliveryMins: 10,
  };
}

export function shelvesForParent(products: Product[], parentSlug: string): FeedShelf[] {
  const filtered = products.filter((p) => p.category?.parent?.slug === parentSlug);
  const bySub = new Map<string, Product[]>();

  for (const p of filtered) {
    const key = p.category?.name ?? 'Other';
    if (!bySub.has(key)) bySub.set(key, []);
    bySub.get(key)!.push(p);
  }

  return Array.from(bySub.entries()).map(([title, prods], i) => ({
    id: `${parentSlug}-${i}`,
    title,
    seeAll: `/products?category=${parentSlug}`,
    products: prods.map(toFeedProduct),
  }));
}

const PARENT_SLUGS = ['plants', 'fresh', 'home', 'garden', 'eco'] as const;

export function shelvesForAll(products: Product[]): FeedShelf[] {
  return PARENT_SLUGS.flatMap((slug) => shelvesForParent(products, slug));
}

export function productsForParent(products: Product[], parentSlug: string): FeedProduct[] {
  return products
    .filter((p) => p.category?.parent?.slug === parentSlug)
    .map(toFeedProduct);
}
