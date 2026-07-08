import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { items, openDrawer } = useCart();

  useEffect(() => {
    if (items.length > 0) openDrawer();
  }, [items.length, openDrawer]);

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      {items.length === 0 ? (
        <>
          <p className="text-muted mb-4">Your cart is empty.</p>
          <Link to="/products" className="text-primary font-medium underline">
            Shop products
          </Link>
        </>
      ) : (
        <p className="text-muted">Opening your cart…</p>
      )}
    </div>
  );
}
