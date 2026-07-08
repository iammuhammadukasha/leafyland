import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../ui/primitives';
import { MEGA_MENU_SECTIONS } from '../../data/megaMenuSections';

export function CategoriesMega({ onClose }: { onClose: () => void }) {
  const [activeId, setActiveId] = useState(MEGA_MENU_SECTIONS[0]?.id ?? 'products');
  const active = MEGA_MENU_SECTIONS.find((s) => s.id === activeId) ?? MEGA_MENU_SECTIONS[0];

  return (
    <div className="absolute left-0 right-0 top-full bg-white border-t border-black/10 shadow-xl z-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-5 flex items-center gap-2">
          <Icon name="grid_view" className="w-4 h-4" />
          All Categories
        </p>

        <div className="flex gap-0 min-h-[280px] rounded-2xl border border-black/8 overflow-hidden">
          {/* Left sidebar */}
          <div className="w-52 shrink-0 bg-[#fafafa] border-r border-black/8 py-2">
            {MEGA_MENU_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                onMouseEnter={() => setActiveId(section.id)}
                onFocus={() => setActiveId(section.id)}
                onClick={() => setActiveId(section.id)}
                className={`flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors text-left ${
                  activeId === section.id
                    ? 'bg-white text-primary border-r-2 border-primary -mr-px'
                    : 'text-ink/70 hover:text-ink hover:bg-white/60'
                }`}
              >
                <Icon name={section.icon} className="w-4 h-4 shrink-0" />
                {section.label}
              </button>
            ))}
          </div>

          {/* Right panel */}
          <div className="flex-1 p-6 md:p-8">
            {active && (
              <>
                <h3 className="text-base font-bold text-ink mb-4 flex items-center gap-2">
                  <Icon name={active.icon} className="w-5 h-5 text-primary" />
                  {active.label}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {active.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={onClose}
                      className="py-2.5 px-3 rounded-lg text-sm text-ink/80 hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-5 text-xs">
          <Link to="/products" onClick={onClose} className="font-semibold text-primary hover:underline">
            All Products →
          </Link>
          <Link to="/services" onClick={onClose} className="font-semibold text-primary hover:underline">
            All Services →
          </Link>
        </div>
      </div>
    </div>
  );
}
