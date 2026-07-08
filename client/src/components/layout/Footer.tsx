import { Link } from 'react-router-dom';
import { SiteIcon } from '../ui/site-icons';

const FOOTER_COLS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', to: '/products' },
      { label: 'Catalogue', to: '/catalogue' },
      { label: 'Indoor Plants', to: '/products?category=plants' },
      { label: 'Garden Tools', to: '/products?category=garden-tools' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Landscaping', to: '/services' },
      { label: 'Garden Maintenance', to: '/services' },
      { label: 'Plant Rental', to: '/services' },
      { label: 'Book a Service', to: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Become a Vendor', to: '/signup' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 mt-16">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-2xl text-primary font-medium">
              LeafyLand
            </Link>
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">
              India&apos;s curated green marketplace — plants, garden essentials, and services chosen for those who refuse to compromise.
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted">
              <a href="mailto:hello@leafyland.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <SiteIcon name="mail" className="w-4 h-4 text-primary" />
                hello@leafyland.com
              </a>
              <a href="tel:+919867909355" className="flex items-center gap-2 hover:text-primary transition-colors">
                <SiteIcon name="phone" className="w-4 h-4 text-primary" />
                +91 98679 09355
              </a>
            </div>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted tracking-wide">© 2026 LeafyLand. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-muted">
            <Link to="/terms" className="hover:text-primary">Terms</Link>
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
