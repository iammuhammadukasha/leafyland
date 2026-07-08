import { IMAGES, imageUrl } from './images';
import type { FeedProduct, FeedShelf } from './zeptoFeedData';

export type SubCategoryChip = { label: string; image: string };
export type GridCategory = { label: string; image: string };
export type PromoCard = { title: string; subtitle: string; cta: string; image: string; gradient: string };
export type BrandPill = { name: string };
export type BrandFilterPill = { name: string; logo?: string };

function meta(i: number) {
  const ratings = [4.8, 4.9, 4.6, 4.7, 4.5, 4.8, 4.4, 4.9, 4.6, 4.7];
  const reviews = ['8.0k', '15.4k', '19.6k', '14.8k', '14.0k', '3.7k', '8.9k', '6.9k', '3.1k', '2.3k'];
  return {
    rating: ratings[i % ratings.length],
    reviews: reviews[i % reviews.length],
    deliveryMins: 8 + (i % 4),
  };
}

let seq = 0;
function p(
  id: string,
  name: string,
  price: number,
  comparePrice: number,
  unit: string,
  image: string,
  badge?: string,
): FeedProduct {
  const m = meta(seq++);
  return { id, slug: id, name, price, comparePrice, unit, image, badge, ...m };
}

/** All tab — top subcategory carousel (Zepto-style rectangular cards) */
export const ALL_SUBCATEGORY_ICONS: SubCategoryChip[] = [
  { label: 'Plants & Live', image: imageUrl('plantCorner', 'thumb') },
  { label: 'Fresh Produce', image: imageUrl('freshVegetables', 'thumb') },
  { label: 'Soil & Compost', image: imageUrl('vermicompost', 'thumb') },
  { label: 'Garden Tools', image: imageUrl('gardenTools', 'thumb') },
  { label: 'Seeds & Bulbs', image: imageUrl('seeds', 'thumb') },
  { label: 'Home Decor', image: imageUrl('homeDecor', 'thumb') },
  { label: 'Eco Products', image: imageUrl('ecoProducts', 'thumb') },
  { label: 'Pots & Planters', image: imageUrl('potsPlanters', 'thumb') },
  { label: 'Indoor Plants', image: imageUrl('plantCare', 'thumb') },
  { label: 'Herbs & Leafy', image: imageUrl('herbsLeafy', 'thumb') },
  { label: 'Irrigation', image: imageUrl('dripInstall', 'thumb') },
  { label: 'Fertilizers', image: imageUrl('npkFertilizer', 'thumb') },
];

