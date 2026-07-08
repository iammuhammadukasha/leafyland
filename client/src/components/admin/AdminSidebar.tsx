import { NavLink } from 'react-router-dom';
import {
  IconBox,
  IconCalendar,
  IconCart,
  IconDashboard,
  IconGrid,
  IconLeaf,
  IconUsers,
} from './icons';

type NavItem = { to: string; label: string; icon: React.ReactNode; end?: boolean };

const groups: { title: string; items: NavItem[] }[] = [
  {
    title: 'Menu',
    items: [{ to: '/admin', label: 'Dashboard', icon: <IconDashboard />, end: true }],
  },
  {
    title: 'E-Commerce',
    items: [
      { to: '/admin/products', label: 'Products', icon: <IconBox /> },
      { to: '/admin/categories', label: 'Categories', icon: <IconGrid /> },
      { to: '/admin/import', label: 'Bulk Import', icon: <IconBox /> },
      { to: '/admin/orders', label: 'Orders', icon: <IconCart /> },
    ],
  },
  {
    title: 'Services',
    items: [
      { to: '/admin/services', label: 'Services', icon: <IconLeaf /> },
      { to: '/admin/bookings', label: 'Bookings', icon: <IconCalendar /> },
    ],
  },
  {
    title: 'Management',
    items: [{ to: '/admin/vendors', label: 'Vendors', icon: <IconUsers /> }],
  },
];

export function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[290px] flex-col border-r border-gray-200 bg-white transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white text-lg">
            🌿
          </div>
          <div>
            <p className="text-base font-bold text-gray-800">LeafyLand</p>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          {groups.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {group.title}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-100 p-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            View Storefront ↗
          </a>
        </div>
      </aside>
    </>
  );
}
