/**
 * Semantic plant & garden photos with size-optimized CDN URLs.
 * Pexels: auto=compress&cs=tinysrgb; Unsplash: q=80&auto=format.
 */
export type ImageSize = 'thumb' | 'card' | 'banner' | 'hero';

const WIDTH: Record<ImageSize, number> = {
  thumb: 256,
  card: 512,
  banner: 800,
  hero: 1400,
};

function pexels(id: number, size: ImageSize | number = 'card') {
  const w = typeof size === 'number' ? size : WIDTH[size];
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&fit=crop`;
}

function unsplash(id: string, size: ImageSize | number = 'card') {
  const w = typeof size === 'number' ? size : WIDTH[size];
  return `https://images.unsplash.com/${id}?w=${w}&q=82&auto=format&fit=crop`;
}

/** Build all sizes for a Pexels photo id */
function pxSet(id: number) {
  return {
    thumb: pexels(id, 'thumb'),
    card: pexels(id, 'card'),
    banner: pexels(id, 'banner'),
    hero: pexels(id, 'hero'),
  };
}

function uSet(id: string) {
  return {
    thumb: unsplash(id, 'thumb'),
    card: unsplash(id, 'card'),
    banner: unsplash(id, 'banner'),
    hero: unsplash(id, 'hero'),
  };
}

const PHOTOS = {
  // Heroes & promos
  heroPlants: uSet('photo-1416879595882-3373a0480b5b'),
  heroGarden: uSet('photo-1585320806297-9794b3e4eeae'),
  heroGardener: pxSet(7854134),
  plantCorner: pxSet(1457813), // nursery shelves with potted plants
  plantShelf: pxSet(4503261), // indoor plant collection

  // Plants (species)
  peaceLily: pxSet(12454551),
  snakePlant: pxSet(3127110),
  monstera: pxSet(1084199),
  arecaPalm: pxSet(9041608),
  succulents: pxSet(4947548),

  // Pots, soil, compost
  potsPlanters: pxSet(6591660), // terracotta pots stacked
  ceramicPots: pxSet(1072824), // glazed ceramic planters
  pottingSoil: pxSet(4751990),
  cocoPeat: pxSet(4500371), // clay pots with soil
  vermicompost: pxSet(28918862), // dark compost soil
  compostBin: pxSet(31416070),
  npkFertilizer: pxSet(5067480),

  // Tools & irrigation
  pruningShears: pxSet(4975358),
  gardenHose: pxSet(13688386),
  dripInstall: pxSet(35634634),
  sprinkler: pxSet(37720375),
  gardenTools: pxSet(16680725),

  // Garden spaces
  plantCare: pxSet(4503261),
  balconyGarden: pxSet(2123766),
  gardenMaintenance: pxSet(4920288),
  lawnMowing: pxSet(4920288),
  landscapeDesign: pxSet(2879824),

  // Fresh produce
  organicFood: pxSet(1435904), // mixed vegetables flat lay
  freshVegetables: pxSet(533360),
  freshFruits: pxSet(1132048),
  herbsLeafy: pxSet(1139359), // fresh basil & herbs
  farming: pxSet(24334853), // organic farm rows
  seeds: pxSet(1105019),

  // Home & eco
  homeDecor: pxSet(6585750), // styled interior with plants
  mindfulMorning: pxSet(1874413), // windowsill plants
  ecoProducts: pxSet(4207903), // natural botanical care products
  ayurveda: uSet('photo-1485955900006-10f4d324d411'),

  // Vendors & marketing
  vendorNursery: pxSet(5858757),
  vendorBonsai: pxSet(8280957),
  vendorOrganic: pxSet(24334853),
  delivery: pxSet(6699400),
  curated: pxSet(9412413),
  familySafePlants: pxSet(4947548),
  happyGarden: pxSet(5858757),

  // Misc
  realEstate: uSet('photo-1564013799919-ab600027ffc6'),
  ecoFashion: uSet('photo-1445205170230-053b83016050'),
  corporateProject: uSet('photo-1497366216548-37526070297c'),
  resortProject: pxSet(1450360),
  eventWorkshop: uSet('photo-1464226184884-fa280b87c399'),
  eventRetreat: uSet('photo-1506126613408-eca07ce68773'),
  eventPlantation: uSet('photo-1441974231531-c6227db76b6e'),
  eventHackathon: uSet('photo-1522071820081-009f0129c71c'),

  // Aliases used elsewhere in the app
  villaProject: uSet('photo-1564013799919-ab600027ffc6'),
  townshipProject: pxSet(2879824),
  journalAirPurifying: pxSet(12454551),
  journalOrganic: pxSet(24334853),
  journalCare: pxSet(9412413),
  vendorHardscape: pxSet(2879824),
  soilTesting: pxSet(4500371),
} as const;

