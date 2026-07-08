import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { redirectForRole, useAuth } from '../context/AuthContext';
import {
  ZeptoAuthButton,
  ZeptoAuthField,
  ZeptoAuthLayout,
} from '../components/zepto/ZeptoAuthLayout';

type LoginMode = 'email' | 'phone' | 'admin';

const ADMIN_EMAIL = 'admin@leafyland.com';
const ADMIN_PASSWORD = 'admin123';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const wantsAdmin = searchParams.get('admin') === '1' || redirect?.startsWith('/admin');

  const [mode, setMode] = useState<LoginMode>(wantsAdmin ? 'admin' : 'email');
  const [email, setEmail] = useState(wantsAdmin ? ADMIN_EMAIL : '');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(wantsAdmin ? ADMIN_PASSWORD : '');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (mode === 'phone') {
      setError('Phone login is coming soon. Please use email for now.');
      setLoading(false);
      return;
    }

    const loginEmail = mode === 'admin' ? ADMIN_EMAIL : email;
    const loginPassword = mode === 'admin' ? password || ADMIN_PASSWORD : password;

    try {
      const user = await login(loginEmail, loginPassword);
      if (mode === 'admin' && user.role !== 'ADMIN') {
        setError('This account is not an admin. Run npm run db:seed to create the admin user.');
        setLoading(false);
        return;
      }
      navigate(redirectForRole(user, redirect ?? (mode === 'admin' ? '/admin' : null)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ZeptoAuthLayout
      title={mode === 'admin' ? 'Admin login' : 'Login or Sign up'}
      subtitle={
        mode === 'admin'
          ? 'Sign in to manage products, categories, orders & imports.'
          : 'Order plants, fresh produce & garden essentials — delivered fast.'
      }
    >
      <div className="flex rounded-xl bg-[#f3f4f6] p-1 mb-5">
        <button
          type="button"
          onClick={() => setMode('phone')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            mode === 'phone' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'
          }`}
        >
          Phone
        </button>
        <button
          type="button"
          onClick={() => setMode('email')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            mode === 'email' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'
          }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('admin');
            setEmail(ADMIN_EMAIL);
            if (!password) setPassword(ADMIN_PASSWORD);
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            mode === 'admin' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'
          }`}
        >
          Admin
        </button>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 px-3 py-2.5 text-sm text-red-700">
            {error}
          </div>
        )}

        {mode === 'phone' ? (
          <ZeptoAuthField
            label="Mobile number"
            type="tel"
            value={phone}
            onChange={setPhone}
            placeholder="10-digit mobile number"
            icon="phone"
            autoComplete="tel"
          />
        ) : mode === 'admin' ? (
          <>
            <ZeptoAuthField
              label="Admin email"
              type="email"
              value={ADMIN_EMAIL}
              onChange={() => {}}
              placeholder={ADMIN_EMAIL}
              icon="mail"
              autoComplete="username"
              readOnly
              required
            />
            <ZeptoAuthField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              placeholder="Admin password"
              autoComplete="current-password"
              required
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="px-2 py-1 text-[11px] font-semibold text-primary hover:underline"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              }
            />
            <p className="text-[11px] text-gray-500 bg-[#f8f9fa] rounded-lg px-3 py-2 border border-gray-100">
              Default after <code className="text-gray-600">npm run db:seed</code>:{' '}
              <span className="font-semibold">{ADMIN_EMAIL}</span> / admin123
            </p>
          </>
        ) : (
          <>
            <ZeptoAuthField
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              icon="mail"
              autoComplete="email"
              required
            />
            <ZeptoAuthField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="px-2 py-1 text-[11px] font-semibold text-primary hover:underline"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              }
            />
          </>
        )}

        <ZeptoAuthButton loading={loading}>
          {mode === 'phone' ? 'Get OTP' : mode === 'admin' ? 'Enter admin panel' : 'Continue'}
        </ZeptoAuthButton>
      </form>

      {mode !== 'admin' && (
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            New to LeafyLand?{' '}
            <Link to="/signup" className="font-bold text-primary hover:underline">
              Create account
            </Link>
          </p>
          <Link
            to="/login?admin=1&redirect=/admin"
            className="inline-block mt-3 text-xs font-semibold text-primary hover:underline"
          >
            Admin login →
          </Link>
          <Link
            to="/"
            className="block mt-2 text-xs font-semibold text-gray-400 hover:text-primary transition-colors"
          >
            Continue browsing without login
          </Link>
        </div>
      )}

      {mode === 'admin' && (
        <p className="mt-5 text-center text-xs text-gray-400">
          <Link to="/login" className="hover:text-primary">
            ← Back to customer login
          </Link>
        </p>
      )}
    </ZeptoAuthLayout>
  );
}
