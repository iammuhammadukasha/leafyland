import { Icon } from './primitives'

type ServiceCardProps = {
  name: string
  price: string
  rating: number
  reviews: string
  image: string
}

export function ServiceCard({ name, price, rating, reviews, image }: ServiceCardProps) {
  return (
    <article className="min-w-[160px] md:min-w-[200px] flex-shrink-0 cursor-pointer group">
      <div className="h-40 md:h-44 rounded-xl overflow-hidden mb-2 border border-[#E5E5E5]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <h3 className="text-sm font-semibold text-black truncate">{name}</h3>
      <div className="flex items-center gap-1 my-1">
        <Icon name="star" className="text-primary text-sm filled" />
        <span className="text-xs text-black">
          {rating} ({reviews})
        </span>
      </div>
      <p className="text-sm font-bold text-black">{price}</p>
    </article>
  )
}
