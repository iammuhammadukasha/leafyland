import { Icon } from '../ui/primitives'

const tabs = [
  { label: 'Home', icon: 'home', active: true },
  { label: 'Categories', icon: 'grid_view', active: false },
  { label: 'Search', icon: 'search', active: false },
  { label: 'Cart', icon: 'shopping_cart', active: false },
  { label: 'Account', icon: 'person', active: false },
] as const

export function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5E5E5] h-16 flex items-center justify-around px-1 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      {tabs.map((tab) => (
        <a
          key={tab.label}
          href="#"
          className={`flex flex-col items-center gap-0.5 min-w-[56px] ${
            tab.active ? 'text-primary' : 'text-black'
          }`}
        >
          <Icon name={tab.icon} className={`text-2xl ${tab.active ? 'filled' : ''}`} />
          <span className="text-[10px] font-bold">{tab.label}</span>
        </a>
      ))}
    </nav>
  )
}
