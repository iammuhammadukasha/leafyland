import { Icon } from './primitives'

type VendorCardProps = {
  name: string
  category: string
  city: string
  rating: number
  image: string
}

export function VendorCard({ name, category, city, rating, image }: VendorCardProps) {
  return (
    <article className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-32 md:h-36 overflow-hidden bg-[#f7f7f7]">
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <Icon name="verified" className="text-primary text-base filled" />
          <span className="text-[10px] font-bold text-primary uppercase">Verified</span>
        </div>
        <h3 className="text-sm font-bold text-black truncate">{name}</h3>
        <p className="text-xs text-black mt-0.5">{city}</p>
        <span className="inline-block mt-2 border border-primary text-black text-[10px] font-semibold px-2 py-0.5 rounded">
          {category}
        </span>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <Icon name="star" className="text-primary text-sm filled" />
            <span className="text-xs font-bold text-black">{rating}</span>
          </div>
          <a href="#" className="text-xs font-bold text-primary hover:underline">
            View Profile
          </a>
        </div>
      </div>
    </article>
  )
}
