/** Experts mega-menu — client dropdown spec */

export type ExpertMegaColumn = {
  title: string;
  icon: string;
  links: { label: string; to: string }[];
};

export const EXPERTS_MEGA_COLUMNS: ExpertMegaColumn[] = [
  {
    title: 'Home Experts',
    icon: 'home',
    links: [
      { label: 'Garden Designer', to: '/contact' },
      { label: 'Landscape Architect', to: '/contact' },
      { label: 'Interior Designer', to: '/contact' },
      { label: 'Civil Engineer', to: '/contact' },
    ],
  },
  {
    title: 'Business Experts',
    icon: 'storefront',
    links: [
      { label: 'CA', to: '/contact' },
      { label: 'Lawyer', to: '/contact' },
      { label: 'Marketing', to: '/contact' },
      { label: 'Consultant', to: '/contact' },
    ],
  },
  {
    title: 'Agriculture',
    icon: 'grass',
    links: [
      { label: 'Farm Consultant', to: '/contact' },
      { label: 'Soil Expert', to: '/contact' },
      { label: 'Hydroponics', to: '/contact' },
    ],
  },
  {
    title: 'Top Rated',
    icon: 'star',
    links: [
      { label: 'Verified Experts', to: '/contact' },
      { label: 'Book Consultation', to: '/contact' },
      { label: 'Video Consult', to: '/contact' },
    ],
  },
];
