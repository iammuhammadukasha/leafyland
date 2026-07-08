import { Link, useSearchParams } from 'react-router-dom';
import { PageShell } from '../components/ui/PageShell';

export function OrderSuccessPage() {
  const [params] = useSearchParams();
  const id = params.get('id');
  return (
    <PageShell title="Order Confirmed!">
      <p className="text-black mb-4">Thank you for your purchase. Your order has been placed successfully.</p>
      {id && <p className="text-sm text-black/60 mb-4">Order ID: {id}</p>}
      <Link to={`/orders/${id}`} className="text-primary font-semibold mr-4">Track order</Link>
      <Link to="/products" className="text-primary font-semibold">Continue shopping</Link>
    </PageShell>
  );
}

export function BookingSuccessPage() {
  const [params] = useSearchParams();
  return (
    <PageShell title="Booking Confirmed!">
      <p className="text-black mb-4">Your service has been booked. Our team will contact you shortly.</p>
      {params.get('id') && <p className="text-sm text-black/60">Booking ID: {params.get('id')}</p>}
      <Link to="/services" className="text-primary font-semibold mt-4 inline-block">Browse more services</Link>
    </PageShell>
  );
}
