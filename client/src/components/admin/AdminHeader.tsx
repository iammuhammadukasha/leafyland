import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { IconBell, IconMenu, IconSearch } from './icons';
import { AdminInput, Btn } from './admin-ui';

const routeTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/categories': 'Categories',
  '/admin/orders': 'Orders',
  '/admin/services': 'Services',
  '/admin/bookings': 'Bookings',
  '/admin/vendors': 'Vendors',
};

export function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const pageTitle = routeTitles[pathname] ?? 'Admin';

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <IconMenu />
          </button>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 truncate">Home / {pageTitle}</p>
            <h2 className="text-lg font-semibold text-gray-800 truncate">{pageTitle}</h2>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IconSearch className="w-4 h-4" />
            </span>
            <AdminInput placeholder="Search or type command..." className="pl-10" />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Notifications"
          >
            <IconBell />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-200">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              {(user?.name?.[0] ?? user?.email?.[0] ?? 'A').toUpperCase()}
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800 leading-tight">{user?.name ?? 'Admin'}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <Btn variant="ghost" size="sm" onClick={logout} className="hidden sm:inline-flex">
            Logout
          </Btn>
        </div>
      </div>
    </header>
  );
}
