import { IMAGES } from './images'

export { IMAGES }

export const NAV_LINKS = [
  'Home',
  'Marketplace',
  'Services',
  'Agriculture',
  'Environment',
  'Tools & Machinery',
  'Find Vendors',
  'Catalogue',
  'Offers',
  'Events',
  'Community',
  'About',
] as const

export const CATEGORY_STRIP = [
  { label: 'All', icon: 'apps' },
  { label: 'Plants', icon: 'local_florist' },
  { label: 'Soil & Compost', icon: 'compost' },
  { label: 'Seeds', icon: 'grass' },
  { label: 'Garden Tools', icon: 'hardware' },
  { label: 'Landscaping', icon: 'park' },
  { label: 'Daily Care', icon: 'water_drop' },
  { label: 'Irrigation', icon: 'plumbing' },
  { label: 'Solar', icon: 'solar_power' },
  { label: 'Eco Products', icon: 'eco' },
  { label: 'Services', icon: 'handyman' },
  { label: 'Vendors', icon: 'storefront' },
] as const

export const SERVICE_PILLS = [
  'Landscaping',
  'Corporate Greening',
  'Civil & Construction',
  'Hardscape',
  'Waterscaping',
  'Maintenance',
] as const

export const SHOP_CATEGORIES = [
  { label: 'Plants', image: IMAGES.monstera },
  { label: 'Seeds & Bulbs', image: IMAGES.seeds },
  { label: 'Soil & Fertilizers', image: IMAGES.vermicompost },
  { label: 'Garden Tools', image: IMAGES.gardenTools },
  { label: 'Solar', image: IMAGES.ecoProducts },
  { label: 'Eco Products', image: IMAGES.organicFood },
  { label: 'Electrical', image: IMAGES.corporateProject },
  { label: 'Plumbing', image: IMAGES.dripInstall },
  { label: 'Paint', image: IMAGES.villaProject },
  { label: 'Home Essentials', image: IMAGES.mindfulMorning },
  { label: 'Furniture', image: IMAGES.realEstate },
  { label: 'Ayurvedic', image: IMAGES.ayurveda },
] as const

export const DAILY_SERVICES = [
  { name: 'Plant Watering', icon: 'water_drop' },
  { name: 'Lawn Mowing', icon: 'grass' },
  { name: 'Garden Cleaning', icon: 'cleaning_services' },
  { name: 'Pest Control', icon: 'pest_control' },
  { name: 'Waste Recycling', icon: 'recycling' },
  { name: 'Indoor Plant Care', icon: 'potted_plant' },
  { name: 'Soil Replacement', icon: 'layers' },
  { name: 'Irrigation Repair', icon: 'plumbing' },
  { name: 'Compost Pickup', icon: 'compost' },
  { name: 'Balcony Setup', icon: 'balcony' },
  { name: 'Emergency Garden', icon: 'emergency' },
  { name: 'Plant Replacement', icon: 'autorenew' },
  { name: 'Housekeeping', icon: 'house' },
  { name: 'Deep Cleaning', icon: 'mop' },
  { name: 'AC Service', icon: 'ac_unit' },
  { name: 'Appliance Repair', icon: 'build' },
  { name: 'Plumbing', icon: 'plumbing' },
  { name: 'Electrical', icon: 'bolt' },
  { name: 'Painting', icon: 'format_paint' },
  { name: 'Carpentry', icon: 'carpenter' },
  { name: 'Waterproofing', icon: 'umbrella' },
  { name: 'CCTV', icon: 'videocam' },
  { name: 'Shifting', icon: 'local_shipping' },
  { name: 'Junk Removal', icon: 'delete_sweep' },
] as const