type PhotoKey = keyof typeof PHOTOS;

/** Default card-size URL map (backward compatible) */
export const IMAGES = Object.fromEntries(
  Object.entries(PHOTOS).map(([k, v]) => [k, v.card]),
) as { [K in PhotoKey]: string };

/** Pick optimized URL for display context */
export function imageUrl(key: PhotoKey, size: ImageSize = 'card'): string {
  return PHOTOS[key][size];
}

/** Map API /images/* paths from seed data */
const PATH_MAP: Record<string, string> = {
  '/images/monstera.jpg': IMAGES.monstera,
  '/images/snake-plant.jpg': IMAGES.snakePlant,
  '/images/peace-lily.jpg': IMAGES.peaceLily,
  '/images/landscape.jpg': IMAGES.landscapeDesign,
  '/images/lawn-care.jpg': IMAGES.gardenMaintenance,
  '/images/office-green.jpg': IMAGES.corporateProject,
  '/images/balcony.jpg': IMAGES.balconyGarden,
  '/images/hero-garden.jpg': IMAGES.heroGarden,
  '/images/hero-plants.jpg': IMAGES.heroPlants,
  '/images/hero-gardener.jpg': IMAGES.heroGardener,
  '/images/compost.jpg': IMAGES.vermicompost,
  '/images/nursery.jpg': IMAGES.vendorNursery,
  '/images/farm.jpg': IMAGES.farming,
  '/images/herbs.jpg': IMAGES.ayurveda,
  '/images/garden-tools.jpg': IMAGES.gardenTools,
  '/images/irrigation.jpg': IMAGES.dripInstall,
};

const SLUG_MAP: Record<string, string> = {
  'monstera-deliciosa': IMAGES.monstera,
  'snake-plant': IMAGES.snakePlant,
  'peace-lily': IMAGES.peaceLily,
  'areca-palm': IMAGES.arecaPalm,
  'landscape-design': IMAGES.landscapeDesign,
  'garden-maintenance': IMAGES.gardenMaintenance,
  'plant-rental': IMAGES.corporateProject,
  'terrace-garden': IMAGES.balconyGarden,
  'vertical-garden': IMAGES.heroGarden,
};

const NAME_HINTS: [RegExp, string][] = [
  [/peace lily/i, IMAGES.peaceLily],
  [/snake/i, IMAGES.snakePlant],
  [/monstera/i, IMAGES.monstera],
  [/areca|palm/i, IMAGES.arecaPalm],
  [/vermicompost/i, IMAGES.vermicompost],
  [/coco/i, IMAGES.cocoPeat],
  [/potting/i, IMAGES.pottingSoil],
  [/npk|fertilizer/i, IMAGES.npkFertilizer],
  [/compost/i, IMAGES.vermicompost],
  [/shears|prun/i, IMAGES.pruningShears],
  [/sprinkler/i, IMAGES.sprinkler],
  [/drip|irrigation/i, IMAGES.dripInstall],
  [/hose/i, IMAGES.gardenHose],
  [/tool/i, IMAGES.gardenTools],
  [/seed/i, IMAGES.seeds],
  [/soil/i, IMAGES.pottingSoil],
  [/mowing|lawn/i, IMAGES.lawnMowing],
  [/maintenance/i, IMAGES.gardenMaintenance],
  [/balcony|terrace/i, IMAGES.balconyGarden],
  [/landscape/i, IMAGES.landscapeDesign],
  [/bonsai/i, IMAGES.vendorBonsai],
  [/nursery/i, IMAGES.vendorNursery],
  [/indoor/i, IMAGES.plantCare],
  [/mango|melon|fruit/i, IMAGES.freshFruits],
  [/vegetable|tomato|potato|onion/i, IMAGES.freshVegetables],
  [/herb|basil|mint|spinach/i, IMAGES.herbsLeafy],
  [/planter|pot/i, IMAGES.potsPlanters],
  [/rental|office/i, IMAGES.corporateProject],
];

export function resolveImage(
  src: string | null | undefined,
  fallback = IMAGES.monstera,
  slugOrName?: string,
): string {
  if (slugOrName) {
    const slugKey = slugOrName.toLowerCase().replace(/\s+/g, '-');
    if (SLUG_MAP[slugKey]) return SLUG_MAP[slugKey];
    for (const [re, url] of NAME_HINTS) {
      if (re.test(slugOrName)) return url;
    }
  }
  if (!src) return fallback;
  if (PATH_MAP[src]) return PATH_MAP[src];
  if (src.startsWith('http')) return src;
  return fallback;
}
