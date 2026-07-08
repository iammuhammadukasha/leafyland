import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useCart } from '../context/CartContext';
import { OrderSummary, calcShipping, gstAmount } from '../components/checkout/OrderSummary';

const ZONES = [
  { id: 'mumbai', label: 'Mumbai Metro', hint: 'Pincode 400xxx', fee: 99 },
  { id: 'maharashtra', label: 'Maharashtra', hint: 'Outside Mumbai', fee: 149 },
  { id: 'india', label: 'Rest of India', hint: 'All other states', fee: 199 },
] as const;

function Field({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs text-muted mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full h-11 px-3 border border-black/15 bg-white text-sm text-ink outline-none focus:border-primary rounded-sm';

export function CheckoutPage() {
  const { items, subtotal, clear, deliveryDate, deliveryTimeSlot } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [zoneId, setZoneId] = useState<(typeof ZONES)[number]['id']>('mumbai');
  const [billingSame, setBillingSame] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [discount, setDiscount] = useState(0);

  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    addressLine1: '',
    addressLine2: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '',
  });

  const shipping = calcShipping(form.pincode, subtotal, zoneId);
  const gst = gstAmount(subtotal);
  const total = Math.round((subtotal + shipping + gst - discount) * 100) / 100;

  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const applyDiscount = (code: string) => {
    if (code.trim().toUpperCase() === 'LEAFY10') {
      setDiscount(Math.round(subtotal * 0.1));
    } else if (code.trim()) {
      alert('Invalid discount code');
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    setLoading(true);
    try {
      const order = await api.post<{ id: string }>('/orders', {
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2 || undefined,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      });
      const pay = await api.post<{ mock?: boolean }>(`/orders/${order.id}/pay`, {});
      if (pay.mock) {
        await api.post(`/orders/${order.id}/mock-pay`, {});
      }
      clear();
      navigate(`/order/success?id=${order.id}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-muted mb-4">Your cart is empty.</p>
        <Link to="/products" className="text-primary font-medium underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-[1fr_420px] lg:min-h-[calc(100vh-73px)]">
      <div className="px-4 lg:px-12 py-8 lg:py-10 max-w-2xl lg:max-w-none lg:ml-auto lg:mr-0">
        <form onSubmit={submit} className="space-y-8">
          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold text-ink mb-4">Contact</h2>
            <Field label="Email">
              <input
                type="email"
                required
                value={form.customerEmail}
                onChange={(e) => set('customerEmail', e.target.value)}
                className={inputCls}
                placeholder="you@example.com"
              />
            </Field>
            <p className="text-xs text-muted mt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-primary underline">
                Log in
              </Link>
            </p>
            <label className="flex items-center gap-2 mt-3 text-sm text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="accent-primary"
              />
              Email me with news and offers
            </label>
          </section>

          {/* Delivery */}
          <section>
            <h2 className="text-lg font-semibold text-ink mb-4">Delivery</h2>
            <div className="space-y-3">
              <Field label="Country/Region">
                <select className={inputCls} defaultValue="IN">
                  <option value="IN">India</option>
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name">
                  <input
                    required
                    value={form.customerName.split(' ')[0] || ''}
                    onChange={(e) => {
                      const last = form.customerName.split(' ').slice(1).join(' ');
                      set('customerName', [e.target.value, last].filter(Boolean).join(' '));
                    }}
                    className={inputCls}
                  />
                </Field>
                <Field label="Last name">
                  <input
                    value={form.customerName.split(' ').slice(1).join(' ')}
                    onChange={(e) => {
                      const first = form.customerName.split(' ')[0] || '';
                      set('customerName', [first, e.target.value].filter(Boolean).join(' '));
                    }}
                    className={inputCls}
                  />
                </Field>
              </div>
              <Field label="Phone">
                <input
                  required
                  type="tel"
                  value={form.customerPhone}
                  onChange={(e) => set('customerPhone', e.target.value)}
                  className={inputCls}
                  placeholder="+91"
                />
              </Field>
              <Field label="Address">
                <input
                  required
                  value={form.addressLine1}
                  onChange={(e) => set('addressLine1', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Apartment, suite, etc. (optional)">
                <input
                  value={form.addressLine2}
                  onChange={(e) => set('addressLine2', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label="City">
                  <input required value={form.city} onChange={(e) => set('city', e.target.value)} className={inputCls} />
                </Field>
                <Field label="State">
                  <input required value={form.state} onChange={(e) => set('state', e.target.value)} className={inputCls} />
                </Field>
                <Field label="PIN code">
                  <input
                    required
                    pattern="[0-9]{6}"
                    value={form.pincode}
                    onChange={(e) => set('pincode', e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* Delivery area */}
          <section>
            <h2 className="text-lg font-semibold text-ink mb-2">Delivery area</h2>
            <p className="text-xs text-muted mb-4">Free delivery on orders above ₹999</p>
            <div className="space-y-2">
              {ZONES.map((z) => (
                <label
                  key={z.id}
                  className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-colors ${
                    zoneId === z.id ? 'border-primary bg-primary/5' : 'border-black/15 hover:border-black/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="zone"
                      checked={zoneId === z.id}
                      onChange={() => setZoneId(z.id)}
                      className="accent-primary"
                    />
                    <div>
                      <p className="text-sm font-medium text-ink">{z.label}</p>
                      <p className="text-xs text-muted">{z.hint}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-ink">
                    {subtotal >= 999 ? 'Free' : `₹${z.fee}`}
                  </span>
                </label>
              ))}
            </div>
            {(deliveryDate || deliveryTimeSlot) && (
              <p className="text-xs text-primary mt-3">
                Preferred delivery: {deliveryDate} · {deliveryTimeSlot}
              </p>
            )}
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-lg font-semibold text-ink mb-4">Payment</h2>
            <div className="border border-black/15 rounded-sm p-4 bg-white shadow-soft">
              <p className="text-sm font-medium text-ink mb-1">Razorpay — Cards, UPI, Netbanking</p>
              <p className="text-xs text-muted">
                After clicking Pay now, you&apos;ll be redirected to Razorpay to complete your purchase securely.
              </p>
            </div>
          </section>

          {/* Billing */}
          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">Billing address</h2>
            <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
              <input
                type="radio"
                checked={billingSame}
                onChange={() => setBillingSame(true)}
                className="accent-primary"
              />
              Same as shipping address
            </label>
            <label className="flex items-center gap-2 text-sm text-ink cursor-pointer mt-2">
              <input
                type="radio"
                checked={!billingSame}
                onChange={() => setBillingSame(false)}
                className="accent-primary"
              />
              Use a different billing address
            </label>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary-hover transition-colors disabled:opacity-50 rounded-sm"
          >
            {loading ? 'Processing…' : `Pay now · ₹${total.toLocaleString('en-IN')}`}
          </button>

          <footer className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-primary pt-4 border-t border-black/10">
            <Link to="/privacy" className="hover:underline">Privacy policy</Link>
            <Link to="/terms" className="hover:underline">Terms of service</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </footer>
        </form>
      </div>

      <div className="hidden lg:block">
        <OrderSummary shipping={shipping} discount={discount} onApplyDiscount={applyDiscount} />
        <div className="bg-white px-10 pb-8 text-sm text-ink border-l border-black/10 shadow-soft">
          <div className="flex justify-between py-1">
            <span className="text-muted">GST (18%)</span>
            <span>₹{gst.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t border-black/10">
            <span>Amount due</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Mobile summary */}
      <div className="lg:hidden border-t border-black/10 bg-white px-4 py-6 shadow-soft">
        <OrderSummary shipping={shipping} discount={discount} onApplyDiscount={applyDiscount} />
        <div className="px-2 text-sm">
          <div className="flex justify-between py-1 text-muted">
            <span>GST (18%)</span>
            <span>₹{gst.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2">
            <span>Amount due</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
