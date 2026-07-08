import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api, type Product } from '../lib/api';
import { useCart } from '../context/CartContext';
import { resolveImage, IMAGES } from '../data/images';
import { Icon } from '../components/ui/primitives';
import { ZeptoProductCard } from '../components/zepto/ZeptoProductCard';
import type { FeedProduct } from '../data/zeptoFeedData';

function discountPct(price: number, compare?: number | null) {
  if (!compare || compare <= price) return 0;
  return Math.round(((compare - price) / compare) * 100);
}

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

const HIGHLIGHTS = [
  { icon: 'verified', label: 'Quality Assured', sub: 'Verified vendor' },
  { icon: 'delivery', label: 'Fast Delivery', sub: 'Ships in 1–3 days' },
  { icon: 'autorenew', label: 'Easy Returns', sub: '7-day replacement' },
  { icon: 'eco', label: 'Eco Friendly', sub: 'Sustainably sourced' },
];

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { add, openDrawer } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'notfound'>('loading');
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [variant, setVariant] = useState<string>('');

  useEffect(() => {
    if (!slug) return;
    setStatus('loading');
    setActiveImg(0);
    setQty(1);
    window.scrollTo({ top: 0 });
    api
      .get<Product>(`/products/slug/${slug}`)
      .then((p) => {
        setProduct(p);
        setVariant(p.unit || '1 pc');
        setStatus('ready');
      })
      .catch(() => setStatus('notfound'));
  }, [slug]);

  useEffect(() => {
    const catSlug = product?.category?.slug;
    if (!catSlug) return;
    api
      .get<Product[]>(`/products?categorySlug=${catSlug}`)
      .then((list) => setRelated(list.filter((p) => p.slug !== product?.slug).slice(0, 10)))
      .catch(() => {});
  }, [product?.category?.slug, product?.slug]);

  const images = useMemo(() => {
    if (!product) return [] as string[];
    const imgs = (Array.isArray(product.images) ? product.images : []).filter(Boolean);
    const resolved = imgs.map((src) => resolveImage(src, IMAGES.monstera, product.slug ?? product.name));
    return resolved.length ? resolved : [resolveImage(undefined, IMAGES.monstera, product.slug ?? product.name)];
  }, [product]);

  if (status === 'loading') {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10 animate-pulse">
          <div className="aspect-square rounded-2xl bg-gray-100" />
          <div className="space-y-4">
            <div className="h-6 w-1/3 bg-gray-100 rounded" />
            <div className="h-8 w-2/3 bg-gray-100 rounded" />
            <div className="h-10 w-1/2 bg-gray-100 rounded" />
            <div className="h-24 w-full bg-gray-100 rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (status === 'notfound' || !product) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🌱</p>
        <h1 className="text-2xl font-bold text-ink mb-2">Product not found</h1>
        <p className="text-gray-500 mb-6">The product you’re looking for may have been moved or is no longer available.</p>
        <Link to="/products" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
          <Icon name="storefront" className="w-4 h-4" /> Browse all products
        </Link>
      </main>
    );
  }

  const off = discountPct(product.price, product.comparePrice);
  const inStock = product.stock > 0;
  const rating = 4.6;
  const reviewCount = 128;

  const cartImage = images[activeImg] ?? images[0];

  const handleAdd = (redirect?: boolean) => {
    add(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: cartImage,
        vendor: (product as unknown as { vendor?: { shopName?: string } }).vendor?.shopName,
      },
      qty,
    );
    if (redirect) navigate('/checkout');
    else openDrawer();
  };

  const relatedFeed = related.map(toFeedProduct);

  return (
    <main className="bg-white min-h-screen pb-10">
      <div className="max-w-6xl mx-auto px-4 pt-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5 flex-wrap">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Icon name="chevron_right" className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-primary">Products</Link>
          {product.category && (
            <>
              <Icon name="chevron_right" className="w-3.5 h-3.5" />
              <Link to={`/products?category=${product.category.slug}`} className="hover:text-primary">
                {product.category.name}
              </Link>
            </>
          )}
          <Icon name="chevron_right" className="w-3.5 h-3.5" />
          <span className="text-gray-700 font-medium truncate max-w-[160px]">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="md:sticky md:top-24 self-start">
            <div className="relative aspect-square rounded-2xl border border-[#E5E5E5] bg-[#f7f7f7] overflow-hidden">
              <img
                src={cartImage}
                alt={product.name}
                className="w-full h-full object-contain p-6"
              />
              {off > 0 && (
                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {off}% OFF
                </span>
              )}
              <button
                type="button"
                onClick={() => setWishlisted((v) => !v)}
                aria-label="Add to wishlist"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center text-gray-600 hover:text-primary shadow-sm transition-colors"
              >
                <Icon name="heart" className="w-5 h-5" filled={wishlisted} />
              </button>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
                {images.map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-16 h-16 rounded-xl border overflow-hidden bg-[#f7f7f7] ${
                      i === activeImg ? 'border-primary ring-1 ring-primary' : 'border-[#E5E5E5]'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.category && (
              <Link
                to={`/products?category=${product.category.slug}`}
                className="text-xs font-semibold text-primary uppercase tracking-wide"
              >
                {product.category.name}
              </Link>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-ink mt-1.5 mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded">
                {rating.toFixed(1)} <Icon name="star" className="w-3 h-3" filled />
              </span>
              <span className="text-xs text-gray-500">{reviewCount} ratings</span>
              {inStock ? (
                <span className="text-xs font-semibold text-green-600 ml-1">In stock</span>
              ) : (
                <span className="text-xs font-semibold text-red-500 ml-1">Out of stock</span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-1">
              <span className="text-3xl font-bold text-ink">₹{product.price}</span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-lg text-gray-400 line-through mb-0.5">₹{product.comparePrice}</span>
              )}
              {off > 0 && <span className="text-sm font-bold text-primary mb-1">{off}% off</span>}
            </div>
            <p className="text-xs text-gray-500 mb-5">Inclusive of all taxes</p>

            {/* Variant / pack selector */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-ink mb-2">Pack size</p>
              <div className="flex flex-wrap gap-2">
                {[product.unit || '1 pc'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setVariant(opt)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      variant === opt
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-[#E5E5E5] text-gray-700 hover:border-primary'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + actions */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center border border-[#E5E5E5] rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 text-lg font-semibold text-gray-600 hover:bg-gray-50"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                  className="w-10 h-11 text-lg font-semibold text-gray-600 hover:bg-gray-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-gray-500">{product.stock} available</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                type="button"
                disabled={!inStock}
                onClick={() => handleAdd(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors disabled:opacity-40"
              >
                <Icon name="shopping_cart" className="w-5 h-5" /> Add to Cart
              </button>
              <button
                type="button"
                disabled={!inStock}
                onClick={() => handleAdd(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-40"
              >
                <Icon name="bolt" className="w-5 h-5" filled /> Buy Now
              </button>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="flex items-center gap-2.5 rounded-xl border border-[#E5E5E5] p-3">
                  <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon name={h.icon} className="w-5 h-5" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-ink">{h.label}</p>
                    <p className="text-[11px] text-gray-500">{h.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="border-t border-[#E5E5E5] pt-5">
              <h2 className="text-base font-bold text-ink mb-2">Product Details</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
              <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
                {product.category && (
                  <>
                    <dt className="text-gray-500">Category</dt>
                    <dd className="text-ink font-medium">{product.category.name}</dd>
                  </>
                )}
                <dt className="text-gray-500">Pack</dt>
                <dd className="text-ink font-medium">{product.unit || '1 pc'}</dd>
                {(product as unknown as { vendor?: { shopName?: string } }).vendor?.shopName && (
                  <>
                    <dt className="text-gray-500">Sold by</dt>
                    <dd className="text-ink font-medium">
                      {(product as unknown as { vendor?: { shopName?: string } }).vendor?.shopName}
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedFeed.length > 0 && (
          <section className="mt-12 border-t border-[#E5E5E5] pt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-ink">You may also like</h2>
              {product.category && (
                <Link
                  to={`/products?category=${product.category.slug}`}
                  className="text-sm font-semibold text-primary inline-flex items-center gap-0.5"
                >
                  See all <Icon name="chevron_right" className="w-4 h-4" />
                </Link>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {relatedFeed.map((p) => (
                <ZeptoProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
