import { IMAGES } from './images';

export type NavColumn = {
  title: string;
  links: { label: string; to: string }[];
};

export type NavItem = {
  label: string;
  to: string;
  columns?: NavColumn[];
  ctaLabel?: string;
  sideImage?: string;
  mega?: boolean;
};

/** Ecosystem top-nav — client mixed-layout spec */
export const ECOSYSTEM_NAV: { label: string; to: string; icon: string; mega?: 'experts' }[] = [
  { label: 'Products', to: '/products', icon: 'local_florist' },
  { label: 'Services', to: '/services', icon: 'handyman' },
  { label: 'Catalogue', to: '/catalogue', icon: 'article' },
  { label: 'Experts', to: '/contact', icon: 'groups', mega: 'experts' },
  { label: 'Community', to: '/contact', icon: 'public' },
  { label: 'Franchise', to: '/contact', icon: 'location_city' },
  { label: 'Business', to: '/products', icon: 'storefront' },
  { label: 'Agriculture', to: '/products?category=seeds-bulbs', icon: 'grass' },
  { label: 'AI', to: '/about', icon: 'bolt' },
];

export const TRENDING_BRANDS = [
  { name: 'Green Earth', slug: 'green-earth' },
  { name: 'Orchid Farms', slug: 'orchid-farms' },
  { name: 'Bonsai India', slug: 'bonsai-india' },
  { name: 'Urban Roots', slug: 'urban-roots' },
  { name: 'Fern & Co', slug: 'fern-co' },
  { name: 'Earth & Soil', slug: 'earth-soil' },
  { name: 'LeafyLand', slug: 'leafyland' },
  { name: 'Microgreens Co', slug: 'microgreens' },
  { name: 'Bluestone', slug: 'bluestone' },
  { name: 'Eco Harvest', slug: 'eco-harvest' },
] as const;

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Plants',
    to: '/products?category=plants',
    mega: true,
    ctaLabel: 'All Plants',
    sideImage: IMAGES.monstera,
    columns: [
      {
        title: 'Indoor Plants',
        links: [
          { label: 'Air Purifying', to: '/products?subcategory=plants-indoor-plants' },
          { label: 'Low Light', to: '/products?subcategory=plants-indoor-plants' },
          { label: 'Succulents', to: '/products?subcategory=plants-succulents' },
          { label: 'View all', to: '/products?category=plants' },
        ],
      },
      {
        title: 'Outdoor Plants',
        links: [
          { label: 'Flowering', to: '/products?subcategory=plants-outdoor-plants' },
          { label: 'Medicinal', to: '/products?q=aloe' },
          { label: 'Shrubs', to: '/products?subcategory=plants-outdoor-plants' },
          { label: 'View all', to: '/products?category=plants' },
        ],
      },
    ],
  },
  {
    label: 'Garden',
    to: '/products?category=garden',
    mega: true,
    ctaLabel: 'All Garden',
    sideImage: IMAGES.peaceLily,
    columns: [
      {
        title: 'Soil & Compost',
        links: [
          { label: 'Potting Mix', to: '/products?q=potting' },
          { label: 'Vermicompost', to: '/products?q=vermicompost' },
          { label: 'Organic Manure', to: '/products?q=manure' },
          { label: 'View all', to: '/products?subcategory=garden-soil-compost' },
        ],
      },
      {
        title: 'Tools & Seeds',
        links: [
          { label: 'Garden Tools', to: '/products?subcategory=garden-garden-tools' },
          { label: 'Seeds & Bulbs', to: '/products?q=seed' },
          { label: 'Irrigation', to: '/products?q=drip' },
          { label: 'View all', to: '/products?category=garden' },
        ],
      },
    ],
  },
  {
    label: 'Services',
    to: '/services',
    mega: true,
    ctaLabel: 'All Services',
    sideImage: IMAGES.gardenMaintenance,
    columns: [
      {
        title: 'Landscaping',
        links: [
          { label: 'Landscape Design', to: '/services?category=landscaping' },
          { label: 'Corporate Greening', to: '/services?category=corporate-greening' },
          { label: 'Terrace Garden', to: '/services?category=landscaping' },
          { label: 'View all', to: '/services?category=landscaping' },
        ],
      },
      {
        title: 'Maintenance',
        links: [
          { label: 'Garden AMC', to: '/services?category=maintenance' },
          { label: 'Lawn Mowing', to: '/services?category=maintenance' },
          { label: 'Pest Control', to: '/services?category=maintenance' },
          { label: 'View all', to: '/services?category=maintenance' },
        ],
      },
    ],
  },
  {
    label: 'Shop by Lifestyle',
    to: '/products?category=home',
    mega: true,
    ctaLabel: 'Explore All',
    sideImage: IMAGES.balconyGarden,
    columns: [
      {
        title: 'Home & Living',
        links: [
          { label: 'Home Decor', to: '/products?subcategory=home-home-decor' },
          { label: 'Pots & Planters', to: '/products?subcategory=home-pots-planters' },
          { label: 'Eco Products', to: '/products?category=eco' },
          { label: 'View all', to: '/products?category=home' },
        ],
      },
      {
        title: 'Fresh & Wellness',
        links: [
          { label: 'Fruits', to: '/products?subcategory=fresh-fruits' },
          { label: 'Vegetables', to: '/products?subcategory=fresh-vegetables' },
          { label: 'Herbs', to: '/products?subcategory=fresh-herbs' },
          { label: 'View all', to: '/products?category=fresh' },
        ],
      },
    ],
  },
  {
    label: 'Eco Products',
    to: '/products?category=eco',
    mega: true,
    ctaLabel: 'All Eco Products',
    sideImage: IMAGES.ecoProducts,
    columns: [
      {
        title: 'Sustainable',
        links: [
          { label: 'Composting Kits', to: '/products?q=compost' },
          { label: 'Solar Lights', to: '/products?q=solar' },
          { label: 'Recycled Planters', to: '/products?q=recycled' },
          { label: 'View all', to: '/products?category=eco' },
        ],
      },
      {
        title: 'Organic',
        links: [
          { label: 'Bamboo Products', to: '/products?q=bamboo' },
          { label: 'Rainwater Harvesting', to: '/products?q=rain' },
          { label: 'Seed Balls', to: '/products?q=seed' },
          { label: 'View all', to: '/products?category=eco' },
        ],
      },
    ],
  },
];
