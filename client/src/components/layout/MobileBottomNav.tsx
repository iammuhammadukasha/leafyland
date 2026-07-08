import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../ui/primitives';

const tabs = [
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Search', icon: 'search', to: '/products' },
  { label: 'Shop', icon: 'shopping_bag', to: '/products' },
  { label: 'Messages', icon: 'mail', to: '/contact' },
  { label: 'Profile', icon: 'person', to: '/login' },
] as const;

export function MobileBottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 h-16 flex items-center justify-around px-1 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] pb-safe">
      {tabs.map((tab) => {
        const active =
          tab.to === '/'
            ? pathname === '/'
            : pathname.startsWith(tab.to);

        return (
          <Link
            key={tab.label}
            to={tab.to}
            className={`flex flex-col items-center gap-0.5 min-w-[56px] ${
              active ? 'text-primary' : 'text-gray-700'
            }`}
          >
            <Icon name={tab.icon} className="w-6 h-6" />
            <span className="text-[10px] font-semibold">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
