import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/ui/primitives';
import {
  CATALOGUE_NAV,
  CATALOGUE_HERO,
  CATALOGUE_PROCESS,
  GOVT_SECTION,
  CATALOGUE_SECTIONS,
  type CatalogueCard,
  type CatalogueSection,
} from '../data/catalogueData';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function CatalogueCardBlock({ card }: { card: CatalogueCard }) {
  const inner = (
  <>
    <div className="aspect-[4/3] overflow-hidden rounded-t-2xl bg-[#f5f5f5]">
      <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
    </div>
    <div className="p-4 md:p-5">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-ink text-base leading-tight">{card.title}</h3>
        <span className="shrink-0 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap">{card.priceRange}</span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{card.description}</p>
      {card.popularItems && card.popularItems.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Popular Items</p>
          <div className="flex flex-wrap gap-1.5">
            {card.popularItems.map((item) => (
              <span key={item} className="text-[11px] bg-gray-50 border border-gray-100 text-gray-700 px-2 py-0.5 rounded-md">{item}</span>
            ))}
          </div>
        </div>
      )}
      <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
        Learn more <Icon name="arrow_forward" className="w-4 h-4" />
      </span>
    </div>
  </>
  );

  if (card.ctaTo) {
    return (
      <Link to={card.ctaTo} className="group block rounded-2xl border border-[#E5E5E5] bg-white hover:border-primary/40 hover:shadow-lg transition-all overflow-hidden">
        {inner}
      </Link>
    );
  }
  return (
    <article className="group rounded-2xl border border-[#E5E5E5] bg-white hover:border-primary/40 hover:shadow-lg transition-all overflow-hidden">
      {inner}
    </article>
  );
}

