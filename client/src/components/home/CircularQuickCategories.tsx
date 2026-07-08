import { Link } from 'react-router-dom';
import { Icon } from '../ui/primitives';
import { CIRCULAR_CATEGORIES } from '../../data/mixedHomeData';

export function CircularQuickCategories() {
  return (
    <section>
      <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1">
        {CIRCULAR_CATEGORIES.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="flex flex-col items-center gap-2.5 min-w-[72px] md:min-w-[88px] shrink-0 group"
          >
            <span className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
              <Icon
                name={item.icon}
                className="w-7 h-7 md:w-8 md:h-8 text-primary group-hover:text-white transition-colors"
              />
            </span>
            <span className="text-[11px] md:text-xs font-semibold text-ink text-center leading-tight group-hover:text-primary transition-colors">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
