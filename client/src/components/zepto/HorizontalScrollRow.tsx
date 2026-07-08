import type { ReactNode } from 'react';
import { Icon } from '../ui/primitives';
import { useHorizontalScroll } from './useHorizontalScroll';

export function HorizontalScrollRow({
  children,
  className = '',
  innerClassName = 'flex gap-2.5 overflow-x-auto hide-scrollbar px-4 pb-2',
  arrowStyle = 'light',
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  arrowStyle?: 'light' | 'zepto';
}) {
  const { ref, canLeft, canRight, scroll } = useHorizontalScroll();

  const arrowClass =
    arrowStyle === 'zepto'
      ? 'flex absolute z-10 w-9 h-9 items-center justify-center rounded-full bg-ink text-white shadow-lg hover:bg-black transition-colors'
      : 'hidden md:flex absolute z-10 w-8 h-8 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-gray-50';

  const leftPos =
    arrowStyle === 'zepto'
      ? 'left-2 md:left-3 top-1/2 -translate-y-1/2'
      : 'left-1 top-1/2 -translate-y-1/2';
  const rightPos =
    arrowStyle === 'zepto'
      ? 'right-2 md:right-3 top-1/2 -translate-y-1/2'
      : 'right-1 top-1/2 -translate-y-1/2';

  return (
    <div className={`relative group/scroll ${className}`}>
      {canLeft && (
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className={`${arrowClass} ${leftPos} ${arrowStyle === 'light' ? 'hidden md:flex' : ''}`}
        >
          <Icon name="chevron_left" className="w-5 h-5" />
        </button>
      )}
      {canRight && (
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className={`${arrowClass} ${rightPos} ${arrowStyle === 'light' ? 'hidden md:flex' : ''}`}
        >
          <Icon name="chevron_right" className="w-5 h-5" />
        </button>
      )}
      <div ref={ref} className={innerClassName}>
        {children}
      </div>
    </div>
  );
}