/** All tab product shelves — mirrors Zepto Laundry Care / Rice / Hair care */
export const ALL_TAB_SHELVES: FeedShelf[] = [
  {
    id: 'soil-compost',
    title: 'Soil & Compost',
    products: [
      p('vc-5kg', 'Vermicompost 5kg', 149, 249, '5 kg bag', IMAGES.vermicompost, '40% OFF'),
      p('potmix', 'Potting Mix Premium', 249, 349, '10 kg bag', IMAGES.pottingSoil, '29% OFF'),
      p('coco', 'Coco Peat Block', 89, 120, '1 block (5 kg)', IMAGES.cocoPeat),
      p('npk', 'NPK Fertilizer', 199, 279, '1 kg pack', IMAGES.npkFertilizer),
      p('organic-compost', 'Organic Compost', 129, 179, '5 kg bag', IMAGES.vermicompost, '28% OFF'),
      p('cow-manure', 'Cow Manure', 99, 140, '5 kg bag', IMAGES.pottingSoil),
      p('perlite', 'Perlite Mix', 159, 199, '2 kg bag', IMAGES.cocoPeat),
      p('neem-cake', 'Neem Cake', 89, 110, '1 kg', IMAGES.npkFertilizer, '19% OFF'),
      p('bone-meal', 'Bone Meal', 119, 149, '1 kg', IMAGES.pottingSoil),
      p('seaweed', 'Seaweed Fertilizer', 249, 320, '500 ml', IMAGES.npkFertilizer),
    ],
  },
  {
    id: 'garden-tools',
    title: 'Garden Tools',
    products: [
      p('shears', 'Pruning Shears Pro', 349, 499, '1 pc', IMAGES.pruningShears, '30% OFF'),
      p('hose', 'Garden Hose 30m', 599, 799, '30 metre', IMAGES.gardenHose),
      p('drip', 'Drip Kit Starter', 899, 1199, '50 plants', IMAGES.dripInstall, '25% OFF'),
      p('sprinkler', 'Sprinkler Set', 449, 599, '1 set', IMAGES.sprinkler),
      p('trowel', 'Garden Trowel Set', 299, 399, '3 pcs', IMAGES.gardenTools),
      p('gloves', 'Gardening Gloves', 149, 199, '1 pair', IMAGES.gardenTools, '25% OFF'),
      p('watering-can', 'Watering Can 5L', 399, 499, '1 pc', IMAGES.gardenHose),
      p('rake', 'Leaf Rake', 449, 550, '1 pc', IMAGES.gardenTools),
      p('fork', 'Digging Fork', 549, 699, '1 pc', IMAGES.pruningShears, '21% OFF'),
      p('sprayer', 'Pressure Sprayer', 699, 899, '2 L', IMAGES.sprinkler),
    ],
  },
  {
    id: 'indoor-plants',
    title: 'Indoor Plants',
    products: [
      p('pl-peace', 'Peace Lily', 299, 399, '1 plant (6" pot)', IMAGES.peaceLily, '25% OFF'),
      p('pl-snake', 'Snake Plant', 199, 299, '1 plant (5" pot)', IMAGES.snakePlant, '33% OFF'),
      p('pl-monstera', 'Monstera Deliciosa', 599, 799, '1 plant (8" pot)', IMAGES.monstera, '25% OFF'),
      p('pl-areca', 'Areca Palm', 449, 599, '1 plant (10" pot)', IMAGES.arecaPalm),
      p('pl-money', 'Money Plant', 149, 199, '1 plant (4" pot)', IMAGES.plantCare, '25% OFF'),
      p('pl-rubber', 'Rubber Plant', 399, 499, '1 plant (6" pot)', IMAGES.monstera),
      p('pl-zz', 'ZZ Plant', 349, 449, '1 plant (5" pot)', IMAGES.snakePlant, '22% OFF'),
      p('pl-ficus', 'Ficus Lyrata', 799, 999, '1 plant (8" pot)', IMAGES.arecaPalm),
      p('pl-fern', 'Boston Fern', 249, 329, '1 plant (6" pot)', IMAGES.peaceLily),
      p('pl-bamboo', 'Lucky Bamboo', 99, 149, '3 sticks', IMAGES.mindfulMorning, '33% OFF'),
    ],
  },
];

/** Home tab — subcategory chips */
export const HOME_SUB_CHIPS: SubCategoryChip[] = [
  { label: 'Pots & Planters', image: imageUrl('potsPlanters', 'card') },
  { label: 'Home Decor', image: imageUrl('homeDecor', 'card') },
  { label: 'Garden Living', image: IMAGES.balconyGarden },
  { label: 'Cleaning Green', image: IMAGES.ecoProducts },
];

export const HOME_TRUSTED_BRANDS: BrandPill[] = [
  { name: 'Ugaoo' }, { name: 'Cocogarden' }, { name: 'TrustBasket' }, { name: 'Gardenia' },
  { name: 'Eco Organic' }, { name: 'LeafyLand' }, { name: 'GreenSoul' }, { name: 'NurseryLive' },
];

export const HOME_PROMO_CARDS: PromoCard[] = [
  { title: 'Decorate in style', subtitle: 'Pots, planters & more', cta: 'Shop Now', image: IMAGES.mindfulMorning, gradient: 'from-[#2d6a4f] to-primary' },
  { title: 'Balcony gardens', subtitle: 'Setup in a day', cta: 'Shop Now', image: IMAGES.balconyGarden, gradient: 'from-[#40916c] to-[#52b788]' },
  { title: 'Eco cleaning', subtitle: 'Non-toxic home care', cta: 'Shop Now', image: IMAGES.ecoProducts, gradient: 'from-primary to-[#174a31]' },
  { title: 'Live plants', subtitle: 'Delivered fresh', cta: 'Shop Now', image: IMAGES.heroPlants, gradient: 'from-[#1b4332] to-[#2d6a4f]' },
];

