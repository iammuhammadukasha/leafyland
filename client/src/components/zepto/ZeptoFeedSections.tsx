import { Link } from 'react-router-dom';
import { Icon } from '../ui/primitives';
import {
  ZEPTO_HERO_BANNERS,
  ZEPTO_HOW_IT_WORKS,
  ZEPTO_SHOP_BY_CATEGORY,
} from '../../data/zeptoFeedData';
import { IMAGES } from '../../data/images';

export function HeroCarousel() {
  const banner = ZEPTO_HERO_BANNERS[0];
  return (
    <div className="px-4 mb-5">
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${banner.gradient} min-h-[140px] flex items-center`}
      >
        <div className="relative z-10 px-5 py-4 text-white max-w-[55%]">
          <p className="text-sm opacity-90">{banner.title}</p>
          <p className="text-xl font-bold leading-tight mb-2">{banner.highlight}</p>
          <span className="inline-block bg-white/20 backdrop-blur text-xs font-bold px-3 py-1 rounded-full">
            {banner.offer}
          </span>
        </div>
        <img
          src={banner.image}
          alt=""
          className="absolute right-0 top-0 h-full w-[50%] object-cover opacity-90"
        />
      </div>
    </div>
  );
}

export function ShopByCategoryRow() {
  return (
    <section className="mb-7">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-[15px] font-bold text-ink">Shop by Category</h2>
        <Link to="/products" className="text-[12px] font-semibold text-primary">
          See All ›
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 pb-1">
        {ZEPTO_SHOP_BY_CATEGORY.map((cat) => (
          <Link
            key={cat.label}
            to="/products"
            className="shrink-0 flex flex-col items-center w-[72px]"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#f7f7f7] border border-gray-100 overflow-hidden mb-1.5">
              <img src={cat.image} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] font-semibold text-center text-gray-800 leading-tight">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function FreshBrandBanner() {
  return (
    <div className="mx-4 mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-[#d8f3dc] to-[#b7e4c7] border border-primary/10">
      <div className="flex items-center gap-4 p-5">
        <div className="flex-1">
          <p className="text-2xl font-black text-primary leading-none mb-1">
            LeafyLand <span className="text-[#40916c]">Fresh</span>
          </p>
          <p className="text-sm font-semibold text-primary/80">Best Prices, Best Quality</p>
        </div>
        <div className="flex -space-x-2">
          <img src={IMAGES.organicFood} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow" />
          <img src={IMAGES.monstera} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow" />
          <img src={IMAGES.peaceLily} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow" />
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="px-4 mb-10">
      <h2 className="text-[15px] font-bold text-ink mb-4 text-center">How it Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ZEPTO_HOW_IT_WORKS.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-gray-100 bg-[#fafafa] p-5 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
              <Icon name={step.icon} className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-ink mb-1">{step.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ZeptoFooter() {
  const categories = [
    'Plants', 'Fresh Fruits', 'Fresh Vegetables', 'Soil & Compost',
    'Garden Tools', 'Home Decor', 'Eco Products', 'Seeds & Bulbs',
  ];
  return (
    <footer className="border-t border-gray-100 bg-[#fafafa] px-4 py-8 pb-24 text-xs text-gray-600">
      <p className="font-bold text-ink text-sm mb-3">Categories</p>
      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-6">
        {categories.map((c) => (
          <Link key={c} to="/products" className="hover:text-primary">{c}</Link>
        ))}
      </div>
      <p className="text-[10px] text-gray-400">© LeafyLand Marketplace · FSSAI Lic. Demo</p>
    </footer>
  );
}
