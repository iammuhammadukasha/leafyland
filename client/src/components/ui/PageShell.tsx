import { Link } from 'react-router-dom';

export function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">{title}</h1>
      {children}
    </div>
  );
}

export function Btn({
  children,
  variant = 'primary',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' }) {
  const base = 'px-4 py-2 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50';
  const styles =
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-primary/90'
      : 'border border-primary text-black hover:bg-primary/5';
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full h-11 px-3 border border-[#E5E5E5] rounded-lg text-sm text-black focus:border-primary outline-none"
      {...props}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm text-black focus:border-primary outline-none min-h-[100px]"
      {...props}
    />
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-black mb-1">{children}</label>;
}

export function BackLink({ to, label }: { to: string; label?: string }) {
  return (
    <Link to={to} className="text-sm text-primary font-medium hover:underline mb-4 inline-block">
      ← {label ?? 'Back'}
    </Link>
  );
}
