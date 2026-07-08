import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api, type CategoryTree, type Product } from '../lib/api';
import { ZeptoProductCard } from '../components/zepto/ZeptoProductCard';
import { Icon } from '../components/ui/primitives';
import { PRODUCT_CATEGORY_ICONS } from '../data/categoryNav';
import { resolveImage, IMAGES } from '../data/images';
import type { FeedProduct } from '../data/zeptoFeedData';

function toFeedProduct(p: Product): FeedProduct {
  const imgs = Array.isArray(p.images) ? p.images : [];
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    comparePrice: p.comparePrice ?? undefined,
    unit: p.unit ?? '1 pc',
    image: resolveImage(imgs[0], IMAGES.monstera, p.slug ?? p.name),
  };
}

export function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [tree, setTree] = useState<CategoryTree[]>([]);
  const [loading, setLoading] = useState(true);

  const q = params.get('q') || '';
  const categorySlug = params.get('category') || 'all';
  const subcategorySlug = params.get('subcategory') || '';

  useEffect(() => {
    api.get<CategoryTree[]>('/categories/tree?type=PRODUCT').then(setTree).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const searchParams = new URLSearchParams();
    if (q) searchParams.set('search', q);
    if (subcategorySlug) searchParams.set('subcategorySlug', subcategorySlug);
    else if (categorySlug && categorySlug !== 'all') searchParams.set('categorySlug', categorySlug);

    api
      .get<Product[]>(`/products?${searchParams}`)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [q, categorySlug, subcategorySlug]);

  const pills = tree.map((c) => ({ slug: c.slug, name: c.name }));
  const feedProducts = useMemo(() => products.map(toFeedProduct), [products]);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [pills.length]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
  };

  const selectCategory = (slug: string) => {
    const next = new URLSearchParams(params);
    if (slug === 'all') next.delete('category');
    else next.set('category', slug);
    next.delete('subcategory');
    setParams(next);
  };

  return (
    <main className="pb-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pt-5">
        {/* Category filter pills with arrow navigation */}
        <div className="relative mb-3">
          {canLeft && (
            <button
              type="button"
              aria-label="Scroll categories left"
              onClick={() => scrollByAmount(-1)}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E5E5E5] shadow-md text-black hover:border-primary hover:text-primary transition-colors"
            >
              <Icon name="chevron_left" className="w-5 h-5" />
            </button>
          )}
          {canRight && (
            <button
              type="button"
              aria-label="Scroll categories right"
              onClick={() => scrollByAmount(1)}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E5E5E5] shadow-md text-black hover:border-primary hover:text-primary transition-colors"
            >
              <Icon name="chevron_right" className="w-5 h-5" />
            </button>
          )}
          {/* Edge fade masks */}
          {canLeft && (
            <div className="hidden sm:block pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-[5]" />
          )}
          {canRight && (
            <div className="hidden sm:block pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-[5]" />
          )}
          <div
            ref={scrollerRef}
            className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 sm:px-11 scroll-smooth"
          >
            <button
              type="button"
              onClick={() => selectCategory('all')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors ${
                categorySlug === 'all' && !subcategorySlug
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-black border-[#E5E5E5] hover:border-primary'
              }`}
            >
              <Icon name="storefront" className="w-4 h-4 shrink-0" />
              All Products
            </button>
            {pills.map((pill) => (
              <button
                key={pill.slug}
                type="button"
                onClick={() => selectCategory(pill.slug)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors ${
                  categorySlug === pill.slug
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-black border-[#E5E5E5] hover:border-primary'
                }`}
              >
                <Icon
                  name={PRODUCT_CATEGORY_ICONS[pill.slug] ?? 'leaf'}
                  className="w-4 h-4 shrink-0"
                />
                {pill.name}
              </button>
            ))}
          </div>
        </div>

        {q && (
          <p className="text-sm text-gray-600 mb-4">
            Results for <strong>&ldquo;{q}&rdquo;</strong>
          </p>
        )}

        {loading ? (
          <p className="text-sm text-gray-500 py-12 text-center">Loading products…</p>
        ) : feedProducts.length === 0 ? (
          <p className="text-sm text-gray-500 py-12 text-center">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-8">
            {feedProducts.map((p) => (
              <div key={p.id} className="flex justify-center">
                <ZeptoProductCard product={p} />
              </div>
            ))}
          </div>
        )}

        {pills.length > 0 && feedProducts.length === 0 && !loading && (
          <p className="text-xs text-center text-gray-400 mt-4">
            Try another category or search term to explore our catalog.
          </p>
        )}
      </div>
    </main>
  );
}
