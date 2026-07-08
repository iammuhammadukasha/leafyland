import { IMAGES, imageUrl } from './images';

export type FeedProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  comparePrice?: number;
  unit: string;
  image: string;
  badge?: string;
  rating?: number;
  reviews?: string;
  deliveryMins?: number;
};

export type FeedShelf = {
  id: string;
  title: string;
  seeAll?: string;
  products: FeedProduct[];
};

export type CategoryTab = {
  slug: string;
  label: string;
  icon: string;
  color: string;
};

/** Top category ribbon — LeafyLand categories (no cafe / electronics / mobiles) */
export const ZEPTO_CATEGORY_TABS: CategoryTab[] = [
  { slug: 'all', label: 'All', icon: 'apps', color: '#1e5439' },
  { slug: 'home', label: 'Home', icon: 'home', color: '#2d6a4f' },
  { slug: 'fresh', label: 'Fresh', icon: 'eco', color: '#40916c' },
  { slug: 'plants', label: 'Plants', icon: 'local_florist', color: '#1e5439' },
  { slug: 'garden', label: 'Garden', icon: 'park', color: '#52b788' },
  { slug: 'eco', label: 'Eco', icon: 'eco', color: '#74c69d' },
  { slug: 'decor', label: 'Decor', icon: 'home', color: '#95d5b2' },
  { slug: 'beauty', label: 'Beauty', icon: 'leaf', color: '#b7e4c7' },
];

export const ZEPTO_HERO_BANNERS = [
  {
    id: 'stone-fruits',
    title: 'The world of',
    highlight: 'stone fruits',
    offer: 'Upto 30% Off',
    gradient: 'from-[#8B2942] via-[#A63D5C] to-[#C45C7A]',
    image: imageUrl('freshFruits', 'banner'),
  },
  {
    id: 'indoor-greens',
    title: 'Bring home',
    highlight: 'indoor greens',
    offer: 'From ₹99',
    gradient: 'from-primary via-[#2d6a4f] to-[#40916c]',
    image: IMAGES.heroPlants,
  },
];

export const ZEPTO_SHOP_BY_CATEGORY = [
  { label: 'Fresh Veggies', icon: 'eco', image: imageUrl('freshVegetables', 'thumb') },
  { label: 'Leafy & Herbs', icon: 'grass', image: imageUrl('herbsLeafy', 'thumb') },
  { label: 'Berries', icon: 'eco', image: imageUrl('freshFruits', 'thumb') },
  { label: 'Citrus', icon: 'solar_power', image: imageUrl('freshFruits', 'thumb') },
  { label: 'Indoor Plants', icon: 'local_florist', image: imageUrl('monstera', 'thumb') },
  { label: 'Succulents', icon: 'plant', image: imageUrl('succulents', 'thumb') },
  { label: 'Soil & Compost', icon: 'compost', image: imageUrl('vermicompost', 'thumb') },
  { label: 'Garden Tools', icon: 'hardware', image: imageUrl('gardenTools', 'thumb') },
];

const FRUIT_IMG = imageUrl('freshFruits', 'card');
const VEG_IMG = imageUrl('freshVegetables', 'card');
const HERB_IMG = imageUrl('herbsLeafy', 'card');
const MIX_IMG = imageUrl('organicFood', 'card');

function p(
  id: string,
  name: string,
  price: number,
  comparePrice: number,
  unit: string,
  image: string,
  badge?: string,
): FeedProduct {
  return {
    id,
    slug: id,
    name,
    price,
    comparePrice,
    unit,
    image,
    badge,
  };
}