function SectionBlock({ section }: { section: CatalogueSection }) {
  return (
    <section id={section.id} className="scroll-mt-28 py-10 border-b border-[#E5E5E5] last:border-0">
      <div className="mb-6">
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Section {section.number}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-ink">{section.title}</h2>
        {section.subtitle && <p className="text-sm md:text-base text-gray-600 mt-2 max-w-3xl">{section.subtitle}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
        {section.cards.map((card) => (
          <CatalogueCardBlock key={card.title} card={card} />
        ))}
      </div>

      {section.bundles && section.bundles.length > 0 && (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {section.bundles.map((b) => (
            <div key={b.title} className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="font-bold text-ink text-sm">{b.title}</p>
              <p className="text-primary font-bold text-lg mt-1">{b.price}</p>
              <p className="text-xs text-gray-600 mt-1">{b.description}</p>
            </div>
          ))}
        </div>
      )}

      {section.rateHeaders && section.rateRows && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-[#E5E5E5]">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-ink">Area</th>
                {section.rateHeaders.slice(1).map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-ink">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rateRows.map((row) => (
                <tr key={row.label} className="border-t border-[#E5E5E5]">
                  <td className="px-4 py-3 text-gray-700 font-medium">{row.label}</td>
                  {row.cols.map((c, i) => (
                    <td key={i} className="px-4 py-3 text-gray-600">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.note && <p className="text-xs text-gray-500 mt-3">* {section.note}</p>}
    </section>
  );
}

export function CataloguePage() {
  const [activeId, setActiveId] = useState(CATALOGUE_NAV[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ids = CATALOGUE_NAV.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white min-h-screen pb-16 md:pb-8">
      {/* Mobile category toggle */}
      <div className="lg:hidden sticky top-[68px] z-30 bg-white border-b border-[#E5E5E5] px-4 py-2">
        <button
          type="button"
          onClick={() => setSidebarOpen((v) => !v)}
          className="flex items-center gap-2 text-sm font-semibold text-ink"
        >
          <Icon name="menu" className="w-5 h-5" />
          Catalogue Menu
          <span className="text-xs text-gray-500 font-normal">({CATALOGUE_NAV.length} categories)</span>
        </button>
        {sidebarOpen && (
          <div className="mt-2 max-h-64 overflow-y-auto rounded-xl border border-[#E5E5E5] bg-white shadow-lg p-2">
            {CATALOGUE_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { scrollToSection(item.id); setSidebarOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeId === item.id ? 'bg-primary text-white font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto border-r border-[#E5E5E5] px-4 py-6">
          <h2 className="text-sm font-bold text-ink mb-1">Catalogue Menu</h2>
          <p className="text-xs text-gray-500 mb-4">{CATALOGUE_NAV.length} categories</p>
          <nav className="space-y-0.5">
            {CATALOGUE_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeId === item.id
                    ? 'bg-primary text-white font-semibold'
                    : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 pt-6 border-t border-[#E5E5E5]">
            <p className="text-xs font-semibold text-ink mb-2">Need Help?</p>
            <a href="tel:+919867909355" className="text-sm text-primary font-semibold hover:underline">
              Call: +91 98679 09355
            </a>
          </div>
        </aside>

        {/* Main content */}
        <div ref={mainRef} className="flex-1 min-w-0 px-4 lg:px-10 py-6 lg:py-10">
          {/* Hero */}
          <header className="mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">{CATALOGUE_HERO.tagline}</p>
            <h1 className="text-3xl md:text-5xl font-bold text-ink leading-tight mb-3">
              LEAFYLAND<br />
              <span className="text-primary">{CATALOGUE_HERO.title}</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mb-2">{CATALOGUE_HERO.subtitle}</p>
            <p className="text-sm italic text-gray-500 mb-6">&ldquo;{CATALOGUE_HERO.quote}&rdquo;</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {CATALOGUE_HERO.pills.map((pill) => (
                <span key={pill} className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">{pill}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              <button
                type="button"
                onClick={() => scrollToSection('plants')}
                className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
              >
                Explore Catalogue
              </button>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors"
              >
                Book Consultation
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CATALOGUE_HERO.stats.map((s) => (
                <div key={s.label} className="text-center p-4 rounded-2xl bg-primary/5 border border-primary/10">
                  <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-gray-600 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </header>

          {/* Process */}
          <section className="mb-12 py-8 px-4 md:px-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
            <h2 className="text-xl md:text-2xl font-bold text-ink mb-1">End-to-End Eco Delivery Process</h2>
            <p className="text-sm text-gray-600 mb-6">Your journey from vision to verdant reality</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATALOGUE_PROCESS.map((step) => (
                <div key={step.step} className="flex gap-3 p-4 rounded-xl bg-white border border-[#E5E5E5]">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">{step.step}</span>
                  <div>
                    <p className="font-bold text-ink text-sm">{step.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Government section */}
          <section className="mb-12 py-8 px-4 md:px-8 rounded-2xl border border-[#E5E5E5] bg-gradient-to-br from-primary/5 via-white to-primary/[0.03]">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Government Environmental Solutions</p>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-1">{GOVT_SECTION.title}</h2>
            <p className="text-sm text-gray-600 mb-1">{GOVT_SECTION.subtitle}</p>
            <p className="text-sm italic text-gray-500 mb-6">&ldquo;{GOVT_SECTION.quote}&rdquo;</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-sm mb-3 text-primary">Government Environmental Products</h3>
                <p className="text-xs text-gray-500 mb-3">Bulk Supply: 10,000 to 10,00,000 units</p>
                <div className="space-y-2">
                  {GOVT_SECTION.products.map((p) => (
                    <div key={p.title} className="p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-primary/30 transition-colors">
                      <p className="font-semibold text-sm text-ink">{p.title}</p>
                      <p className="text-xs text-gray-600">{p.items}</p>
                      <p className="text-xs font-bold text-primary mt-1">{p.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-3 text-primary">Government Eco-Infra Services</h3>
                <div className="space-y-2">
                  {GOVT_SECTION.services.map((s) => (
                    <div key={s.title} className="p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-primary/30 transition-colors">
                      <p className="font-semibold text-sm text-ink">{s.title}</p>
                      <p className="text-xs text-gray-600">{s.desc}</p>
                      <p className="text-xs font-bold text-primary mt-1">{s.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3 text-primary">Environmental Engineering Services</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {GOVT_SECTION.engineering.map((e) => (
                  <div key={e.title} className="p-3 rounded-xl bg-white border border-[#E5E5E5] text-sm hover:border-primary/30 transition-colors">
                    <span className="font-medium text-ink">{e.title}</span>
                    <span className="text-primary font-bold ml-2">{e.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">G-SPEC Delivery Model</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {GOVT_SECTION.process.map((step, i) => (
                  <p key={i} className="text-xs text-gray-700 p-3 rounded-xl bg-white border border-[#E5E5E5]">{i + 1}. {step}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {GOVT_SECTION.badges.map((b) => (
                <span key={b} className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">{b}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/contact?type=government" className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors">
                Request DPR Quote
              </Link>
              <Link to="/contact?type=government-sales" className="px-5 py-2.5 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors">
                Contact Govt Sales Team
              </Link>
            </div>
          </section>

          {/* 30 catalogue sections */}
          {CATALOGUE_SECTIONS.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}

          {/* Bottom CTA */}
          <section className="mt-10 py-10 px-6 rounded-2xl bg-primary text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Ready to build your green future?</h2>
            <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">
              From a single plant to a full landscape — our team is ready to help you every step of the way.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/products" className="px-6 py-3 rounded-xl bg-white text-primary font-bold text-sm hover:bg-gray-100">
                Shop Products
              </Link>
              <Link to="/contact" className="px-6 py-3 rounded-xl border-2 border-white text-white font-bold text-sm hover:bg-white/10">
                Get a Free Quote
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
