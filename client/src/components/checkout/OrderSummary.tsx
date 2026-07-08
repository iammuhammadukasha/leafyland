import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export function OrderSummary({
  shipping,
  discount,
  onApplyDiscount,
}: {
  shipping: number;
  discount: number;
  onApplyDiscount?: (code: string) => void;
}) {
  const { items, subtotal } = useCart();
  const [code, setCode] = useState('');
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <div className="bg-white min-h-full p-6 lg:p-10 border-l border-black/10 shadow-soft">
      <ul className="space-y-4 mb-6">
        {items.map((item) => (
          <li key={item.productId} className="flex gap-4">
            <div className="relative shrink-0">
              <div className="h-16 w-16 rounded-lg border border-black/10 bg-white overflow-hidden">
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              </div>
              <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-ink text-white text-[10px] font-bold flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink leading-snug line-clamp-2">{item.name}</p>
            </div>
            <p className="text-sm font-medium text-ink shrink-0">
              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Discount code or gift card"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 h-11 px-3 border border-black/15 bg-white text-sm outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={() => onApplyDiscount?.(code)}
          className="px-5 h-11 border border-black/15 bg-white text-sm font-medium hover:border-primary hover:text-primary transition-colors"
        >
          Apply
        </button>
      </div>

      <div className="space-y-2 text-sm border-t border-black/10 pt-4">
        <div className="flex justify-between text-ink">
          <span>Subtotal · {itemCount} items</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-primary">
            <span>Discount</span>
            <span>− ₹{discount.toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="flex justify-between text-ink">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-ink pt-3 border-t border-black/10">
          <span>Total</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}

export function calcShipping(_pincode: string, subtotal: number, zoneId: string): number {
  if (subtotal >= 999) return 0;
  if (zoneId === 'mumbai') return 99;
  if (zoneId === 'maharashtra') return 149;
  return 199;
}

export function gstAmount(subtotal: number): number {
  return Math.round(subtotal * 0.18 * 100) / 100;
}
