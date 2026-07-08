/** Mixed-layout homepage data — client super-marketplace spec */

export type QuickCircle = { label: string; icon: string; to: string };

export const CIRCULAR_CATEGORIES: QuickCircle[] = [
  { label: 'Products', icon: 'local_florist', to: '/products' },
  { label: 'Services', icon: 'handyman', to: '/services' },
  { label: 'Experts', icon: 'groups', to: '/contact' },
  { label: 'Community', icon: 'public', to: '/contact' },
  { label: 'Franchise', icon: 'location_city', to: '/contact' },
  { label: 'Business', icon: 'storefront', to: '/products' },
  { label: 'Agriculture', icon: 'grass', to: '/products?category=seeds-bulbs' },
  { label: 'Real Estate', icon: 'home', to: '/contact' },
  { label: 'AI', icon: 'bolt', to: '/about' },
  { label: 'Learning', icon: 'article', to: '/faq' },
];

export type MegaGridItem = { label: string; icon: string; to: string };

export const MEGA_CATEGORY_GRID: MegaGridItem[] = [
  { label: 'Plants', icon: 'local_florist', to: '/products?category=plants' },
  { label: 'Pots', icon: 'home', to: '/products?category=home-essentials' },
  { label: 'Seeds', icon: 'grass', to: '/products?category=seeds-bulbs' },
  { label: 'Trees', icon: 'park', to: '/products?category=plants' },
  { label: 'Landscape', icon: 'park', to: '/services?category=landscaping' },
  { label: 'Contractors', icon: 'handyman', to: '/services?category=civil-construction' },
  { label: 'Experts', icon: 'groups', to: '/contact' },
  { label: 'Services', icon: 'tools', to: '/services' },
  { label: 'Business', icon: 'storefront', to: '/products' },
  { label: 'Farming', icon: 'grass', to: '/products?category=agriculture-food-beverage' },
  { label: 'Property', icon: 'home', to: '/contact' },
  { label: 'AI', icon: 'bolt', to: '/about' },
  { label: 'Courses', icon: 'article', to: '/faq' },
  { label: 'Jobs', icon: 'verified', to: '/contact' },
  { label: 'Community', icon: 'public', to: '/contact' },
  { label: 'Offers', icon: 'star', to: '/products' },
];

export type MixedCard =
  | { type: 'product'; name: string; price: string; rating: number; image: string; slug: string }
  | { type: 'expert'; name: string; role: string; years: string; rating: number; image: string }
  | { type: 'service'; name: string; price: string; rating: number; slug: string; image: string }
  | { type: 'franchise'; name: string; investment: string; image: string }
  | { type: 'community'; name: string; members: string; image: string };

export const MIXED_FEED: MixedCard[] = [
  { type: 'product', name: 'Indoor Plant', price: '₹399', rating: 4.8, image: '/images/peace-lily.jpg', slug: 'peace-lily' },
  { type: 'expert', name: 'Kanchan Mondal', role: 'Landscape Architect', years: '18 Years', rating: 5.0, image: '/images/landscape.jpg' },
  { type: 'service', name: 'Garden Maintenance', price: 'From ₹799', rating: 4.9, slug: 'garden-amc', image: '/images/garden-maintenance.jpg' },
  { type: 'franchise', name: 'Leafy Nursery', investment: 'Investment ₹5L', image: '/images/nursery.jpg' },
  { type: 'community', name: 'Urban Gardeners', members: '12K Members', image: '/images/balcony-garden.jpg' },
  { type: 'product', name: 'Snake Plant', price: '₹199', rating: 4.9, image: '/images/snake-plant.jpg', slug: 'snake-plant' },
  { type: 'service', name: 'Lawn Mowing', price: 'From ₹1,499', rating: 4.8, slug: 'lawn-mowing', image: '/images/lawn-care.jpg' },
  { type: 'expert', name: 'Dr. Priya Sharma', role: 'Horticulturist', years: '12 Years', rating: 4.9, image: '/images/plant-care.jpg' },
];

export const COMMUNITIES = [
  { name: 'Urban Gardeners', members: '18,000 Members', image: '/images/balcony-garden.jpg' },
  { name: 'Organic Farmers India', members: '9,200 Members', image: '/images/farming.jpg' },
  { name: 'Terrace Garden Club', members: '6,500 Members', image: '/images/hero-garden.jpg' },
] as const;

export const VERIFIED_EXPERTS = [
  { name: 'Kanchan Mondal', role: 'Landscape Architect', years: '18 Years', rating: 5.0, price: '₹5,000' },
  { name: 'Dr. Priya Sharma', role: 'Horticulturist', years: '12 Years', rating: 4.9, price: '₹2,500' },
  { name: 'Rahul Mehta', role: 'Civil Engineer', years: '15 Years', rating: 4.8, price: '₹5,000' },
  { name: 'Anita Desai', role: 'Interior Designer', years: '10 Years', rating: 4.9, price: '₹5,000' },
] as const;
