/**
 * Marketplace categories from client reference — 20 categories × 5 products (100 total).
 * Complements the garden/eco catalog in catalog-products.ts.
 */
import type { CatalogRow } from './catalog-products';

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=512&fit=crop`;

export const MARKETPLACE_CATEGORIES: { name: string; slug: string }[] = [
  { name: 'Health & Medical', slug: 'health-medical' },
  { name: 'Agriculture, Food & Beverage', slug: 'agriculture-food-beverage' },
  { name: 'Apparel & Accessories', slug: 'apparel-accessories' },
  { name: 'Consumer Electronics', slug: 'consumer-electronics' },
  { name: 'Home & Garden', slug: 'home-garden' },
  { name: 'Sports & Entertainment', slug: 'sports-entertainment' },
  { name: 'Beauty & Personal Care', slug: 'beauty-personal-care' },
  { name: 'Jewelry, Eyewear & Watches', slug: 'jewelry-eyewear-watches' },
  { name: 'Shoes & Accessories', slug: 'shoes-accessories' },
  { name: 'Luggage, Bags & Cases', slug: 'luggage-bags-cases' },
  { name: 'Packaging & Printing', slug: 'packaging-printing' },
  { name: 'Parents, Kids & Toys', slug: 'parents-kids-toys' },
  { name: 'Personal Care & Home Care', slug: 'personal-care-home-care' },
  { name: 'Gifts & Crafts', slug: 'gifts-crafts' },
  { name: 'Pet Supplies', slug: 'pet-supplies' },
  { name: 'School & Office Supplies', slug: 'school-office-supplies' },
  { name: 'Industrial Machinery', slug: 'industrial-machinery' },
  { name: 'Commercial Equipment', slug: 'commercial-equipment' },
  { name: 'Construction & Building', slug: 'construction-building' },
  { name: 'Furniture', slug: 'furniture' },
];

export const MARKETPLACE_PRODUCTS: CatalogRow[] = [
  // Health & Medical
  { name: 'Aloe Vera Gel 500ml', description: 'Pure aloe gel for skin soothing and hydration.', price: 249, comparePrice: 349, stock: 60, unit: '500 ml', category: 'Health & Medical', categorySlug: 'health-medical', imageUrl: px(4503261) },
  { name: 'Herbal Immunity Tea', description: 'Tulsi, ginger & moringa wellness tea blend.', price: 199, comparePrice: 279, stock: 80, unit: '100 g', category: 'Health & Medical', categorySlug: 'health-medical', imageUrl: px(1139359) },
  { name: 'Digital Thermometer', description: 'Fast-read digital thermometer for home use.', price: 299, comparePrice: 399, stock: 45, unit: '1 pc', category: 'Health & Medical', categorySlug: 'health-medical', imageUrl: px(5067480) },
  { name: 'Digital BP Monitor', description: 'Automatic upper-arm blood pressure monitor with memory.', price: 1499, comparePrice: 2199, stock: 30, unit: '1 pc', category: 'Health & Medical', categorySlug: 'health-medical', imageUrl: px(4386466) },
  { name: 'Fingertip Pulse Oximeter', description: 'SpO2 & pulse rate monitor with OLED display.', price: 899, comparePrice: 1499, stock: 40, unit: '1 pc', category: 'Health & Medical', categorySlug: 'health-medical', imageUrl: px(3873171) },

  // Agriculture, Food & Beverage
  { name: 'Organic Honey 500g', description: 'Raw multifloral honey from local apiaries.', price: 399, comparePrice: 499, stock: 50, unit: '500 g', category: 'Agriculture, Food & Beverage', categorySlug: 'agriculture-food-beverage', imageUrl: px(1105019) },
  { name: 'Cold Pressed Coconut Oil', description: 'Virgin coconut oil for cooking & wellness.', price: 349, comparePrice: 449, stock: 55, unit: '500 ml', category: 'Agriculture, Food & Beverage', categorySlug: 'agriculture-food-beverage', imageUrl: px(1139359) },
  { name: 'Mixed Dry Fruits 250g', description: 'Premium almonds, cashews & raisins mix.', price: 449, comparePrice: 549, stock: 40, unit: '250 g', category: 'Agriculture, Food & Beverage', categorySlug: 'agriculture-food-beverage', imageUrl: px(1105019) },
  { name: 'Organic Green Tea 100g', description: 'Whole-leaf green tea — antioxidant rich.', price: 299, comparePrice: 399, stock: 60, unit: '100 g', category: 'Agriculture, Food & Beverage', categorySlug: 'agriculture-food-beverage', imageUrl: px(1417945) },
  { name: 'Basmati Rice 5kg', description: 'Aged long-grain premium basmati rice.', price: 599, comparePrice: 749, stock: 45, unit: '5 kg', category: 'Agriculture, Food & Beverage', categorySlug: 'agriculture-food-beverage', imageUrl: px(4110251) },

  // Apparel & Accessories
  { name: 'Cotton Gardening Apron', description: 'Durable apron with pockets for tools & seeds.', price: 399, comparePrice: 499, stock: 35, unit: '1 pc', category: 'Apparel & Accessories', categorySlug: 'apparel-accessories', imageUrl: px(16680725) },
  { name: 'Sun Protection Hat', description: 'Wide-brim UV hat for outdoor gardening.', price: 299, comparePrice: 399, stock: 42, unit: '1 pc', category: 'Apparel & Accessories', categorySlug: 'apparel-accessories', imageUrl: px(4920288) },
  { name: 'Breathable Gardening Gloves', description: 'Nitrile-coated gloves for wet & dry work.', price: 149, comparePrice: 199, stock: 90, unit: '1 pair', category: 'Apparel & Accessories', categorySlug: 'apparel-accessories', imageUrl: px(16680725) },
  { name: 'Unisex Cotton T-Shirt', description: 'Soft breathable round-neck cotton tee.', price: 399, comparePrice: 699, stock: 80, unit: '1 pc', category: 'Apparel & Accessories', categorySlug: 'apparel-accessories', imageUrl: px(996329) },
  { name: 'Woolen Winter Scarf', description: 'Warm knitted scarf for cold weather.', price: 349, comparePrice: 549, stock: 55, unit: '1 pc', category: 'Apparel & Accessories', categorySlug: 'apparel-accessories', imageUrl: px(45982) },

  // Consumer Electronics
  { name: 'Smart Soil Moisture Sensor', description: 'Bluetooth sensor alerts when plants need water.', price: 899, comparePrice: 1199, stock: 25, unit: '1 pc', category: 'Consumer Electronics', categorySlug: 'consumer-electronics', imageUrl: px(5067480) },
  { name: 'Garden Security Camera', description: 'Wi-Fi outdoor camera with night vision.', price: 2499, comparePrice: 2999, stock: 18, unit: '1 pc', category: 'Consumer Electronics', categorySlug: 'consumer-electronics', imageUrl: px(6585750) },
  { name: 'LED Grow Light Panel', description: 'Full-spectrum grow light for indoor plants.', price: 1299, comparePrice: 1699, stock: 22, unit: '1 pc', category: 'Consumer Electronics', categorySlug: 'consumer-electronics', imageUrl: px(6585750) },
  { name: 'Wireless Bluetooth Earbuds', description: 'TWS earbuds with charging case & deep bass.', price: 1299, comparePrice: 2499, stock: 40, unit: '1 pair', category: 'Consumer Electronics', categorySlug: 'consumer-electronics', imageUrl: px(3780681) },
  { name: 'Power Bank 10000mAh', description: 'Fast-charging power bank with dual USB output.', price: 999, comparePrice: 1499, stock: 50, unit: '1 pc', category: 'Consumer Electronics', categorySlug: 'consumer-electronics', imageUrl: px(4526407) },

  // Home & Garden
  { name: 'Indoor Herb Garden Kit', description: 'Basil, mint & coriander starter kit with pots.', price: 499, comparePrice: 649, stock: 38, unit: '1 kit', category: 'Home & Garden', categorySlug: 'home-garden', imageUrl: px(1139359) },
  { name: 'Decorative Floor Planter', description: 'Large ceramic planter for living room corners.', price: 1299, comparePrice: 1599, stock: 20, unit: '1 pc', category: 'Home & Garden', categorySlug: 'home-garden', imageUrl: px(6591660) },
  { name: 'Bamboo Room Divider', description: 'Natural bamboo screen for patio & balcony.', price: 2499, comparePrice: 2999, stock: 12, unit: '1 pc', category: 'Home & Garden', categorySlug: 'home-garden', imageUrl: px(1874413) },
  { name: 'Wooden Wall Clock', description: 'Silent-sweep minimalist wall clock for décor.', price: 699, comparePrice: 999, stock: 35, unit: '1 pc', category: 'Home & Garden', categorySlug: 'home-garden', imageUrl: px(1095601) },
  { name: 'Scented Candle Set', description: 'Soy wax aromatherapy candles — set of 3.', price: 549, comparePrice: 799, stock: 45, unit: '3 pcs', category: 'Home & Garden', categorySlug: 'home-garden', imageUrl: px(3059609) },

  // Sports & Entertainment
  { name: 'Badminton Set', description: 'Rackets, shuttlecocks & net for backyard play.', price: 799, comparePrice: 999, stock: 30, unit: '1 set', category: 'Sports & Entertainment', categorySlug: 'sports-entertainment', imageUrl: px(4920288) },
  { name: 'Yoga Mat Eco', description: 'Non-slip natural rubber yoga mat.', price: 599, comparePrice: 799, stock: 45, unit: '1 pc', category: 'Sports & Entertainment', categorySlug: 'sports-entertainment', imageUrl: px(4207903) },
  { name: 'Outdoor Camping Chair', description: 'Foldable chair for garden & picnic outings.', price: 899, comparePrice: 1099, stock: 28, unit: '1 pc', category: 'Sports & Entertainment', categorySlug: 'sports-entertainment', imageUrl: px(4920288) },
  { name: 'Skipping Rope Speed', description: 'Adjustable steel-wire jump rope with foam grips.', price: 199, comparePrice: 349, stock: 70, unit: '1 pc', category: 'Sports & Entertainment', categorySlug: 'sports-entertainment', imageUrl: px(4327024) },
  { name: 'Football Size 5', description: 'Machine-stitched all-weather match football.', price: 499, comparePrice: 799, stock: 40, unit: '1 pc', category: 'Sports & Entertainment', categorySlug: 'sports-entertainment', imageUrl: px(357514) },

  // Beauty & Personal Care
  { name: 'Neem Face Wash', description: 'Antibacterial neem & tulsi face cleanser.', price: 199, comparePrice: 279, stock: 70, unit: '150 ml', category: 'Beauty & Personal Care', categorySlug: 'beauty-personal-care', imageUrl: px(4503261) },
  { name: 'Aloe Vera Face Cream', description: 'Hydrating day cream with aloe & vitamin E.', price: 299, comparePrice: 399, stock: 55, unit: '50 g', category: 'Beauty & Personal Care', categorySlug: 'beauty-personal-care', imageUrl: px(4503261) },
  { name: 'Natural Lip Balm Set', description: 'Beeswax lip balms — pack of 3 flavours.', price: 149, comparePrice: 199, stock: 85, unit: '3 pcs', category: 'Beauty & Personal Care', categorySlug: 'beauty-personal-care', imageUrl: px(5067480) },
  { name: 'Vitamin C Face Serum', description: 'Brightening serum with hyaluronic acid.', price: 399, comparePrice: 699, stock: 60, unit: '30 ml', category: 'Beauty & Personal Care', categorySlug: 'beauty-personal-care', imageUrl: px(3735618) },
  { name: 'Herbal Hair Oil 200ml', description: 'Ayurvedic hair oil with amla & bhringraj.', price: 249, comparePrice: 349, stock: 70, unit: '200 ml', category: 'Beauty & Personal Care', categorySlug: 'beauty-personal-care', imageUrl: px(7262444) },

  // Jewelry, Eyewear & Watches
  { name: 'Wooden Bead Bracelet', description: 'Handcrafted sustainable wood bead bracelet.', price: 249, comparePrice: 349, stock: 40, unit: '1 pc', category: 'Jewelry, Eyewear & Watches', categorySlug: 'jewelry-eyewear-watches', imageUrl: px(1874413) },
  { name: 'Eco Silver Earrings', description: 'Minimalist recycled silver stud earrings.', price: 499, comparePrice: 649, stock: 25, unit: '1 pair', category: 'Jewelry, Eyewear & Watches', categorySlug: 'jewelry-eyewear-watches', imageUrl: px(6585750) },
  { name: 'Bamboo Watch Strap', description: 'Universal bamboo strap for smartwatches.', price: 399, comparePrice: 499, stock: 32, unit: '1 pc', category: 'Jewelry, Eyewear & Watches', categorySlug: 'jewelry-eyewear-watches', imageUrl: px(4207903) },
  { name: 'Polarized Sunglasses', description: 'UV400 polarized sunglasses with hard case.', price: 599, comparePrice: 999, stock: 45, unit: '1 pc', category: 'Jewelry, Eyewear & Watches', categorySlug: 'jewelry-eyewear-watches', imageUrl: px(46710) },
  { name: 'Analog Wrist Watch', description: 'Classic leather-strap analog watch for men.', price: 1299, comparePrice: 1999, stock: 30, unit: '1 pc', category: 'Jewelry, Eyewear & Watches', categorySlug: 'jewelry-eyewear-watches', imageUrl: px(277390) },

  // Shoes & Accessories
  { name: 'Garden Clogs', description: 'Waterproof slip-on clogs for muddy gardens.', price: 449, comparePrice: 599, stock: 50, unit: '1 pair', category: 'Shoes & Accessories', categorySlug: 'shoes-accessories', imageUrl: px(16680725) },
  { name: 'Rubber Rain Boots', description: 'Knee-high boots for monsoon gardening.', price: 699, comparePrice: 899, stock: 35, unit: '1 pair', category: 'Shoes & Accessories', categorySlug: 'shoes-accessories', imageUrl: px(13688386) },
  { name: 'Canvas Sneakers', description: 'Lightweight everyday canvas shoes.', price: 899, comparePrice: 1099, stock: 40, unit: '1 pair', category: 'Shoes & Accessories', categorySlug: 'shoes-accessories', imageUrl: px(4207903) },
  { name: 'Mesh Running Shoes', description: 'Breathable cushioned sports running shoes.', price: 1499, comparePrice: 2499, stock: 45, unit: '1 pair', category: 'Shoes & Accessories', categorySlug: 'shoes-accessories', imageUrl: px(2529148) },
  { name: 'Leather Sandals', description: 'Handcrafted genuine leather everyday sandals.', price: 799, comparePrice: 1199, stock: 38, unit: '1 pair', category: 'Shoes & Accessories', categorySlug: 'shoes-accessories', imageUrl: px(267301) },

  // Luggage, Bags & Cases
  { name: 'Jute Tote Bag', description: 'Large reusable jute shopping tote.', price: 199, comparePrice: 279, stock: 75, unit: '1 pc', category: 'Luggage, Bags & Cases', categorySlug: 'luggage-bags-cases', imageUrl: px(4207903) },
  { name: 'Woven Picnic Basket', description: 'Willow picnic basket with cutlery set.', price: 899, comparePrice: 1199, stock: 22, unit: '1 set', category: 'Luggage, Bags & Cases', categorySlug: 'luggage-bags-cases', imageUrl: px(6585750) },
  { name: 'Plant Carry Case', description: 'Ventilated case for transporting potted plants.', price: 549, comparePrice: 699, stock: 28, unit: '1 pc', category: 'Luggage, Bags & Cases', categorySlug: 'luggage-bags-cases', imageUrl: px(12454551) },
  { name: 'Travel Backpack 40L', description: 'Water-resistant laptop backpack with USB port.', price: 1299, comparePrice: 1999, stock: 35, unit: '1 pc', category: 'Luggage, Bags & Cases', categorySlug: 'luggage-bags-cases', imageUrl: px(2905238) },
  { name: 'Trolley Suitcase 24"', description: 'Hard-shell 4-wheel spinner check-in luggage.', price: 2999, comparePrice: 4499, stock: 20, unit: '1 pc', category: 'Luggage, Bags & Cases', categorySlug: 'luggage-bags-cases', imageUrl: px(1170519) },

  // Packaging & Printing
  { name: 'Kraft Gift Boxes', description: 'Eco kraft boxes for plants & gifts — pack of 10.', price: 299, comparePrice: 399, stock: 60, unit: '10 pcs', category: 'Packaging & Printing', categorySlug: 'packaging-printing', imageUrl: px(4207903) },
  { name: 'Biodegradable Mailer Bags', description: 'Compostable shipping bags — pack of 50.', price: 449, comparePrice: 549, stock: 45, unit: '50 pcs', category: 'Packaging & Printing', categorySlug: 'packaging-printing', imageUrl: px(4207903) },
  { name: 'Custom Label Roll', description: 'Waterproof plant label stickers — 200 pcs.', price: 199, comparePrice: 279, stock: 80, unit: '200 pcs', category: 'Packaging & Printing', categorySlug: 'packaging-printing', imageUrl: px(5067480) },
  { name: 'Bubble Wrap Roll 50m', description: 'Protective air-bubble wrap for safe shipping.', price: 349, comparePrice: 499, stock: 60, unit: '50 metre', category: 'Packaging & Printing', categorySlug: 'packaging-printing', imageUrl: px(4498135) },
  { name: 'Packing Tape Set', description: 'Brown BOPP packaging tape — pack of 6 rolls.', price: 249, comparePrice: 349, stock: 75, unit: '6 pcs', category: 'Packaging & Printing', categorySlug: 'packaging-printing', imageUrl: px(5025639) },

  // Parents, Kids & Toys
  { name: 'Kids Gardening Tool Set', description: 'Child-safe trowel, rake & watering can.', price: 399, comparePrice: 499, stock: 40, unit: '1 set', category: 'Parents, Kids & Toys', categorySlug: 'parents-kids-toys', imageUrl: px(16680725) },
  { name: 'Plant Growing Science Kit', description: 'Educational kit to grow beans & observe roots.', price: 299, comparePrice: 399, stock: 50, unit: '1 kit', category: 'Parents, Kids & Toys', categorySlug: 'parents-kids-toys', imageUrl: px(1105019) },
  { name: 'Wooden Animal Puzzle', description: 'Hand-painted wooden jungle animal puzzle.', price: 349, comparePrice: 449, stock: 35, unit: '1 pc', category: 'Parents, Kids & Toys', categorySlug: 'parents-kids-toys', imageUrl: px(1874413) },
  { name: 'Building Blocks 100pc', description: 'Interlocking creative building blocks set.', price: 599, comparePrice: 899, stock: 45, unit: '100 pcs', category: 'Parents, Kids & Toys', categorySlug: 'parents-kids-toys', imageUrl: px(3661193) },
  { name: 'Soft Teddy Bear', description: 'Huggable plush teddy bear — 45 cm.', price: 499, comparePrice: 799, stock: 40, unit: '1 pc', category: 'Parents, Kids & Toys', categorySlug: 'parents-kids-toys', imageUrl: px(207891) },

  // Personal Care & Home Care
  { name: 'Natural Floor Cleaner', description: 'Plant-based floor cleaner — lemon & neem.', price: 199, comparePrice: 279, stock: 65, unit: '1 L', category: 'Personal Care & Home Care', categorySlug: 'personal-care-home-care', imageUrl: px(5067480) },
  { name: 'Organic Dish Soap', description: 'Biodegradable dish wash with aloe.', price: 149, comparePrice: 199, stock: 80, unit: '500 ml', category: 'Personal Care & Home Care', categorySlug: 'personal-care-home-care', imageUrl: px(4503261) },
  { name: 'Lavender Room Spray', description: 'Natural linen & room freshener spray.', price: 249, comparePrice: 329, stock: 55, unit: '200 ml', category: 'Personal Care & Home Care', categorySlug: 'personal-care-home-care', imageUrl: px(6585750) },
  { name: 'Liquid Handwash 5L', description: 'Refill pack moisturising handwash — 5 litre.', price: 449, comparePrice: 599, stock: 60, unit: '5 L', category: 'Personal Care & Home Care', categorySlug: 'personal-care-home-care', imageUrl: px(4239146) },
  { name: 'Toilet Cleaner 1L', description: 'Disinfectant toilet cleaner kills 99.9% germs.', price: 149, comparePrice: 219, stock: 80, unit: '1 L', category: 'Personal Care & Home Care', categorySlug: 'personal-care-home-care', imageUrl: px(4239012) },

  // Gifts & Crafts
  { name: 'Macrame DIY Kit', description: 'Complete kit to make your own plant hanger.', price: 499, comparePrice: 649, stock: 30, unit: '1 kit', category: 'Gifts & Crafts', categorySlug: 'gifts-crafts', imageUrl: px(1874413) },
  { name: 'Terracotta Paint Set', description: 'Acrylic paints & brushes for pot decorating.', price: 349, comparePrice: 449, stock: 38, unit: '1 set', category: 'Gifts & Crafts', categorySlug: 'gifts-crafts', imageUrl: px(6591660) },
  { name: 'Candle Making Kit', description: 'Soy wax, wicks & essential oils DIY kit.', price: 599, comparePrice: 799, stock: 25, unit: '1 kit', category: 'Gifts & Crafts', categorySlug: 'gifts-crafts', imageUrl: px(6585750) },
  { name: 'Photo Frame Set of 6', description: 'Wall collage photo frames in assorted sizes.', price: 699, comparePrice: 999, stock: 35, unit: '6 pcs', category: 'Gifts & Crafts', categorySlug: 'gifts-crafts', imageUrl: px(265039) },
  { name: 'Scrapbook DIY Kit', description: 'Complete scrapbooking kit with stickers & tools.', price: 449, comparePrice: 649, stock: 30, unit: '1 kit', category: 'Gifts & Crafts', categorySlug: 'gifts-crafts', imageUrl: px(1194420) },

  // Pet Supplies
  { name: 'Cat Grass Grow Kit', description: 'Wheatgrass kit safe for cats to nibble.', price: 199, comparePrice: 279, stock: 55, unit: '1 kit', category: 'Pet Supplies', categorySlug: 'pet-supplies', imageUrl: px(1105019) },
  { name: 'Pet-Safe Plant Food', description: 'Non-toxic liquid fertilizer for pet homes.', price: 249, comparePrice: 329, stock: 48, unit: '250 ml', category: 'Pet Supplies', categorySlug: 'pet-supplies', imageUrl: px(5067480) },
  { name: 'Natural Dog Chew Toy', description: 'Eco rubber chew toy — durable & non-toxic.', price: 299, comparePrice: 399, stock: 42, unit: '1 pc', category: 'Pet Supplies', categorySlug: 'pet-supplies', imageUrl: px(4207903) },
  { name: 'Adult Dog Food 3kg', description: 'Complete nutrition dry dog food with chicken.', price: 899, comparePrice: 1299, stock: 40, unit: '3 kg', category: 'Pet Supplies', categorySlug: 'pet-supplies', imageUrl: px(1108099) },
  { name: 'Clumping Cat Litter 5kg', description: 'Odour-control bentonite clumping cat litter.', price: 499, comparePrice: 699, stock: 45, unit: '5 kg', category: 'Pet Supplies', categorySlug: 'pet-supplies', imageUrl: px(2071882) },

  // School & Office Supplies
  { name: 'Recycled Notebook Set', description: 'A5 ruled notebooks from recycled paper — 5 pack.', price: 249, comparePrice: 329, stock: 70, unit: '5 pcs', category: 'School & Office Supplies', categorySlug: 'school-office-supplies', imageUrl: px(4207903) },
  { name: 'Bamboo Pen Holder', description: 'Desk organizer with bamboo pen slots.', price: 299, comparePrice: 399, stock: 45, unit: '1 pc', category: 'School & Office Supplies', categorySlug: 'school-office-supplies', imageUrl: px(1874413) },
  { name: 'Desk Succulent Kit', description: 'Mini succulent with ceramic pot for desks.', price: 349, comparePrice: 449, stock: 40, unit: '1 kit', category: 'School & Office Supplies', categorySlug: 'school-office-supplies', imageUrl: px(3127110) },
  { name: 'Gel Pen Pack of 10', description: 'Smooth-writing 0.5mm blue gel pens.', price: 149, comparePrice: 249, stock: 90, unit: '10 pcs', category: 'School & Office Supplies', categorySlug: 'school-office-supplies', imageUrl: px(270085) },
  { name: 'Sticky Notes Set', description: 'Colourful self-adhesive sticky notes — 500 sheets.', price: 129, comparePrice: 199, stock: 80, unit: '5 pads', category: 'School & Office Supplies', categorySlug: 'school-office-supplies', imageUrl: px(3183197) },

  // Industrial Machinery
  { name: 'Electric Hedge Trimmer', description: '600W corded hedge trimmer for boundaries.', price: 3499, comparePrice: 4299, stock: 15, unit: '1 pc', category: 'Industrial Machinery', categorySlug: 'industrial-machinery', imageUrl: px(4975358) },
  { name: 'Lawn Mower 1400W', description: 'Electric rotary mower for medium lawns.', price: 8999, comparePrice: 10999, stock: 8, unit: '1 pc', category: 'Industrial Machinery', categorySlug: 'industrial-machinery', imageUrl: px(4920288) },
  { name: 'Electric Chain Saw', description: 'Compact chainsaw for pruning thick branches.', price: 4999, comparePrice: 5999, stock: 10, unit: '1 pc', category: 'Industrial Machinery', categorySlug: 'industrial-machinery', imageUrl: px(4975358) },
  { name: 'High Pressure Washer', description: '1800W pressure washer for cars & driveways.', price: 5999, comparePrice: 7999, stock: 12, unit: '1 pc', category: 'Industrial Machinery', categorySlug: 'industrial-machinery', imageUrl: px(4483610) },
  { name: 'Electric Drill Machine', description: '13mm impact drill with variable speed & bits.', price: 2499, comparePrice: 3499, stock: 18, unit: '1 kit', category: 'Industrial Machinery', categorySlug: 'industrial-machinery', imageUrl: px(1029243) },

  // Commercial Equipment
  { name: 'Commercial Misting System', description: 'High-pressure misting for nurseries & cafes.', price: 12999, comparePrice: 14999, stock: 6, unit: '1 kit', category: 'Commercial Equipment', categorySlug: 'commercial-equipment', imageUrl: px(37720375) },
  { name: 'Greenhouse Frame Kit', description: 'Galvanized steel frame — 10×20 ft.', price: 24999, comparePrice: 29999, stock: 4, unit: '1 kit', category: 'Commercial Equipment', categorySlug: 'commercial-equipment', imageUrl: px(2879824) },
  { name: 'Industrial Compost Tumbler', description: '200L dual-chamber compost tumbler.', price: 8999, comparePrice: 10999, stock: 7, unit: '1 pc', category: 'Commercial Equipment', categorySlug: 'commercial-equipment', imageUrl: px(31416070) },
  { name: 'Commercial Display Fridge', description: 'Glass-door visi cooler for shops & cafés.', price: 32999, comparePrice: 39999, stock: 5, unit: '1 pc', category: 'Commercial Equipment', categorySlug: 'commercial-equipment', imageUrl: px(2290753) },
  { name: 'Commercial Blender 2L', description: 'Heavy-duty 2200W blender for juices & smoothies.', price: 8999, comparePrice: 11999, stock: 8, unit: '1 pc', category: 'Commercial Equipment', categorySlug: 'commercial-equipment', imageUrl: px(4051643) },

  // Construction & Building
  { name: 'Cement Mix 50kg', description: 'Portland cement for construction & hardscape.', price: 399, comparePrice: 449, stock: 100, unit: '50 kg', category: 'Construction & Building', categorySlug: 'construction-building', imageUrl: px(8280957) },
  { name: 'PVC Pipe 4 inch', description: 'Heavy-duty PVC pipe for irrigation lines.', price: 299, comparePrice: 379, stock: 80, unit: '3 metre', category: 'Construction & Building', categorySlug: 'construction-building', imageUrl: px(37720375) },
  { name: 'Waterproof Membrane Roll', description: 'Terrace & pond waterproofing membrane.', price: 1499, comparePrice: 1899, stock: 20, unit: '10 sq m', category: 'Construction & Building', categorySlug: 'construction-building', imageUrl: px(8280957) },
  { name: 'Ceramic Floor Tiles', description: 'Anti-skid vitrified floor tiles — 2x2 ft box.', price: 899, comparePrice: 1199, stock: 60, unit: '1 box (4 pcs)', category: 'Construction & Building', categorySlug: 'construction-building', imageUrl: px(1358900) },
  { name: 'TMT Steel Rebar 8mm', description: 'Fe-500 grade TMT reinforcement bars bundle.', price: 3499, comparePrice: 3999, stock: 25, unit: '1 bundle', category: 'Construction & Building', categorySlug: 'construction-building', imageUrl: px(2469122) },

  // Furniture
  { name: 'Teak Garden Bench', description: 'Solid teak bench for patios & gardens.', price: 8999, comparePrice: 10999, stock: 8, unit: '1 pc', category: 'Furniture', categorySlug: 'furniture', imageUrl: px(4920288) },
  { name: 'Wicker Patio Chair Set', description: 'All-weather wicker chairs — set of 2.', price: 5999, comparePrice: 7499, stock: 10, unit: '2 pcs', category: 'Furniture', categorySlug: 'furniture', imageUrl: px(1874413) },
  { name: 'Outdoor Coffee Table', description: 'Rust-proof metal & wood outdoor table.', price: 3999, comparePrice: 4999, stock: 12, unit: '1 pc', category: 'Furniture', categorySlug: 'furniture', imageUrl: px(6591660) },
  { name: '3-Seater Fabric Sofa', description: 'Cushioned living room sofa with wooden legs.', price: 18999, comparePrice: 24999, stock: 6, unit: '1 pc', category: 'Furniture', categorySlug: 'furniture', imageUrl: px(1571460) },
  { name: 'Wooden Study Table', description: 'Engineered-wood study desk with drawers.', price: 4999, comparePrice: 6999, stock: 14, unit: '1 pc', category: 'Furniture', categorySlug: 'furniture', imageUrl: px(667838) },
];
