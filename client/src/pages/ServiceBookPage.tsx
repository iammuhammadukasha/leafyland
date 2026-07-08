import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, type Service } from '../lib/api';
import { BackLink, Btn, Input, Label, PageShell } from '../components/ui/PageShell';

const SLOTS = ['09:00 AM - 12:00 PM', '12:00 PM - 03:00 PM', '03:00 PM - 06:00 PM'];

export function ServiceBookPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    bookingDate: '',
    timeSlot: SLOTS[0],
    addressLine1: '',
    city: '',
    pincode: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug) api.get<Service>(`/services/slug/${slug}`).then(setService);
  }, [slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    setLoading(true);
    try {
      const booking = await api.post<{ id: string }>('/bookings', {
        serviceId: service.id,
        ...form,
      });
      const pay = await api.post<{ mock?: boolean; orderId?: string }>(`/bookings/${booking.id}/pay`, {});
      if (pay.mock) {
        await api.post(`/bookings/${booking.id}/mock-pay`, {});
      }
      navigate(`/booking/success?id=${booking.id}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!service) return <PageShell title="Loading..."><p /></PageShell>;

  return (
    <PageShell title={`Book: ${service.name}`}>
      <BackLink to="/services" label="All Services" />
      <p className="text-black mb-4">₹{service.price} · {service.description}</p>
      <form onSubmit={submit} className="max-w-lg space-y-4">
        <div><Label>Name</Label><Input required value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} /></div>
        <div><Label>Email</Label><Input type="email" required value={form.customerEmail} onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} /></div>
        <div><Label>Phone</Label><Input required value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} /></div>
        <div><Label>Date</Label><Input type="date" required value={form.bookingDate} onChange={(e) => setForm({ ...form, bookingDate: e.target.value })} /></div>
        <div>
          <Label>Time Slot</Label>
          <select className="w-full h-11 px-3 border border-[#E5E5E5] rounded-lg" value={form.timeSlot} onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}>
            {SLOTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div><Label>Address</Label><Input required value={form.addressLine1} onChange={(e) => setForm({ ...form, addressLine1: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>City</Label><Input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
          <div><Label>Pincode</Label><Input required value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} /></div>
        </div>
        <Btn type="submit" disabled={loading}>{loading ? 'Booking...' : `Confirm Booking — ₹${service.price}`}</Btn>
      </form>
    </PageShell>
  );
}
