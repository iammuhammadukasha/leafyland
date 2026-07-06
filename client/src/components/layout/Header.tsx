import { useState } from 'react'
import { CATEGORY_STRIP, NAV_LINKS } from '../../data/homeData'
import { Icon } from '../ui/primitives'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5] shadow-sm md:shadow-none">
      {/* Row 1 — utility bar */}
      <div className="hidden md:flex items-center justify-between h-[72px] px-4 lg:px-8 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <Icon name="eco" className="text-primary text-4xl filled" />
            <span className="text-xl font-bold text-primary">LeafyLand</span>
          </a>
          <button type="button" className="flex items-center gap-1 text-left">
            <Icon name="location_on" className="text-primary text-lg" />
            <div>
              <span className="text-[10px] text-black block leading-tight">Deliver to</span>
              <span className="text-sm font-semibold text-black flex items-center">
                Mumbai
                <Icon name="arrow_drop_down" className="text-lg" />
              </span>
            </div>
          </button>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50" />
            <input
              type="search"
              placeholder="Search plants, soil, landscaping, services..."
              className="w-full h-11 pl-12 pr-4 border border-[#E5E5E5] rounded-lg text-sm text-black placeholder:text-black/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href="tel:+919867909355" className="text-sm font-semibold text-black hidden lg:block">
            +91 98679 09355
          </a>
          <a
            href="https://wa.me/919867909355"
            target="_blank"
            rel="noreferrer"
            className="text-primary"
            aria-label="WhatsApp"
          >
            <Icon name="chat" className="text-2xl filled" />
          </a>
          <button type="button" className="flex items-center gap-1 text-black hover:text-primary transition-colors">
            <Icon name="person_outline" />
            <span className="text-sm font-semibold">Login</span>
          </button>
          <button type="button" className="relative text-black hover:text-primary transition-colors">
            <Icon name="shopping_cart" className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
          <Icon name="account_circle" className="text-2xl cursor-pointer hover:text-primary transition-colors" />
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2">
          <Icon name="eco" className="text-primary text-3xl filled" />
          <span className="text-lg font-bold text-primary">LeafyLand</span>
        </a>
        <div className="flex items-center gap-4 text-black">
          <Icon name="search" className="text-2xl" />
          <button type="button" className="relative">
            <Icon name="shopping_cart" className="text-2xl" />
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <Icon name="menu" className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Row 2 — main nav (desktop) */}
      <div className="hidden md:flex items-center justify-between h-14 px-4 lg:px-8 max-w-[1440px] mx-auto border-t border-[#E5E5E5]">
        <nav className="flex items-center gap-5 overflow-x-auto hide-scrollbar whitespace-nowrap">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className={`text-sm font-semibold pb-0.5 transition-colors ${
                i === 0 ? 'text-primary border-b-2 border-primary' : 'text-black hover:text-primary'
              }`}
            >
              {link}
            </a>
          ))}
        </nav>
        <button type="button" className="bg-primary text-white font-bold px-5 py-2 rounded-lg text-sm hover:bg-primary-hover transition-colors shrink-0 ml-4">
          Join Network
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-[#E5E5E5] bg-white px-4 py-3 space-y-2 max-h-[70vh] overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="block text-sm font-semibold text-black py-2 border-b border-[#f0f0f0]">
              {link}
            </a>
          ))}
          <button type="button" className="w-full bg-primary text-white font-bold py-3 rounded-lg mt-2">
            Join Network
          </button>
        </nav>
      )}

      {/* Row 3 — Zepto-style category strip */}
      <div className="border-t border-[#E5E5E5] py-3">
        <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar px-4 lg:px-8 max-w-[1440px] mx-auto">
          {CATEGORY_STRIP.map((cat, i) => (
            <button
              key={cat.label}
              type="button"
              className="flex flex-col items-center gap-1.5 min-w-[64px] flex-shrink-0 group"
            >
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-colors ${
                  i === 0 ? 'border-primary bg-primary/5' : 'border-[#E5E5E5] group-hover:border-primary'
                }`}
              >
                <Icon name={cat.icon} className={`text-xl md:text-2xl ${i === 0 ? 'text-primary' : 'text-black'}`} />
              </div>
              <span className={`text-[10px] md:text-xs font-semibold text-center leading-tight ${i === 0 ? 'text-primary' : 'text-black'}`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
