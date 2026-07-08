import {
  BrandFilterRow,
  BrandMarquee,
  CategoryGrid,
  DualPromoBanners,
  ExploreMoreHeader,
  LifestyleGrid,
  PromoCardsGrid,
  SubCategoryIconRow,
} from './ZeptoCategoryBlocks';
import { FreshBrandBanner, HeroCarousel, ShopByCategoryRow } from './ZeptoFeedSections';
import { CatalogShelves } from './CatalogShelves';
import {
  BEAUTY_BRAND_FILTERS,
  BEAUTY_GRID,
  BEAUTY_SUB_ICONS,
  DECOR_BRAND_FILTERS,
  DECOR_GRID_4,
  DECOR_GRID_6,
  DECOR_LIFESTYLE,
  DECOR_PROMO_CARDS,
  DECOR_SUB_ICONS,
  ECO_BRAND_FILTERS,
  ECO_GRID,
  ECO_PROMO_CARDS,
  ECO_SUB_ICONS,
  FRESH_SUB_ICONS,
  GARDEN_BRAND_FILTERS,
  GARDEN_GRID,
  GARDEN_PROMO_CARDS,
  GARDEN_SUB_ICONS,
  HOME_BRAND_FILTER_ROW_1,
  HOME_BRAND_FILTER_ROW_2,
  HOME_GRID_4,
  HOME_GRID_6,
  HOME_LIFESTYLE,
  HOME_PROMO_CARDS,
  HOME_SUB_CHIPS,
  HOME_SUB_SUB_ICONS,
  HOME_TRUSTED_BRANDS,
  PLANTS_GRID,
  PLANTS_SUB_ICONS,
} from '../../data/zeptoCategoryPages';

/** Zepto "All" — promos + real product aisles from database */
export function AllCategoryView() {
  return (
    <>
      <DualPromoBanners />
      <CatalogShelves />
    </>
  );
}

/** Zepto "Home" — chips, brands, promo grid, category grids, real products */
export function HomeCategoryView() {
  return (
    <>
      <SubCategoryIconRow items={HOME_SUB_CHIPS} />
      <BrandMarquee brands={HOME_TRUSTED_BRANDS} />
      <PromoCardsGrid cards={HOME_PROMO_CARDS} />
      <CategoryGrid title="Home & Living" items={HOME_GRID_6} cols={3} />
      <BrandFilterRow brands={HOME_BRAND_FILTER_ROW_1} />
      <CategoryGrid items={HOME_GRID_4} cols={4} />
      <BrandFilterRow brands={HOME_BRAND_FILTER_ROW_2} />
      <SubCategoryIconRow items={HOME_SUB_SUB_ICONS} />
      <LifestyleGrid items={HOME_LIFESTYLE} />
      <ExploreMoreHeader />
      <CatalogShelves parentSlug="home" />
    </>
  );
}

/** Zepto "Fresh" — hero + real fresh shelves */
export function FreshCategoryView() {
  return (
    <>
      <SubCategoryIconRow items={FRESH_SUB_ICONS} />
      <HeroCarousel />
      <CatalogShelves parentSlug="fresh" />
      <ShopByCategoryRow />
      <FreshBrandBanner />
    </>
  );
}

/** Zepto "Plants" — plant subcategories + grids + real plant shelves */
export function PlantsCategoryView() {
  return (
    <>
      <SubCategoryIconRow items={PLANTS_SUB_ICONS} />
      <CategoryGrid title="Shop Plants" items={PLANTS_GRID} cols={3} />
      <CatalogShelves parentSlug="plants" />
    </>
  );
}

/** Garden — tools, irrigation, outdoor */
export function GardenCategoryView() {
  return (
    <>
      <SubCategoryIconRow items={GARDEN_SUB_ICONS} />
      <PromoCardsGrid cards={GARDEN_PROMO_CARDS} />
      <CategoryGrid title="Shop Garden" items={GARDEN_GRID} cols={3} />
      <BrandFilterRow brands={GARDEN_BRAND_FILTERS} />
      <CatalogShelves parentSlug="garden" />
    </>
  );
}

/** Eco — compost, organic, zero-waste */
export function EcoCategoryView() {
  return (
    <>
      <SubCategoryIconRow items={ECO_SUB_ICONS} />
      <PromoCardsGrid cards={ECO_PROMO_CARDS} />
      <CategoryGrid title="Eco Living" items={ECO_GRID} cols={3} />
      <BrandFilterRow brands={ECO_BRAND_FILTERS} />
      <CatalogShelves parentSlug="eco" />
    </>
  );
}

/** Decor — home styling (products from Home category) */
export function DecorCategoryView() {
  return (
    <>
      <SubCategoryIconRow items={DECOR_SUB_ICONS} />
      <PromoCardsGrid cards={DECOR_PROMO_CARDS} />
      <CategoryGrid title="Home Decor" items={DECOR_GRID_6} cols={3} />
      <BrandFilterRow brands={DECOR_BRAND_FILTERS} />
      <CategoryGrid items={DECOR_GRID_4} cols={4} />
      <LifestyleGrid items={DECOR_LIFESTYLE} />
      <ExploreMoreHeader />
      <CatalogShelves parentSlug="home" limitPerShelf={10} />
    </>
  );
}

/** Beauty — natural care (products from Eco category) */
export function BeautyCategoryView() {
  return (
    <>
      <SubCategoryIconRow items={BEAUTY_SUB_ICONS} />
      <CategoryGrid title="Natural Beauty" items={BEAUTY_GRID} cols={3} />
      <BrandFilterRow brands={BEAUTY_BRAND_FILTERS} />
      <CatalogShelves parentSlug="eco" limitPerShelf={10} />
    </>
  );
}
