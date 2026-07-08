import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Animation duration in seconds */
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
};

export function InfinityMarquee({
  children,
  duration = 32,
  className = '',
  pauseOnHover = false,
}: Props) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex w-max marquee-track ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
