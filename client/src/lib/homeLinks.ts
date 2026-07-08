/** Route targets for homepage click targets */
export const HOME_ROUTES = {
  products: '/products',
  services: '/services',
  contact: '/contact',
  signup: '/signup',
  about: '/about',
  faq: '/faq',
  cart: '/cart',
} as const;

export const SHOP_CATEGORY_TO: Record<string, string> = {
  Plants: '/products?category=plants',
  'Seeds & Bulbs': '/products?category=garden',
  'Soil & Fertilizers': '/products?category=garden',
  'Garden Tools': '/products?category=garden',
  Solar: '/products?category=eco',
  'Eco Products': '/products?category=eco',
  Electrical: '/services',
  Plumbing: '/services',
  Paint: '/products?category=home',
  'Home Essentials': '/products?category=home',
  Furniture: '/products?category=home',
  Ayurvedic: '/products?category=eco',
};

export const DISCOVER_HUB_TO: Record<string, string> = {
  'Real Estate & Green Homes': '/about',
  'Food & Organic Grocery': '/products?category=fresh',
  'Eco Fashion': '/products?category=eco',
  'Wellness & Ayurveda': '/products?category=eco',
  'Eco Products': '/products?category=eco',
  'Natural Farming': '/services',
};

export const BOOKING_MODE_TO: Record<string, string> = {
  'Book Now': '/services',
  Schedule: '/services',
  Subscribe: '/services',
  'Get Help': '/contact',
  Request: '/contact',
  'Start Call': '/contact',
};

export const PARTNER_TO: Record<string, string> = {
  'Take a Franchise': '/contact',
  'Become a Vendor': '/signup',
  'Corporate Partnership': '/contact',
  'Investor Relations': '/contact',
  'Dealer & Distributor': '/signup',
  'Service Partner': '/signup',
};

export const SERVICE_PILL_TO = '/services';

export const DAILY_SERVICE_TO = '/services';

export const HERO_CTA_TO: Record<string, string> = {
  'Get Free Quote': '/contact',
  'Explore Services': '/services',
  'Join Network': '/signup',
  'Corporate Solutions': '/contact',
};

export const SHELF_SEE_ALL: Record<string, string> = {
  'Trending Plants': '/products?category=plants',
  'Soil & Fertilizers': '/products?category=garden',
  'Garden Tools & Irrigation': '/products?category=garden',
};
