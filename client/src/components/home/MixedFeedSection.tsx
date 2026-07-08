import { Link } from 'react-router-dom';
import { Icon } from '../ui/primitives';
import type { MixedCard } from '../../data/mixedHomeData';
import { MIXED_FEED } from '../../data/mixedHomeData';
import { resolveImage, IMAGES } from '../../data/images';

function MixedCardItem({ card }: { card: MixedCard }) {
  if (card.type === 'product') {
    return (
      <article className="min-w-[200px] max-w-[200px] shrink-0 bg-white rounded-2xl border border-black/8 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Link to={`/products/${card.slug}`} className="block">
          <div className="aspect-square bg-[#f7f7f7] overflow-hidden">
            <img src={resolveImage(card.image, IMAGES.peaceLily, card.slug)} alt={card.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Product</span>
            <h3 className="text-sm font-semibold text-ink line-clamp-1">{card.name}</h3>
            <p className="text-xs text-muted flex items-center gap-1">
              <Icon name="star" className="w-3.5 h-3.5 text-amber-500" filled />
              {card.rating}
            </p>
            <p className="text-base font-bold text-ink">{card.price}</p>
            <span className="inline-block mt-1 text-xs font-bold text-primary">Buy Now →</span>
          </div>
        </Link>
      </article>
    );
  }

  if (card.type === 'expert') {
    return (
      <article className="min-w-[200px] max-w-[200px] shrink-0 bg-white rounded-2xl border border-black/8 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Link to="/contact" className="block p-3.5 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Expert</span>
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="groups" className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-ink">{card.name}</h3>
          <p className="text-xs text-muted line-clamp-1">{card.role}</p>
          <p className="text-xs text-muted">{card.years}</p>
          <p className="text-xs flex items-center gap-1">
            <Icon name="star" className="w-3.5 h-3.5 text-amber-500" filled />
            {card.rating}
          </p>
          <span className="inline-block text-xs font-bold text-primary">Hire Now →</span>
        </Link>
      </article>
    );
  }

  if (card.type === 'service') {
    return (
      <article className="min-w-[200px] max-w-[200px] shrink-0 bg-white rounded-2xl border border-black/8 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Link to={`/services/${card.slug}/book`} className="block">
          <div className="aspect-[4/3] bg-[#f7f7f7] overflow-hidden">
            <img src={resolveImage(card.image, IMAGES.gardenMaintenance, card.slug)} alt={card.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Service</span>
            <h3 className="text-sm font-semibold text-ink line-clamp-2">{card.name}</h3>
            <p className="text-xs flex items-center gap-1 text-muted">
              <Icon name="star" className="w-3.5 h-3.5 text-amber-500" filled />
              {card.rating}
            </p>
            <p className="text-sm font-bold text-ink">{card.price}</p>
            <span className="inline-block text-xs font-bold text-primary">Book →</span>
          </div>
        </Link>
      </article>
    );
  }

  if (card.type === 'franchise') {
    return (
      <article className="min-w-[200px] max-w-[200px] shrink-0 bg-white rounded-2xl border border-black/8 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Link to="/contact" className="block">
          <div className="aspect-[4/3] bg-[#f7f7f7] overflow-hidden">
            <img src={resolveImage(card.image, IMAGES.vendorNursery, card.name)} alt={card.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Franchise</span>
            <h3 className="text-sm font-semibold text-ink">{card.name}</h3>
            <p className="text-sm font-bold text-ink">{card.investment}</p>
            <span className="inline-block text-xs font-bold text-primary">Apply →</span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="min-w-[200px] max-w-[200px] shrink-0 bg-white rounded-2xl border border-black/8 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to="/contact" className="block">
        <div className="aspect-[4/3] bg-primary/5 overflow-hidden">
          <img src={resolveImage(card.image, IMAGES.balconyGarden, card.name)} alt={card.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="p-3.5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Community</span>
          <h3 className="text-sm font-semibold text-ink">{card.name}</h3>
          <p className="text-sm text-muted">{card.members}</p>
          <span className="inline-block text-xs font-bold text-primary">Join →</span>
        </div>
      </Link>
    </article>
  );
}

export function MixedFeedSection() {
  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-ink mb-4">Discover Everything Green</h2>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1">
        {MIXED_FEED.map((card, i) => (
          <MixedCardItem key={`${card.type}-${i}`} card={card} />
        ))}
      </div>
    </section>
  );
}

export function ExpertCard({
  name,
  role,
  years,
  rating,
  price,
}: {
  name: string;
  role: string;
  years: string;
  rating: number;
  price: string;
}) {
  return (
    <article className="min-w-[220px] shrink-0 bg-white rounded-2xl border border-black/8 p-5 shadow-sm hover:shadow-md transition-shadow">
      <Link to="/contact" className="block space-y-3">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="groups" className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-ink">{name}</h3>
          <p className="text-sm text-muted mt-0.5">{role}</p>
          <p className="text-xs text-muted mt-1">{years}</p>
        </div>
        <p className="text-sm flex items-center gap-1">
          <Icon name="verified" className="w-4 h-4 text-primary" />
          <Icon name="star" className="w-3.5 h-3.5 text-amber-500" filled />
          {rating}
        </p>
        <p className="text-sm font-bold text-ink">{price}</p>
        <span className="inline-block w-full text-center py-2.5 rounded-xl bg-primary text-white text-xs font-bold">
          Hire Now
        </span>
      </Link>
    </article>
  );
}

export function CommunityCard({ name, members, image }: { name: string; members: string; image: string }) {
  return (
    <article className="min-w-[220px] shrink-0 bg-white rounded-2xl border border-black/8 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to="/contact" className="block">
        <div className="aspect-[16/10] overflow-hidden">
          <img src={resolveImage(image, IMAGES.balconyGarden, name)} alt={name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-ink">{name}</h3>
          <p className="text-sm text-muted">{members}</p>
          <span className="inline-block w-full text-center py-2 rounded-xl border border-primary text-primary text-xs font-bold">
            Join Community
          </span>
        </div>
      </Link>
    </article>
  );
}
