import { useEffect, useMemo, useState } from 'react';
import { api, type Service } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import {
  AdminInput,
  AdminTextarea,
  Badge,
  Btn,
  Card,
  EmptyState,
  Label,
  PageHeader,
  Pagination,
  TableWrap,
  Td,
  Th,
} from '../../components/admin/admin-ui';

const PAGE_SIZE = 8;

export function AdminServices() {
  const { token } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '' });

  const load = () => api.get<Service[]>('/services?status=PUBLISHED').then(setServices);
  useEffect(() => {
    load();
  }, []);

  const totalPages = Math.max(1, Math.ceil(services.length / PAGE_SIZE));
  const paged = useMemo(() => services.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [services, page]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    await api.post('/services', { ...form, price: parseFloat(form.price), status: 'PUBLISHED' }, token);
    setForm({ name: '', description: '', price: '', image: '' });
    setShowForm(false);
    load();
  };

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Manage bookable landscaping and garden services"
        breadcrumb="Home / Services"
        actions={<Btn variant="outline" onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Service'}</Btn>}
      />

      {showForm && (
        <Card className="mb-6" title="Add Service">
          <form onSubmit={save} className="grid gap-4 md:grid-cols-2 max-w-3xl">
            <div>
              <Label>Name</Label>
              <AdminInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label>Price (₹)</Label>
              <AdminInput required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <AdminTextarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Image URL</Label>
              <AdminInput value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/images/landscape.jpg" />
            </div>
            <div className="md:col-span-2">
              <Btn type="submit">Publish Service</Btn>
            </div>
          </form>
        </Card>
      )}

      <Card title="Services List">
        <TableWrap>
          <thead>
            <tr>
              <Th>Service</Th>
              <Th>Price</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={3}>
                  <EmptyState message="No services yet" />
                </td>
              </tr>
            ) : (
              paged.map((s) => (
                <tr key={s.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <img
                        src={s.image || '/images/landscape.jpg'}
                        alt=""
                        className="h-11 w-11 rounded-lg object-cover bg-gray-100"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{s.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{s.description}</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="font-semibold">₹{s.price.toLocaleString('en-IN')}</Td>
                  <Td>
                    <Badge status="PUBLISHED" />
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
