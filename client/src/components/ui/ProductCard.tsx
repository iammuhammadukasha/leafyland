import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../data/homeData';
import { Icon } from './primitives';

export function ProductCard({ product }: { product: Product }) {
  const { add, openDrawer } = useCart();
  const discount = product.oldPrice - product.price;
  const productId = product.slug ?? product.name.toLowerCase().replace(/\s+/g, '-');
  const detailTo = product.slug ? `/products/${product.slug}` : `/products?q=${encodeURIComponent(product.name)}`;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({ productId, name: product.name, price: product.price, image: product.image });
    openDrawer();
  };

  return (
    <article className="min-w-[200px] md:min-w-[220px] bg-white border border-[#E5E5E5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex-shrink-0">
      <Link to={detailTo} className="block relative h-40 bg-[#f7f7f7] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/nursery.jpg';
          }}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="absolute top-2 right-2 bg-white border-2 border-primary text-black font-bold text-xs px-3 py-1 rounded-lg hover:bg-primary hover:text-white transition-colors z-10"
        >
          ADD
        </button>
      </Link>
      <Link to={detailTo} className="block p-3 md:p-4 space-y-1.5">
        <span className="inline-block bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">
          ₹{product.price}
        </span>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-black line-through">₹{product.oldPrice}</span>
          <span className="text-black font-medium">₹{discount} OFF</span>
        </div>
        <h3 className="text-sm font-semibold text-black leading-snug line-clamp-2">{product.name}</h3>
        <p className="text-xs text-black">{product.unit}</p>
        <span className="inline-block border border-primary text-black text-[10px] font-semibold px-2 py-0.5 rounded">
          {product.tag}
        </span>
        <div className="flex items-center gap-1 pt-1">
          <Icon name="star" className="text-primary text-sm filled" />
          <span className="text-xs text-black font-medium">
            {product.rating} ({product.reviews})
          </span>
        </div>
      </Link>
    </article>
  );
}
