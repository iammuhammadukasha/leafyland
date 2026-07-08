import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ZeptoAuthButton,
  ZeptoAuthField,
  ZeptoAuthLayout,
} from '../components/zepto/ZeptoAuthLayout';

export function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'CUSTOMER', shopName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        shopName: form.role === 'VENDOR' ? form.shopName : undefined,
      });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ZeptoAuthLayout
      title="Create your account"
      subtitle="Join LeafyLand for fast delivery on plants & garden essentials."
    >
      <form onSubmit={submit} className="space-y-4">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 px-3 py-2.5 text-sm text-red-700">
            {error}
          </div>
        )}

        <ZeptoAuthField
          label="Full name"
          value={form.name}
          onChange={(name) => setForm({ ...form, name })}
          placeholder="Your name"
          autoComplete="name"
          required
        />
        <ZeptoAuthField
          label="Email address"
          type="email"
          value={form.email}
          onChange={(email) => setForm({ ...form, email })}
          placeholder="you@example.com"
          icon="mail"
          autoComplete="email"
          required
        />
        <ZeptoAuthField
          label="Password"
          type="password"
          value={form.password}
          onChange={(password) => setForm({ ...form, password })}
          placeholder="Min. 6 characters"
          autoComplete="new-password"
          required
        />

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Account type</label>
          <select
            className="w-full h-12 rounded-xl border border-gray-200 bg-[#fafafa] px-4 text-sm text-ink outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="CUSTOMER">Customer</option>
            <option value="VENDOR">Vendor</option>
          </select>
        </div>

        {form.role === 'VENDOR' && (
          <ZeptoAuthField
            label="Shop name"
            value={form.shopName}
            onChange={(shopName) => setForm({ ...form, shopName })}
            placeholder="Your nursery or store name"
            required
          />
        )}

        <ZeptoAuthButton loading={loading}>Create account</ZeptoAuthButton>
      </form>

      <p className="mt-6 pt-5 border-t border-gray-100 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </ZeptoAuthLayout>
  );
}
