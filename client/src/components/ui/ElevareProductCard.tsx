import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { resolveImage, IMAGES } from '../../data/images';

export type ElevareProduct = {
  id?: string;
  slug?: string;
  name: string;
  price: number;
  comparePrice?: number;
  image: string;
  vendor?: string;
  inStock?: boolean;
  unit?: string;
};

export function ElevareProductCard({
  product,
  onAdd,
}: {
  product: ElevareProduct;
  onAdd?: () => void;
}) {
  const { add } = useCart();
  const inStock = product.inStock !== false;
  const vendor = product.vendor ?? 'LeafyLand';

  const imageSrc = resolveImage(product.image, IMAGES.monstera, product.slug ?? product.name);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock || !product.slug) return;
    if (onAdd) {
      onAdd();
      return;
    }
    add({
      productId: product.id ?? product.slug ?? product.name,
      name: product.name,
      price: product.price,
      image: imageSrc,
    });
  };

  const inner = (
    <article className="group flex flex-col w-[200px] sm:w-[220px] md:w-[240px] shrink-0 snap-start">
      <Link to={product.slug ? `/products/${product.slug}` : '#'} className="block">
        <div className="relative aspect-square bg-white shadow-soft overflow-hidden mb-4">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted mb-1.5">{vendor}</p>
        <h3 className="text-sm text-ink leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        <p className="text-sm text-ink mb-4">
          <span className="text-muted text-xs mr-1">From</span>
          <span className="font-medium">₹{product.price.toLocaleString('en-IN')}</span>
        </p>
      </Link>
      <button
        type="button"
        disabled={!inStock}
        onClick={handleAdd}
        className="w-full py-2.5 text-xs font-medium tracking-wide uppercase border border-ink text-ink hover:bg-primary hover:border-primary hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink disabled:hover:border-ink"
      >
        {inStock ? 'Add to cart' : 'Out of stock'}
      </button>
    </article>
  );

  return inner;
}
