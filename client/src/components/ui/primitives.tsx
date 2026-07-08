import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SiteIcon } from './site-icons';

/** Map legacy font-size classes to explicit SVG dimensions */
function normalizeIconClass(className: string): string {
  const sizeByToken: Record<string, string> = {
    'text-sm': 'w-3.5 h-3.5',
    'text-base': 'w-4 h-4',
    'text-lg': 'w-5 h-5',
    'text-xl': 'w-5 h-5',
    'text-2xl': 'w-6 h-6',
    'text-[22px]': 'w-[22px] h-[22px]',
  };

  const tokens = className.split(/\s+/).filter(Boolean);
  let size = 'w-5 h-5';
  const rest: string[] = [];

  for (const token of tokens) {
    if (sizeByToken[token]) {
      size = sizeByToken[token];
      continue;
    }
    rest.push(token);
  }

  const hasExplicitSize = rest.some((t) => /^[wh]-/.test(t) || t.startsWith('size-'));
  const sizeClass = hasExplicitSize ? '' : size;

  return ['inline-block', 'shrink-0', sizeClass, ...rest].filter(Boolean).join(' ');
}

export function Icon({
  name,
  className = '',
  filled = false,
}: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  return <SiteIcon name={name} className={normalizeIconClass(className)} filled={filled} />;
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4 md:mb-6">
      <div>
        <h2 className="text-xl md:text-[32px] md:leading-10 font-bold text-primary">{title}</h2>
        {subtitle && <p className="text-sm md:text-base text-black mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function SeeAllLink({ label = 'See All', to = '/products' }: { label?: string; to?: string }) {
  return (
    <Link
      to={to}
      className="text-sm font-semibold text-black hover:text-primary transition-colors inline-flex items-center gap-0.5 shrink-0"
    >
      {label}
      <Icon name="arrow_forward" className="w-4 h-4" />
    </Link>
  );
}
