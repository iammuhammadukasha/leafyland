import { Link } from 'react-router-dom';
import { Icon } from '../ui/primitives';
import { IMAGES } from '../../data/images';

export function ZeptoAuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="min-h-[calc(100vh-64px)] md:min-h-screen bg-[#f8f9fa] flex flex-col">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
          >
            <Icon name="chevron_left" className="w-5 h-5" />
            Back
          </Link>
          <Link to="/" className="text-xl font-black text-primary tracking-tight">
            leafyland
          </Link>
          <span className="w-14" aria-hidden />
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center px-4 py-6 md:py-10">
        <div className="w-full max-w-md">
          <div className="relative rounded-2xl overflow-hidden mb-6 h-36 bg-gradient-to-br from-primary via-[#2d6a4f] to-[#52b788]">
            <img
              src={IMAGES.heroPlants}
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
            />
            <div className="relative z-10 h-full flex flex-col justify-end p-5 text-white">
              <p className="text-[11px] font-bold uppercase tracking-wider opacity-90">Delivery in 10 mins</p>
              <p className="text-lg font-black leading-tight">Plants, fresh & garden essentials</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h1 className="text-2xl font-black text-ink tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-1.5">{subtitle}</p>}
            <div className="mt-6">{children}</div>
          </div>

          <p className="text-center text-[11px] text-gray-400 mt-6 leading-relaxed px-4">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-primary font-medium hover:underline">
              Terms
            </Link>{' '}
            &{' '}
            <Link to="/privacy" className="text-primary font-medium hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function ZeptoAuthField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  trailing,
  autoComplete,
  required,
  readOnly,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: string;
  trailing?: React.ReactNode;
  autoComplete?: string;
  required?: boolean;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-gray-400 pointer-events-none">
            <Icon name={icon} className="w-4 h-4" />
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          readOnly={readOnly}
          className={`w-full h-12 rounded-xl border border-gray-200 bg-[#fafafa] text-sm text-ink placeholder:text-gray-400 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all ${
            icon ? 'pl-10 pr-10' : 'px-4'
          } ${trailing ? 'pr-12' : ''}`}
        />
        {trailing && <div className="absolute right-2">{trailing}</div>}
      </div>
    </div>
  );
}

export function ZeptoAuthButton({
  children,
  loading,
  type = 'submit',
  onClick,
}: {
  children: React.ReactNode;
  loading?: boolean;
  type?: 'submit' | 'button';
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full h-12 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-primary/20"
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}
