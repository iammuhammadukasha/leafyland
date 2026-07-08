/** Catalogue page data — mirrors leafyland.shop/catalogue structure */

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=82&auto=format&fit=crop`;

export type CatalogueNavItem = { id: string; label: string };

export const CATALOGUE_NAV: CatalogueNavItem[] = [
  { id: 'plants', label: 'Plants' },
  { id: 'planting-materials', label: 'Planting Materials' },
  { id: 'landscaping', label: 'Landscaping' },
  { id: 'hardscape', label: 'Hard Landscaping' },
  { id: 'agritech', label: 'Agritech' },
  { id: 'consultancy', label: 'Consultancy' },
  { id: 'civil-interior', label: 'Civil & Interior' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'ayurvedic', label: 'Ayurvedic & Wellness' },
  { id: 'environmental', label: 'Environmental' },
  { id: 'beauty', label: 'Beauty & Skincare' },
  { id: 'health', label: 'Health & Supplements' },
  { id: 'electronics', label: 'Electronics & Gadgets' },
  { id: 'fashion', label: 'Fashion & Apparel' },
  { id: 'home-kitchen', label: 'Home & Kitchen' },
  { id: 'grocery', label: 'Grocery & Quick Commerce' },
  { id: 'pet-care', label: 'Pet Care' },
  { id: 'baby-care', label: 'Baby Care & Kids' },
  { id: 'fitness', label: 'Fitness & Sports' },
  { id: 'office', label: 'Office & WFH' },
  { id: 'it-services', label: 'IT Services' },
  { id: 'digital-marketing', label: 'Digital Marketing' },
  { id: 'cloud-infra', label: 'Cloud & Infra' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'business-consulting', label: 'Business Consulting' },
  { id: 'fintech', label: 'Fintech Services' },
  { id: 'ai-ml', label: 'AI / ML Development' },
  { id: 'logistics', label: 'Logistics & Supply' },
  { id: 'home-maintenance', label: 'Home Maintenance' },
  { id: 'healthcare', label: 'Healthcare & Wellness' },
];

export const CATALOGUE_HERO = {
  tagline: 'Eco-Tech • Sustainable Futures • Green Engineering',
  title: 'Green Ecosystem Delivered',
  subtitle: 'From seed to sanctuary — we architect living spaces that breathe, grow, and inspire.',
  quote: "We don't just deliver products, we deliver green futures.",
  ctas: [
    { label: 'Explore Catalogue', to: '#plants', primary: true },
    { label: 'Book Consultation', to: '/contact', primary: false },
  ],
  stats: [
    { value: '15K+', label: 'Plants Delivered' },
    { value: '500+', label: 'Landscapes Built' },
    { value: '50+', label: 'Expert Team' },
    { value: '4.9★', label: 'Customer Rating' },
  ],
  pills: [
    'Plants & Nursery',
    'Landscape Design',
    'Civil & Interior',
    'Irrigation Systems',
    'Sports Turf',
    'Agri Solutions',
  ],
};

export const CATALOGUE_PROCESS = [
  { step: 1, title: 'Discover', desc: 'Explore our curated ecosystem of plants, landscape solutions & eco-services' },
  { step: 2, title: 'Consult', desc: 'Expert video calls, AI plant recommendations & site analysis' },
  { step: 3, title: 'Design', desc: '2D/3D landscape plans, moodboards, BOQ & eco-strategy' },
  { step: 4, title: 'Build', desc: 'Certified teams execute plants, irrigation, civil & hardscape' },
  { step: 5, title: 'Deliver', desc: 'Doorstep delivery & on-site installation with live tracking' },
  { step: 6, title: 'Maintain', desc: 'AMC, gardening support & seasonal upgrades' },
];

export type CatalogueCard = {
  title: string;
  image: string;
  priceRange: string;
  description: string;
  popularItems?: string[];
  ctaTo?: string;
};

export type CatalogueSection = {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  cards: CatalogueCard[];
  bundles?: { title: string; price: string; description: string }[];
  rateRows?: { label: string; cols: string[] }[];
  rateHeaders?: string[];
  note?: string;
};

export const GOVT_SECTION = {
  title: 'Government-Grade Environmental Products & Services',
  subtitle: 'Sustainable Infra • Policy-Aligned Delivery • On-Time Execution',
  quote: 'Precision-built. Policy-compliant. Planet-positive.',
  products: [
    { title: 'Forest Saplings', items: 'Neem, Pipal, Jamun, Arjun', price: '₹6 – ₹18 per plant' },
    { title: 'Shade Trees', items: 'Ashok, Gulmohar, Kadam', price: '₹14 – ₹35 per plant' },
    { title: 'Fruit Plants', items: 'Amla, Mango, Guava, Lemon', price: '₹25 – ₹70 per plant' },
    { title: 'Medicinal Plants', items: 'Tulsi, Aloe Vera, Lemongrass', price: '₹8 – ₹40 per plant' },
    { title: 'Shrubs & Ornamentals', items: 'Hibiscus, Bougainvillea', price: '₹10 – ₹45 per plant' },
  ],
  services: [
    { title: 'Urban Forestry / Miyawaki', desc: 'Plants + Soil + Drip + Maintenance', price: '₹250 – ₹650 per sq. ft.' },
    { title: 'Avenue Plantation', desc: 'Tree guard + Soil mix + Drip + 1-year maintenance', price: '₹900 – ₹2,500 per tree' },
    { title: 'Riverbank / Lake Rejuvenation', desc: 'Plantation + Irrigation + Geotextile', price: '₹2L – ₹25L per acre' },
    { title: 'Public Garden / Park', desc: 'Complete landscape development', price: '₹300 – ₹950 per sq. ft.' },
    { title: 'Sports Field Eco-Design', desc: 'Natural turf, drainage, lights, irrigation', price: '₹35L – ₹2.5Cr' },
  ],
  engineering: [
    { title: 'Drip & Sprinkler Installation', price: '₹45K – ₹1.8L per acre' },
    { title: 'Rainwater Harvesting', price: '₹2L – ₹25L per system' },
    { title: 'Soil Testing & Audit', price: '₹5K – ₹35K per site' },
    { title: 'Waste-to-Compost', price: '₹1.5L – ₹12L per system' },
  ],
  process: [
    'Requirement Mapping — Site visit + Soil test + EIA',
    'DPR Preparation — Design | Costing | Timeline | BOQ',
    'Procurement — Bulk plant sourcing (PAN India)',
    'Execution — Govt-certified horticulturists & engineers',
    'Monitoring — Drone survey, growth tracking, 360° logs',
    'O&M Support — 3–36 months maintenance & reports',
  ],
  badges: ['Tender Compliant', 'Govt Certified', 'On-Time Delivery', 'Quality Assured'],
};

export const CATALOGUE_SECTIONS: CatalogueSection[] = [
  {
    id: 'plants',
    number: 1,
    title: 'Plants (Retail + Wholesale)',
    subtitle: 'Premium greenery for every space — from cozy homes to corporate campuses. Bulk orders available with special pricing.',
    cards: [
      {
        title: 'Indoor Plants',
        image: u('photo-1485955900006-10f4d324d411'),
        priceRange: '₹250 – ₹2,500',
        description: 'Low-maintenance air-purifying champions for modern homes & offices. NASA-approved varieties.',
        popularItems: ['Areca Palm ₹650', 'ZZ Plant ₹850', 'Snake Plant ₹450', 'Monstera ₹1,800', 'Peace Lily ₹550'],
        ctaTo: '/products?category=plants',
      },
      {
        title: 'Outdoor Plants',
        image: u('photo-1416879595882-3373a0480b5b'),
        priceRange: '₹30 – ₹600',
        description: 'Fast-growing species for landscaping, boundary planting, and urban green projects.',
        popularItems: ['Ashoka Tree ₹120', 'Pipal ₹40', 'Royal Palm ₹450', 'Bougainvillea ₹70', 'Gulmohar ₹180'],
        ctaTo: '/products?category=plants',
      },
      {
        title: 'Flowering Plants',
        image: u('photo-1490750967868-88aa4486c946'),
        priceRange: '₹20 – ₹250',
        description: 'Color-rich selections for gardens, events, and corporate beautification drives.',
        popularItems: ['Red Rose ₹15–₹40', 'Marigold ₹20', 'Hibiscus ₹40–₹60', 'Jasmine ₹80'],
        ctaTo: '/products?category=plants',
      },
      {
        title: 'Fruit & Medicinal Plants',
        image: u('photo-1466692476868-aef1dfb1e735'),
        priceRange: '₹150 – ₹1,200',
        description: 'Home-grown organic produce & traditional Ayurvedic plants for kitchen gardens.',
        popularItems: ['Tulsi ₹80', 'Aloe Vera ₹150', 'Lemon Tree ₹350', 'Guava ₹280'],
        ctaTo: '/products?category=plants',
      },
    ],
    bundles: [
      { title: '10–50 Plants', price: '10% off MRP', description: 'Bulk discount on retail pricing' },
      { title: '50–200 Plants', price: '18% off + Free Delivery', description: 'Mid-scale landscaping orders' },
      { title: '200+ Plants', price: '25% off + Installation', description: 'Corporate & government projects' },
    ],
  },
  {
    id: 'planting-materials',
    number: 2,
    title: 'Planting Materials & Accessories',
    subtitle: 'Everything you need to nurture growth — from premium soil to designer planters and professional tools.',
    cards: [
      {
        title: 'Pots & Planters',
        image: u('photo-1459411552884-841db9b3cc2a'),
        priceRange: '₹120 – ₹12,000',
        description: 'Design-forward planters for aesthetics, durability, and style.',
        popularItems: ['Ceramic Pot (Small) ₹350', 'Terracotta ₹120', 'FRP Premium ₹1,200', 'Self-Watering ₹650'],
        ctaTo: '/products?category=home-essentials',
      },
      {
        title: 'Fertilizers & Soil Mix',
        image: u('photo-1416339442236-8ceb164046f8'),
        priceRange: '₹85 – ₹950',
        description: 'Nutrient-dense soil boosters for fast growth & plant immunity.',
        popularItems: ['Vermicompost (5kg) ₹140', 'Cocopeat (5kg) ₹120', 'NPK (1kg) ₹250', 'Potting Mix (10kg) ₹320'],
        ctaTo: '/products?category=soil-fertilizers',
      },
      {
        title: 'Seeds',
        image: u('photo-1560493676-04071c5f467b'),
        priceRange: '₹20 – ₹150',
        description: 'High-germination seeds for kitchen gardens & commercial farming.',
        popularItems: ['Tomato Seeds ₹30', 'Coriander ₹25', 'Spinach ₹30', 'Microgreens Kit ₹120'],
        ctaTo: '/products?category=seeds-bulbs',
      },
      {
        title: 'Gardening Tools',
        image: u('photo-1416879595882-3373a0480b5b', 600),
        priceRange: '₹150 – ₹2,500',
        description: 'Professional-grade tools with rust-resistant coatings.',
        popularItems: ['Trowel Set ₹280', 'Pruning Shears ₹450', 'Watering Can ₹350', 'Hedge Cutter ₹1,800'],
        ctaTo: '/products?category=garden-tools',
      },
    ],
    bundles: [
      { title: 'Beginner Kit', price: '₹999', description: '5 plants + pots + soil + basic tools' },
      { title: 'Home Garden Kit', price: '₹2,499', description: '10 plants + premium pots + complete setup' },
      { title: 'Kitchen Garden', price: '₹3,999', description: 'Herbs + vegetables + grow system' },
      { title: 'Pro Landscaper Kit', price: '₹8,999', description: 'Professional tools + bulk materials' },
    ],
  },
  {
    id: 'landscaping',
    number: 3,
    title: 'Landscaping Services',
    subtitle: 'Transform spaces into living art — from concept to creation and beyond.',
    cards: [
      {
        title: 'Landscape Design',
        image: u('photo-1600585154340-be6161a56a0c'),
        priceRange: '₹12–₹35 per sq. ft.',
        description: 'End-to-end planning with master layout, planting palette, mood boards & 3D visualization.',
        ctaTo: '/services',
      },
      {
        title: 'Landscape Execution',
        image: u('photo-1416879595882-3373a0480b5b', 600),
        priceRange: '₹150–₹650 per sq. ft.',
        description: 'Site preparation, plantation, turfing, pathways, irrigation & hardscape. Turnkey delivery.',
        ctaTo: '/services',
      },
      {
        title: 'Garden Maintenance (AMC)',
        image: u('photo-1416879595882-3373a0480b5b', 600),
        priceRange: '₹2,500 – ₹38,000/month',
        description: 'Professional plant care, pruning, pest control & seasonal maintenance.',
        ctaTo: '/services',
      },
      {
        title: 'Terrace Garden Setup',
        image: u('photo-1523712999610-f77fbcfc3843'),
        priceRange: '₹35,000 – ₹4,50,000',
        description: 'Urban green spaces with hydroponics, edible gardens & waterproofing.',
        ctaTo: '/services',
      },
    ],
    rateHeaders: ['Area', 'Design Fee', 'Execution Cost', 'AMC Rate'],
    rateRows: [
      { label: 'Up to 500 sq.ft', cols: ['₹15,000', '₹75K–₹1.5L', '₹2,500/month'] },
      { label: '500–1,500 sq.ft', cols: ['₹35,000', '₹1.5L–₹4.5L', '₹5,000/month'] },
      { label: '1,500–5,000 sq.ft', cols: ['₹75,000', '₹4.5L–₹15L', '₹12,000/month'] },
      { label: '5,000–15,000 sq.ft', cols: ['₹1,50,000', '₹15L–₹45L', '₹25,000/month'] },
    ],
    note: 'Rates vary based on design complexity and site conditions. GST extra.',
  },
  {
    id: 'hardscape',
    number: 4,
    title: 'Hard Landscaping',
    subtitle: 'Architectural elements that define spaces — pathways, water features, outdoor structures, and lighting.',
    cards: [
      { title: 'Pathways & Paving', image: u('photo-1518495973542-4542c06a5843'), priceRange: '₹120 – ₹850/sq.ft', description: 'Cobbles, tiles, natural stones, interlocks & deck wood.', ctaTo: '/services' },
      { title: 'Water Features', image: u('photo-1502005229762-cf1b2da7c5d6'), priceRange: '₹35,000 – ₹2,50,000', description: 'Fountains, cascades, koi ponds & Zen water systems.', ctaTo: '/services' },
      { title: 'Gazebo & Pergolas', image: u('photo-1600607687939-ce8a6c25118c'), priceRange: '₹70,000 – ₹4,00,000', description: 'Weather-resistant outdoor structures with optional lighting.', ctaTo: '/services' },
      { title: 'Outdoor Lighting', image: u('photo-1513694203232-719a280e022f'), priceRange: '₹15,000 – ₹1,50,000', description: 'Solar, LED & smart control landscape lighting.', ctaTo: '/products?category=solar-renewable' },
    ],
  },
  {
    id: 'agritech',
    number: 5,
    title: 'Agritech & High-Value Crops',
    subtitle: 'Commercial farming solutions with buyback agreements & training included.',
    cards: [
      { title: 'Aloe Vera Farming', image: u('photo-1500595046743-cd271d694d30'), priceRange: '₹12–₹25 per plant', description: 'Cosmetic, pharma & nutraceutical markets with buyback guarantee.', popularItems: ['Starter Pack (100) ₹1,500', 'Commercial Kit (500) ₹6,500'] },
      { title: 'Lemongrass Plantation', image: u('photo-1500595046743-cd271d694d30'), priceRange: '₹2–₹10 per plant', description: 'Essential oil crop with strong buyback markets. ROI in 8–12 months.' },
      { title: 'Moringa Farming', image: u('photo-1500595046743-cd271d694d30'), priceRange: '₹12–₹25 per plant', description: 'Export-grade superfood. Leaf powder, oil & nutraceutical segment.' },
      { title: 'Hydroponics & Vertical Farming', image: u('photo-1585687501004-615dfdfde7f1'), priceRange: '₹50,000 – ₹15,00,000', description: 'Soilless farming — 10x yield in limited space with training.', popularItems: ['Home Kit ₹15,000', 'Commercial Setup ₹3,50,000'] },
    ],
  },
  {
    id: 'consultancy',
    number: 6,
    title: 'Environmental Consultancy',
    subtitle: 'Strategic sustainability solutions for businesses. SEBI BRSR compliant.',
    cards: [
      { title: 'ESG Strategy & Reporting', image: u('photo-1497436072909-60f360e1d4b1'), priceRange: '₹1,50,000 – ₹8,50,000', description: 'ESG framework, materiality assessment & BRSR/GRI reporting.', ctaTo: '/contact' },
      { title: 'Carbon Footprint & Net Zero', image: u('photo-1497436072909-60f360e1d4b1'), priceRange: '₹75,000 – ₹5,00,000', description: 'Scope 1, 2, 3 emissions & net-zero roadmap.', ctaTo: '/contact' },
      { title: 'Environmental Compliance (EIA/EC)', image: u('photo-1497436072909-60f360e1d4b1'), priceRange: '₹50,000 – ₹3,50,000', description: 'EIA, environmental clearance & regulatory liaison.', ctaTo: '/contact' },
      { title: 'Pollution Control Systems', image: u('photo-1497436072909-60f360e1d4b1'), priceRange: '₹2,00,000 – ₹25,00,000', description: 'ETP/STP design, air pollution control & waste management.', ctaTo: '/contact' },
    ],
    bundles: [
      { title: 'Startup Green', price: '₹75,000', description: 'Basic ESG + Carbon Footprint + Policy Draft' },
      { title: 'SME Sustain', price: '₹2,50,000', description: 'Full ESG Framework + BRSR + Net Zero Roadmap' },
      { title: 'Enterprise Impact', price: '₹8,50,000+', description: 'Complete ESG Transformation + Board Advisory' },
    ],
  },
  {
    id: 'civil-interior',
    number: 7,
    title: 'Civil & Interior Services',
    subtitle: 'From foundation to finish — construction, interiors, and development for residential, commercial & agricultural spaces.',
    cards: [
      { title: 'Civil Works', image: u('photo-1503387762-592deb58ef4e'), priceRange: '₹1,500–₹2,800/sq.ft', description: 'Foundation to finishing civil construction services.', ctaTo: '/services' },
      { title: 'Interior Design', image: u('photo-1618221195710-dd6b41faaea6'), priceRange: '₹1,200–₹3,500/sq.ft', description: 'Residential & commercial interior design + execution.', ctaTo: '/services' },
      { title: 'Modular Kitchen', image: u('photo-1556912173-46acab8ff0c8'), priceRange: '₹1,00,000–₹8,00,000', description: 'Custom modular kitchens based on size & material.', ctaTo: '/services' },
      { title: 'Swimming Pool', image: u('photo-1576013551627-d958b92050bc'), priceRange: '₹2,500–₹5,000/sq.ft', description: 'Complete pool with filtration & waterproofing.', ctaTo: '/services' },
    ],
  },
  {
    id: 'delivery',
    number: 8,
    title: 'Delivery & Logistics',
    subtitle: 'Fast, reliable delivery — eco-friendly packaging & electric fleet.',
    cards: [
      { title: 'Express Delivery', image: u('photo-1601158935942-52255782d322'), priceRange: '₹99 • 2–4 Hours', description: 'Same-day delivery within city limits.' },
      { title: 'Standard Delivery', image: u('photo-1601158935942-52255782d322'), priceRange: '₹49 • 1–2 Days', description: 'Next-day delivery for all orders.' },
      { title: 'Bulk / Heavy Items', image: u('photo-1601158935942-52255782d322'), priceRange: '₹149–₹499 • 2–5 Days', description: 'Large plants, pots & landscaping materials.' },
      { title: 'Pan-India Shipping', image: u('photo-1601158935942-52255782d322'), priceRange: '₹199–₹999 • 5–10 Days', description: 'Nationwide delivery with live tracking.' },
    ],
    note: 'Free delivery on orders above ₹999. Plant health guarantee & eco-friendly packaging.',
  },
  {
    id: 'ayurvedic',
    number: 9,
    title: 'Ayurvedic & Wellness Products',
    subtitle: 'Traditional healing wisdom from India and across the globe.',
    cards: [
      { title: 'Ashwagandha Churna', image: u('photo-1608571423902-eed4a5ad8108'), priceRange: '₹280 – ₹950', description: 'Adaptogenic herb for stress, energy & vitality. FSSAI & GMP certified.', popularItems: ['Standard ₹280', 'Premium ₹450', 'Organic ₹680'] },
      { title: 'Triphala Churna', image: u('photo-1608571423902-eed4a5ad8108'), priceRange: '₹180 – ₹480', description: 'Natural detoxifier & digestive tonic with Amla, Haritaki & Bibhitaki.' },
      { title: 'Chyawanprash', image: u('photo-1608571423902-eed4a5ad8108'), priceRange: '₹350 – ₹850', description: 'Immunity booster with 40+ Ayurvedic herbs. Ayush Premium Mark.' },
      { title: 'Herbal Oils & Extracts', image: u('photo-1608571423902-eed4a5ad8108'), priceRange: '₹150 – ₹1,200', description: 'Cold-pressed oils — coconut, sesame, neem & medicinal extracts.', ctaTo: '/products?category=health-medical' },
    ],
  },
  {
    id: 'environmental',
    number: 10,
    title: 'Environmental Products & Solutions',
    subtitle: 'Pollution control, renewable energy, and sustainable materials.',
    cards: [
      { title: 'Industrial Wet Scrubber', image: u('photo-1565008576549-5756a59368d6'), priceRange: '₹15L – ₹50L', description: 'High-efficiency exhaust gas treatment. 99%+ efficiency. CPCB approved.' },
      { title: 'Solar Panel Systems', image: u('photo-1509391366366-2e959784a276'), priceRange: '₹50,000 – ₹25L', description: 'Rooftop & ground-mount solar with net metering support.', ctaTo: '/products?category=solar-renewable' },
      { title: 'Rainwater Harvesting', image: u('photo-1548839140-5a941f94e586'), priceRange: '₹2L – ₹25L', description: 'Complete RWH systems for homes, campuses & industries.' },
      { title: 'Composting Solutions', image: u('photo-1416339442236-8ceb164046f8'), priceRange: '₹5,000 – ₹12L', description: 'Home to industrial composters & waste-to-compost systems.', ctaTo: '/products?category=eco-products' },
    ],
  },
  {
    id: 'beauty',
    number: 11,
    title: 'Beauty, Skincare & Personal Care',
    subtitle: 'Premium skincare with clinical-grade ingredients. Anti-aging, organic & dermatologist-approved.',
    cards: [
      { title: 'Vitamin C Brightening Serum', image: u('photo-1620916566398-39f1143ab7be'), priceRange: 'Retail ₹599', description: '20% Vitamin C with hyaluronic acid. Reduces dark spots naturally.', popularItems: ['15ml ₹299', '30ml ₹599', '50ml ₹899'], ctaTo: '/products?category=beauty-personal-care' },
      { title: 'Retinol Night Cream', image: u('photo-1556228578-0d85b1a4d571'), priceRange: 'Retail ₹899', description: 'Advanced retinol formula with ceramides for sensitive skin.' },
      { title: 'Mineral Sunscreen SPF 50+', image: u('photo-1556228578-0d85b1a4d571'), priceRange: 'Retail ₹499', description: 'Zinc oxide, reef-safe, no white cast. Perfect for Indian summers.' },
      { title: 'Hyaluronic Acid Gel', image: u('photo-1611930022073-b7a4ba5fcccd'), priceRange: 'Retail ₹449', description: '72-hour deep hydration with multi-weight hyaluronic acid.' },
    ],
    bundles: [
      { title: '50–100 Units', price: '30% off MRP', description: 'Salon & spa bulk pricing' },
      { title: '100–500 Units', price: '42% off + Custom Branding', description: 'Reseller packages' },
      { title: '500+ Units', price: 'White-label available', description: 'Free shipping included' },
    ],
  },
  {
    id: 'health',
    number: 12,
    title: 'Health, Wellness & Supplements',
    subtitle: 'Clinically tested supplements — plant-based protein to Ayurvedic adaptogens.',
    cards: [
      { title: 'Plant-Based Protein', image: u('photo-1593095948071-474c5cc2989d'), priceRange: '₹999 – ₹3,299', description: '25g protein per serving. Chocolate, vanilla & mango flavours.', ctaTo: '/products?category=health-medical' },
      { title: 'Immunity Shield Capsules', image: u('photo-1584308666744-24d5c474f2ae'), priceRange: '₹349 – ₹999', description: 'Ashwagandha, tulsi, giloy & amla. Clinically tested immunity boost.' },
      { title: 'Omega-3 Fish Oil', image: u('photo-1416879595882-3373a0480b5b', 600), priceRange: '₹499 – ₹1,499', description: '1000mg EPA/DHA. Enteric coated, no fishy burps.' },
      { title: 'Daily Multivitamin', image: u('photo-1471864190281-a93a3070b6de'), priceRange: '₹349 – ₹1,599', description: '23 essential vitamins & minerals. Gender-specific formulations.' },
    ],
  },
  {
    id: 'electronics',
    number: 13,
    title: 'Electronics Accessories & Smart Gadgets',
    subtitle: 'Smart home, garden tech, and everyday electronics.',
    cards: [
      { title: 'Smart Soil Moisture Sensor', image: u('photo-1558618666-fcd25c85cd64'), priceRange: '₹899', description: 'Bluetooth sensor alerts when plants need water.', ctaTo: '/products?category=consumer-electronics' },
      { title: 'LED Grow Light Panel', image: u('photo-1558618666-fcd25c85cd64'), priceRange: '₹1,299', description: 'Full-spectrum grow light for indoor plants.' },
      { title: 'Wireless Earbuds', image: u('photo-1590658268037-6bf12165a8df'), priceRange: '₹1,299', description: 'TWS earbuds with charging case & deep bass.' },
      { title: 'Power Bank 10000mAh', image: u('photo-1609091839311-d5365f9ff1c5'), priceRange: '₹999', description: 'Fast-charging dual USB power bank.' },
    ],
  },
  {
    id: 'fashion',
    number: 14,
    title: 'Fashion, Apparel & Accessories',
    subtitle: 'Sustainable fashion and everyday apparel.',
    cards: [
      { title: 'Cotton Gardening Apron', image: u('photo-1445205170230-053b83016050'), priceRange: '₹399', description: 'Durable apron with pockets for tools & seeds.', ctaTo: '/products?category=apparel-accessories' },
      { title: 'Sun Protection Hat', image: u('photo-1521369909029-2afed882baee'), priceRange: '₹299', description: 'Wide-brim UV hat for outdoor gardening.' },
      { title: 'Canvas Sneakers', image: u('photo-1549298916-b41d501d3772'), priceRange: '₹899', description: 'Lightweight everyday canvas shoes.' },
      { title: 'Jute Tote Bag', image: u('photo-1590874103328-eac38a683ce7'), priceRange: '₹199', description: 'Large reusable jute shopping tote.', ctaTo: '/products?category=luggage-bags-cases' },
    ],
  },
  {
    id: 'home-kitchen',
    number: 15,
    title: 'Home & Kitchen Essentials',
    subtitle: 'Everything for a greener, more organized home.',
    cards: [
      { title: 'Ceramic Planters Set', image: u('photo-1485955900006-10f4d324d411'), priceRange: '₹449 – ₹899', description: 'Nesting glazed pots with bamboo trays.', ctaTo: '/products?category=home-garden' },
      { title: 'Jute Storage Basket', image: u('photo-1590874103328-eac38a683ce7'), priceRange: '₹499', description: 'Handwoven jute basket for plants or storage.' },
      { title: 'Scented Candle Set', image: u('photo-1603006905003-dbe64a67980b'), priceRange: '₹549', description: 'Soy wax aromatherapy candles — set of 3.' },
      { title: 'Bamboo Room Divider', image: u('photo-1616486338812-3dadae4b4ace'), priceRange: '₹2,499', description: 'Natural bamboo screen for patio & balcony.' },
    ],
  },
  {
    id: 'grocery',
    number: 16,
    title: 'Online Grocery & Quick Commerce',
    subtitle: 'Fresh organic produce and pantry staples delivered fast.',
    cards: [
      { title: 'Organic Honey', image: u('photo-1587049352846-4a222e784d38'), priceRange: '₹399', description: 'Raw multifloral honey from local apiaries.', ctaTo: '/products?category=agriculture-food-beverage' },
      { title: 'Mixed Dry Fruits', image: u('photo-1599597753454-93c36cc28b83'), priceRange: '₹449', description: 'Premium almonds, cashews & raisins mix.' },
      { title: 'Cold Pressed Coconut Oil', image: u('photo-1474979266404-7eaacbcd87c5'), priceRange: '₹349', description: 'Virgin coconut oil for cooking & wellness.' },
      { title: 'Organic Green Tea', image: u('photo-1556679343-c7306c1976bc'), priceRange: '₹299', description: 'Whole-leaf antioxidant-rich green tea.' },
    ],
  },
  {
    id: 'pet-care',
    number: 17,
    title: 'Pet Care Products',
    subtitle: 'Safe, natural products for your furry companions.',
    cards: [
      { title: 'Cat Grass Grow Kit', image: u('photo-1514888286974-6c03e2ca1dba'), priceRange: '₹199', description: 'Wheatgrass kit safe for cats to nibble.', ctaTo: '/products?category=pet-supplies' },
      { title: 'Pet-Safe Plant Food', image: u('photo-1583337130417-3346a1beec1a'), priceRange: '₹249', description: 'Non-toxic liquid fertilizer for pet homes.' },
      { title: 'Natural Dog Chew Toy', image: u('photo-1583337130417-3346a1beec1a'), priceRange: '₹299', description: 'Eco rubber chew toy — durable & non-toxic.' },
      { title: 'Adult Dog Food 3kg', image: u('photo-1583337130417-3346a1beec1a'), priceRange: '₹899', description: 'Complete nutrition dry dog food with chicken.' },
    ],
  },
  {
    id: 'baby-care',
    number: 18,
    title: 'Baby Care & Kids Products',
    subtitle: 'Safe, organic products for little ones.',
    cards: [
      { title: 'Kids Gardening Tool Set', image: u('photo-1503454537195-1dcabb73ffb9'), priceRange: '₹399', description: 'Child-safe trowel, rake & watering can.', ctaTo: '/products?category=parents-kids-toys' },
      { title: 'Plant Growing Science Kit', image: u('photo-1503454537195-1dcabb73ffb9'), priceRange: '₹299', description: 'Educational kit to grow beans & observe roots.' },
      { title: 'Building Blocks 100pc', image: u('photo-1503454537195-1dcabb73ffb9'), priceRange: '₹599', description: 'Interlocking creative building blocks set.' },
      { title: 'Soft Teddy Bear', image: u('photo-1558864555-5d1dace28667'), priceRange: '₹499', description: 'Huggable plush teddy bear — 45 cm.' },
    ],
  },
  {
    id: 'fitness',
    number: 19,
    title: 'Fitness, Sports & Outdoor',
    subtitle: 'Gear for active lifestyles and outdoor adventures.',
    cards: [
      { title: 'Yoga Mat Eco', image: u('photo-1601925260368-ae2f83cf8b7f'), priceRange: '₹599', description: 'Non-slip natural rubber yoga mat.', ctaTo: '/products?category=sports-entertainment' },
      { title: 'Badminton Set', image: u('photo-1626224583764-f87db4ac00eb'), priceRange: '₹799', description: 'Rackets, shuttlecocks & net for backyard play.' },
      { title: 'Resistance Bands Set', image: u('photo-1598632640487-6ea4a4e8b963'), priceRange: '₹599', description: '5 latex-free bands with carry bag & guide.' },
      { title: 'Outdoor Camping Chair', image: u('photo-1504851149312-7d25af00d560'), priceRange: '₹899', description: 'Foldable chair for garden & picnic outings.' },
    ],
  },
  {
    id: 'office',
    number: 20,
    title: 'Office, Work-From-Home & Study',
    subtitle: 'Productivity essentials for modern workspaces.',
    cards: [
      { title: 'Desk Succulent Kit', image: u('photo-1485955900006-10f4d324d411', 600), priceRange: '₹349', description: 'Mini succulent with ceramic pot for desks.', ctaTo: '/products?category=school-office-supplies' },
      { title: 'Bamboo Pen Holder', image: u('photo-1587825140708-dfaf803cdc48'), priceRange: '₹299', description: 'Desk organizer with bamboo pen slots.' },
      { title: 'Recycled Notebook Set', image: u('photo-1587825140708-dfaf803cdc48'), priceRange: '₹249', description: 'A5 ruled notebooks from recycled paper — 5 pack.' },
      { title: 'LED Desk Lamp', image: u('photo-1507473886154-e6cc228acb74'), priceRange: '₹899', description: 'Adjustable warm-white LED desk lamp.' },
    ],
  },
  {
    id: 'it-services',
    number: 21,
    title: 'IT Services & Digital Transformation',
    subtitle: 'Custom software, mobile apps, and enterprise digital solutions.',
    cards: [
      { title: 'Custom Web Application', image: u('photo-1460925895917-afdab827c52f'), priceRange: '₹2L – ₹25L', description: 'Full-stack web apps with React, Node.js & cloud deployment.', ctaTo: '/contact' },
      { title: 'Mobile App Development', image: u('photo-1512941937669-90a1b58e7e9c'), priceRange: '₹3L – ₹40L', description: 'iOS & Android apps with push notifications & analytics.' },
      { title: 'ERP / CRM Implementation', image: u('photo-1454165804606-c3d57bc86b40'), priceRange: '₹5L – ₹50L', description: 'Odoo, Zoho, or custom ERP with data migration.' },
      { title: 'API Integration Services', image: u('photo-1558494949-ef010cbdcc31'), priceRange: '₹50K – ₹5L', description: 'Payment gateways, shipping APIs & third-party integrations.' },
    ],
  },
  {
    id: 'digital-marketing',
    number: 22,
    title: 'Digital Marketing & Social Media',
    subtitle: 'SEO, paid ads, content strategy, and brand growth.',
    cards: [
      { title: 'SEO Audit & Optimization', image: u('photo-1432888498266-38ffec3eaf4a'), priceRange: '₹25K – ₹2L', description: 'Technical SEO, keyword research & on-page optimization.', ctaTo: '/contact' },
      { title: 'Social Media Management', image: u('photo-1611162616305-c69b3fa7fbe0'), priceRange: '₹15K – ₹1L/month', description: 'Content creation, scheduling & community management.' },
      { title: 'Google & Meta Ads', image: u('photo-1460925895917-afdab827c52f'), priceRange: '₹20K – ₹3L/month', description: 'Performance marketing with ROI tracking & A/B testing.' },
      { title: 'Content Marketing', image: u('photo-1432888498266-38ffec3eaf4a'), priceRange: '₹30K – ₹2L/month', description: 'Blog, video & email campaigns for lead generation.' },
    ],
  },
  {
    id: 'cloud-infra',
    number: 23,
    title: 'Cloud Computing & Infrastructure',
    subtitle: 'AWS, Azure, GCP migration, DevOps, and managed services.',
    cards: [
      { title: 'Cloud Migration', image: u('photo-1451187580459-43490279c0fa'), priceRange: '₹1L – ₹10L', description: 'Lift-and-shift or re-architecture to AWS/Azure/GCP.', ctaTo: '/contact' },
      { title: 'DevOps & CI/CD Pipeline', image: u('photo-1667372393119-3d4c48d07fc9'), priceRange: '₹50K – ₹3L', description: 'Docker, Kubernetes, Jenkins/GitHub Actions automation.' },
      { title: 'Managed Database Services', image: u('photo-1558494949-ef010cbdcc31'), priceRange: '₹30K – ₹1.5L/month', description: 'PostgreSQL, MySQL, MongoDB administration & backup.' },
      { title: 'Cloud Cost Optimization', image: u('photo-1460925895917-afdab827c52f'), priceRange: '₹50K – ₹2L', description: 'Audit & optimize cloud spending. Save 30–60%.' },
    ],
  },
  {
    id: 'cybersecurity',
    number: 24,
    title: 'Cybersecurity & Data Governance',
    subtitle: 'Penetration testing, compliance audits, and 24/7 monitoring.',
    cards: [
      { title: 'Penetration Testing', image: u('photo-1550751827-4bd374c3f58b'), priceRange: '₹1L – ₹5L', description: 'OWASP-aligned security testing with remediation report.', ctaTo: '/contact' },
      { title: 'GDPR / DPDP Compliance', image: u('photo-1563986768494-4dee2763ff3f'), priceRange: '₹75K – ₹3L', description: 'Data privacy compliance for GDPR, CCPA & India DPDP Act.' },
      { title: 'SOC-as-a-Service', image: u('photo-1510511459019-5dda7724fd87'), priceRange: '₹50K – ₹2L/month', description: '24/7 threat detection, incident response & SIEM.' },
      { title: 'Security Awareness Training', image: u('photo-1516321318423-f06f85e504b3'), priceRange: '₹25K – ₹1L', description: 'Phishing simulations & social engineering awareness.' },
    ],
  },
  {
    id: 'business-consulting',
    number: 25,
    title: 'Business Consulting & Advisory',
    subtitle: 'Strategy, fractional CFO, sustainability, and process automation.',
    cards: [
      { title: 'Business Strategy', image: u('photo-1454165804606-c3d57bc86b40'), priceRange: '₹1L – ₹10L', description: 'Market analysis, competitive positioning & growth strategy.', ctaTo: '/contact' },
      { title: 'Fractional CFO', image: u('photo-1554224155-6726b3ff858f'), priceRange: '₹50K – ₹2L/month', description: 'Financial planning, fundraising & investor relations.' },
      { title: 'Sustainability & ESG', image: u('photo-1473341304170-971dccb5ac1e'), priceRange: '₹75K – ₹5L', description: 'ESG framework, carbon footprint & green certification.' },
      { title: 'Process Automation', image: u('photo-1518770660439-4636190af475'), priceRange: '₹50K – ₹3L', description: 'Automate workflows with Zapier, Make, or custom scripts.' },
    ],
  },
  {
    id: 'fintech',
    number: 26,
    title: 'Financial Services & Fintech',
    subtitle: 'Payment integration, bookkeeping, tax filing, and lending platforms.',
    cards: [
      { title: 'Payment Gateway Integration', image: u('photo-1556742049-0cfed4f6a45d'), priceRange: '₹50K – ₹3L', description: 'Razorpay, Stripe, PayU with UPI, cards & EMI.', ctaTo: '/contact' },
      { title: 'Automated Bookkeeping', image: u('photo-1554224155-6726b3ff858f'), priceRange: '₹10K – ₹50K/month', description: 'Cloud bookkeeping with GST filing & reconciliation.' },
      { title: 'Tax Planning & Filing', image: u('photo-1554224155-6726b3ff858f'), priceRange: '₹15K – ₹1L', description: 'Corporate tax, ITR, GST returns & TDS compliance.' },
      { title: 'Lending / BNPL Platform', image: u('photo-1563013544-824ae1b704d3'), priceRange: '₹5L – ₹25L', description: 'Custom lending with credit scoring & KYC integration.' },
    ],
  },
  {
    id: 'ai-ml',
    number: 27,
    title: 'AI / Machine Learning Development',
    subtitle: 'Custom ML models, computer vision, predictive analytics, and AI automation.',
    cards: [
      { title: 'Custom AI Model Development', image: u('photo-1677442136019-21780ecad995'), priceRange: '₹2L – ₹20L', description: 'Tailored ML models for your business data & use cases.', ctaTo: '/contact' },
      { title: 'Computer Vision Solutions', image: u('photo-1677442136019-21780ecad995'), priceRange: '₹3L – ₹25L', description: 'Object detection, quality inspection & facial recognition.' },
      { title: 'Predictive Analytics', image: u('photo-1551288049-bebda4e38f71'), priceRange: '₹1L – ₹10L', description: 'Demand forecasting, churn prediction & risk scoring.' },
      { title: 'AI Chatbot & Automation', image: u('photo-1677442136019-21780ecad995'), priceRange: '₹50K – ₹5L', description: 'LLM-powered chatbots, document processing & workflow AI.' },
    ],
  },
  {
    id: 'logistics',
    number: 28,
    title: 'Logistics & Supply Chain Management',
    subtitle: 'Warehousing, last-mile delivery, fleet management, and inventory systems.',
    cards: [
      { title: 'Warehouse Management System', image: u('photo-1586528116311-ad8dd3c8310d'), priceRange: '₹2L – ₹15L', description: 'WMS with barcode scanning, picking & real-time inventory.', ctaTo: '/contact' },
      { title: 'Last-Mile Delivery Platform', image: u('photo-1601158935942-52255782d322'), priceRange: '₹3L – ₹20L', description: 'Route optimization, driver app & live tracking.' },
      { title: 'Fleet Management', image: u('photo-1601158935942-52255782d322'), priceRange: '₹1L – ₹8L', description: 'GPS tracking, fuel monitoring & maintenance scheduling.' },
      { title: 'Inventory Optimization', image: u('photo-1586528116311-ad8dd3c8310d'), priceRange: '₹50K – ₹5L', description: 'Demand planning, reorder points & stock analytics.' },
    ],
  },
  {
    id: 'home-maintenance',
    number: 29,
    title: 'Home & Maintenance Services',
    subtitle: 'Cleaning, pest control, plumbing, electrical, and appliance repair.',
    cards: [
      { title: 'Deep Home Cleaning', image: u('photo-1581578731546-c64695cc6952'), priceRange: '₹1,500 – ₹8,000', description: 'Professional deep cleaning for homes & offices.', ctaTo: '/services' },
      { title: 'Pest Control Service', image: u('photo-1581578731546-c64695cc6952'), priceRange: '₹999 – ₹4,999', description: 'Safe, eco-friendly pest control with warranty.', ctaTo: '/services' },
      { title: 'Plumbing & Electrical', image: u('photo-1581578731546-c64695cc6952'), priceRange: '₹300 – ₹3,000', description: 'Same-day plumber & electrician visits.', ctaTo: '/services' },
      { title: 'AC Service & Repair', image: u('photo-1581578731546-c64695cc6952'), priceRange: '₹499 – ₹2,499', description: 'AC cleaning, gas refill & repair by certified technicians.', ctaTo: '/services' },
    ],
  },
  {
    id: 'healthcare',
    number: 30,
    title: 'Healthcare & Wellness Services',
    subtitle: 'Telemedicine, health coaching, at-home lab tests, and physiotherapy.',
    cards: [
      { title: 'Telemedicine Consultation', image: u('photo-1576091160399-112ba8d25d1d'), priceRange: '₹300 – ₹1,500', description: 'Video consultation with certified doctors. E-prescription included.', ctaTo: '/contact' },
      { title: 'Virtual Health Coaching', image: u('photo-1571019613454-1cb2f99b2d8b'), priceRange: '₹3K – ₹15K/month', description: 'Nutrition plans, workout routines & weekly check-ins.' },
      { title: 'At-Home Lab Tests', image: u('photo-1579684385127-1ef15d508118'), priceRange: '₹500 – ₹5,000', description: 'Doorstep blood collection. Reports in 24 hours.' },
      { title: 'Physiotherapy at Home', image: u('photo-1576091160550-2173dba999ef'), priceRange: '₹800 – ₹2,000/session', description: 'Post-surgery rehab, sports injuries & senior care.', ctaTo: '/contact' },
    ],
  },
];