/** Zepto-style homepage shelves — same section titles & product density */
export const ZEPTO_FEED_SHELVES: FeedShelf[] = [
  {
    id: 'mangoes-melons',
    title: 'Mangoes & Melons',
    products: [
      p('mango-alphonso', 'Alphonso Mango', 89, 120, '1 pc (300 g)', FRUIT_IMG, '26% OFF'),
      p('mango-kesar', 'Kesar Mango', 79, 99, '1 pc (250 g)', FRUIT_IMG),
      p('mango-banganapalli', 'Banganapalli Mango', 69, 89, '1 pc (280 g)', FRUIT_IMG),
      p('watermelon', 'Watermelon', 49, 65, '1 pc (2 kg)', FRUIT_IMG, '25% OFF'),
      p('muskmelon', 'Muskmelon', 45, 55, '1 pc (1 kg)', FRUIT_IMG),
      p('honeydew', 'Honeydew Melon', 89, 110, '1 pc (1.2 kg)', FRUIT_IMG),
      p('mango-totapuri', 'Totapuri Mango', 55, 70, '1 pc (300 g)', FRUIT_IMG),
      p('mango-malgova', 'Malgova Mango', 99, 129, '1 pc (350 g)', FRUIT_IMG, '23% OFF'),
      p('cantaloupe', 'Cantaloupe', 75, 95, '1 pc (900 g)', FRUIT_IMG),
      p('mango-pairi', 'Pairi Mango', 65, 85, '1 pc (280 g)', FRUIT_IMG),
    ],
  },
  {
    id: 'low-prices-basics',
    title: 'Low Prices on Basics',
    products: [
      p('potato', 'Potato', 28, 40, '1 kg', VEG_IMG),
      p('onion', 'Onion', 32, 45, '1 kg', VEG_IMG, '29% OFF'),
      p('tomato', 'Tomato', 35, 50, '1 kg', VEG_IMG),
      p('banana', 'Banana', 48, 60, '1 dozen', FRUIT_IMG),
      p('apple', 'Apple Shimla', 120, 150, '1 kg', FRUIT_IMG, '20% OFF'),
      p('lemon', 'Lemon', 25, 35, '250 g', FRUIT_IMG),
      p('ginger', 'Ginger', 40, 55, '250 g', VEG_IMG),
      p('garlic', 'Garlic', 55, 70, '250 g', VEG_IMG),
      p('coconut', 'Fresh Coconut', 45, 60, '1 pc', FRUIT_IMG),
      p('eggs', 'Farm Fresh Eggs', 72, 90, '6 pcs', MIX_IMG, '20% OFF'),
    ],
  },
  {
    id: 'fresh-arrivals',
    title: 'Fresh Arrivals',
    products: [
      p('avocado', 'Avocado', 89, 120, '1 pc', FRUIT_IMG, '26% OFF'),
      p('dragon-fruit', 'Dragon Fruit', 99, 140, '1 pc', FRUIT_IMG),
      p('kiwi', 'Kiwi Green', 79, 99, '3 pcs', FRUIT_IMG),
      p('blueberry', 'Blueberry', 199, 249, '125 g', FRUIT_IMG, '20% OFF'),
      p('cherry', 'Cherry', 249, 299, '200 g', FRUIT_IMG),
      p('strawberry', 'Strawberry', 89, 119, '200 g', FRUIT_IMG, '25% OFF'),
      p('papaya', 'Papaya', 55, 70, '1 pc (800 g)', FRUIT_IMG),
      p('pomegranate', 'Pomegranate', 99, 130, '2 pcs', FRUIT_IMG),
      p('guava', 'Guava', 45, 60, '500 g', FRUIT_IMG),
      p('pear', 'Pear', 110, 140, '4 pcs', FRUIT_IMG, '21% OFF'),
    ],
  },
  {
    id: 'fresh-vegetables',
    title: 'Fresh Vegetables',
    products: [
      p('cauliflower', 'Cauliflower', 35, 50, '1 pc', VEG_IMG),
      p('broccoli', 'Broccoli', 55, 75, '1 pc (250 g)', VEG_IMG, '27% OFF'),
      p('capsicum', 'Capsicum Green', 40, 55, '500 g', VEG_IMG),
      p('carrot', 'Carrot', 38, 50, '500 g', VEG_IMG),
      p('beans', 'French Beans', 45, 60, '500 g', VEG_IMG),
      p('cabbage', 'Cabbage', 28, 40, '1 pc (500 g)', VEG_IMG, '30% OFF'),
      p('brinjal', 'Brinjal', 32, 45, '500 g', VEG_IMG),
      p('okra', 'Okra', 35, 48, '500 g', VEG_IMG),
      p('beetroot', 'Beetroot', 30, 42, '500 g', VEG_IMG),
      p('cucumber', 'Cucumber', 25, 35, '500 g', VEG_IMG),
    ],
  },
  {
    id: 'fresh-fruits',
    title: 'Fresh Fruits',
    products: [
      p('banana-yelakki', 'Yelakki Banana', 55, 70, '1 dozen', FRUIT_IMG),
      p('orange', 'Orange Nagpur', 65, 85, '1 kg', FRUIT_IMG, '24% OFF'),
      p('grapes', 'Grapes Green', 89, 110, '500 g', FRUIT_IMG),
      p('pineapple', 'Pineapple', 59, 79, '1 pc', FRUIT_IMG),
      p('mango-raw', 'Raw Mango', 45, 60, '500 g', FRUIT_IMG),
      p('watermelon-slice', 'Watermelon Slices', 39, 55, '500 g', FRUIT_IMG, '29% OFF'),
      p('sapota', 'Sapota', 55, 70, '500 g', FRUIT_IMG),
      p('custard-apple', 'Custard Apple', 99, 130, '500 g', FRUIT_IMG),
      p('jackfruit', 'Jackfruit', 75, 95, '500 g', FRUIT_IMG),
      p('litchi', 'Litchi', 89, 115, '500 g', FRUIT_IMG, '23% OFF'),
    ],
  },
  {
    id: 'leafy-herbs',
    title: 'Leafy, Herbs & Seasonings',
    products: [
      p('spinach', 'Spinach', 25, 35, '250 g', HERB_IMG),
      p('coriander', 'Coriander', 15, 22, '100 g', HERB_IMG),
      p('mint', 'Mint Leaves', 18, 25, '100 g', HERB_IMG, '28% OFF'),
      p('methi', 'Methi', 20, 28, '250 g', HERB_IMG),
      p('curry-leaves', 'Curry Leaves', 12, 18, '50 g', HERB_IMG),
      p('lettuce', 'Lettuce Green', 45, 60, '1 pc', HERB_IMG),
      p('basil', 'Basil', 35, 48, '50 g', HERB_IMG),
      p('dill', 'Dill Leaves', 22, 30, '100 g', HERB_IMG),
      p('spring-onion', 'Spring Onion', 18, 25, '250 g', HERB_IMG, '28% OFF'),
      p('parsley', 'Parsley', 40, 55, '50 g', HERB_IMG),
    ],
  },
  {
    id: 'exotics-premium',
    title: 'Exotics & Premium',
    products: [
      p('avocado-hass', 'Hass Avocado', 129, 169, '1 pc', FRUIT_IMG, '24% OFF'),
      p('blueberry-premium', 'Premium Blueberry', 249, 299, '125 g', FRUIT_IMG),
      p('asparagus', 'Asparagus', 199, 249, '250 g', VEG_IMG),
      p('zucchini', 'Zucchini', 65, 85, '500 g', VEG_IMG),
      p('bell-pepper-red', 'Red Bell Pepper', 89, 115, '2 pcs', VEG_IMG, '23% OFF'),
      p('cherry-tomato', 'Cherry Tomato', 75, 99, '250 g', VEG_IMG),
      p('lettuce-romaine', 'Romaine Lettuce', 55, 75, '1 pc', HERB_IMG),
      p('broccoli-premium', 'Broccoli Premium', 69, 89, '1 pc', VEG_IMG),
      p('kiwi-gold', 'Gold Kiwi', 149, 189, '3 pcs', FRUIT_IMG, '21% OFF'),
      p('mushroom', 'Button Mushroom', 59, 79, '200 g', VEG_IMG),
    ],
  },
  {
    id: 'plants-flowers',
    title: 'Plants & Flowers',
    products: [
      p('peace-lily', 'Peace Lily', 299, 399, '1 plant (6" pot)', IMAGES.peaceLily, '25% OFF'),
      p('snake-plant', 'Snake Plant', 199, 299, '1 plant (5" pot)', IMAGES.snakePlant),
      p('monstera', 'Monstera Deliciosa', 599, 799, '1 plant (8" pot)', IMAGES.monstera, '25% OFF'),
      p('areca-palm', 'Areca Palm', 449, 599, '1 plant (10" pot)', IMAGES.arecaPalm),
      p('money-plant', 'Money Plant', 149, 199, '1 plant (4" pot)', IMAGES.plantCare),
      p('rose-bunch', 'Rose Bunch Red', 199, 249, '10 stems', IMAGES.journalAirPurifying, '20% OFF'),
      p('orchid', 'Orchid Pink', 349, 449, '1 plant', IMAGES.peaceLily),
      p('succulent-set', 'Succulent Set', 249, 329, '3 plants', IMAGES.familySafePlants, '24% OFF'),
      p('marigold', 'Marigold Plant', 79, 99, '1 plant', IMAGES.seeds),
      p('jasmine', 'Jasmine Plant', 129, 169, '1 plant', IMAGES.mindfulMorning),
    ],
  },
];

export const ZEPTO_HOW_IT_WORKS = [
  {
    title: 'Open the app',
    desc: 'Choose from 7000+ plants, fresh produce, garden & home products',
    icon: 'grid_view',
  },
  {
    title: 'Place an order',
    desc: 'Add favourites to cart & avail the best offers',
    icon: 'shopping_bag',
  },
  {
    title: 'Get free delivery',
    desc: 'Lightning-fast delivery straight to your door',
    icon: 'delivery',
  },
] as const;
