import { Link } from 'react-router-dom';
import { Icon } from '../ui/primitives';
import { MEGA_CATEGORY_GRID } from '../../data/mixedHomeData';

export function MegaCategoryGrid() {
  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-ink mb-4">Explore Categories</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 md:gap-4">
        {MEGA_CATEGORY_GRID.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-black/6 hover:border-primary/40 hover:shadow-sm transition-all group"
          >
            <span className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
              <Icon name={item.icon} className="w-5 h-5 text-primary" />
            </span>
            <span className="text-[10px] md:text-xs font-medium text-ink/80 text-center leading-tight line-clamp-2">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
