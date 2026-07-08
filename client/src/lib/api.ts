const API = '/api';

function headers(token?: string | null): HeadersInit {
  const h: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

async function request<T>(path: string, opts: RequestInit = {}, token?: string | null): Promise<T> {
  const res = await fetch(`${API}${path}`, { ...opts, headers: { ...headers(token), ...opts.headers } });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export const api = {
  get: <T>(path: string, token?: string | null) => request<T>(path, {}, token),
  post: <T>(path: string, body: unknown, token?: string | null) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }, token),
  patch: <T>(path: string, body: unknown, token?: string | null) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }, token),
  delete: <T>(path: string, token?: string | null) =>
    request<T>(path, { method: 'DELETE' }, token),
  upload: async (file: File, token: string) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(`${API}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    if (!res.ok) throw new Error('Upload failed');
    return res.json() as Promise<{ url: string }>;
  },
  downloadCsvTemplate: async (token: string) => {
    const res = await fetch(`${API}/products/import/template`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to download template');
    return res.text();
  },
  importProductsCsv: async (file: File, token: string) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(`${API}/products/import`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'Import failed');
    }
    return res.json() as Promise<{
      total: number;
      created: number;
      updated: number;
      errors: { row: number; message: string }[];
    }>;
  },
};

export type User = {
  id: string;
  email: string;
  name: string | null;
  role: 'ADMIN' | 'VENDOR' | 'CUSTOMER';
  vendor?: { id: string; shopName: string; approved: boolean } | null;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  type: string;
  image?: string | null;
  parentId?: string | null;
  parent?: { id: string; name: string; slug: string } | null;
  children?: Category[];
  _count?: { products: number; children?: number };
};

export type CategoryTree = Category & { children: Category[] };

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  stock: number;
  images: string[];
  unit?: string | null;
  status: string;
  category?: Category;
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image?: string | null;
};

export type Order = {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  subtotal: number;
  shippingFee: number;
  gstAmount: number;
  customerName: string;
  createdAt: string;
  items: { name: string; quantity: number; price: number }[];
};
