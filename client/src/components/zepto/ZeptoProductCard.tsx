import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { FeedProduct } from '../../data/zeptoFeedData';
import { DeliveryBadge } from './ZeptoCategoryBlocks';
import { HorizontalScrollRow } from './HorizontalScrollRow';
import { OptimizedImage } from '../ui/OptimizedImage';
import { Icon } from '../ui/primitives';

function discountPct(price: number, compare?: number) {
  if (!compare || compare <= price) return 0;
  return Math.round(((compare - price) / compare) * 100);
}

export function ZeptoProductCard({ product }: { product: FeedProduct }) {
  const { add, openDrawer } = useCart();
  const off = discountPct(product.price, product.comparePrice);
  const badgeLabel = product.badge ?? (off > 0 ? `${off}% OFF` : undefined);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    openDrawer();
  };

  return (
    <article className="w-[118px] sm:w-[128px] shrink-0">
      <div className="relative mb-1 pb-1">
        <Link to={`/products/${product.slug}`} className="block">
          <div className="relative aspect-square rounded-2xl bg-[#f7f7f7] overflow-hidden border border-gray-100">
            <OptimizedImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-2"
              width={128}
              height={128}
            />
            {badgeLabel && (
              <span className="absolute top-1.5 left-1.5 bg-white text-primary text-[9px] font-bold px-1.5 py-0.5 rounded border border-primary/20">
                {badgeLabel}
              </span>
            )}
            <DeliveryBadge mins={product.deliveryMins ?? 10} />
            <button
              type="button"
              onClick={handleAdd}
              className="absolute bottom-2 right-2 z-10 flex items-center gap-0.5 py-1 rounded-lg bg-white border-2 border-primary text-primary text-[10px] font-bold uppercase shadow-md hover:bg-primary hover:text-white transition-colors px-2.5"
            >
              <span className="text-xs leading-none">+</span> ADD
            </button>
          </div>
        </Link>
      </div>

      <div className="px-0.5">
        <div className="flex items-baseline gap-1 flex-wrap mb-0.5">
          <span className="text-[13px] font-bold text-ink">₹{product.price}</span>
          {product.comparePrice && product.comparePrice > product.price && (
            <>
              <span className="text-[10px] text-gray-400 line-through">₹{product.comparePrice}</span>
              {off > 0 && (
                <span className="text-[9px] font-bold text-primary">{off}% OFF</span>
              )}
            </>
          )}
        </div>
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-[11px] text-gray-800 leading-tight line-clamp-2 min-h-[2rem] font-medium">
            {product.name}
          </h3>
        </Link>
        <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{product.unit}</p>
        {product.rating && (
          <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-0.5">
            <Icon name="star" className="w-3 h-3 text-amber-500" filled />
            <span className="font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
            {product.reviews && <span>({product.reviews})</span>}
          </p>
        )}
      </div>
    </article>
  );
}

export function ProductShelf({
  title,
  products,
  seeAllHref,
}: {
  title: string;
  products: FeedProduct[];
  seeAllHref?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="mb-7">
      {title ? (
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-[15px] font-bold text-ink tracking-tight">{title}</h2>
          <Link
            to={seeAllHref ?? '/products'}
            className="text-[12px] font-semibold text-primary flex items-center gap-0.5"
          >
            See All <span aria-hidden>›</span>
          </Link>
        </div>
      ) : null}
      <HorizontalScrollRow>
        {products.map((p) => (
          <ZeptoProductCard key={p.id} product={p} />
        ))}
      </HorizontalScrollRow>
    </section>
  );
}
