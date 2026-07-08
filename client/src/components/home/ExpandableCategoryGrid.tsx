import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../ui/primitives';
import type { NavCategory } from '../../data/categoryNav';

type Props = {
  title: string;
  titleIcon?: string;
  subtitle?: string;
  categories: NavCategory[];
};

export function ExpandableCategoryGrid({ title, titleIcon, subtitle, categories }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [rect, setRect] = useState({ top: 0, left: 0, width: 0 });
  const activeCat = categories.find((c) => c.slug === active) ?? null;

  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Position the overlay popover directly under the clicked card's row.
  useLayoutEffect(() => {
    if (!active) return;
    const compute = () => {
      const card = cardRefs.current[active];
      if (!card) return;
      setRect({
        top: card.offsetTop + card.offsetHeight + 8,
        left: card.offsetLeft,
        width: card.offsetWidth,
      });
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [active]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!active) return;
    const onPointer = (e: PointerEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <section ref={sectionRef}>
      <div className="flex items-center justify-center gap-2 mb-1">
        {titleIcon && <Icon name={titleIcon} className="text-primary text-2xl" />}
        <h2 className="text-xl md:text-2xl font-bold text-primary text-center">{title}</h2>
      </div>
      {subtitle ? (
        <p className="text-sm text-black/70 text-center mb-5">{subtitle}</p>
      ) : (
        <div className="mb-5" />
      )}

      <div ref={gridRef} className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat) => {
            const isActive = cat.slug === active;
            return (
              <button
                key={cat.slug}
                ref={(el) => {
                  cardRefs.current[cat.slug] = el;
                }}
                type="button"
                onClick={() => setActive(isActive ? null : cat.slug)}
                aria-expanded={isActive}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 md:p-5 transition-all ${
                  isActive
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-[#E5E5E5] bg-white hover:border-primary hover:shadow-sm'
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    isActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                  }`}
                >
                  <Icon name={cat.icon} className="text-2xl" filled={isActive} />
                </span>
                <span className="text-xs md:text-sm font-semibold text-black text-center leading-tight">
                  {cat.label}
                </span>
                <Icon
                  name="expand_more"
                  className={`text-base text-primary transition-transform ${isActive ? 'rotate-180' : ''}`}
                />
              </button>
            );
          })}
        </div>

        {/* Overlay popover — floats over content below, does not push the layout */}
        {activeCat && (
          <div
            className="absolute z-30 rounded-2xl border border-[#E5E5E5] bg-white shadow-xl overflow-hidden"
            style={{ top: rect.top, left: rect.left, width: rect.width }}
            role="menu"
          >
            <Link
              to={activeCat.viewAllTo}
              onClick={() => setActive(null)}
              className="flex items-center justify-between gap-2 px-4 py-3.5 bg-primary/5 hover:bg-primary/10 transition-colors border-b border-[#E5E5E5]"
            >
              <span className="flex items-center gap-2">
                <Icon name={activeCat.icon} className="text-primary text-xl" />
                <span className="text-sm font-bold text-primary">View All {activeCat.label}</span>
              </span>
              <Icon name="chevron_right" className="text-xl text-primary" />
            </Link>
            <ul className="divide-y divide-[#f0f0f0] max-h-[60vh] overflow-y-auto">
              {activeCat.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={() => setActive(null)}
                    className="flex items-start gap-2.5 px-4 py-3 hover:bg-primary/5 transition-colors"
                  >
                    <Icon name={activeCat.icon} className="text-primary text-lg mt-0.5 shrink-0" />
                    <span>
                      <span className="block text-sm font-semibold text-black">{item.label}</span>
                      {item.desc && <span className="block text-xs text-black/60">{item.desc}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
