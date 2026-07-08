import { Link } from 'react-router-dom';
import { Icon } from '../ui/primitives';
import { imageUrl } from '../../data/images';
import { OptimizedImage } from '../ui/OptimizedImage';
import type { BrandFilterPill, GridCategory, PromoCard, SubCategoryChip } from '../../data/zeptoCategoryPages';
import { HorizontalScrollRow } from './HorizontalScrollRow';

export function SubCategoryIconRow({ items }: { items: SubCategoryChip[] }) {
  return (
    <HorizontalScrollRow
      className="border-b border-gray-50 py-3"
      innerClassName="flex gap-3 overflow-x-auto hide-scrollbar px-4"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          to="/products"
          className="shrink-0 flex flex-col items-center w-[76px]"
        >
          <div className="w-14 h-14 rounded-full bg-[#f5f5f5] border border-gray-100 overflow-hidden mb-1.5 p-1">
            <img src={item.image} alt="" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="text-[10px] font-semibold text-center text-gray-800 leading-tight">
            {item.label}
          </span>
        </Link>
      ))}
    </HorizontalScrollRow>
  );
}

/** Zepto homepage top carousel — rectangular image cards with labels */
export function CategoryCarouselRow({ items }: { items: SubCategoryChip[] }) {
  return (
    <section className="bg-white border-b border-gray-100 py-3 md:py-4">
      <HorizontalScrollRow
        arrowStyle="zepto"
        innerClassName="flex gap-2 md:gap-2.5 overflow-x-auto hide-scrollbar px-6 md:px-8 scroll-smooth"
      >
        {items.map((item) => (
          <Link
            key={item.label}
            to="/products"
            className="shrink-0 w-[68px] md:w-[76px] group"
          >
            <div className="aspect-square rounded-xl bg-[#f3f4f6] border border-gray-100 overflow-hidden mb-1.5 p-1.5 group-hover:shadow-sm transition-shadow">
              <OptimizedImage
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                width={76}
                height={76}
              />
            </div>
            <p className="text-[10px] md:text-[11px] font-bold text-ink text-center leading-tight line-clamp-2">
              {item.label}
            </p>
          </Link>
        ))}
      </HorizontalScrollRow>
    </section>
  );
}

export function DualPromoBanners() {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 mb-5">
      <div className="rounded-2xl bg-gradient-to-br from-primary to-[#2d6a4f] p-4 text-white min-h-[120px] flex flex-col justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide opacity-80">All New</p>
          <p className="text-sm font-black leading-tight">LeafyLand Experience</p>
          <p className="text-lg font-black">₹0 FEES</p>
          <p className="text-[9px] opacity-80 mt-1">Handling · Delivery · Rain</p>
        </div>
        <span className="text-[10px] font-bold bg-white/20 self-start px-2 py-0.5 rounded">Know more</span>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-[#40916c] to-[#74c69d] p-4 text-white min-h-[130px] md:min-h-[140px] flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10 max-w-[58%]">
          <p className="text-xs font-black tracking-wide">PLANT CORNER</p>
          <p className="text-[11px] opacity-95 mt-1 leading-snug">Live plants & pots</p>
        </div>
        <Link to="/products" className="relative z-10 text-[10px] font-bold bg-white text-primary self-start px-3 py-1.5 rounded-full shadow-sm">
          Order now ›
        </Link>
        <OptimizedImage
          src={imageUrl('plantCorner', 'banner')}
          alt="Potted plants"
          className="absolute right-0 top-0 h-full w-[52%] object-cover object-center"
          width={400}
          height={280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#40916c]/90 via-[#40916c]/40 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export function BrandMarquee({ brands }: { brands: { name: string }[] }) {
  return (
    <section className="mb-6 bg-[#fafafa] py-4 border-y border-gray-100">
      <p className="text-center text-xs font-bold text-gray-600 mb-3">200+ Trusted Brands</p>
      <HorizontalScrollRow innerClassName="flex gap-3 overflow-x-auto hide-scrollbar px-4">
        {brands.map((b) => (
          <div
            key={b.name}
            className="shrink-0 px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700"
          >
            {b.name}
          </div>
        ))}
      </HorizontalScrollRow>
    </section>
  );
}

/** Zepto Home — filterable brand pill rows between category grids */
export function BrandFilterRow({ brands }: { brands: BrandFilterPill[] }) {
  return (
    <section className="mb-5">
      <HorizontalScrollRow innerClassName="flex gap-2 overflow-x-auto hide-scrollbar px-4 pb-1">
        {brands.map((b) => (
          <Link
            key={b.name}
            to={`/products?q=${encodeURIComponent(b.name)}`}
            className="shrink-0 flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white border border-gray-200 hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <span className="w-7 h-7 rounded-full overflow-hidden bg-[#f3f4f6] flex items-center justify-center shrink-0">
              {b.logo ? (
                <img src={b.logo} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] font-black text-primary">{b.name.slice(0, 2).toUpperCase()}</span>
              )}
            </span>
            <span className="text-[11px] font-semibold text-gray-800 whitespace-nowrap">{b.name}</span>
          </Link>
        ))}
      </HorizontalScrollRow>
    </section>
  );
}

export function PromoCardsGrid({ cards }: { cards: PromoCard[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 mb-6">
      {cards.map((card) => (
        <Link
          key={card.title}
          to="/products"
          className={`relative rounded-2xl overflow-hidden min-h-[100px] bg-gradient-to-br ${card.gradient} p-3 text-white flex flex-col justify-end`}
        >
          <img
            src={card.image}
            alt=""
            className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-40"
          />
          <div className="relative z-10">
            <p className="text-xs font-bold leading-tight">{card.title}</p>
            <p className="text-[10px] opacity-90">{card.subtitle}</p>
            <span className="inline-block mt-1 text-[9px] font-bold bg-white/25 px-2 py-0.5 rounded">
              {card.cta}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function CategoryGrid({
  title,
  items,
  cols = 3,
}: {
  title?: string;
  items: GridCategory[];
  cols?: 3 | 4 | 6;
}) {
  const colClass = cols === 6 ? 'grid-cols-3 sm:grid-cols-6' : cols === 4 ? 'grid-cols-4' : 'grid-cols-3';
  return (
    <section className="mb-6 px-4">
      {title && <h2 className="text-[15px] font-bold text-ink mb-3">{title}</h2>}
      <div className={`grid ${colClass} gap-3`}>
        {items.map((item) => (
          <Link key={item.label} to="/products" className="group">
            <div className="aspect-square rounded-xl bg-[#f7f7f7] border border-gray-100 overflow-hidden mb-1.5">
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-[10px] font-semibold text-gray-800 leading-tight line-clamp-2">
              {item.label}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function LifestyleGrid({ items }: { items: GridCategory[] }) {
  return (
    <section className="mb-6 px-4">
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <Link key={item.label} to="/products" className="group">
            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-1.5">
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-[10px] font-semibold text-gray-800">{item.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ExploreMoreHeader() {
  return (
    <div className="px-4 mb-3">
      <h2 className="text-xl font-black text-ink">Explore more</h2>
    </div>
  );
}

export function DeliveryBadge({ mins = 10 }: { mins?: number }) {
  return (
    <span className="absolute bottom-2 left-2 flex items-center gap-0.5 bg-white/95 text-primary text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
      <Icon name="schedule" className="w-3 h-3" />
      {mins} mins
    </span>
  );
}
