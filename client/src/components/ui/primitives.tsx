import type { ReactNode } from 'react'

export function Icon({ name, className = '', filled = false }: { name: string; className?: string; filled?: boolean }) {
  return (
    <span className={`material-symbols-outlined ${filled ? 'filled' : ''} ${className}`}>{name}</span>
  )
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4 md:mb-6">
      <div>
        <h2 className="text-xl md:text-[32px] md:leading-10 font-bold text-primary">{title}</h2>
        {subtitle && <p className="text-sm md:text-base text-black mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function SeeAllLink({ label = 'See All' }: { label?: string }) {
  return (
    <a
      href="#"
      className="text-sm font-semibold text-black hover:text-primary transition-colors inline-flex items-center gap-0.5 shrink-0"
    >
      {label}
      <Icon name="arrow_forward" className="text-base" />
    </a>
  )
}