export const BOOKING_MODES = [
  { title: 'Instant Booking', desc: 'Service within 2 hours', icon: 'bolt', cta: 'Book Now' },
  { title: 'Scheduled Booking', desc: 'Pick your preferred slot', icon: 'calendar_month', cta: 'Schedule' },
  { title: 'Recurring Booking', desc: 'Weekly / monthly plans', icon: 'update', cta: 'Subscribe' },
  { title: 'Emergency Service', desc: 'Priority garden SOS', icon: 'emergency_home', cta: 'Get Help' },
  { title: 'Site Visit', desc: 'Expert on-site assessment', icon: 'location_city', cta: 'Request' },
  { title: 'Video Consultation', desc: 'Remote expert advice', icon: 'videocam', cta: 'Start Call' },
] as const

export const DISCOVER_HUBS = [
  { title: 'Real Estate & Green Homes', desc: 'Premium sustainable properties and eco developments.', image: IMAGES.realEstate },
  { title: 'Food & Organic Grocery', desc: 'Farm-fresh organic produce delivered to your door.', image: IMAGES.organicFood },
  { title: 'Eco Fashion', desc: 'Sustainable apparel and conscious lifestyle products.', image: IMAGES.ecoFashion },
  { title: 'Wellness & Ayurveda', desc: 'Natural health and holistic wellness solutions.', image: IMAGES.ayurveda },
  { title: 'Eco Products', desc: 'Everyday sustainable alternatives for modern living.', image: IMAGES.ecoProducts },
  { title: 'Natural Farming', desc: 'Organic farming supplies and agri-tech solutions.', image: IMAGES.farming },
] as const

export type Product = {
  name: string
  slug?: string
  price: number
  oldPrice: number
  image: string
  tag: string
  rating: number
  reviews: string
  unit: string
}

export const PRODUCT_SHELVES: { title: string; items: Product[] }[] = [
  {
    title: 'Trending Plants',
    items: [
      { name: 'Peace Lily', slug: 'peace-lily', price: 299, oldPrice: 399, image: IMAGES.peaceLily, tag: 'Air Purifying', rating: 4.8, reviews: '2.3k', unit: '1 plant (6" pot)' },
      { name: 'Snake Plant', slug: 'snake-plant', price: 199, oldPrice: 299, image: IMAGES.snakePlant, tag: 'Low Light', rating: 4.9, reviews: '1.8k', unit: '1 plant (5" pot)' },
      { name: 'Money Plant', slug: 'money-plant', price: 149, oldPrice: 199, image: IMAGES.plantShelf, tag: 'Popular', rating: 4.7, reviews: '956', unit: '1 plant (4" pot)' },
    ],
  },
  {
    title: 'Soil & Fertilizers',
    items: [
      { name: 'Vermicompost 5kg', slug: 'vermicompost-5kg', price: 149, oldPrice: 249, image: IMAGES.vermicompost, tag: 'Organic', rating: 4.6, reviews: '3.1k', unit: '5 kg bag' },
      { name: 'NPK Fertilizer', slug: 'npk-fertilizer-19-19-19', price: 199, oldPrice: 279, image: IMAGES.npkFertilizer, tag: 'Garden', rating: 4.4, reviews: '1.2k', unit: '1 kg pack' },
      { name: 'Potting Mix Premium', slug: 'potting-mix-premium', price: 249, oldPrice: 349, image: IMAGES.pottingSoil, tag: 'Ready Mix', rating: 4.7, reviews: '2.4k', unit: '10 kg bag' },
    ],
  },
  {
    title: 'Garden Tools & Irrigation',
    items: [
      { name: 'Pruning Shears', slug: 'pruning-shears-pro', price: 349, oldPrice: 499, image: IMAGES.pruningShears, tag: 'Pro Grade', rating: 4.5, reviews: '640', unit: '1 pc' },
      { name: 'Garden Hose 30m', slug: 'garden-hose-30m', price: 599, oldPrice: 799, image: IMAGES.gardenHose, tag: 'Durable', rating: 4.3, reviews: '410', unit: '30 metre' },
      { name: 'Drip Irrigation Kit', slug: 'drip-irrigation-kit', price: 599, oldPrice: 799, image: IMAGES.dripInstall, tag: 'Water Saving', rating: 4.6, reviews: '380', unit: '1 kit' },
      { name: 'Adjustable Sprinkler', slug: 'adjustable-sprinkler', price: 349, oldPrice: 449, image: IMAGES.sprinkler, tag: 'Adjustable', rating: 4.4, reviews: '290', unit: '1 pc' },
    ],
  },
]

