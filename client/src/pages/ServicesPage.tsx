import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, type Service } from '../lib/api';
import { SectionIntro } from '../components/ui/elevare';
import { Icon } from '../components/ui/primitives';
import { resolveImage, IMAGES } from '../data/images';
import { SERVICE_CATEGORIES, SERVICE_CATEGORY_SLUGS } from '../data/categoryNav';

export function ServicesPage() {
  const [params, setParams] = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const category = params.get('category') || '';

  useEffect(() => {
    api.get<Service[]>('/services').then(setServices);
  }, []);

  const activeCat = SERVICE_CATEGORIES.find((c) => c.slug === category) ?? null;

  const filtered = useMemo(() => {
    if (!category) return services;
    const slugs = SERVICE_CATEGORY_SLUGS[category];
    if (!slugs || slugs.length === 0) return services;
    const matched = services.filter((s) => slugs.includes(s.slug));
    return matched.length > 0 ? matched : services;
  }, [services, category]);

  const setCategory = (slug: string) => {
    const next = new URLSearchParams(params);
    if (!slug) next.delete('category');
    else next.set('category', slug);
    setParams(next);
  };

  return (
    <main className="max-w-[1400px] mx-auto px-4 lg:px-10 py-10 md:py-14">
      <SectionIntro
        title="Green"
        italic="Services"
        subtitle="Book landscaping, maintenance, and garden services at your doorstep."
      />

      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-8 -mt-4">
        <button
          type="button"
          onClick={() => setCategory('')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors ${
            !category
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-black border-[#E5E5E5] hover:border-primary'
          }`}
        >
          <Icon name="handyman" className="w-4 h-4 shrink-0" />
          All Services
        </button>
        {SERVICE_CATEGORIES.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setCategory(c.slug)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors ${
              category === c.slug
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-black border-[#E5E5E5] hover:border-primary'
            }`}
          >
            <Icon name={c.icon} className="w-4 h-4 shrink-0" />
            {c.label}
          </button>
        ))}
      </div>

      {activeCat && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-ink">{activeCat.label}</h2>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((s) => (
          <article key={s.id} className="group">
            <div className="aspect-[4/3] bg-white shadow-soft overflow-hidden mb-4">
              <img
                src={resolveImage(s.image, IMAGES.vendorHardscape, s.slug ?? s.name)}
                alt={s.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted mb-1.5">LeafyLand Services</p>
            <h3 className="text-base text-ink font-medium mb-2">{s.name}</h3>
            <p className="text-sm text-muted line-clamp-2 mb-3 leading-relaxed">{s.description}</p>
            <p className="text-sm mb-4">
              <span className="text-muted text-xs mr-1">From</span>
              <span className="font-medium">₹{s.price.toLocaleString('en-IN')}</span>
            </p>
            <Link
              to={`/services/${s.slug}/book`}
              className="inline-block w-full py-2.5 text-center text-xs font-medium tracking-wide uppercase border border-ink text-ink hover:bg-primary hover:border-primary hover:text-white transition-colors"
            >
              Book Now
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
