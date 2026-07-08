import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, type Order } from '../lib/api';
import { PageShell } from '../components/ui/PageShell';

const STATUS_STEPS = ['PENDING', 'PAID', 'PACKED', 'OUT_FOR_DELIVERY', 'DELIVERED'];

export function OrderTrackPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) api.get<Order>(`/orders/track/${id}`).then(setOrder);
  }, [id]);

  if (!order) return <PageShell title="Track Order"><p>Loading...</p></PageShell>;

  const stepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <PageShell title={`Order ${order.orderNumber}`}>
      <p className="text-black mb-6">Status: <strong>{order.status.replace(/_/g, ' ')}</strong></p>
      <div className="flex flex-col gap-2 mb-8">
        {STATUS_STEPS.map((s, i) => (
          <div key={s} className={`flex items-center gap-3 ${i <= stepIndex ? 'text-primary' : 'text-black/30'}`}>
            <div className={`w-3 h-3 rounded-full ${i <= stepIndex ? 'bg-primary' : 'bg-gray-200'}`} />
            <span className="text-sm font-medium">{s.replace(/_/g, ' ')}</span>
          </div>
        ))}
      </div>
      <div className="border rounded-xl p-4 space-y-2 text-sm">
        {order.items.map((i, idx) => (
          <div key={idx} className="flex justify-between"><span>{i.name} × {i.quantity}</span><span>₹{i.price * i.quantity}</span></div>
        ))}
        <div className="border-t pt-2 font-bold flex justify-between"><span>Total</span><span>₹{order.total}</span></div>
      </div>
      <a href={`/api/orders/${id}/invoice`} target="_blank" rel="noreferrer" className="inline-block mt-4 text-primary font-semibold text-sm">
        Download GST Invoice
      </a>
    </PageShell>
  );
}
