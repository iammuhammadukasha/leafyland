import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { Link } from 'react-router-dom';
import { api, type Order } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import {
  Avatar,
  Badge,
  Btn,
  Card,
  PageHeader,
  StatCard,
  TableWrap,
  Td,
  Th,
} from '../../components/admin/admin-ui';
import { IconBox, IconCalendar, IconCart, IconUsers } from '../../components/admin/icons';

export function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!token) return;
    api.get<Record<string, number>>('/admin/stats', token).then(setStats);
    api.get<Order[]>('/orders', token).then((o) => setOrders(o.slice(0, 5)));
  }, [token]);

  const salesOptions: ApexOptions = useMemo(
    () => ({
      chart: { toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
      colors: ['#1e5439'],
      plotOptions: { bar: { borderRadius: 6, columnWidth: '45%' } },
      dataLabels: { enabled: false },
      grid: { borderColor: '#f3f4f6', strokeDashArray: 4 },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { labels: { formatter: (v) => `₹${Math.round(v / 1000)}k` } },
    }),
    [],
  );

  const salesSeries = useMemo(() => {
    const base = (stats.revenue ?? 0) / 12 || 12000;
    return [{ name: 'Sales', data: Array.from({ length: 12 }, (_, i) => Math.round(base * (0.6 + (i % 5) * 0.12))) }];
  }, [stats.revenue]);

  const targetPct = Math.min(99, Math.round(((stats.orders ?? 0) / Math.max(stats.orders ?? 0, 20)) * 75 + 12));

  return (
    <div>
      <PageHeader
        title="Ecommerce Dashboard"
        subtitle="Overview of your green marketplace performance"
        breadcrumb="Home / Dashboard"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        <StatCard label="Customers" value={stats.users ?? 0} change="11.01%" icon={<IconUsers />} tone="blue" />
        <StatCard label="Orders" value={stats.orders ?? 0} change="9.05%" icon={<IconCart />} tone="green" />
        <StatCard label="Products" value={stats.products ?? 0} icon={<IconBox />} tone="violet" />
        <StatCard label="Bookings" value={stats.bookings ?? 0} icon={<IconCalendar />} tone="amber" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 mb-6">
        <Card className="xl:col-span-8" title="Monthly Sales">
          <Chart options={salesOptions} series={salesSeries} type="bar" height={300} />
        </Card>
        <Card className="xl:col-span-4" title="Monthly Target">
          <div className="flex flex-col items-center py-2">
            <div className="relative flex h-36 w-36 items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#1e5439"
                  strokeWidth="3"
                  strokeDasharray={`${targetPct} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-2xl font-bold text-gray-800">{targetPct}%</span>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              Revenue ₹{(stats.revenue ?? 0).toLocaleString('en-IN')} — keep growing your green business!
            </p>
            <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-gray-50 p-2">
                <p className="text-gray-500">Target</p>
                <p className="font-semibold text-gray-800">₹20K</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-2">
                <p className="text-gray-500">Revenue</p>
                <p className="font-semibold text-gray-800">₹{(stats.revenue ?? 0).toLocaleString('en-IN')}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-2">
                <p className="text-gray-500">Services</p>
                <p className="font-semibold text-gray-800">{stats.services ?? 0}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card
        title="Recent Orders"
        action={
          <Link to="/admin/orders" className="text-sm font-medium text-primary hover:underline">
            See all
          </Link>
        }
      >
        <TableWrap>
          <thead>
            <tr>
              <Th>Order</Th>
              <Th>Customer</Th>
              <Th>Total</Th>
              <Th>Date</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-sm text-gray-500">
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar name={o.customerName} />
                      <div>
                        <p className="font-medium text-gray-800">{o.orderNumber}</p>
                        <p className="text-xs text-gray-500">{o.items?.length ?? 0} items</p>
                      </div>
                    </div>
                  </Td>
                  <Td>{o.customerName}</Td>
                  <Td className="font-semibold text-gray-800">₹{o.total.toLocaleString('en-IN')}</Td>
                  <Td className="text-gray-500">{new Date(o.createdAt).toLocaleDateString('en-IN')}</Td>
                  <Td>
                    <Badge status={o.status} />
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </TableWrap>
      </Card>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/admin/products"><Btn>Add Product</Btn></Link>
        <Link to="/admin/orders"><Btn variant="outline">View Orders</Btn></Link>
      </div>
    </div>
  );
}