export const VENDORS = [
  { name: 'Karnataka Orchid Farms', category: 'Plants', city: 'Hyderabad', rating: 4.9, image: IMAGES.vendorNursery },
  { name: 'Superfood Microgreens', category: 'Organic Farm', city: 'Mumbai', rating: 4.8, image: IMAGES.vendorOrganic },
  { name: 'Bonsai Garden India', category: 'Plants', city: 'Bengaluru', rating: 4.8, image: IMAGES.vendorBonsai },
  { name: 'Bluestone Hardscapes', category: 'Civil', city: 'Kolkata', rating: 4.8, image: IMAGES.vendorHardscape },
  { name: 'AgriTech Solutions', category: 'Agritech', city: 'Lucknow', rating: 4.8, image: IMAGES.farming },
  { name: 'Kerala Spice Saplings', category: 'Plants', city: 'Delhi', rating: 4.9, image: IMAGES.organicFood },
  { name: 'Green Earth Nurseries', category: 'Nursery', city: 'Mumbai', rating: 4.8, image: IMAGES.vendorNursery },
  { name: 'Urban Flora Designs', category: 'Landscaping', city: 'Pune', rating: 4.9, image: IMAGES.balconyGarden },
] as const

export const MOST_BOOKED = [
  { name: 'Garden AMC', slug: 'garden-amc', price: '₹24,999/yr', rating: 4.85, reviews: '12K', image: IMAGES.gardenMaintenance },
  { name: 'Terrace & Balcony Garden', slug: 'terrace-balcony-garden', price: '₹6,999', rating: 4.82, reviews: '8.4K', image: IMAGES.balconyGarden },
  { name: 'Landscape Design', slug: 'landscape-design', price: '₹4,999', rating: 4.78, reviews: '6K', image: IMAGES.landscapeDesign },
  { name: 'Corporate Plant Rental', slug: 'corporate-plant-rental', price: '₹2,999', rating: 4.9, reviews: '5.2K', image: IMAGES.plantCare },
  { name: 'Garden Development', slug: 'garden-development', price: '₹8,999', rating: 4.87, reviews: '3.1K', image: IMAGES.gardenMaintenance },
  { name: 'Lawn Mowing', slug: 'lawn-mowing', price: '₹1,499', rating: 4.8, reviews: '2.8K', image: IMAGES.lawnMowing },
] as const

export const LUXURY_SERVICES = [
  { title: 'Luxury Landscape Design', desc: 'Bespoke 2D/3D design for villas, resorts, and estates.', price: '₹5L' },
  { title: 'Turnkey Development', desc: 'End-to-end softscape, hardscape, and water features.', price: '₹3L' },
  { title: 'Corporate Campus', desc: 'Biophilic workplace gardens and rooftop greening.', price: '₹10L' },
  { title: 'Water Feature Engineering', desc: 'Fountains, reflection ponds, and cascading elements.', price: '₹2L' },
  { title: 'Sustainable Luxury', desc: 'Native plantings with smart irrigation systems.', price: '₹2.5L' },
  { title: 'Master-Planned Projects', desc: 'Township and integrated development landscaping.', price: '₹15L' },
] as const

export const EXPERTS = [
  { role: 'Landscape Architect', price: '₹5,000' },
  { role: 'Horticulturist', price: '₹2,500' },
  { role: 'Irrigation Engineer', price: '₹4,000' },
  { role: 'Civil Engineer', price: '₹5,000' },
  { role: 'Urban Farming Expert', price: '₹3,500' },
  { role: 'Hydroponics Expert', price: '₹4,000' },
  { role: 'ESG Consultant', price: '₹15,000' },
  { role: 'Interior Designer', price: '₹5,000' },
] as const

