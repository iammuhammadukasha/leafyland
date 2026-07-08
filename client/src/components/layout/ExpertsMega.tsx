import { Link } from 'react-router-dom';
import { Icon } from '../ui/primitives';
import { EXPERTS_MEGA_COLUMNS } from '../../data/expertsMegaData';

export function ExpertsMega({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute left-0 right-0 top-full bg-white border-t border-black/10 shadow-xl z-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary mb-6 flex items-center gap-2">
          <Icon name="groups" className="w-5 h-5" />
          Experts
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {EXPERTS_MEGA_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-3 flex items-center gap-2 pb-2 border-b border-black/8">
                <Icon name={col.icon} className="w-4 h-4 text-primary" />
                {col.title}
              </h4>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="block py-2 text-sm text-ink/80 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link
          to="/contact"
          onClick={onClose}
          className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold tracking-[0.16em] uppercase hover:bg-primary-hover transition-colors"
        >
          Book Expert Consultation
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
