/**
 * Full navigation taxonomy for LeafyLand — mirrors the client's reference
 * screenshots (leafyland.shop). Used by the expandable category grids on the
 * homepage, the header mega-menu, and the mobile "All Categories" drawer.
 *
 * Every sub-item points to a real, working route:
 *  - Services  -> /services?category=<slug>
 *  - Products  -> /products?category=<slug> (real DB categories) or ?q=<term>
 */

export type NavSubItem = {
  label: string;
  desc?: string;
  to: string;
};

export type NavCategory = {
  slug: string;
  label: string;
  icon: string; // site-icon name
  viewAllTo: string;
  items: NavSubItem[];
};

/* ------------------------------------------------------------------ */
/* SERVICE CATEGORIES                                                   */
/* ------------------------------------------------------------------ */

export const SERVICE_CATEGORIES: NavCategory[] = [
  {
    slug: 'landscaping',
    label: 'Landscaping',
    icon: 'park',
    viewAllTo: '/services?category=landscaping',
    items: [
      { label: 'Landscape Design', desc: '3D concept & master planning', to: '/services?category=landscaping' },
      { label: 'Garden Development', desc: 'Complete garden setup & planting', to: '/services?category=landscaping' },
      { label: 'Terrace Garden', desc: 'Rooftop & balcony gardens', to: '/services?category=landscaping' },
      { label: 'Vertical Garden', desc: 'Living walls & green facades', to: '/services?category=landscaping' },
    ],
  },
  {
    slug: 'corporate-greening',
    label: 'Corporate Greening',
    icon: 'location_city',
    viewAllTo: '/services?category=corporate-greening',
    items: [
      { label: 'Office Landscaping', desc: 'Indoor & outdoor office greening', to: '/services?category=corporate-greening' },
      { label: 'Interior Plants', desc: 'Corporate indoor plant rental', to: '/services?category=corporate-greening' },
      { label: 'Campus Greening', desc: 'Large-scale campus landscapes', to: '/services?category=corporate-greening' },
    ],
  },
  {
    slug: 'civil-construction',
    label: 'Civil & Construction',
    icon: 'handyman',
    viewAllTo: '/services?category=civil-construction',
    items: [
      { label: 'Civil Works', desc: 'Foundation to finishing', to: '/services?category=civil-construction' },
      { label: 'Interior Design', desc: 'Residential & commercial interiors', to: '/services?category=civil-construction' },
      { label: 'Renovation', desc: 'Remodeling & refurbishment', to: '/services?category=civil-construction' },
      { label: 'Electrical & Plumbing', desc: 'Installation & repair', to: '/services?category=civil-construction' },
    ],
  },
  {
    slug: 'hardscape',
    label: 'Hardscape',
    icon: 'hardware',
    viewAllTo: '/services?category=hardscape',
    items: [
      { label: 'Fencing & Railing', desc: 'Boundary walls, railings & gates', to: '/services?category=hardscape' },
      { label: 'Paving & Pathways', desc: 'Stone, brick & concrete paths', to: '/services?category=hardscape' },
      { label: 'Swimming Pool', desc: 'Pool design, build & maintain', to: '/services?category=hardscape' },
    ],
  },
  {
    slug: 'waterscaping',
    label: 'Waterscaping',
    icon: 'water_drop',
    viewAllTo: '/services?category=waterscaping',
    items: [
      { label: 'Fountains', desc: 'Custom water fountain design', to: '/services?category=waterscaping' },
      { label: 'Garden Ponds', desc: 'Koi ponds & natural streams', to: '/services?category=waterscaping' },
      { label: 'Irrigation Systems', desc: 'Drip, sprinkler & smart irrigation', to: '/services?category=waterscaping' },
    ],
  },
  {
    slug: 'maintenance',
    label: 'Maintenance',
    icon: 'tools',
    viewAllTo: '/services?category=maintenance',
    items: [
      { label: 'Garden AMC', desc: 'Annual maintenance contracts', to: '/services?category=maintenance' },
      { label: 'Lawn Mowing', desc: 'Regular lawn care & trimming', to: '/services?category=maintenance' },
      { label: 'Pest Treatment', desc: 'Garden pest control services', to: '/services?category=maintenance' },
      { label: 'Plant Watering', desc: 'Scheduled watering service', to: '/services?category=maintenance' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* PRODUCT CATEGORIES — Garden & Eco (original LeafyLand taxonomy)      */
/* ------------------------------------------------------------------ */

export const GARDEN_PRODUCT_CATEGORIES: NavCategory[] = [
  {
    slug: 'plants',
    label: 'Plants',
    icon: 'local_florist',
    viewAllTo: '/products?category=plants',
    items: [
      { label: 'Indoor Plants', desc: 'Air-purifying & decorative plants for home', to: '/products?category=plants' },
      { label: 'Outdoor Plants', desc: 'Trees, shrubs & flowering plants', to: '/products?category=plants' },
      { label: 'Succulents & Exotic', desc: 'Cacti, jade & rare varieties', to: '/products?category=plants' },
    ],
  },
  {
    slug: 'seeds-bulbs',
    label: 'Seeds & Bulbs',
    icon: 'grass',
    viewAllTo: '/products?category=seeds-bulbs',
    items: [
      { label: 'Flower Seeds', desc: 'Seasonal & perennial blooms', to: '/products?category=seeds-bulbs' },
      { label: 'Vegetable Seeds', desc: 'Home-grown kitchen garden', to: '/products?category=seeds-bulbs' },
      { label: 'Herb Seeds', desc: 'Basil, mint, coriander & more', to: '/products?category=seeds-bulbs' },
    ],
  },
  {
    slug: 'soil-fertilizers',
    label: 'Soil & Fertilizers',
    icon: 'compost',
    viewAllTo: '/products?category=soil-fertilizers',
    items: [
      { label: 'Potting Mix', desc: 'Ready-to-use premium mixes', to: '/products?category=soil-fertilizers' },
      { label: 'Compost & Manure', desc: 'Vermicompost, cow manure & bone meal', to: '/products?category=soil-fertilizers' },
      { label: 'Fertilizers', desc: 'NPK & seaweed fertilizers', to: '/products?category=soil-fertilizers' },
    ],
  },
  {
    slug: 'garden-tools',
    label: 'Garden Tools',
    icon: 'tools',
    viewAllTo: '/products?category=garden-tools',
    items: [
      { label: 'Hand Tools', desc: 'Trowels, pruners & forks', to: '/products?category=garden-tools' },
      { label: 'Watering', desc: 'Cans, hoses & sprinklers', to: '/products?category=garden-tools' },
      { label: 'Irrigation Kits', desc: 'Drip & sprinkler systems', to: '/products?category=garden-tools' },
    ],
  },
  {
    slug: 'solar-renewable',
    label: 'Solar & Renewable',
    icon: 'solar_power',
    viewAllTo: '/products?category=solar-renewable',
    items: [
      { label: 'Solar Lights', desc: 'Garden, pathway & security lights', to: '/products?category=solar-renewable' },
      { label: 'Solar Panels', desc: 'Rooftop & garden solar systems', to: '/products?category=solar-renewable' },
      { label: 'Solar Pumps', desc: 'Irrigation & water pumping', to: '/products?category=solar-renewable' },
    ],
  },
  {
    slug: 'eco-products',
    label: 'Eco Products',
    icon: 'eco',
    viewAllTo: '/products?category=eco-products',
    items: [
      { label: 'Biodegradable Items', desc: 'Eco bags, plates & cutlery', to: '/products?category=eco-products' },
      { label: 'Composting Kits', desc: 'Home & community composters', to: '/products?category=eco-products' },
      { label: 'Reusables', desc: 'Bamboo & jute everyday essentials', to: '/products?category=eco-products' },
    ],
  },
  {
    slug: 'electrical-lighting',
    label: 'Electrical & Lighting',
    icon: 'bolt',
    viewAllTo: '/products?category=electrical-lighting',
    items: [
      { label: 'LED & Smart Lights', desc: 'Energy-saving bulbs & strips', to: '/products?category=electrical-lighting' },
      { label: 'Lamps & Décor Lights', desc: 'Table lamps & string lights', to: '/products?category=electrical-lighting' },
      { label: 'Switches & Inverters', desc: 'Boards, inverters & wiring', to: '/products?category=electrical-lighting' },
    ],
  },
  {
    slug: 'plumbing-bath',
    label: 'Plumbing & Bath',
    icon: 'plumbing',
    viewAllTo: '/products?category=plumbing-bath',
    items: [
      { label: 'Taps & Fittings', desc: 'Kitchen & bathroom fittings', to: '/products?category=plumbing-bath' },
      { label: 'Pipes & Irrigation', desc: 'Hoses, drip kits & pipes', to: '/products?category=plumbing-bath' },
      { label: 'Sprinklers', desc: 'Lawn & garden watering', to: '/products?category=plumbing-bath' },
    ],
  },
  {
    slug: 'paint-hardware',
    label: 'Paint & Hardware',
    icon: 'hardware',
    viewAllTo: '/products?category=paint-hardware',
    items: [
      { label: 'Tool Kits', desc: 'Hand tools & kits', to: '/products?category=paint-hardware' },
      { label: 'Safety Gear', desc: 'Gloves & protective wear', to: '/products?category=paint-hardware' },
      { label: 'Garden Care', desc: 'Soil conditioners & more', to: '/products?category=paint-hardware' },
    ],
  },
  {
    slug: 'home-essentials',
    label: 'Home Essentials',
    icon: 'home',
    viewAllTo: '/products?category=home-essentials',
    items: [
      { label: 'Home Decor', desc: 'Vases, candles & wall art', to: '/products?category=home-essentials' },
      { label: 'Pots & Planters', desc: 'Ceramic, terracotta & metal', to: '/products?category=home-essentials' },
      { label: 'Storage', desc: 'Baskets & organizers', to: '/products?category=home-essentials' },
    ],
  },
  {
    slug: 'furniture-decor',
    label: 'Furniture & Decor',
    icon: 'home',
    viewAllTo: '/products?category=furniture-decor',
    items: [
      { label: 'Planters & Stands', desc: 'Plant stands & shelves', to: '/products?category=furniture-decor' },
      { label: 'Hangers & Decor', desc: 'Macrame & woven décor', to: '/products?category=furniture-decor' },
      { label: 'Lighting Decor', desc: 'Fairy lights & lamps', to: '/products?category=furniture-decor' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* PRODUCT CATEGORIES — Marketplace (client reference taxonomy)         */
/* ------------------------------------------------------------------ */

export const MARKETPLACE_PRODUCT_CATEGORIES: NavCategory[] = [
  {
    slug: 'health-medical',
    label: 'Health & Medical',
    icon: 'wellbeing',
    viewAllTo: '/products?category=health-medical',
    items: [
      { label: 'Wellness & Supplements', desc: 'Herbal teas, aloe & natural remedies', to: '/products?category=health-medical' },
      { label: 'Medical Essentials', desc: 'Thermometers & home health devices', to: '/products?category=health-medical' },
      { label: 'Ayurvedic Care', desc: 'Traditional wellness products', to: '/products?category=health-medical' },
    ],
  },
  {
    slug: 'agriculture-food-beverage',
    label: 'Agriculture, Food & Beverage',
    icon: 'grass',
    viewAllTo: '/products?category=agriculture-food-beverage',
    items: [
      { label: 'Organic Foods', desc: 'Honey, oils & dry fruits', to: '/products?category=agriculture-food-beverage' },
      { label: 'Farm Produce', desc: 'Fresh & packaged agri goods', to: '/products?category=agriculture-food-beverage' },
      { label: 'Beverages', desc: 'Natural drinks & wellness brews', to: '/products?category=agriculture-food-beverage' },
    ],
  },
  {
    slug: 'apparel-accessories',
    label: 'Apparel & Accessories',
    icon: 'curated',
    viewAllTo: '/products?category=apparel-accessories',
    items: [
      { label: 'Garden Wear', desc: 'Aprons, hats & gloves', to: '/products?category=apparel-accessories' },
      { label: 'Outdoor Clothing', desc: 'Sun protection & workwear', to: '/products?category=apparel-accessories' },
      { label: 'Accessories', desc: 'Belts, caps & more', to: '/products?category=apparel-accessories' },
    ],
  },
  {
    slug: 'consumer-electronics',
    label: 'Consumer Electronics',
    icon: 'bolt',
    viewAllTo: '/products?category=consumer-electronics',
    items: [
      { label: 'Smart Garden Tech', desc: 'Sensors, cameras & automation', to: '/products?category=consumer-electronics' },
      { label: 'Grow Lights', desc: 'LED panels for indoor plants', to: '/products?category=consumer-electronics' },
      { label: 'Home Gadgets', desc: 'Everyday electronic essentials', to: '/products?category=consumer-electronics' },
    ],
  },
  {
    slug: 'home-garden',
    label: 'Home & Garden',
    icon: 'home',
    viewAllTo: '/products?category=home-garden',
    items: [
      { label: 'Indoor Gardening', desc: 'Herb kits & grow stations', to: '/products?category=home-garden' },
      { label: 'Planters & Décor', desc: 'Floor planters & room accents', to: '/products?category=home-garden' },
      { label: 'Outdoor Living', desc: 'Screens, dividers & patio items', to: '/products?category=home-garden' },
    ],
  },
  {
    slug: 'sports-entertainment',
    label: 'Sports & Entertainment',
    icon: 'star',
    viewAllTo: '/products?category=sports-entertainment',
    items: [
      { label: 'Outdoor Sports', desc: 'Badminton, yoga & fitness', to: '/products?category=sports-entertainment' },
      { label: 'Camping & Picnic', desc: 'Chairs, mats & outdoor gear', to: '/products?category=sports-entertainment' },
      { label: 'Recreation', desc: 'Games & leisure accessories', to: '/products?category=sports-entertainment' },
    ],
  },
  {
    slug: 'beauty-personal-care',
    label: 'Beauty & Personal Care',
    icon: 'wellbeing',
    viewAllTo: '/products?category=beauty-personal-care',
    items: [
      { label: 'Skincare', desc: 'Face wash, creams & serums', to: '/products?category=beauty-personal-care' },
      { label: 'Natural Beauty', desc: 'Herbal & organic personal care', to: '/products?category=beauty-personal-care' },
      { label: 'Lip & Body Care', desc: 'Balms, lotions & more', to: '/products?category=beauty-personal-care' },
    ],
  },
  {
    slug: 'jewelry-eyewear-watches',
    label: 'Jewelry, Eyewear & Watches',
    icon: 'verified',
    viewAllTo: '/products?category=jewelry-eyewear-watches',
    items: [
      { label: 'Eco Jewelry', desc: 'Wooden & recycled pieces', to: '/products?category=jewelry-eyewear-watches' },
      { label: 'Eyewear', desc: 'Sunglasses & reading glasses', to: '/products?category=jewelry-eyewear-watches' },
      { label: 'Watches & Straps', desc: 'Sustainable watch accessories', to: '/products?category=jewelry-eyewear-watches' },
    ],
  },
  {
    slug: 'shoes-accessories',
    label: 'Shoes & Accessories',
    icon: 'delivery',
    viewAllTo: '/products?category=shoes-accessories',
    items: [
      { label: 'Garden Footwear', desc: 'Clogs, boots & waterproof shoes', to: '/products?category=shoes-accessories' },
      { label: 'Casual Shoes', desc: 'Everyday canvas & slip-ons', to: '/products?category=shoes-accessories' },
      { label: 'Shoe Care', desc: 'Cleaners & accessories', to: '/products?category=shoes-accessories' },
    ],
  },
  {
    slug: 'luggage-bags-cases',
    label: 'Luggage, Bags & Cases',
    icon: 'shopping_bag',
    viewAllTo: '/products?category=luggage-bags-cases',
    items: [
      { label: 'Tote & Carry Bags', desc: 'Jute totes & reusable bags', to: '/products?category=luggage-bags-cases' },
      { label: 'Picnic & Travel', desc: 'Baskets & travel cases', to: '/products?category=luggage-bags-cases' },
      { label: 'Plant Transport', desc: 'Ventilated plant carry cases', to: '/products?category=luggage-bags-cases' },
    ],
  },
  {
    slug: 'packaging-printing',
    label: 'Packaging & Printing',
    icon: 'article',
    viewAllTo: '/products?category=packaging-printing',
    items: [
      { label: 'Gift Packaging', desc: 'Kraft boxes & eco wraps', to: '/products?category=packaging-printing' },
      { label: 'Shipping Supplies', desc: 'Mailer bags & cushioning', to: '/products?category=packaging-printing' },
      { label: 'Labels & Printing', desc: 'Custom labels & tags', to: '/products?category=packaging-printing' },
    ],
  },
  {
    slug: 'parents-kids-toys',
    label: 'Parents, Kids & Toys',
    icon: 'groups',
    viewAllTo: '/products?category=parents-kids-toys',
    items: [
      { label: 'Kids Gardening', desc: 'Child-safe tool sets', to: '/products?category=parents-kids-toys' },
      { label: 'Educational Kits', desc: 'Science & growing kits', to: '/products?category=parents-kids-toys' },
      { label: 'Toys & Games', desc: 'Wooden puzzles & play items', to: '/products?category=parents-kids-toys' },
    ],
  },
  {
    slug: 'personal-care-home-care',
    label: 'Personal Care & Home Care',
    icon: 'wellbeing',
    viewAllTo: '/products?category=personal-care-home-care',
    items: [
      { label: 'Home Cleaning', desc: 'Natural floor & surface cleaners', to: '/products?category=personal-care-home-care' },
      { label: 'Kitchen Care', desc: 'Organic dish soap & scrubbers', to: '/products?category=personal-care-home-care' },
      { label: 'Air Fresheners', desc: 'Room sprays & diffusers', to: '/products?category=personal-care-home-care' },
    ],
  },
  {
    slug: 'gifts-crafts',
    label: 'Gifts & Crafts',
    icon: 'star',
    viewAllTo: '/products?category=gifts-crafts',
    items: [
      { label: 'DIY Craft Kits', desc: 'Macrame, paint & candle kits', to: '/products?category=gifts-crafts' },
      { label: 'Handmade Gifts', desc: 'Unique artisan gift items', to: '/products?category=gifts-crafts' },
      { label: 'Seasonal Gifts', desc: 'Festive & occasion hampers', to: '/products?category=gifts-crafts' },
    ],
  },
  {
    slug: 'pet-supplies',
    label: 'Pet Supplies',
    icon: 'leaf',
    viewAllTo: '/products?category=pet-supplies',
    items: [
      { label: 'Pet Plants', desc: 'Cat grass & pet-safe greens', to: '/products?category=pet-supplies' },
      { label: 'Pet Nutrition', desc: 'Safe plant food & treats', to: '/products?category=pet-supplies' },
      { label: 'Pet Toys', desc: 'Eco chew toys & accessories', to: '/products?category=pet-supplies' },
    ],
  },
  {
    slug: 'school-office-supplies',
    label: 'School & Office Supplies',
    icon: 'article',
    viewAllTo: '/products?category=school-office-supplies',
    items: [
      { label: 'Stationery', desc: 'Recycled notebooks & pens', to: '/products?category=school-office-supplies' },
      { label: 'Desk Organizers', desc: 'Bamboo holders & trays', to: '/products?category=school-office-supplies' },
      { label: 'Desk Plants', desc: 'Mini succulents for workspaces', to: '/products?category=school-office-supplies' },
    ],
  },
  {
    slug: 'industrial-machinery',
    label: 'Industrial Machinery',
    icon: 'tools',
    viewAllTo: '/products?category=industrial-machinery',
    items: [
      { label: 'Power Tools', desc: 'Trimmers, mowers & saws', to: '/products?category=industrial-machinery' },
      { label: 'Heavy Equipment', desc: 'Commercial-grade machinery', to: '/products?category=industrial-machinery' },
      { label: 'Spare Parts', desc: 'Blades, belts & accessories', to: '/products?category=industrial-machinery' },
    ],
  },
  {
    slug: 'commercial-equipment',
    label: 'Commercial Equipment',
    icon: 'location_city',
    viewAllTo: '/products?category=commercial-equipment',
    items: [
      { label: 'Nursery Systems', desc: 'Misting & climate control', to: '/products?category=commercial-equipment' },
      { label: 'Greenhouse', desc: 'Frames, covers & accessories', to: '/products?category=commercial-equipment' },
      { label: 'Composting', desc: 'Industrial compost tumblers', to: '/products?category=commercial-equipment' },
    ],
  },
  {
    slug: 'construction-building',
    label: 'Construction & Building',
    icon: 'handyman',
    viewAllTo: '/products?category=construction-building',
    items: [
      { label: 'Building Materials', desc: 'Cement, sand & aggregates', to: '/products?category=construction-building' },
      { label: 'Plumbing Supplies', desc: 'Pipes, fittings & valves', to: '/products?category=construction-building' },
      { label: 'Waterproofing', desc: 'Membranes & sealants', to: '/products?category=construction-building' },
    ],
  },
  {
    slug: 'furniture',
    label: 'Furniture',
    icon: 'home',
    viewAllTo: '/products?category=furniture',
    items: [
      { label: 'Garden Furniture', desc: 'Benches, chairs & tables', to: '/products?category=furniture' },
      { label: 'Patio Sets', desc: 'Outdoor dining & lounging', to: '/products?category=furniture' },
      { label: 'Indoor Furniture', desc: 'Shelves, stands & storage', to: '/products?category=furniture' },
    ],
  },
];

/** All product categories — garden + marketplace */
export const PRODUCT_CATEGORIES: NavCategory[] = [
  ...GARDEN_PRODUCT_CATEGORIES,
  ...MARKETPLACE_PRODUCT_CATEGORIES,
];

/** Quick lookup: category slug → icon name */
export const PRODUCT_CATEGORY_ICONS: Record<string, string> = Object.fromEntries(
  PRODUCT_CATEGORIES.map((c) => [c.slug, c.icon]),
);

/* ------------------------------------------------------------------ */
/* SERVICE CATEGORY → SERVICE SLUGS                                     */
/* Maps each service category to the seeded service slugs it contains,   */
/* so ServicesPage can filter reliably (no keyword guessing).           */
/* ------------------------------------------------------------------ */

export const SERVICE_CATEGORY_SLUGS: Record<string, string[]> = {
  landscaping: ['landscape-design', 'garden-development', 'terrace-balcony-garden'],
  'corporate-greening': ['office-landscaping', 'corporate-plant-rental', 'campus-greening'],
  'civil-construction': ['civil-works', 'interior-design', 'renovation-repair'],
  hardscape: ['fencing-railing', 'paving-pathways', 'swimming-pool'],
  waterscaping: ['water-fountain-design', 'garden-pond', 'irrigation-system'],
  maintenance: ['garden-amc', 'lawn-mowing', 'pest-watering-service'],
};

/* ------------------------------------------------------------------ */
/* ALL CATEGORIES (drawer) — flat list of everything                   */
/* ------------------------------------------------------------------ */

export const ALL_CATEGORIES: { label: string; icon: string; to: string }[] = [
  ...PRODUCT_CATEGORIES.map((c) => ({ label: c.label, icon: c.icon, to: c.viewAllTo })),
  ...SERVICE_CATEGORIES.map((c) => ({ label: c.label, icon: c.icon, to: c.viewAllTo })),
];
