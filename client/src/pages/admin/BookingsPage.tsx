import { useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import {
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

type Booking = {
  id: string;
  customerName: string;
  bookingDate: string;
  timeSlot: string;
  status: string;
  service: { name: string };
  amount: number;
};

const PAGE_SIZE = 10;

export function AdminBookings() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (token) api.get<Booking[]>('/bookings', token).then(setBookings);
  }, [token]);

  const totalPages = Math.max(1, Math.ceil(bookings.length / PAGE_SIZE));
  const paged = useMemo(() => bookings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [bookings, page]);

  return (
    <div>
      <PageHeader
        title="Service Bookings"
        subtitle="Scheduled landscaping and maintenance appointments"
        breadcrumb="Home / Bookings"
      />

      <Card title="All Bookings">
        <TableWrap>
          <thead>
            <tr>
              <Th>Service</Th>
              <Th>Customer</Th>
              <Th>Date & Time</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState message="No bookings yet" />
                </td>
              </tr>
            ) : (
              paged.map((b) => (
                <tr key={b.id}>
                  <Td>
                    <p className="font-medium text-gray-800">{b.service.name}</p>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar name={b.customerName} />
                      <span>{b.customerName}</span>
                    </div>
                  </Td>
                  <Td className="text-gray-600">
                    {b.bookingDate}
                    <br />
                    <span className="text-xs text-gray-500">{b.timeSlot}</span>
                  </Td>
                  <Td className="font-semibold">₹{b.amount.toLocaleString('en-IN')}</Td>
                  <Td>
                    <Badge status={b.status} />
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