export const HOME_GRID_6: GridCategory[] = [
  { label: 'Bed Linen & Covers', image: IMAGES.mindfulMorning },
  { label: 'Cushions & Pillows', image: IMAGES.familySafePlants },
  { label: 'Curtains & Drapes', image: IMAGES.balconyGarden },
  { label: 'Wall Art & Frames', image: IMAGES.heroGarden },
  { label: 'Lighting & Lamps', image: IMAGES.mindfulMorning },
  { label: 'Storage Baskets', image: IMAGES.cocoPeat },
];

export const HOME_GRID_4: GridCategory[] = [
  { label: 'Showpieces', image: IMAGES.vendorBonsai },
  { label: 'Scented Candles', image: IMAGES.mindfulMorning },
  { label: 'Table Lamps', image: IMAGES.plantCare },
  { label: 'Vases', image: IMAGES.peaceLily },
];

export const HOME_LIFESTYLE: GridCategory[] = [
  { label: 'Bath & Shower', image: IMAGES.ecoProducts },
  { label: 'Mats & Carpets', image: IMAGES.balconyGarden },
  { label: 'Garden & Outdoors', image: IMAGES.landscapeDesign },
];

export const HOME_EXPLORE_PRODUCTS: FeedProduct[] = [
  p('ex-1', 'Ceramic Planter Set', 499, 699, '3 pcs', IMAGES.cocoPeat, '29% OFF'),
  p('ex-2', 'Macrame Hanger', 299, 399, '1 pc', IMAGES.mindfulMorning),
  p('ex-3', 'Terracotta Pot Large', 199, 279, '12" pot', IMAGES.cocoPeat, '29% OFF'),
  p('ex-4', 'Bamboo Shelf', 899, 1199, '3 tier', IMAGES.balconyGarden),
  p('ex-5', 'Indoor Fountain', 1299, 1599, '1 pc', IMAGES.landscapeDesign, '19% OFF'),
  p('ex-6', 'Hanging Planter', 249, 329, '1 pc', IMAGES.familySafePlants),
];

/** Zepto Home — brand filter pill rows between grids */
export const HOME_BRAND_FILTER_ROW_1: BrandFilterPill[] = [
  { name: 'Ugaoo', logo: IMAGES.monstera },
  { name: 'Cocogarden', logo: IMAGES.vermicompost },
  { name: 'TrustBasket', logo: IMAGES.cocoPeat },
  { name: 'Gardenia', logo: IMAGES.peaceLily },
  { name: 'Eco Organic', logo: IMAGES.ecoProducts },
  { name: 'NurseryLive', logo: IMAGES.vendorNursery },
];

export const HOME_BRAND_FILTER_ROW_2: BrandFilterPill[] = [
  { name: 'LeafyLand', logo: IMAGES.heroPlants },
  { name: 'GreenSoul', logo: IMAGES.plantCare },
  { name: 'Prestige Garden', logo: IMAGES.gardenTools },
  { name: 'Borosil Planters', logo: IMAGES.cocoPeat },
  { name: 'Milton Grow', logo: IMAGES.pottingSoil },
  { name: 'Hawkins Soil', logo: IMAGES.vermicompost },
];

/** Zepto Home — sub-subcategory icon row (Cleaning, Gardening, Tools) */
export const HOME_SUB_SUB_ICONS: SubCategoryChip[] = [
  { label: 'Cleaning Aids', image: IMAGES.ecoProducts },
  { label: 'Gardening Needs', image: IMAGES.gardenTools },
  { label: 'Tools & DIY', image: IMAGES.pruningShears },
  { label: 'Storage', image: IMAGES.cocoPeat },
  { label: 'Outdoor Living', image: IMAGES.balconyGarden },
  { label: 'Plant Care', image: IMAGES.plantCare },
];

/** Fresh tab — subcategory row */
export const FRESH_SUB_ICONS: SubCategoryChip[] = [
  { label: 'Fruits & Vegetables', image: imageUrl('freshVegetables', 'thumb') },
  { label: 'Dairy & Bread', image: imageUrl('organicFood', 'thumb') },
  { label: 'Atta, Rice & Dals', image: imageUrl('farming', 'thumb') },
  { label: 'Meat & Eggs', image: imageUrl('organicFood', 'thumb') },
  { label: 'Organic', image: imageUrl('farming', 'thumb') },
  { label: 'Herbs', image: imageUrl('herbsLeafy', 'thumb') },
];

