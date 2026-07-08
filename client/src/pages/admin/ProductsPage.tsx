import { useEffect, useMemo, useState } from 'react';
import { api, type CategoryTree, type Product } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import {
  AdminInput,
  AdminSelect,
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

const PAGE_SIZE = 7;

const emptyForm = {
  name: '',
  description: '',
  price: '',
  comparePrice: '',
  categoryId: '',
  stock: '10',
  unit: '',
  imageUrl: '',
  status: 'PUBLISHED',
};

export function AdminProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryTree[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    api.get<Product[]>('/products?status=ALL').then(setProducts);
    api.get<CategoryTree[]>('/categories/tree?type=PRODUCT').then(setCategories);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(
      (p) => !q || p.name.toLowerCase().includes(q) || p.category?.name?.toLowerCase().includes(q),
    );
  }, [products, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  const openAdd = () => {
    resetForm();
    setShowForm(true);
  };

  const startEdit = (p: Product) => {
    const imgs = Array.isArray(p.images) ? p.images : [];
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      comparePrice: p.comparePrice != null ? String(p.comparePrice) : '',
      categoryId: p.category?.id ?? '',
      stock: String(p.stock),
      unit: p.unit ?? '',
      imageUrl: imgs[0] ?? '',
      status: p.status || 'PUBLISHED',
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    try {
      const body = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : undefined,
        categoryId: form.categoryId,
        stock: parseInt(form.stock, 10),
        unit: form.unit || undefined,
        images: form.imageUrl ? [form.imageUrl] : [],
        status: form.status,
      };
      if (editingId) {
        await api.patch(`/products/${editingId}`, body, token);
      } else {
        await api.post('/products', body, token);
      }
      closeForm();
      load();
    } finally {
      setSaving(false);
    }
  };

  const upload = async (file: File) => {
    if (!token) return;
    const { url } = await api.upload(file, token);
    setForm((f) => ({ ...f, imageUrl: url }));
  };

  const img = (p: Product) => {
    const imgs = Array.isArray(p.images) ? p.images : [];
    return imgs[0] || '/images/hero-garden.jpg';
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const togglePage = () => {
    if (paged.every((p) => selected.has(p.id))) {
      setSelected((prev) => {
        const next = new Set(prev);
        paged.forEach((p) => next.delete(p.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        paged.forEach((p) => next.add(p.id));
        return next;
      });
    }
  };

  const bulkDelete = async () => {
    if (!token || selected.size === 0) return;
    if (!window.confirm(`Delete ${selected.size} selected product(s)? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await api.post('/products/bulk-delete', { ids: [...selected] }, token);
      setSelected(new Set());
      load();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Product List"
        subtitle="Track your store's progress to boost your sales."
        breadcrumb="Home / Products"
        actions={
          <Btn variant="outline" onClick={() => (showForm ? closeForm() : openAdd())}>
            {showForm ? 'Close' : 'Add Product'}
          </Btn>
        }
      />

      {showForm && (
        <Card className="mb-6" title={editingId ? 'Edit Product' : 'Add New Product'}>
          <form onSubmit={save} className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Product Name</Label>
              <AdminInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label>Price (₹)</Label>
              <AdminInput required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <Label>Compare Price (₹)</Label>
              <AdminInput type="number" value={form.comparePrice} onChange={(e) => setForm({ ...form, comparePrice: e.target.value })} placeholder="Optional MRP" />
            </div>
            <div>
              <Label>Unit</Label>
              <AdminInput value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder='e.g. 1 plant (6" pot)' />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <AdminTextarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
              <Label>Category</Label>
              <AdminSelect required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                <option value="">Select category</option>
                {categories.map((parent) =>
                  (parent.children ?? []).length > 0 ? (
                    <optgroup key={parent.id} label={parent.name}>
                      {parent.children!.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </optgroup>
                  ) : (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ),
                )}
              </AdminSelect>
            </div>
            <div>
              <Label>Stock</Label>
              <AdminInput type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div>
              <Label>Status</Label>
              <AdminSelect value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </AdminSelect>
            </div>
            <div>
              <Label>Image URL</Label>
              <AdminInput value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            </div>
            <div>
              <Label>Upload Image</Label>
              <input type="file" accept="image/*" className="text-sm" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
              {form.imageUrl && (
                <img src={form.imageUrl} alt="" className="mt-2 h-16 w-16 rounded-lg object-cover border border-gray-200" />
              )}
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Btn type="submit" disabled={saving}>
                {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Publish Product'}
              </Btn>
              {editingId && (
                <Btn type="button" variant="outline" onClick={closeForm}>
                  Cancel
                </Btn>
              )}
            </div>
          </form>
        </Card>
      )}

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <AdminInput
            placeholder="Filter products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="max-w-xs"
          />
          <div className="flex items-center gap-3">
            {selected.size > 0 && (
              <Btn variant="outline" onClick={bulkDelete} disabled={deleting}>
                {deleting ? 'Deleting…' : `Delete selected (${selected.size})`}
              </Btn>
            )}
            <p className="text-sm text-gray-500">{filtered.length} products</p>
          </div>
        </div>

        <TableWrap>
          <thead>
            <tr>
              <Th className="w-10">
                <input
                  type="checkbox"
                  checked={paged.length > 0 && paged.every((p) => selected.has(p.id))}
                  onChange={togglePage}
                  aria-label="Select all on page"
                />
              </Th>
              <Th>Products</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <EmptyState message="No products found" />
                </td>
              </tr>
            ) : (
              paged.map((p) => (
                <tr key={p.id}>
                  <Td>
                    <input
                      type="checkbox"
                      checked={selected.has(p.id)}
                      onChange={() => toggleOne(p.id)}
                      aria-label={`Select ${p.name}`}
                    />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-3">
                      <img src={img(p)} alt="" className="h-12 w-12 rounded-lg object-cover bg-gray-100" />
                      <div>
                        <p className="font-medium text-gray-800">{p.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{p.description}</p>
                      </div>
                    </div>
                  </Td>
                  <Td>{p.category?.name ?? '—'}</Td>
                  <Td className="font-semibold">₹{p.price.toLocaleString('en-IN')}</Td>
                  <Td>
                    <Badge status={p.stock > 0 ? 'In Stock' : 'Out of Stock'} />
                  </Td>
                  <Td>
                    <Badge status={p.status} />
                  </Td>
                  <Td className="text-right">
                    <Btn variant="outline" size="sm" onClick={() => startEdit(p)}>
                      Edit
                    </Btn>
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
