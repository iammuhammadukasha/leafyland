import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { api, type Product } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Btn, Input, Label, Textarea } from '../components/ui/PageShell';

export function VendorDashboard() {
  const { user, token, loading, logout } = useAuth();
  const [stats, setStats] = useState({ products: 0, orders: 0, earnings: 0 });
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', categoryId: '', stock: '5' });
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    if (token && user?.vendor) {
      api.get<{ products: number; orders: number; earnings: number }>('/vendor/stats', token).then(setStats);
      api.get<Product[]>(`/products?vendorId=${user.vendor.id}&status=PUBLISHED`).then(setProducts);
      api.get<Array<{ id: string; name: string }>>('/categories?type=PRODUCT').then(setCategories);
    }
  }, [token, user]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user || user.role !== 'VENDOR') return <Navigate to="/login" replace />;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    await api.post('/products', {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      categoryId: form.categoryId,
      stock: parseInt(form.stock, 10),
      images: [],
      status: 'PUBLISHED',
    }, token);
    setForm({ name: '', description: '', price: '', categoryId: '', stock: '5' });
    if (user.vendor) {
      api.get<Product[]>(`/products?vendorId=${user.vendor.id}`).then(setProducts);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Vendor Dashboard</h1>
        <button type="button" onClick={logout} className="text-sm text-black/60">Logout</button>
      </div>
      {!user.vendor?.approved && (
        <p className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm">Your vendor account is pending admin approval.</p>
      )}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border rounded-xl p-4"><p className="text-sm text-black/60">Products</p><p className="text-2xl font-bold">{stats.products}</p></div>
        <div className="border rounded-xl p-4"><p className="text-sm text-black/60">Orders</p><p className="text-2xl font-bold">{stats.orders}</p></div>
        <div className="border rounded-xl p-4"><p className="text-sm text-black/60">Earnings</p><p className="text-2xl font-bold">₹{stats.earnings}</p></div>
      </div>
      <h2 className="font-bold text-black mb-3">Add Product</h2>
      <form onSubmit={save} className="border rounded-xl p-4 space-y-3 mb-8">
        <div><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><Label>Price</Label><Input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
        <div><Label>Description</Label><Textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div>
          <Label>Category</Label>
          <select className="w-full h-11 border rounded-lg px-3" required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
            <option value="">Select</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <Btn type="submit">Upload Product</Btn>
      </form>
      <h2 className="font-bold text-black mb-3">My Products</h2>
      <ul className="space-y-2">{products.map((p) => <li key={p.id} className="border rounded p-3">{p.name} — ₹{p.price} (stock: {p.stock})</li>)}</ul>
      <Link to="/" className="inline-block mt-6 text-primary text-sm font-semibold">← Back to store</Link>
    </div>
  );
}