/** Plants tab */
export const PLANTS_SUB_ICONS: SubCategoryChip[] = [
  { label: 'Indoor Plants', image: IMAGES.monstera },
  { label: 'Outdoor Plants', image: IMAGES.balconyGarden },
  { label: 'Succulents', image: IMAGES.familySafePlants },
  { label: 'Flowers', image: IMAGES.peaceLily },
  { label: 'Bonsai', image: IMAGES.vendorBonsai },
  { label: 'Seeds', image: IMAGES.seeds },
];

export const PLANTS_GRID: GridCategory[] = [
  { label: 'Air Purifying', image: IMAGES.peaceLily },
  { label: 'Low Light', image: IMAGES.snakePlant },
  { label: 'Pet Safe', image: IMAGES.familySafePlants },
  { label: 'Large Plants', image: IMAGES.arecaPalm },
  { label: 'Desk Plants', image: IMAGES.plantCare },
  { label: 'Hanging', image: IMAGES.mindfulMorning },
];

/** Garden tab */
export const GARDEN_SUB_ICONS: SubCategoryChip[] = [
  { label: 'Garden Tools', image: IMAGES.gardenTools },
  { label: 'Irrigation', image: IMAGES.dripInstall },
  { label: 'Soil & Compost', image: IMAGES.vermicompost },
  { label: 'Lawn Care', image: IMAGES.gardenMaintenance },
  { label: 'Outdoor Plants', image: IMAGES.balconyGarden },
  { label: 'Seeds & Bulbs', image: IMAGES.seeds },
];

export const GARDEN_PROMO_CARDS: PromoCard[] = [
  { title: 'Monsoon ready', subtitle: 'Drainage & covers', cta: 'Shop Now', image: IMAGES.gardenHose, gradient: 'from-primary to-[#2d6a4f]' },
  { title: 'Drip irrigation', subtitle: 'Save water daily', cta: 'Shop Now', image: IMAGES.dripInstall, gradient: 'from-[#40916c] to-[#52b788]' },
  { title: 'Lawn essentials', subtitle: 'Mowers & trimmers', cta: 'Shop Now', image: IMAGES.lawnMowing, gradient: 'from-[#1b4332] to-primary' },
  { title: 'Outdoor decor', subtitle: 'Lights & planters', cta: 'Shop Now', image: IMAGES.landscapeDesign, gradient: 'from-[#2d6a4f] to-[#74c69d]' },
];

export const GARDEN_GRID: GridCategory[] = [
  { label: 'Pruning Tools', image: IMAGES.pruningShears },
  { label: 'Hoses & Pipes', image: IMAGES.gardenHose },
  { label: 'Sprinklers', image: IMAGES.sprinkler },
  { label: 'Drip Kits', image: IMAGES.dripInstall },
  { label: 'Compost Bins', image: IMAGES.vermicompost },
  { label: 'Garden Gloves', image: IMAGES.gardenTools },
];

export const GARDEN_BRAND_FILTERS: BrandFilterPill[] = [
  { name: 'Fiskars', logo: IMAGES.pruningShears },
  { name: 'Rain Bird', logo: IMAGES.sprinkler },
  { name: 'Cocogarden', logo: IMAGES.vermicompost },
  { name: 'TrustBasket', logo: IMAGES.cocoPeat },
  { name: 'Gardena', logo: IMAGES.gardenHose },
  { name: 'Ugaoo', logo: IMAGES.seeds },
];

