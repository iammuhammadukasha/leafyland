import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { SiteIcon, type SiteIconName } from './site-icons';

export function DisplayHeading({
  eyebrow,
  children,
  italic,
  className = '',
}: {
  eyebrow?: string;
  children: ReactNode;
  italic?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-ink leading-tight">
        {children}
        {italic && (
          <>
            {' '}
            <em className="italic text-primary">{italic}</em>
          </>
        )}
      </h2>
    </div>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  italic,
  subtitle,
  href,
  linkLabel = 'Shop the collection',
}: {
  eyebrow?: string;
  title: string;
  italic?: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
      <div className="max-w-2xl">
        <DisplayHeading eyebrow={eyebrow} italic={italic}>
          {title}
        </DisplayHeading>
        {subtitle && <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">{subtitle}</p>}
      </div>
      {href && (
        <Link
          to={href}
          className="text-sm font-medium text-ink underline underline-offset-4 decoration-black/30 hover:decoration-primary hover:text-primary shrink-0"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

export function ProductRail({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4 md:gap-5 overflow-x-auto hide-scrollbar pb-2 snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0">
      {children}
    </div>
  );
}

export function PillarsGrid({
  items,
}: {
  items: { title: string; desc: string; icon?: SiteIconName; image?: string }[];
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
      {items.map((item) => (
        <div key={item.title} className="text-center lg:text-left">
          <div className="w-16 h-16 mx-auto lg:mx-0 rounded-full border border-primary/20 overflow-hidden mb-4 bg-white shadow-soft">
            {item.image ? (
              <img src={item.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary">
                {item.icon && <SiteIcon name={item.icon} className="w-6 h-6" />}
              </div>
            )}
          </div>
          <h3 className="text-sm font-semibold text-ink mb-2">{item.title}</h3>
          <p className="text-xs md:text-sm text-muted leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
