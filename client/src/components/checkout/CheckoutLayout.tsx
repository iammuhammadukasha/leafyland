import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Icon } from '../ui/primitives';

export function CheckoutLayout({ children }: { children: React.ReactNode }) {
  const { count, openDrawer } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/10 px-4 lg:px-8 py-5 flex items-center justify-between max-w-[1200px] mx-auto">
        <Link to="/" className="font-display text-2xl text-primary font-medium tracking-wide">
          LeafyLand
        </Link>
        <button
          type="button"
          onClick={openDrawer}
          className="relative text-ink hover:text-primary p-1"
          aria-label="Open cart"
        >
          <Icon name="shopping_bag" className="text-2xl" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </header>
      {children}
    </div>
  );
}