export const GARDEN_SHELVES: FeedShelf[] = [
  ALL_TAB_SHELVES.find((s) => s.id === 'garden-tools')!,
  {
    id: 'garden-irrigation',
    title: 'Irrigation & Watering',
    products: [
      p('gi-hose', 'Expandable Hose 15m', 499, 699, '15 metre', IMAGES.gardenHose, '29% OFF'),
      p('gi-drip', 'Drip Kit 25 Plants', 599, 799, '1 kit', IMAGES.dripInstall),
      p('gi-sprink', 'Oscillating Sprinkler', 349, 449, '1 pc', IMAGES.sprinkler, '22% OFF'),
      p('gi-timer', 'Water Timer Auto', 799, 999, '1 pc', IMAGES.dripInstall),
      p('gi-can', 'Watering Can 10L', 449, 549, '1 pc', IMAGES.gardenHose),
      p('gi-mister', 'Plant Mister', 199, 249, '500 ml', IMAGES.plantCare),
    ],
  },
  {
    id: 'garden-outdoor',
    title: 'Outdoor & Lawn',
    products: [
      p('go-mower', 'Electric Lawn Mower', 4999, 5999, '1 pc', IMAGES.lawnMowing, '17% OFF'),
      p('go-trimmer', 'Grass Trimmer', 2499, 2999, '1 pc', IMAGES.gardenMaintenance),
      p('go-rake', 'Leaf Rake Steel', 399, 499, '1 pc', IMAGES.gardenTools),
      p('go-mulch', 'Mulch 10kg', 199, 279, '10 kg bag', IMAGES.pottingSoil, '29% OFF'),
      p('go-trellis', 'Garden Trellis', 599, 749, '1.8 m', IMAGES.balconyGarden),
      p('go-net', 'Shade Net 50%', 349, 449, '3 x 2 m', IMAGES.landscapeDesign),
    ],
  },
];

/** Eco tab */
export const ECO_SUB_ICONS: SubCategoryChip[] = [
  { label: 'Composting', image: IMAGES.vermicompost },
  { label: 'Organic Food', image: IMAGES.organicFood },
  { label: 'Eco Cleaning', image: IMAGES.ecoProducts },
  { label: 'Recycled Pots', image: IMAGES.cocoPeat },
  { label: 'Zero Waste', image: IMAGES.farming },
  { label: 'Natural Care', image: IMAGES.ayurveda },
];

export const ECO_PROMO_CARDS: PromoCard[] = [
  { title: 'Compost at home', subtitle: 'Bins & starters', cta: 'Shop Now', image: IMAGES.vermicompost, gradient: 'from-primary to-[#2d6a4f]' },
  { title: 'Organic harvest', subtitle: 'Farm to door', cta: 'Shop Now', image: IMAGES.organicFood, gradient: 'from-[#40916c] to-[#52b788]' },
  { title: 'Plastic-free', subtitle: 'Reusable essentials', cta: 'Shop Now', image: IMAGES.ecoProducts, gradient: 'from-[#1b4332] to-primary' },
  { title: 'Natural living', subtitle: 'Ayurveda & herbs', cta: 'Shop Now', image: IMAGES.ayurveda, gradient: 'from-[#2d6a4f] to-[#74c69d]' },
];

export const ECO_GRID: GridCategory[] = [
  { label: 'Vermicompost', image: IMAGES.vermicompost },
  { label: 'Organic Veggies', image: IMAGES.organicFood },
  { label: 'Eco Cleaners', image: IMAGES.ecoProducts },
  { label: 'Coco Coir', image: IMAGES.cocoPeat },
  { label: 'Seed Balls', image: IMAGES.seeds },
  { label: 'Herbal Care', image: IMAGES.ayurveda },
];

export const ECO_BRAND_FILTERS: BrandFilterPill[] = [
  { name: 'Eco Organic', logo: IMAGES.ecoProducts },
  { name: 'Earth Rhythm', logo: IMAGES.ayurveda },
  { name: 'Bare Necessities', logo: IMAGES.vermicompost },
  { name: 'Organic India', logo: IMAGES.farming },
  { name: 'LeafyLand', logo: IMAGES.heroPlants },
  { name: 'GreenSoul', logo: IMAGES.plantCare },
];

export const ECO_SHELVES: FeedShelf[] = [
  ALL_TAB_SHELVES.find((s) => s.id === 'soil-compost')!,
  {
    id: 'eco-cleaning',
    title: 'Eco Home Cleaning',
    products: [
      p('ec-dish', 'Dish Wash Bar', 89, 120, '1 bar', IMAGES.ecoProducts, '26% OFF'),
      p('ec-floor', 'Floor Cleaner', 149, 199, '1 L', IMAGES.ecoProducts),
      p('ec-laundry', 'Laundry Powder', 199, 259, '1 kg', IMAGES.ecoProducts, '23% OFF'),
      p('ec-sponge', 'Coconut Scrub', 79, 99, '3 pcs', IMAGES.cocoPeat),
      p('ec-bottle', 'Glass Spray Bottle', 249, 329, '500 ml', IMAGES.mindfulMorning),
      p('ec-bags', 'Compostable Bags', 129, 169, '30 pcs', IMAGES.ecoProducts),
    ],
  },
];

