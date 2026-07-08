/** Left mega-menu sections — desktop ALL CATEGORIES sidebar */

export type MegaMenuSection = {
  id: string;
  label: string;
  icon: string;
  links: { label: string; to: string }[];
};

export const MEGA_MENU_SECTIONS: MegaMenuSection[] = [
  {
    id: 'products',
    label: 'Products',
    icon: 'local_florist',
    links: [
      { label: 'Indoor Plants', to: '/products?category=plants' },
      { label: 'Outdoor Plants', to: '/products?category=plants' },
      { label: 'Pots & Planters', to: '/products?category=home-essentials' },
      { label: 'Seeds', to: '/products?category=seeds-bulbs' },
      { label: 'Soil & Fertilizers', to: '/products?category=soil-fertilizers' },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    icon: 'handyman',
    links: [
      { label: 'Gardening', to: '/services?category=maintenance' },
      { label: 'Landscaping', to: '/services?category=landscaping' },
      { label: 'Plumbing', to: '/services?category=civil-construction' },
      { label: 'Electrical', to: '/products?category=electrical-lighting' },
      { label: 'Cleaning', to: '/services?category=maintenance' },
    ],
  },
  {
    id: 'professionals',
    label: 'Professionals',
    icon: 'groups',
    links: [
      { label: 'Architect', to: '/contact' },
      { label: 'Lawyer', to: '/contact' },
      { label: 'CA', to: '/contact' },
      { label: 'Doctor', to: '/contact' },
      { label: 'Interior Designer', to: '/contact' },
    ],
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    icon: 'grass',
    links: [
      { label: 'Hydroponics', to: '/products?category=agriculture-food-beverage' },
      { label: 'Organic Farming', to: '/products?category=eco-products' },
      { label: 'Greenhouse', to: '/products?category=commercial-equipment' },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    icon: 'storefront',
    links: [
      { label: 'Manufacturers', to: '/products?category=industrial-machinery' },
      { label: 'Suppliers', to: '/products' },
      { label: 'Exporters', to: '/contact' },
    ],
  },
  {
    id: 'property',
    label: 'Property',
    icon: 'home',
    links: [
      { label: 'Farm Land', to: '/contact' },
      { label: 'Villa', to: '/contact' },
      { label: 'Warehouse', to: '/contact' },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    icon: 'public',
    links: [{ label: 'Join Groups', to: '/contact' }],
  },
  {
    id: 'franchise',
    label: 'Franchise',
    icon: 'location_city',
    links: [{ label: 'Apply Now', to: '/contact' }],
  },
  {
    id: 'ai',
    label: 'AI',
    icon: 'bolt',
    links: [{ label: 'AI Assistant', to: '/about' }],
  },
];
