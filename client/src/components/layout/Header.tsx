import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Icon } from '../ui/primitives';
import { ECOSYSTEM_NAV } from '../../data/headerData';
import {
  GARDEN_PRODUCT_CATEGORIES,
  MARKETPLACE_PRODUCT_CATEGORIES,
  SERVICE_CATEGORIES,
} from '../../data/categoryNav';
import { CategoriesMega } from './CategoriesMega';
import { ExpertsMega } from './ExpertsMega';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [expertsOpen, setExpertsOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [mobileCatTab, setMobileCatTab] = useState<'garden' | 'marketplace' | 'services'>('garden');
  const [mobileCatQuery, setMobileCatQuery] = useState('');
  const { count, openDrawer } = useCart();
  const location = useLocation();
  const catsRef = useRef<HTMLDivElement | null>(null);

  const mobileCatList = useMemo(() => {
    const q = mobileCatQuery.trim().toLowerCase();
    const list =
      mobileCatTab === 'garden'
        ? GARDEN_PRODUCT_CATEGORIES
        : mobileCatTab === 'marketplace'
          ? MARKETPLACE_PRODUCT_CATEGORIES
          : SERVICE_CATEGORIES;
    if (!q) return list;
    return list.filter((c) => c.label.toLowerCase().includes(q) || c.slug.includes(q));
  }, [mobileCatTab, mobileCatQuery]);

  // Close menus on route change.
  useEffect(() => {
    setCategoriesOpen(false);
    setExpertsOpen(false);
    setMenuOpen(false);
    setMobileCatsOpen(false);
    setMobileCatQuery('');
  }, [location]);

  // Close categories mega on outside click / Escape.
  useEffect(() => {
    if (!categoriesOpen && !expertsOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (catsRef.current && !catsRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
        setExpertsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCategoriesOpen(false);
        setExpertsOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [categoriesOpen, expertsOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/10 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
        {/* Row 1 — logo, search, utilities */}
        <div className="flex items-center gap-4 lg:gap-8 h-[68px] lg:h-[76px]">
          <button
            type="button"
            className="lg:hidden p-2 -ml-2 shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <Icon name="menu" className="w-6 h-6 text-ink" />
          </button>

          <Link to="/" className="shrink-0 group">
            <span className="font-display text-[1.65rem] lg:text-[1.85rem] font-medium tracking-[0.22em] uppercase text-primary block leading-none">
              LeafyLand
            </span>
            <span className="block w-1 h-1 rounded-full bg-primary mx-auto mt-1.5 group-hover:scale-125 transition-transform" />
          </Link>

          <form action="/products" className="hidden md:flex flex-1 max-w-xl mx-auto">
            <div className="relative w-full">
              <input
                name="q"
                type="search"
                placeholder="Search products, services, experts…"
                className="w-full h-11 pl-5 pr-12 rounded-full border border-black/12 bg-white text-sm text-ink placeholder:text-muted/70 outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-muted hover:text-primary"
                aria-label="Search"
              >
                <Icon name="search" className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-3 lg:gap-4 ml-auto shrink-0">
            <Link
              to="/signup"
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-white text-[13px] font-bold tracking-wide hover:bg-primary-hover transition-colors"
            >
              Join Now
            </Link>
            <Link
              to="/login"
              className="hidden sm:flex text-ink hover:text-primary transition-colors p-1"
              aria-label="Wishlist"
            >
              <Icon name="favorite_border" className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="hidden sm:flex text-ink hover:text-primary transition-colors p-1"
              aria-label="Account"
            >
              <Icon name="person_outline" className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={openDrawer}
              className="relative flex items-center justify-center w-9 h-9 rounded-full bg-ink text-white hover:bg-primary transition-colors"
              aria-label="Open cart"
            >
              <Icon name="shopping_bag" className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] font-bold h-4 min-w-4 px-0.5 rounded-full flex items-center justify-center border border-white">
                {count}
              </span>
            </button>
          </div>
        </div>

        {/* Row 2 — Categories mega + ecosystem nav */}
        <nav
          ref={catsRef}
          className="hidden lg:flex items-stretch border-t border-black/8 -mx-4 lg:-mx-10 px-4 lg:px-10 relative"
          onMouseLeave={() => setExpertsOpen(false)}
        >
          <div className="flex items-center shrink-0 mr-4">
            <button
              type="button"
              onClick={() => {
                setCategoriesOpen((v) => !v);
                setExpertsOpen(false);
              }}
              aria-expanded={categoriesOpen}
              className={`inline-flex items-center gap-2 my-2 px-4 py-2 rounded-full text-[13px] font-bold transition-colors ${
                categoriesOpen
                  ? 'bg-primary text-white'
                  : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
              }`}
            >
              <Icon name="grid_view" className="w-4 h-4" />
              Categories
              <Icon
                name="expand_more"
                className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          <div className="flex items-center gap-5 xl:gap-7 overflow-x-auto hide-scrollbar">
            {ECOSYSTEM_NAV.map((item) => {
              const active =
                item.to === location.pathname + location.search ||
                (item.to === '/' && location.pathname === '/');
              const isExperts = item.mega === 'experts';

              if (isExperts) {
                return (
                  <div
                    key={item.label}
                    className="relative shrink-0"
                    onMouseEnter={() => {
                      setExpertsOpen(true);
                      setCategoriesOpen(false);
                    }}
                  >
                    <Link
                      to={item.to}
                      className={`inline-flex items-center gap-1.5 py-4 text-[13px] font-medium tracking-wide whitespace-nowrap transition-colors border-b-2 ${
                        active || expertsOpen
                          ? 'text-ink border-ink'
                          : 'text-ink/80 border-transparent hover:text-primary'
                      }`}
                    >
                      <Icon name={item.icon} className="w-4 h-4 shrink-0 opacity-80" />
                      {item.label}
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`inline-flex items-center gap-1.5 py-4 text-[13px] font-medium tracking-wide whitespace-nowrap transition-colors border-b-2 shrink-0 ${
                    active
                      ? 'text-ink border-ink'
                      : 'text-ink/80 border-transparent hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon} className="w-4 h-4 shrink-0 opacity-80" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {categoriesOpen && <CategoriesMega onClose={() => setCategoriesOpen(false)} />}
          {expertsOpen && <ExpertsMega onClose={() => setExpertsOpen(false)} />}
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-black/10 bg-white max-h-[82vh] overflow-y-auto">
          <form action="/products" className="p-4 border-b border-black/6">
            <div className="relative">
              <input
                name="q"
                type="search"
                placeholder="Search products, services, experts…"
                className="w-full h-11 pl-4 pr-12 rounded-full border border-black/12 text-sm outline-none focus:border-primary"
              />
              <Icon name="search" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            </div>
          </form>

          {/* Categories accordion */}
          <div className="border-b border-black/6">
            <button
              type="button"
              onClick={() => setMobileCatsOpen((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-3.5 text-sm font-semibold text-ink"
            >
              <span className="inline-flex items-center gap-2">
                <Icon name="grid_view" className="w-5 h-5 text-primary" />
                All Categories
              </span>
              <Icon name={mobileCatsOpen ? 'expand_less' : 'expand_more'} className="w-5 h-5 text-muted" />
            </button>
            {mobileCatsOpen && (
              <div className="px-4 pb-4">
                <input
                  type="search"
                  value={mobileCatQuery}
                  onChange={(e) => setMobileCatQuery(e.target.value)}
                  placeholder="Search categories…"
                  className="w-full h-9 px-3 mb-3 rounded-lg border border-black/12 text-sm outline-none focus:border-primary"
                />
                <div className="flex gap-1 mb-3 overflow-x-auto hide-scrollbar">
                  {(
                    [
                      { id: 'garden' as const, label: 'Garden' },
                      { id: 'marketplace' as const, label: 'Marketplace' },
                      { id: 'services' as const, label: 'Services' },
                    ] as const
                  ).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setMobileCatTab(t.id)}
                      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                        mobileCatTab === t.id
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-ink/70 border-black/12'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-0.5 max-h-52 overflow-y-auto">
                  {mobileCatList.length === 0 ? (
                    <p className="py-4 text-center text-sm text-muted">No categories found</p>
                  ) : (
                    mobileCatList.map((c) => (
                      <Link
                        key={c.slug}
                        to={c.viewAllTo}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 py-2 text-sm text-ink/80"
                      >
                        <Icon name={c.icon} className="text-primary/70 text-base shrink-0" />
                        {c.label}
                      </Link>
                    ))
                  )}
                </div>
                <Link
                  to={mobileCatTab === 'services' ? '/services' : '/products'}
                  onClick={() => setMenuOpen(false)}
                  className="inline-block mt-3 text-xs font-semibold text-primary"
                >
                  View all {mobileCatTab === 'services' ? 'services' : 'products'} →
                </Link>
              </div>
            )}
          </div>

          {/* Ecosystem nav */}
          {ECOSYSTEM_NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3.5 text-sm font-medium text-ink border-b border-black/6"
            >
              <Icon name={item.icon} className="w-4 h-4 text-primary/70 shrink-0" />
              {item.label}
            </Link>
          ))}

          <div className="px-4 py-4 flex flex-col gap-2">
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="inline-flex justify-center items-center px-5 py-3 rounded-full bg-primary text-white text-sm font-bold"
            >
              Join Now
            </Link>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="inline-flex justify-center items-center px-5 py-3 rounded-full border border-black/15 text-sm font-medium text-ink"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