/** Decor tab */
export const DECOR_SUB_ICONS: SubCategoryChip[] = [
  { label: 'Wall Art', image: IMAGES.mindfulMorning },
  { label: 'Candles', image: IMAGES.mindfulMorning },
  { label: 'Lamps', image: IMAGES.plantCare },
  { label: 'Vases', image: IMAGES.peaceLily },
  { label: 'Planters', image: IMAGES.cocoPeat },
  { label: 'Macrame', image: IMAGES.familySafePlants },
];

export const DECOR_PROMO_CARDS: PromoCard[] = [
  { title: 'Cozy corners', subtitle: 'Candles & lamps', cta: 'Shop Now', image: IMAGES.mindfulMorning, gradient: 'from-[#2d6a4f] to-primary' },
  { title: 'Green walls', subtitle: 'Vertical gardens', cta: 'Shop Now', image: IMAGES.balconyGarden, gradient: 'from-[#40916c] to-[#52b788]' },
  { title: 'Table styling', subtitle: 'Vases & bowls', cta: 'Shop Now', image: IMAGES.vendorBonsai, gradient: 'from-primary to-[#174a31]' },
  { title: 'Boho vibes', subtitle: 'Macrame & hangers', cta: 'Shop Now', image: IMAGES.familySafePlants, gradient: 'from-[#1b4332] to-[#2d6a4f]' },
];

export const DECOR_GRID_6: GridCategory[] = [
  { label: 'Showpieces', image: IMAGES.vendorBonsai },
  { label: 'Scented Candles', image: IMAGES.mindfulMorning },
  { label: 'Table Lamps', image: IMAGES.plantCare },
  { label: 'Vases', image: IMAGES.peaceLily },
  { label: 'Wall Frames', image: IMAGES.heroGarden },
  { label: 'Hanging Decor', image: IMAGES.familySafePlants },
];

export const DECOR_GRID_4: GridCategory[] = [
  { label: 'Ceramic Pots', image: IMAGES.cocoPeat },
  { label: 'Bamboo Accents', image: IMAGES.balconyGarden },
  { label: 'Fairy Lights', image: IMAGES.mindfulMorning },
  { label: 'Mirrors', image: IMAGES.realEstate },
];

export const DECOR_LIFESTYLE: GridCategory[] = [
  { label: 'Living Room', image: IMAGES.mindfulMorning },
  { label: 'Bedroom', image: IMAGES.familySafePlants },
  { label: 'Balcony', image: IMAGES.balconyGarden },
];

export const DECOR_BRAND_FILTERS: BrandFilterPill[] = [
  { name: 'Chumbak', logo: IMAGES.vendorBonsai },
  { name: 'Home Centre', logo: IMAGES.mindfulMorning },
  { name: 'West Elm', logo: IMAGES.plantCare },
  { name: 'Ugaoo', logo: IMAGES.cocoPeat },
  { name: 'LeafyLand', logo: IMAGES.heroPlants },
  { name: 'FabIndia', logo: IMAGES.familySafePlants },
];

export const DECOR_EXPLORE_PRODUCTS: FeedProduct[] = [
  p('dc-1', 'Brass Planter', 699, 899, '1 pc', IMAGES.cocoPeat, '22% OFF'),
  p('dc-2', 'Scented Soy Candle', 349, 449, '200 g', IMAGES.mindfulMorning),
  p('dc-3', 'Rattan Basket Set', 599, 799, '2 pcs', IMAGES.balconyGarden),
  p('dc-4', 'Ceramic Vase White', 449, 549, '1 pc', IMAGES.peaceLily),
  p('dc-5', 'Macrame Wall Hanging', 799, 999, '1 pc', IMAGES.familySafePlants, '20% OFF'),
  p('dc-6', 'Terrarium Kit', 999, 1299, '1 kit', IMAGES.vendorBonsai),
];

