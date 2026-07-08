import type { ReactNode } from 'react';

type IconProps = { className?: string; filled?: boolean };

function Svg({ className = '', filled, children }: IconProps & { children: ReactNode }) {
  const hasSize = /\b(w-|h-|size-)/.test(className);
  return (
    <svg
      className={`shrink-0 ${hasSize ? '' : 'w-5 h-5'} ${className}`.trim()}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? 0 : 1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function IconOrganic({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3c-4 4-6 8-6 12a6 6 0 0012 0c0-4-2-8-6-12z" />
      <path d="M12 15V9" />
      <path d="M9 12l1.5 1.5L15 9" />
    </Svg>
  );
}

export function IconDelivery({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3 7h11v8H3z" />
      <path d="M14 10h4l3 3v2h-7v-5z" />
      <circle cx="7" cy="17" r="1.5" />
      <circle cx="18" cy="17" r="1.5" />
    </Svg>
  );
}

export function IconCurated({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M8 11V8a4 4 0 118 0v3" />
      <path d="M5 11h14v9H5z" />
      <path d="M12 15v2" />
    </Svg>
  );
}

export function IconWellbeing({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 21V11" />
      <path d="M8 15c-3-2-4-5-2-7s5-1 6 2c1-3 4-4 6-2s1 5-2 7" />
    </Svg>
  );
}

export function IconLeaf({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3c-4 4-6 8-6 12a6 6 0 0012 0c0-4-2-8-6-12z" />
      <path d="M12 15V9" />
    </Svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function IconSearch({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-3.5-3.5" />
    </Svg>
  );
}

export function IconHeart({ className, filled }: IconProps) {
  return (
    <Svg className={className} filled={filled}>
      {filled ? (
        <path d="M12 21s-7-4.6-9.2-8.8C1.1 9.2 3.2 5.5 7 5.5c2 0 3.2 1.2 5 3.2C13.8 6.7 15 5.5 17 5.5c3.8 0 5.9 3.7 4.2 6.7C19 16.4 12 21 12 21z" />
      ) : (
        <path d="M12 21s-7-4.6-9.2-8.8C1.1 9.2 3.2 5.5 7 5.5c2 0 3.2 1.2 5 3.2C13.8 6.7 15 5.5 17 5.5c3.8 0 5.9 3.7 4.2 6.7C19 16.4 12 21 12 21z" />
      )}
    </Svg>
  );
}

export function IconUser({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.5-3.5 4.2-5.5 7-5.5s5.5 2 7 5.5" />
    </Svg>
  );
}

export function IconBag({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M7 9V7a5 5 0 0110 0v2" />
      <path d="M5 9h14l-1.2 11H6.2L5 9z" />
    </Svg>
  );
}

export function IconCart({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 5h1.5L7 17h12l2-9H6" />
      <circle cx="9" cy="19.5" r="1.2" />
      <circle cx="17" cy="19.5" r="1.2" />
    </Svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

export function IconTrash({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 7h16M9 7V5h6v2M10 11v5M14 11v5M6 7l1 12h10l1-12" />
    </Svg>
  );
}

export function IconCalendar({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </Svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </Svg>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  );
}

export function IconChevronUp({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M18 15l-6-6-6 6" />
    </Svg>
  );
}

export function IconChevronLeft({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M15 18l-6-6 6-6" />
    </Svg>
  );
}

export function IconChevronRight({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M9 18l6-6-6-6" />
    </Svg>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function IconStar({ className, filled }: IconProps) {
  return (
    <Svg className={className} filled={filled}>
      <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.8 6.7 19.6l1-5.8-4.2-4.1 5.9-.9L12 3.5z" />
    </Svg>
  );
}

export function IconVerified({ className, filled }: IconProps) {
  return (
    <Svg className={className} filled={filled}>
      <path d="M9 12l2 2 4-4" />
      <path d="M12 3l2.2 1.1 2.4-.3 1.6 1.8 2.4.3-.3 2.4 1.8 1.6-.3 2.4L19 15l-1.1 2.2.3 2.4-2.4-.3-1.6 1.8-2.4-.3L12 21l-2.2-1.1-2.4.3-1.6-1.8-2.4.3.3-2.4L3 15l1.1-2.2-.3-2.4 2.4.3 1.6-1.8 2.4.3L12 3z" />
    </Svg>
  );
}

export function IconHome({ className, filled }: IconProps) {
  return (
    <Svg className={className} filled={filled}>
      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" />
    </Svg>
  );
}

export function IconGrid({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </Svg>
  );
}

export function IconPlant({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 20V10" />
      <path d="M8 14c-3-1-4-4-2-6 2-2 5-1 6 1M16 14c3-1 4-4 2-6-2-2-5-1-6 1" />
      <path d="M7 20h10" />
    </Svg>
  );
}

export function IconCompost({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 10c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M5 10h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z" />
      <path d="M9 14h6" />
    </Svg>
  );
}

export function IconGrass({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 20V12l2-6 2 6v8M14 20V10l2-5 2 5v10" />
    </Svg>
  );
}

export function IconTools({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M14 4l6 6-4 4-6-6 4-4z" />
      <path d="M5 19l4-4" />
    </Svg>
  );
}

export function IconPark({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 4c-2 3-5 4-5 8a5 5 0 0010 0c0-4-3-5-5-8z" />
      <path d="M8 20h8" />
    </Svg>
  );
}

export function IconWater({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3c3 4 6 7 6 11a6 6 0 11-12 0c0-4 3-7 6-11z" />
    </Svg>
  );
}

export function IconPipe({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 8h12v3H6z" />
      <path d="M15 11v5h3v-3" />
      <path d="M6 14h6" />
    </Svg>
  );
}

export function IconSolar({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Svg>
  );
}

export function IconEco({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2 3 2 13 0 16M12 4c-2 3-2 13 0 16" />
    </Svg>
  );
}

export function IconHandyman({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M14 4l6 6-8 8H6v-6l8-8z" />
      <path d="M16 6l2 2" />
    </Svg>
  );
}

export function IconStore({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 9l2-5h12l2 5" />
      <path d="M5 9v10h14V9" />
      <path d="M10 14h4" />
    </Svg>
  );
}

export function IconApps({ className }: IconProps) {
  return <IconGrid className={className} />;
}

export function IconBolt({ className }: IconProps) {
  return (
    <Svg className={className} filled>
      <path d="M13 2L5 14h6l-1 8 8-12h-6l1-8z" />
    </Svg>
  );
}

export function IconRefresh({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 12a8 8 0 0113.7-5.7L20 8" />
      <path d="M20 6v4h-4M20 12a8 8 0 01-13.7 5.7L4 16" />
      <path d="M4 18v-4h4" />
    </Svg>
  );
}

export function IconEmergency({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3l9 16H3L12 3z" />
      <path d="M12 9v4M12 16h.01" />
    </Svg>
  );
}

export function IconBuilding({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="5" y="4" width="14" height="16" rx="1" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
    </Svg>
  );
}

export function IconVideo({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="7" width="13" height="10" rx="2" />
      <path d="M16 10l5-3v10l-5-3" />
    </Svg>
  );
}

export function IconAward({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="9" r="4" />
      <path d="M8.5 13L7 21l5-2.5L17 21l-1.5-8" />
    </Svg>
  );
}

export function IconTeam({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="9" cy="9" r="2.5" />
      <circle cx="16" cy="10" r="2" />
      <path d="M4 18c.5-2.5 2.5-4 5-4s4.5 1.5 5 4M13 18c.4-1.8 1.8-3 3.5-3s3.1 1.2 3.5 3" />
    </Svg>
  );
}

export function IconGlobe({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.5 3 2.5 13 0 16M12 4c-2.5 3-2.5 13 0 16" />
    </Svg>
  );
}

export function IconArticle({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 4h12v16H6z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </Svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 8l9 6 9-6" />
    </Svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M7 4h4l1 4-2 1a11 11 0 005 5l1-2 4 1v4a2 2 0 01-2 2C9.8 19 5 14.2 5 8a2 2 0 012-2z" />
    </Svg>
  );
}

export function IconWhatsApp({ className }: IconProps) {
  return (
    <Svg className={className} filled>
      <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3zm0 2a7 7 0 016.4 9.8l.3.7-.2 1.1-1 .3-.8-.2a7 7 0 01-3.4-1.8l-.5-.5a7 7 0 01-1.8-3.4l-.2-.8.3-1 1.1-.2.7.3A7 7 0 0012 5z" />
    </Svg>
  );
}

export const SITE_ICONS = {
  organic: IconOrganic,
  delivery: IconDelivery,
  curated: IconCurated,
  wellbeing: IconWellbeing,
  leaf: IconLeaf,
  menu: IconMenu,
  search: IconSearch,
  favorite_border: IconHeart,
  heart: IconHeart,
  person_outline: IconUser,
  person: IconUser,
  user: IconUser,
  shopping_bag: IconBag,
  shopping_cart: IconCart,
  cart: IconCart,
  close: IconClose,
  delete_outline: IconTrash,
  trash: IconTrash,
  calendar_month: IconCalendar,
  calendar: IconCalendar,
  schedule: IconClock,
  clock: IconClock,
  keyboard_arrow_down: IconChevronDown,
  keyboard_arrow_up: IconChevronUp,
  chevron_left: IconChevronLeft,
  chevron_right: IconChevronRight,
  keyboard_arrow_left: IconChevronLeft,
  keyboard_arrow_right: IconChevronRight,
  expand_more: IconChevronDown,
  expand_less: IconChevronUp,
  arrow_forward: IconArrowRight,
  star: IconStar,
  stars: IconStar,
  verified: IconVerified,
  home: IconHome,
  grid_view: IconGrid,
  apps: IconApps,
  local_florist: IconPlant,
  plant: IconPlant,
  compost: IconCompost,
  grass: IconGrass,
  hardware: IconTools,
  tools: IconTools,
  park: IconPark,
  water_drop: IconWater,
  plumbing: IconPipe,
  solar_power: IconSolar,
  eco: IconEco,
  handyman: IconHandyman,
  storefront: IconStore,
  bolt: IconBolt,
  update: IconRefresh,
  autorenew: IconRefresh,
  emergency_home: IconEmergency,
  emergency: IconEmergency,
  location_city: IconBuilding,
  videocam: IconVideo,
  workspace_premium: IconAward,
  groups: IconTeam,
  public: IconGlobe,
  article: IconArticle,
  mail: IconMail,
  phone: IconPhone,
  whatsapp: IconWhatsApp,
} as const;

export type SiteIconName = keyof typeof SITE_ICONS;

export function SiteIcon({
  name,
  className = 'w-5 h-5',
  filled = false,
}: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  const Cmp = SITE_ICONS[name as SiteIconName] ?? IconLeaf;
  return <Cmp className={className} filled={filled} />;
}
