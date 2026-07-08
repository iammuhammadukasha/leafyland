/**
 * Starter catalog — 11 product categories × 5 real products each (55 total).
 * Each category maps 1:1 to a real DB parent category (see seed-supabase.ts).
 * Images use verified Pexels IDs; replace with exact product photos from the
 * admin panel as real inventory is added.
 */
const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=512&fit=crop`;

export type CatalogRow = {
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  stock: number;
  unit: string;
  category: string; // display name of the parent category
  categorySlug: string; // slug of the parent category
  imageUrl: string;
};

export const CATALOG_PRODUCTS: CatalogRow[] = [
  // ——— Plants ———
  { name: 'Peace Lily', description: 'Air-purifying Spathiphyllum with elegant white blooms.', price: 299, comparePrice: 399, stock: 45, unit: '1 plant (6" pot)', category: 'Plants', categorySlug: 'plants', imageUrl: px(12454551) },
  { name: 'Snake Plant', description: 'Sansevieria — thrives in low light, minimal care.', price: 199, comparePrice: 299, stock: 60, unit: '1 plant (5" pot)', category: 'Plants', categorySlug: 'plants', imageUrl: px(3127110) },
  { name: 'Money Plant', description: 'Golden Pothos — easy trailing vine for shelves.', price: 149, comparePrice: 199, stock: 80, unit: '1 plant (4" pot)', category: 'Plants', categorySlug: 'plants', imageUrl: px(4503261) },
  { name: 'ZZ Plant', description: 'Zamioculcas — glossy drought-tolerant indoor plant.', price: 349, comparePrice: 499, stock: 50, unit: '1 plant (6" pot)', category: 'Plants', categorySlug: 'plants', imageUrl: px(6597437) },
  { name: 'Areca Palm', description: 'Bushy air-purifying palm for living rooms & balconies.', price: 449, comparePrice: 649, stock: 40, unit: '1 plant (8" pot)', category: 'Plants', categorySlug: 'plants', imageUrl: px(2123482) },

  // ——— Seeds & Bulbs ———
  { name: 'Tomato Seeds', description: 'High-yield hybrid tomato seeds for kitchen gardens.', price: 49, comparePrice: 79, stock: 200, unit: '50 seeds', category: 'Seeds & Bulbs', categorySlug: 'seeds-bulbs', imageUrl: px(1105019) },
  { name: 'Marigold Flower Seeds', description: 'Bright orange marigold — pest-repellent bloomer.', price: 39, comparePrice: 59, stock: 180, unit: '100 seeds', category: 'Seeds & Bulbs', categorySlug: 'seeds-bulbs', imageUrl: px(1105019) },
  { name: 'Coriander Herb Seeds', description: 'Fast-germinating dhania seeds for fresh herbs.', price: 29, comparePrice: 45, stock: 220, unit: '100 g', category: 'Seeds & Bulbs', categorySlug: 'seeds-bulbs', imageUrl: px(1139359) },
  { name: 'Green Chilli Seeds', description: 'Hybrid chilli seeds — heavy fruiting for pots.', price: 45, comparePrice: 69, stock: 190, unit: '50 seeds', category: 'Seeds & Bulbs', categorySlug: 'seeds-bulbs', imageUrl: px(1400172) },
  { name: 'Spinach (Palak) Seeds', description: 'Fast-growing leafy spinach for kitchen gardens.', price: 35, comparePrice: 55, stock: 210, unit: '100 g', category: 'Seeds & Bulbs', categorySlug: 'seeds-bulbs', imageUrl: px(2325843) },

  // ——— Soil & Fertilizers ———
  { name: 'Vermicompost 5kg', description: 'Organic worm compost — enriches soil naturally.', price: 149, comparePrice: 249, stock: 100, unit: '5 kg bag', category: 'Soil & Fertilizers', categorySlug: 'soil-fertilizers', imageUrl: px(28918862) },
  { name: 'Potting Mix Premium', description: 'Ready-to-use mix with perlite, coco peat & compost.', price: 249, comparePrice: 349, stock: 80, unit: '10 kg bag', category: 'Soil & Fertilizers', categorySlug: 'soil-fertilizers', imageUrl: px(4751990) },
  { name: 'NPK Fertilizer 19-19-19', description: 'Balanced water-soluble plant food for all plants.', price: 199, comparePrice: 279, stock: 90, unit: '1 kg pack', category: 'Soil & Fertilizers', categorySlug: 'soil-fertilizers', imageUrl: px(5067480) },
  { name: 'Cocopeat Block 5kg', description: 'Expanding coco coir block — light growing medium.', price: 179, comparePrice: 259, stock: 95, unit: '5 kg block', category: 'Soil & Fertilizers', categorySlug: 'soil-fertilizers', imageUrl: px(4750270) },
  { name: 'Bone Meal Fertilizer 1kg', description: 'Slow-release phosphorus for flowering & rooting.', price: 129, comparePrice: 199, stock: 110, unit: '1 kg pack', category: 'Soil & Fertilizers', categorySlug: 'soil-fertilizers', imageUrl: px(28918862) },

  // ——— Garden Tools ———
  { name: 'Pruning Shears Pro', description: 'Carbon steel bypass pruners with safety lock.', price: 349, comparePrice: 499, stock: 50, unit: '1 pc', category: 'Garden Tools', categorySlug: 'garden-tools', imageUrl: px(4975358) },
  { name: 'Garden Trowel Set', description: 'Stainless trowel, fork & transplanter set.', price: 299, comparePrice: 399, stock: 55, unit: '3 pcs', category: 'Garden Tools', categorySlug: 'garden-tools', imageUrl: px(16680725) },
  { name: 'Watering Can 5L', description: 'Galvanized watering can with detachable rose head.', price: 399, comparePrice: 499, stock: 40, unit: '1 pc', category: 'Garden Tools', categorySlug: 'garden-tools', imageUrl: px(13688386) },
  { name: 'Hand Cultivator', description: 'Sturdy 3-prong cultivator for loosening soil.', price: 179, comparePrice: 249, stock: 65, unit: '1 pc', category: 'Garden Tools', categorySlug: 'garden-tools', imageUrl: px(2286921) },
  { name: 'Pressure Spray Bottle 1L', description: 'Handheld pump sprayer for water & pesticides.', price: 249, comparePrice: 349, stock: 60, unit: '1 pc', category: 'Garden Tools', categorySlug: 'garden-tools', imageUrl: px(4750274) },

  // ——— Solar & Renewable ———
  { name: 'Solar Garden Light Set', description: 'Stake-mounted solar LED path lights — dusk to dawn.', price: 599, comparePrice: 799, stock: 40, unit: '4 pcs', category: 'Solar & Renewable', categorySlug: 'solar-renewable', imageUrl: px(2879824) },
  { name: 'Solar Pathway Lantern', description: 'Decorative solar lantern for patios & walkways.', price: 449, comparePrice: 649, stock: 35, unit: '2 pcs', category: 'Solar & Renewable', categorySlug: 'solar-renewable', imageUrl: px(2123766) },
  { name: 'Solar Water Pump Kit', description: 'Solar-powered pump for fountains & drip irrigation.', price: 1299, comparePrice: 1699, stock: 18, unit: '1 kit', category: 'Solar & Renewable', categorySlug: 'solar-renewable', imageUrl: px(35634634) },
  { name: 'Solar Wall Light 100W', description: 'Motion-sensor solar flood light for outdoor walls.', price: 899, comparePrice: 1299, stock: 30, unit: '1 pc', category: 'Solar & Renewable', categorySlug: 'solar-renewable', imageUrl: px(9799725) },
  { name: 'Solar Panel 20W', description: 'Portable poly solar panel for small setups.', price: 1499, comparePrice: 1999, stock: 22, unit: '1 pc', category: 'Solar & Renewable', categorySlug: 'solar-renewable', imageUrl: px(9875441) },

  // ——— Eco Products ———
  { name: 'Bamboo Toothbrush Set', description: 'Biodegradable bamboo toothbrushes — pack of 4.', price: 199, comparePrice: 279, stock: 100, unit: '4 pcs', category: 'Eco Products', categorySlug: 'eco-products', imageUrl: px(4207903) },
  { name: 'Jute Grocery Bags', description: 'Reusable organic jute & cotton produce bags.', price: 249, comparePrice: 329, stock: 80, unit: '5 pcs', category: 'Eco Products', categorySlug: 'eco-products', imageUrl: px(4207903) },
  { name: 'Home Compost Bin', description: 'Aerated kitchen composter with easy-empty tap.', price: 899, comparePrice: 1199, stock: 25, unit: '1 pc', category: 'Eco Products', categorySlug: 'eco-products', imageUrl: px(31416070) },
  { name: 'Stainless Steel Straw Set', description: 'Reusable steel straws with cleaning brush & pouch.', price: 149, comparePrice: 229, stock: 120, unit: '4 pcs', category: 'Eco Products', categorySlug: 'eco-products', imageUrl: px(4239013) },
  { name: 'Beeswax Food Wraps', description: 'Reusable beeswax wraps — plastic-free food storage.', price: 349, comparePrice: 499, stock: 70, unit: '3 pcs', category: 'Eco Products', categorySlug: 'eco-products', imageUrl: px(4239130) },

  // ——— Electrical & Lighting ———
  { name: 'LED String Lights 10m', description: 'Warm-white copper wire fairy lights for décor.', price: 249, comparePrice: 329, stock: 60, unit: '1 set', category: 'Electrical & Lighting', categorySlug: 'electrical-lighting', imageUrl: px(6585750) },
  { name: 'Ceramic Table Lamp', description: 'Warm bedside lamp with natural linen shade.', price: 899, comparePrice: 1199, stock: 20, unit: '1 pc', category: 'Electrical & Lighting', categorySlug: 'electrical-lighting', imageUrl: px(1874413) },
  { name: 'Smart LED Bulb Pack', description: 'Energy-saving 9W LED bulbs — pack of 3.', price: 399, comparePrice: 549, stock: 70, unit: '3 pcs', category: 'Electrical & Lighting', categorySlug: 'electrical-lighting', imageUrl: px(6585750) },
  { name: 'PIR Motion Sensor Light', description: 'Auto on/off LED light for stairs & corridors.', price: 549, comparePrice: 749, stock: 45, unit: '1 pc', category: 'Electrical & Lighting', categorySlug: 'electrical-lighting', imageUrl: px(1123262) },
  { name: 'Extension Board 4-Socket', description: 'Surge-protected power strip with USB ports.', price: 499, comparePrice: 699, stock: 55, unit: '1 pc', category: 'Electrical & Lighting', categorySlug: 'electrical-lighting', imageUrl: px(4792733) },

  // ——— Plumbing & Bath ———
  { name: 'Garden Hose 30m', description: 'Flexible PVC hose with adjustable spray nozzle.', price: 599, comparePrice: 799, stock: 35, unit: '30 metre', category: 'Plumbing & Bath', categorySlug: 'plumbing-bath', imageUrl: px(13688386) },
  { name: 'Drip Irrigation Kit', description: 'Complete drip kit for up to 25 plants.', price: 599, comparePrice: 799, stock: 28, unit: '1 kit', category: 'Plumbing & Bath', categorySlug: 'plumbing-bath', imageUrl: px(35634634) },
  { name: 'Adjustable Sprinkler', description: 'Oscillating lawn sprinkler — 400 sq ft coverage.', price: 349, comparePrice: 449, stock: 32, unit: '1 pc', category: 'Plumbing & Bath', categorySlug: 'plumbing-bath', imageUrl: px(37720375) },
  { name: '8-Pattern Hose Nozzle', description: 'Metal spray gun with 8 watering patterns.', price: 299, comparePrice: 449, stock: 48, unit: '1 pc', category: 'Plumbing & Bath', categorySlug: 'plumbing-bath', imageUrl: px(4750274) },
  { name: 'Brass Tap Connector Set', description: 'Quick-connect brass fittings for garden taps.', price: 199, comparePrice: 299, stock: 70, unit: '3 pcs', category: 'Plumbing & Bath', categorySlug: 'plumbing-bath', imageUrl: px(1029243) },

  // ——— Paint & Hardware ———
  { name: 'Garden Tool Kit', description: 'Essential hand-tool kit with carry pouch.', price: 699, comparePrice: 999, stock: 30, unit: '5 pcs', category: 'Paint & Hardware', categorySlug: 'paint-hardware', imageUrl: px(16680725) },
  { name: 'Gardening Gloves', description: 'Breathable nitrile-coated protective work gloves.', price: 149, comparePrice: 199, stock: 80, unit: '1 pair', category: 'Paint & Hardware', categorySlug: 'paint-hardware', imageUrl: px(16680725) },
  { name: 'Neem Cake Organic 1kg', description: 'Natural pest repellent & soil conditioner.', price: 89, comparePrice: 110, stock: 85, unit: '1 kg', category: 'Paint & Hardware', categorySlug: 'paint-hardware', imageUrl: px(5067480) },
  { name: 'Paint Brush Set 7pc', description: 'Assorted synthetic brushes for wall & craft paint.', price: 249, comparePrice: 349, stock: 60, unit: '7 pcs', category: 'Paint & Hardware', categorySlug: 'paint-hardware', imageUrl: px(1053687) },
  { name: 'Steel Measuring Tape 5m', description: 'Auto-lock measuring tape with belt clip.', price: 129, comparePrice: 199, stock: 90, unit: '1 pc', category: 'Paint & Hardware', categorySlug: 'paint-hardware', imageUrl: px(5691659) },

  // ——— Home Essentials ———
  { name: 'Ceramic Vase White', description: 'Minimal matte-white vase for cut flowers.', price: 449, comparePrice: 549, stock: 35, unit: '1 pc', category: 'Home Essentials', categorySlug: 'home-essentials', imageUrl: px(6585750) },
  { name: 'Terracotta Pot 12 inch', description: 'Classic unglazed clay pot with drainage hole.', price: 199, comparePrice: 279, stock: 80, unit: '1 pc', category: 'Home Essentials', categorySlug: 'home-essentials', imageUrl: px(6591660) },
  { name: 'Jute Storage Basket', description: 'Handwoven jute basket for plants or storage.', price: 499, comparePrice: 649, stock: 38, unit: '1 pc', category: 'Home Essentials', categorySlug: 'home-essentials', imageUrl: px(6585750) },
  { name: 'Cotton Anti-Skid Doormat', description: 'Machine-washable absorbent cotton doormat.', price: 299, comparePrice: 449, stock: 65, unit: '1 pc', category: 'Home Essentials', categorySlug: 'home-essentials', imageUrl: px(6957089) },
  { name: 'Set of 3 Ceramic Planters', description: 'Nesting glazed pots with bamboo trays.', price: 649, comparePrice: 899, stock: 40, unit: '3 pcs', category: 'Home Essentials', categorySlug: 'home-essentials', imageUrl: px(6207364) },

  // ——— Furniture & Decor ———
  { name: 'Bamboo Plant Stand 3-Tier', description: 'Compact tiered stand for corner plant displays.', price: 899, comparePrice: 1199, stock: 18, unit: '1 pc', category: 'Furniture & Decor', categorySlug: 'furniture-decor', imageUrl: px(1874413) },
  { name: 'Macrame Plant Hanger', description: 'Hand-knotted cotton hanger for trailing plants.', price: 299, comparePrice: 399, stock: 40, unit: '1 pc', category: 'Furniture & Decor', categorySlug: 'furniture-decor', imageUrl: px(1874413) },
  { name: 'Rattan Basket Planter', description: 'Woven rattan sleeve with inner pot for décor.', price: 599, comparePrice: 799, stock: 25, unit: '1 pc', category: 'Furniture & Decor', categorySlug: 'furniture-decor', imageUrl: px(6591660) },
  { name: 'Wooden Floating Wall Shelf', description: 'Set of 2 solid wood shelves for plants & décor.', price: 799, comparePrice: 1099, stock: 30, unit: '2 pcs', category: 'Furniture & Decor', categorySlug: 'furniture-decor', imageUrl: px(2249959) },
  { name: 'Cotton Floor Cushion', description: 'Handwoven boho floor pouf for cosy corners.', price: 999, comparePrice: 1399, stock: 20, unit: '1 pc', category: 'Furniture & Decor', categorySlug: 'furniture-decor', imageUrl: px(1148955) },
];
