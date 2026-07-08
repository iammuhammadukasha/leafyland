const ITEMS = [
  'Exclusive Brands',
  'Scheduled Delivery',
  'Premium Plants',
  'Delivery Across India',
];

export function AnnouncementBar() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-primary text-white text-[11px] md:text-xs tracking-[0.12em] uppercase overflow-hidden">
      <div className="flex w-max marquee-track">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="px-8 py-2.5 whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
