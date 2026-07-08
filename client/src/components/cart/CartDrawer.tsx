import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Icon } from '../ui/primitives';

const TIME_SLOTS = [
  '10:00 AM - 02:00 PM',
  '02:00 PM - 06:00 PM',
  '06:00 PM - 09:00 PM',
];

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    drawerOpen,
    closeDrawer,
    remove,
    updateQty,
    deliveryDate,
    deliveryTimeSlot,
    setDeliveryDate,
    setDeliveryTimeSlot,
  } = useCart();
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);

  if (!drawerOpen) return null;

  const goCheckout = () => {
    if (!termsAccepted || items.length === 0) return;
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-black/40"
        onClick={closeDrawer}
        aria-label="Close cart overlay"
      />
      <aside
        className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl"
        role="dialog"
        aria-label="Your cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 bg-white">
          <h2 className="text-base font-semibold text-ink">Your Cart ({count})</h2>
          <button type="button" onClick={closeDrawer} className="p-1 text-ink hover:text-primary" aria-label="Close">
            <Icon name="close" className="text-2xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-muted mb-6">No items in your cart yet. Add some great products and checkout!</p>
              <Link
                to="/products"
                onClick={closeDrawer}
                className="inline-block px-8 py-3 bg-primary text-white text-xs font-semibold tracking-[0.12em] uppercase hover:bg-primary-hover"
              >
                Shop now
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.productId} className="rounded-xl border border-black/10 bg-white p-4">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 rounded-lg bg-white shadow-soft overflow-hidden">
                      <img src={item.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-primary underline decoration-primary/40 underline-offset-2">
                        {item.vendor ?? 'LeafyLand'}
                      </p>
                      <p className="text-sm text-ink mt-1 leading-snug line-clamp-2">{item.name}</p>
                      <p className="text-sm font-semibold text-ink mt-2">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-black/15 overflow-hidden">
                      <button
                        type="button"
                        className="w-9 h-9 text-ink hover:bg-black/5"
                        onClick={() => updateQty(item.productId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        className="w-9 h-9 text-ink hover:bg-black/5"
                        onClick={() => updateQty(item.productId, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(item.productId)}
                      className="text-muted hover:text-red-600 p-2"
                      aria-label="Remove item"
                    >
                      <Icon name="delete_outline" className="text-xl" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <div className="mt-6 rounded-xl border border-primary/20 bg-white shadow-soft p-5 text-center">
              <h3 className="text-sm font-semibold text-primary mb-4">Pick a Delivery Date</h3>
              <div className="space-y-3">
                <div className="flex rounded-lg border border-black/10 overflow-hidden bg-white">
                  <input
                    type="date"
                    value={deliveryDate}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="flex-1 h-11 px-3 text-sm text-ink outline-none"
                  />
                  <span className="flex items-center px-3 bg-primary text-white">
                    <Icon name="calendar_month" className="text-lg" />
                  </span>
                </div>
                <div className="flex rounded-lg border border-black/10 overflow-hidden bg-white">
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="flex-1 h-11 px-3 text-sm text-ink outline-none bg-transparent"
                  >
                    {TIME_SLOTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <span className="flex items-center px-3 bg-primary text-white">
                    <Icon name="schedule" className="text-lg" />
                  </span>
                </div>
              </div>
              <p className="text-xs text-primary/80 mt-3">
                Select available delivery date &amp; time per your convenience.
              </p>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-black/10 bg-white px-5 py-5 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-semibold text-ink">Subtotal</span>
              <span className="text-base font-bold text-ink">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-muted">
              Taxes, discounts and shipping calculated at checkout.
            </p>
            <label className="flex items-start gap-2 text-xs text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              <span>
                I accept the{' '}
                <Link to="/terms" className="underline text-primary" onClick={closeDrawer}>
                  terms of service
                </Link>
                .*
              </span>
            </label>
            <button
              type="button"
              disabled={!termsAccepted}
              onClick={goCheckout}
              className="w-full py-3.5 rounded-full bg-primary text-white text-xs font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Checkout
              <span>→</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
