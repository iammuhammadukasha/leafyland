import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Icon } from '../ui/primitives';
import { ZEPTO_CATEGORY_TABS } from '../../data/zeptoFeedData';

const PIN_KEY = 'll_pincode';

export function getSavedPincode() {
  try {
    return localStorage.getItem(PIN_KEY) || '';
  } catch {
    return '';
  }
}

export function savePincode(pin: string) {
  localStorage.setItem(PIN_KEY, pin);
}

function SearchBar({ className = '' }: { className?: string }) {
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const q = new FormData(e.currentTarget).get('q')?.toString().trim();
        if (q) navigate(`/products?q=${encodeURIComponent(q)}`);
      }}
      className={`flex items-center gap-2 rounded-xl bg-[#f3f4f6] px-3 py-2.5 border border-gray-100 ${className}`}
    >
      <Icon name="search" className="w-5 h-5 text-gray-400 shrink-0" />
      <input
        name="q"
        type="search"
        placeholder='Search for "mango"'
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 min-w-0"
      />
    </form>
  );
}

export function ZeptoHeader() {
  const { user } = useAuth();
  const { count, openDrawer } = useCart();
  const [pin, setPin] = useState(getSavedPincode());

  const accountHref =
    user?.role === 'ADMIN' ? '/admin' : user?.role === 'VENDOR' ? '/vendor' : '/login';
  const accountLabel = user?.role === 'ADMIN' ? 'Admin' : user ? 'Account' : 'Login';

  const pickLocation = () => {
    const next = window.prompt('Enter delivery pincode', pin || '400001');
    if (next?.trim()) {
      savePincode(next.trim());
      setPin(next.trim());
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Desktop: logo+location | search | login+cart — Zepto row 1 */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3 shrink-0 min-w-[200px]">
            <Link to="/" className="shrink-0">
              <span className="text-[26px] font-black text-primary tracking-tight leading-none">
                leafyland
              </span>
            </Link>
            <button type="button" onClick={pickLocation} className="text-left min-w-0">
              <p className="text-[11px] font-bold text-ink flex items-center gap-1 leading-tight">
                <Icon name="bolt" className="w-3.5 h-3.5 text-primary shrink-0" />
                Delivery in <span className="text-primary">10 mins</span>
              </p>
              <p className="text-[11px] text-gray-500 flex items-center gap-0.5 truncate">
                {pin ? (
                  <>
                    {pin}, Mumbai
                    <Icon name="expand_more" className="w-3.5 h-3.5 shrink-0" />
                  </>
                ) : (
                  <span className="text-primary font-semibold">Select Location ›</span>
                )}
              </p>
            </button>
          </div>

          <SearchBar className="flex-1 max-w-xl mx-auto" />

          <div className="flex items-center gap-5 shrink-0">
            <Link
              to={accountHref}
              className="flex flex-col items-center gap-0.5 text-[11px] font-semibold text-ink hover:text-primary transition-colors"
            >
              <Icon name="person" className="w-6 h-6" />
              {accountLabel}
            </Link>
            <button
              type="button"
              onClick={openDrawer}
              className="relative flex flex-col items-center gap-0.5 text-[11px] font-semibold text-ink hover:text-primary transition-colors"
            >
              <Icon name="shopping_cart" className="w-6 h-6" />
              Cart
              {count > 0 && (
                <span className="absolute -top-1 right-0 min-w-[16px] h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center px-1">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden">
          <div className="flex items-start gap-3">
            <Link to="/" className="shrink-0 pt-0.5">
              <span className="text-2xl font-black text-primary tracking-tight">leafyland</span>
            </Link>
            <button type="button" onClick={pickLocation} className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-bold text-ink flex items-center gap-1">
                <Icon name="bolt" className="w-3.5 h-3.5 text-primary" />
                Delivery in <span className="text-primary">10 mins</span>
              </p>
              <p className="text-[10px] text-gray-500 truncate flex items-center gap-0.5">
                {pin ? (
                  <>
                    {pin}, Mumbai
                    <Icon name="expand_more" className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <span className="text-primary font-semibold">Select Location</span>
                )}
              </p>
            </button>
            <div className="flex items-center gap-3 shrink-0 pt-1">
              <Link to={accountHref} className="flex flex-col items-center gap-0.5 text-[10px] font-semibold">
                <Icon name="person" className="w-5 h-5" />
                {accountLabel}
              </Link>
              <button
                type="button"
                onClick={openDrawer}
                className="relative flex flex-col items-center gap-0.5 text-[10px] font-semibold"
              >
                <Icon name="shopping_cart" className="w-5 h-5" />
                Cart
                {count > 0 && (
                  <span className="absolute -top-1 right-0 min-w-[16px] h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center px-1">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
          <SearchBar className="mt-3" />
        </div>
      </div>
    </header>
  );
}

export function CategoryRibbon({
  activeSlug,
  onChange,
}: {
  activeSlug: string;
  onChange: (slug: string) => void;
}) {
  return (
    <div className="sticky top-[57px] md:top-[65px] z-40 bg-white border-b border-gray-200 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <div className="max-w-6xl mx-auto flex gap-0 overflow-x-auto hide-scrollbar px-2 md:px-4">
        {ZEPTO_CATEGORY_TABS.map((tab) => {
          const active = activeSlug === tab.slug;
          return (
            <button
              key={tab.slug}
              type="button"
              onClick={() => onChange(tab.slug)}
              className={`shrink-0 flex flex-col items-center gap-1 px-3 md:px-4 py-2.5 border-b-2 transition-colors min-w-[56px] ${
                active
                  ? 'text-primary border-primary'
                  : 'text-gray-600 border-transparent hover:text-ink'
              }`}
            >
              <Icon
                name={tab.icon}
                className={`w-5 h-5 ${active ? 'text-primary' : 'text-gray-500'}`}
              />
              <span className="text-[11px] md:text-xs font-semibold whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