/** Beauty tab — plant-based & natural */
export const BEAUTY_SUB_ICONS: SubCategoryChip[] = [
  { label: 'Face Care', image: IMAGES.ayurveda },
  { label: 'Hair Care', image: IMAGES.plantCare },
  { label: 'Body Care', image: IMAGES.ecoProducts },
  { label: 'Essential Oils', image: IMAGES.farming },
  { label: 'Bath & Shower', image: IMAGES.ecoProducts },
  { label: 'Ayurveda', image: IMAGES.ayurveda },
];

export const BEAUTY_GRID: GridCategory[] = [
  { label: 'Aloe Vera', image: IMAGES.plantCare },
  { label: 'Neem Care', image: IMAGES.ayurveda },
  { label: 'Rose Water', image: IMAGES.peaceLily },
  { label: 'Coconut Oil', image: IMAGES.organicFood },
  { label: 'Herbal Soaps', image: IMAGES.ecoProducts },
  { label: 'Essential Oils', image: IMAGES.farming },
];

export const BEAUTY_BRAND_FILTERS: BrandFilterPill[] = [
  { name: 'Forest Essentials', logo: IMAGES.ayurveda },
  { name: 'Kama Ayurveda', logo: IMAGES.ayurveda },
  { name: 'Biotique', logo: IMAGES.plantCare },
  { name: 'Mamaearth', logo: IMAGES.ecoProducts },
  { name: 'SoulTree', logo: IMAGES.farming },
  { name: 'LeafyLand', logo: IMAGES.heroPlants },
];

export const BEAUTY_SHELVES: FeedShelf[] = [
  {
    id: 'beauty-face',
    title: 'Plant-Based Face Care',
    products: [
      p('bf-aloe', 'Aloe Vera Gel', 199, 279, '100 ml', IMAGES.plantCare, '29% OFF'),
      p('bf-rose', 'Rose Water Toner', 249, 329, '200 ml', IMAGES.peaceLily),
      p('bf-vit-c', 'Vitamin C Serum', 499, 649, '30 ml', IMAGES.ayurveda, '23% OFF'),
      p('bf-moist', 'Neem Moisturizer', 349, 449, '50 ml', IMAGES.ayurveda),
      p('bf-scrub', 'Coffee Face Scrub', 299, 399, '100 g', IMAGES.organicFood),
      p('bf-sun', 'Herbal Sunscreen', 449, 549, '50 ml', IMAGES.ecoProducts, '18% OFF'),
    ],
  },
  {
    id: 'beauty-hair',
    title: 'Natural Hair Care',
    products: [
      p('bh-oil', 'Bhringraj Hair Oil', 299, 399, '200 ml', IMAGES.ayurveda, '25% OFF'),
      p('bh-shampoo', 'Amla Shampoo', 249, 329, '300 ml', IMAGES.plantCare),
      p('bh-conditioner', 'Hibiscus Conditioner', 279, 359, '250 ml', IMAGES.peaceLily),
      p('bh-mask', 'Coconut Hair Mask', 349, 449, '200 g', IMAGES.organicFood),
      p('bh-serum', 'Argan Hair Serum', 399, 499, '50 ml', IMAGES.ayurveda, '20% OFF'),
      p('bh-comb', 'Neem Wood Comb', 149, 199, '1 pc', IMAGES.ecoProducts),
    ],
  },
  {
    id: 'beauty-body',
    title: 'Body & Bath',
    products: [
      p('bb-soap', 'Charcoal Soap Bar', 99, 129, '1 bar', IMAGES.ecoProducts, '23% OFF'),
      p('bb-lotion', 'Shea Body Lotion', 399, 499, '200 ml', IMAGES.ayurveda),
      p('bb-scrub', 'Sugar Body Scrub', 349, 449, '250 g', IMAGES.organicFood),
      p('bb-oil', 'Lavender Body Oil', 449, 549, '100 ml', IMAGES.farming, '18% OFF'),
      p('bb-wash', 'Tea Tree Body Wash', 299, 379, '250 ml', IMAGES.plantCare),
      p('bb-balm', 'Foot Repair Balm', 199, 259, '50 g', IMAGES.ayurveda),
    ],
  },
];
