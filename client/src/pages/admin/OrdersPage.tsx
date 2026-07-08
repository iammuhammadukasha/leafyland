import { useEffect, useMemo, useState } from 'react';
import { api, type Order } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import {
  AdminSelect,
  Avatar,
  Badge,
  Card,
  EmptyState,
  PageHeader,
  Pagination,
  TableWrap,
  Td,
  Th,
} from '../../components/admin/admin-ui';

const PAGE_SIZE = 10;
const STATUSES = ['PENDING', 'PAID', 'PACKED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

export function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (token) api.get<Order[]>('/orders', token).then(setOrders);
  }, [token]);

  const filtered = useMemo(() => {
    if (filter === 'all') return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateStatus = async (id: string, status: string) => {
    if (!token) return;
    await api.patch(`/orders/${id}/status`, { status }, token);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div>
      <PageHeader
        title="Transactions"
        subtitle="Your most recent orders list"
        breadcrumb="Home / Orders"
      />

      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <AdminSelect
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="max-w-[180px]"
          >
            <option value="all">All orders</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
            ))}
          </AdminSelect>
          <p className="text-sm text-gray-500">{filtered.length} orders</p>
        </div>

        <TableWrap>
          <thead>
            <tr>
              <Th>Order ID</Th>
              <Th>Customer</Th>
              <Th>Total</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState message="No orders found" />
                </td>
              </tr>
            ) : (
              paged.map((o) => (
                <tr key={o.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar name={o.customerName} />
                      <p className="font-medium text-gray-800">{o.orderNumber}</p>
                    </div>
                  </Td>
                  <Td>
                    <p className="font-medium text-gray-800">{o.customerName}</p>
                  </Td>
                  <Td className="font-semibold text-gray-800">₹{o.total.toLocaleString('en-IN')}</Td>
                  <Td className="text-gray-500">{new Date(o.createdAt).toLocaleDateString('en-IN')}</Td>
                  <Td>
                    <Badge status={o.status} />
                  </Td>
                  <Td>
                    <AdminSelect
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="h-9 min-w-[140px] text-xs"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                      ))}
                    </AdminSelect>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </TableWrap>
        <Pagination page={page} totalPages={totalPages} onPage={setPage} />
      </Card>
    </div>
  );
}