export const AMC_PLANS = [
  {
    title: 'Corporate Garden AMC',
    price: '₹50,000',
    period: '/yr',
    features: ['Weekly garden visits', 'Seasonal replanting', 'Pest control', 'Irrigation checks'],
  },
  {
    title: 'Office Plant AMC',
    price: '₹15,000',
    period: '/yr',
    features: ['Monthly maintenance', 'Plant replacement', 'Watering schedule', 'Fertilizer application'],
  },
  {
    title: 'Society Garden AMC',
    price: '₹25,000',
    period: '/yr',
    features: ['Bi-weekly mowing', 'Pruning & trimming', 'Pest management', 'Seasonal upgrades'],
  },
] as const

export const PARTNERS = [
  { title: 'Take a Franchise', desc: 'Launch your own LeafyLand center with brand support.' },
  { title: 'Become a Vendor', desc: 'Sell green products on India\'s largest eco marketplace.' },
  { title: 'Corporate Partnership', desc: 'CSR, campus greening, and sustainability partnerships.' },
  { title: 'Investor Relations', desc: 'Join India\'s fastest-growing green ecosystem.' },
  { title: 'Dealer & Distributor', desc: 'Join our distribution network across 40+ cities.' },
  { title: 'Service Partner', desc: 'Provide landscaping and maintenance through our platform.' },
] as const

export const EVENTS = [
  { name: 'Kids Garden Workshop', price: '₹499', date: 'May 10 · Mumbai', badge: 'Hands-on', image: IMAGES.eventWorkshop },
  { name: 'Wellness Retreat', price: '₹4,999', date: 'May 24 · Pune', badge: 'Exclusive', image: IMAGES.eventRetreat },
  { name: 'Tree Plantation Drive', price: '₹200', date: 'Jun 5 · Mumbai', badge: 'Community', image: IMAGES.eventPlantation },
  { name: 'Green Hackathon', price: 'Free', date: 'Jun 15 · Bangalore', badge: 'Tech', image: IMAGES.eventHackathon },
] as const

export const SIGNATURE_PROJECTS = [
  { title: 'Ultra-Luxury Villa Estate', type: 'Private Estate', loc: 'Alibaug', desc: 'Tropical modern retreat with waterscapes and indigenous plantations.', image: IMAGES.villaProject },
  { title: 'Corporate HQ Campus', type: 'Sustainable Office', loc: 'Gurugram', desc: 'LEED-certified green infrastructure with vertical forests.', image: IMAGES.corporateProject },
  { title: 'Five-Star Resort & Spa', type: 'Hospitality', loc: 'Udaipur', desc: 'Heritage-inspired gardens blending with the Aravalli landscape.', image: IMAGES.resortProject },
  { title: 'Premium Township', type: 'Urban Forestry', loc: 'Pune', desc: 'Miyawaki forests within a 100-acre residential development.', image: IMAGES.townshipProject },
] as const

export const WHY_US = [
  { icon: 'workspace_premium', title: 'Award-Winning Design', desc: 'Recognized for excellence in ecological landscape architecture.' },
  { icon: 'groups', title: 'In-House Expert Team', desc: 'Architects, horticulturists, and engineers under one roof.' },
  { icon: 'public', title: 'International Standards', desc: 'Global best practices for sustainability and quality.' },
  { icon: 'stars', title: 'Trusted by India\'s Elite', desc: 'Serving top corporates and premium residential estates.' },
  { icon: 'eco', title: 'Sustainability First', desc: 'Water conservation and biodiversity in every project.' },
  { icon: 'schedule', title: 'On-Time Delivery', desc: 'Strict timelines with transparent project management.' },
] as const

export const FAQS = [
  'What types of luxury landscaping projects does LeafyLand undertake?',
  'How does your Design-Build-Maintain model work?',
  'Do you work with architects and real estate developers?',
  'What makes LeafyLand different from other landscaping companies?',
  'What is the typical timeline for a luxury landscape project?',
] as const

export const STATS = [
  { value: '500+', label: 'Projects' },
  { value: '10K+', label: 'Products' },
  { value: '40+', label: 'Cities' },
  { value: '18+', label: 'Years' },
] as const
