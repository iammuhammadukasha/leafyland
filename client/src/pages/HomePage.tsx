import {
  AMC_PLANS,
  BOOKING_MODES,
  DAILY_SERVICES,
  DISCOVER_HUBS,
  EVENTS,
  EXPERTS,
  FAQS,
  IMAGES,
  LUXURY_SERVICES,
  MOST_BOOKED,
  PARTNERS,
  PRODUCT_SHELVES,
  SERVICE_PILLS,
  SHOP_CATEGORIES,
  SIGNATURE_PROJECTS,
  STATS,
  VENDORS,
  WHY_US,
} from '../data/homeData'
import { ProductCard } from '../components/ui/ProductCard'
import { ServiceCard } from '../components/ui/ServiceCard'
import { VendorCard } from '../components/ui/VendorCard'
import { Icon, SectionHeader, SeeAllLink } from '../components/ui/primitives'

export function HomePage() {
  return (
    <main className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 md:py-8 space-y-10 md:space-y-14 pb-20 md:pb-14">
      <HeroSection />
      <ServicePillsSection />
      <ShopCategoriesSection />
      <DailyServicesSection />
      <BookYourWaySection />
      <PromoBannersSection />
      <DiscoverHubsSection />
      <ProductShelvesSection />
      <FeaturedVendorsSection />
      <ConsultationSection />
      <MostBookedSection />
      <LuxuryServicesSection />
      <ExpertConsultationsSection />
      <AMCSection />
      <AgricultureSection />
      <EnvironmentalSection />
      <TechnologySection />
      <GovernmentSection />
      <FranchiseSection />
      <EventsSection />
      <SignatureProjectsSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <FAQSection />
    </main>
  )
}

function HeroSection() {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 min-h-0 lg:min-h-[520px]">
      <div className="lg:w-[55%] flex flex-col gap-4">
        <span className="text-xs font-bold text-black tracking-widest uppercase">Integrated Green Ecosystem</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary leading-tight">
          Products, Services &amp; Sustainability
        </h1>
        <p className="text-base md:text-lg text-black max-w-xl leading-relaxed">
          India&apos;s largest green marketplace — buy plants, book landscaping services, hire daily gardeners, and access
          corporate sustainability solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <input
            type="search"
            placeholder="What are you looking for today?"
            className="flex-1 h-12 px-4 border border-[#E5E5E5] rounded-lg text-sm text-black placeholder:text-black/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          <button type="button" className="bg-primary text-white font-bold px-6 h-12 rounded-lg hover:bg-primary-hover transition-colors">
            Search
          </button>
          <button
            type="button"
            className="border border-primary text-black font-bold px-6 h-12 rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="near_me" className="text-lg" /> Nearby
          </button>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <button type="button" className="bg-primary text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-primary-hover transition-colors">
            Get Free Quote
          </button>
          {['Explore Services', 'Join Network', 'Corporate Solutions'].map((label) => (
            <button
              key={label}
              type="button"
              className="border border-primary text-black font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-primary/5 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="https://wa.me/919867909355"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-4 py-2 rounded-lg text-sm"
          >
            <Icon name="chat" className="filled" /> WhatsApp
          </a>
          <a href="tel:+919867909355" className="text-sm font-semibold text-black">
            +91 98679 09355
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E5E5E5]">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-bold text-primary">{s.value}</div>
              <div className="text-xs font-bold text-black">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-[45%] relative w-full h-[320px] md:h-[420px] lg:h-[480px]">
        <div className="absolute top-0 right-0 w-[78%] h-[58%] rounded-xl overflow-hidden border border-[#E5E5E5] shadow-sm z-10 rotate-2 hover:rotate-0 transition-transform duration-500">
          <img src={IMAGES.heroGarden} alt="Lush landscaped garden" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-4 left-0 w-[62%] h-[48%] rounded-xl overflow-hidden border border-[#E5E5E5] shadow-sm z-20 -rotate-3 hover:rotate-0 transition-transform duration-500">
          <img src={IMAGES.heroGardener} alt="Professional gardener at work" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-16 right-4 w-[40%] h-[32%] rounded-xl overflow-hidden border border-[#E5E5E5] shadow-sm z-30 hidden sm:block">
          <img src={IMAGES.heroPlants} alt="Indoor plants collection" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  )
}

function ServicePillsSection() {
  return (
    <section>
      <SectionHeader title="Browse Service Categories" />
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {SERVICE_PILLS.map((pill, i) => (
          <button
            key={pill}
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors ${
              i === 0 ? 'bg-primary text-white border-primary' : 'bg-white text-black border-[#E5E5E5] hover:border-primary'
            }`}
          >
            {pill}
          </button>
        ))}
      </div>
    </section>
  )
}

function ShopCategoriesSection() {
  return (
    <section>
      <SectionHeader title="Shop by Product Category" action={<SeeAllLink />} />
      <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-2">
        {SHOP_CATEGORIES.map((cat, i) => (
          <button key={cat.label} type="button" className="flex flex-col items-center gap-2 min-w-[72px] flex-shrink-0 group">
            <div
              className={`w-16 h-16 md:w-[72px] md:h-[72px] rounded-full overflow-hidden border-2 ${
                i === 0 ? 'border-primary' : 'border-[#E5E5E5] group-hover:border-primary'
              }`}
            >
              <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] md:text-xs font-semibold text-black text-center leading-tight max-w-[80px]">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

function DailyServicesSection() {
  return (
    <section>
      <SectionHeader
        title="Daily Needs Services"
        subtitle="On-demand green & home services at your doorstep"
      />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {DAILY_SERVICES.map((s) => (
          <button
            key={s.name}
            type="button"
            className="bg-white border border-[#E5E5E5] p-3 md:p-4 rounded-xl flex flex-col items-center gap-2 hover:border-primary hover:shadow-sm transition-all group"
          >
            <Icon name={s.icon} className="text-primary text-2xl md:text-3xl group-hover:scale-110 transition-transform" />
            <span className="text-[10px] md:text-xs font-bold text-black text-center leading-tight">{s.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function BookYourWaySection() {
  return (
    <section>
      <SectionHeader title="Book Your Way" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {BOOKING_MODES.map((mode) => (
          <div key={mode.title} className="bg-white border border-[#E5E5E5] p-4 md:p-5 rounded-xl space-y-2 hover:border-primary transition-colors">
            <Icon name={mode.icon} className="text-primary text-3xl" />
            <h3 className="text-sm font-bold text-primary">{mode.title}</h3>
            <p className="text-xs text-black">{mode.desc}</p>
            <a href="#" className="text-xs font-bold text-primary inline-flex items-center gap-0.5 hover:underline">
              {mode.cta} <Icon name="arrow_forward" className="text-sm" />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

function PromoBannersSection() {
  return (
    <section className="grid md:grid-cols-2 gap-4">
      <div className="bg-white border border-[#E5E5E5] border-l-4 border-l-primary p-6 md:p-8 rounded-xl">
        <h3 className="text-lg md:text-xl font-bold text-primary mb-3">ALL NEW LEAFYLAND EXPERIENCE</h3>
        <ul className="space-y-2 text-sm text-black mb-5">
          {['Verified Vendors', 'Free Consultation', 'Pan-India Delivery', 'Bulk Orders Welcome'].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Icon name="check_circle" className="text-primary text-lg" /> {item}
            </li>
          ))}
        </ul>
        <button type="button" className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg text-sm">
          Get Free Quote
        </button>
      </div>
      <div className="bg-white border border-[#E5E5E5] border-l-4 border-l-primary p-6 md:p-8 rounded-xl">
        <h3 className="text-lg md:text-xl font-bold text-primary mb-3">Corporate &amp; Government Bulk Supply</h3>
        <p className="text-sm text-black mb-5">10 to 10,00,000 units. Tender-compliant delivery with full documentation.</p>
        <button type="button" className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg text-sm">
          Request DPR Quote
        </button>
      </div>
    </section>
  )
}

function DiscoverHubsSection() {
  return (
    <section>
      <SectionHeader
        title="Discover by Category"
        subtitle="Premium products and services across every facet of sustainable living"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {DISCOVER_HUBS.map((hub) => (
          <article
            key={hub.title}
            className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="h-40 overflow-hidden">
              <img src={hub.image} alt={hub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="p-4">
              <h3 className="text-base font-bold text-primary mb-1">{hub.title}</h3>
              <p className="text-sm text-black mb-3">{hub.desc}</p>
              <span className="text-sm font-semibold text-black group-hover:text-primary transition-colors inline-flex items-center gap-1">
                Explore <Icon name="arrow_forward" className="text-sm" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProductShelvesSection() {
  return (
    <section className="space-y-8">
      {PRODUCT_SHELVES.map((shelf) => (
        <div key={shelf.title}>
          <SectionHeader title={shelf.title} action={<SeeAllLink />} />
          <div className="flex gap-3 md:gap-4 overflow-x-auto hide-scrollbar pb-2">
            {shelf.items.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

function FeaturedVendorsSection() {
  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-[32px] font-bold text-primary">Featured Vendors &amp; Partners</h2>
          <p className="text-sm text-black mt-1">8 verified vendors near you</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="border border-primary text-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-primary/5 transition-colors">
            Become a Vendor
          </button>
          <SeeAllLink label="View All Vendors" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {VENDORS.map((v) => (
          <VendorCard key={v.name} {...v} />
        ))}
      </div>
    </section>
  )
}

function ConsultationSection() {
  return (
    <section className="border-t border-[#E5E5E5] pt-10 md:pt-14">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <h2 className="text-2xl md:text-[32px] font-bold text-primary mb-3">Let&apos;s Build Something Green Together</h2>
          <p className="text-base text-black mb-6">
            Whether you need landscaping, agriculture support, or enterprise solutions — our experts will connect within 24 hours.
          </p>
          <div className="space-y-3 text-black">
            <p className="flex items-center gap-2 font-medium">
              <Icon name="call" className="text-primary" /> +91 98679 09355
            </p>
            <p className="flex items-center gap-2 font-medium">
              <Icon name="mail" className="text-primary" /> hello@leafyland.com
            </p>
            <a
              href="https://wa.me/919867909355"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-lg text-sm mt-2"
            >
              <Icon name="chat" className="filled" /> Chat on WhatsApp
            </a>
          </div>
        </div>
        <form className="bg-white border border-[#E5E5E5] rounded-xl p-6 md:p-8 shadow-sm space-y-4" onSubmit={(e) => e.preventDefault()}>
          {[
            { label: 'Your Name', type: 'text', placeholder: 'Full name' },
            { label: 'Phone', type: 'tel', placeholder: '+91' },
            { label: 'Email', type: 'email', placeholder: 'you@email.com' },
            { label: 'City', type: 'text', placeholder: 'Mumbai' },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs font-bold text-black mb-1">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full h-11 px-4 border border-[#E5E5E5] rounded-lg text-sm text-black placeholder:text-black/40 focus:border-primary outline-none"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-bold text-black mb-1">What do you need?</label>
            <select className="w-full h-11 px-4 border border-[#E5E5E5] rounded-lg text-sm text-black focus:border-primary outline-none bg-white">
              <option>Landscaping</option>
              <option>Plants &amp; Products</option>
              <option>Corporate / Bulk Order</option>
              <option>Government Project</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-primary-hover transition-colors">
            Submit Enquiry
          </button>
          <p className="text-xs text-black">By submitting, you agree to our privacy policy.</p>
        </form>
      </div>
    </section>
  )
}

function MostBookedSection() {
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader title="Most Booked Services" action={<SeeAllLink />} />
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
        {MOST_BOOKED.map((s) => (
          <ServiceCard key={s.name} {...s} />
        ))}
      </div>
    </section>
  )
}

function LuxuryServicesSection() {
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader title="Luxury Landscape Design Services" subtitle="Premium design solutions for elite properties" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {LUXURY_SERVICES.map((s) => (
          <article key={s.title} className="bg-white border border-[#E5E5E5] p-5 md:p-6 rounded-xl hover:border-primary transition-colors cursor-pointer group">
            <h3 className="text-lg font-bold text-primary mb-2">{s.title}</h3>
            <p className="text-sm text-black mb-4">{s.desc}</p>
            <div className="flex items-center justify-between pt-4 border-t border-[#f0f0f0]">
              <span className="text-sm font-bold text-black">From {s.price}</span>
              <Icon name="arrow_forward" className="text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ExpertConsultationsSection() {
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader title="Book Expert Consultation" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {EXPERTS.map((e) => (
          <div key={e.role} className="bg-white border border-[#E5E5E5] p-4 rounded-xl flex flex-col justify-between hover:border-primary transition-colors">
            <h3 className="text-sm font-bold text-primary mb-1">{e.role}</h3>
            <p className="text-sm font-semibold text-black mb-4">{e.price}</p>
            <button type="button" className="w-full border border-primary text-primary font-bold py-2 rounded-lg text-xs hover:bg-primary hover:text-white transition-colors">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

function AMCSection() {
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader title="AMC Maintenance Plans" />
      <div className="grid md:grid-cols-3 gap-6">
        {AMC_PLANS.map((plan) => (
          <div key={plan.title} className="bg-white border border-[#E5E5E5] p-6 md:p-8 rounded-xl shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-primary mb-1">{plan.title}</h3>
            <div className="text-3xl font-bold text-black mb-4">
              {plan.price}
              <span className="text-base font-normal text-black">{plan.period}</span>
            </div>
            <ul className="space-y-2 flex-grow mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-black">
                  <Icon name="check_circle" className="text-primary text-lg" /> {f}
                </li>
              ))}
            </ul>
            <button type="button" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-hover transition-colors">
              Get AMC Quote
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

function AgricultureSection() {
  const items = [
    { icon: 'agriculture', title: 'Smart Farming', desc: 'Data-driven crop management and precision agriculture.' },
    { icon: 'home_work', title: 'Greenhouse', desc: 'Climate-controlled environments for year-round harvests.' },
    { icon: 'water_drop', title: 'Hydroponics', desc: 'Soil-less cultivation for urban food production.' },
    { icon: 'science', title: 'Soil Health', desc: 'Lab-grade testing and nutrient mapping programs.' },
  ]
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader title="Empowering India's Farmers" />
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.title} className="flex gap-4 p-4 border border-[#E5E5E5] rounded-xl hover:border-primary transition-colors">
            <Icon name={item.icon} className="text-primary text-3xl shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-primary">{item.title}</h3>
              <p className="text-sm text-black mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function EnvironmentalSection() {
  const items = ['ESG Consulting', 'Carbon Offset', 'Waste Management', 'Water Conservation', 'Urban Greening', 'Climate Resilience']
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader title="Environmental Solutions for a Sustainable Future" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((title) => (
          <div key={title} className="bg-white border border-[#E5E5E5] p-4 rounded-xl hover:border-primary transition-colors cursor-pointer">
            <h3 className="text-sm font-bold text-primary">{title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

function TechnologySection() {
  const items = [
    { icon: 'psychology', title: 'AI Plant Diagnosis' },
    { icon: 'monitoring', title: 'Farm Analytics' },
    { icon: 'sensors', title: 'IoT Sensors' },
    { icon: 'flight', title: 'Drone Services' },
  ]
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader title="Digital Transformation for Green Industry" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.title} className="border border-[#E5E5E5] p-5 rounded-xl text-center hover:border-primary transition-colors">
            <Icon name={item.icon} className="text-primary text-3xl mb-2" />
            <h3 className="text-xs md:text-sm font-bold text-primary">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

function GovernmentSection() {
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader
        title="Government-Grade Environmental Products & Services"
        subtitle="Precision-built. Policy-compliant. Planet-positive."
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { name: 'Forest Saplings', price: '₹6–18' },
          { name: 'Shade Trees', price: '₹14–35' },
          { name: 'Fruit Plants', price: '₹25–70' },
          { name: 'Medicinal Plants', price: '₹8–40' },
          { name: 'Shrubs', price: '₹10–45' },
        ].map((p) => (
          <div key={p.name} className="bg-white border border-[#E5E5E5] p-3 rounded-xl">
            <h4 className="text-xs font-bold text-primary">{p.name}</h4>
            <p className="text-sm font-bold text-black mt-1">{p.price}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button type="button" className="bg-primary text-white font-bold px-6 py-3 rounded-lg flex-1">
          Request DPR Quote
        </button>
        <button type="button" className="border-2 border-primary text-black font-bold px-6 py-3 rounded-lg flex-1 hover:bg-primary/5 transition-colors">
          Contact Govt Sales Team
        </button>
      </div>
    </section>
  )
}

function FranchiseSection() {
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader title="Grow With LeafyLand" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PARTNERS.map((p) => (
          <div key={p.title} className="bg-white border border-[#E5E5E5] p-5 rounded-xl shadow-sm">
            <h3 className="text-base font-bold text-primary mb-2">{p.title}</h3>
            <p className="text-sm text-black mb-3">{p.desc}</p>
            <a href="#" className="text-sm font-bold text-primary inline-flex items-center gap-1 hover:underline">
              Apply Now <Icon name="arrow_forward" className="text-sm" />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

function EventsSection() {
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader title="Upcoming Events" action={<SeeAllLink label="View All" />} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EVENTS.map((e) => (
          <article key={e.name} className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
            <div className="h-36 relative overflow-hidden">
              <img src={e.image} alt={e.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <span className="absolute top-2 left-2 bg-white text-[10px] font-bold px-2 py-1 rounded text-black">{e.badge}</span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-primary">{e.name}</h3>
              <p className="text-xs text-black mt-1">{e.date}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-black">{e.price}</span>
                <button type="button" className="bg-primary text-white font-bold px-3 py-1.5 rounded-lg text-xs">
                  Register
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function SignatureProjectsSection() {
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader title="Our Signature Projects" />
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {SIGNATURE_PROJECTS.map((p) => (
          <article key={p.title} className="bg-white rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-sm group cursor-pointer">
            <div className="h-52 md:h-64 overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-primary uppercase tracking-wide">{p.type}</span>
                <span className="text-black font-medium">{p.loc}</span>
              </div>
              <h3 className="text-xl font-bold text-black">{p.title}</h3>
              <p className="text-sm text-black">{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function WhyChooseSection() {
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <h2 className="text-xl md:text-[32px] font-bold text-primary text-center mb-8">
        Why India&apos;s Most Discerning Clients Choose LeafyLand
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY_US.map((w) => (
          <div key={w.title} className="flex gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors">
            <Icon name={w.icon} className="text-primary text-4xl shrink-0" />
            <div>
              <h3 className="text-base font-bold text-black">{w.title}</h3>
              <p className="text-sm text-black mt-1 leading-relaxed">{w.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    { n: '01', title: 'Discover & Consult', desc: 'On-site assessment and understanding your green vision.' },
    { n: '02', title: 'Design & Plan', desc: '3D visualizations and sustainable engineering plans.' },
    { n: '03', title: 'Build & Execute', desc: 'Expert execution with premium materials and species.' },
    { n: '04', title: 'Maintain & Nurture', desc: 'Comprehensive AMC plans for long-term care.' },
  ]
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader title="Design → Build → Maintain" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div key={s.n} className="space-y-2">
            <div className="text-4xl font-bold text-primary">{s.n}</div>
            <h3 className="text-base font-bold text-black">{s.title}</h3>
            <p className="text-sm text-black">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section className="border-t border-[#E5E5E5] pt-10">
      <SectionHeader title="Questions Decision-Makers Ask" />
      <div className="space-y-3 max-w-3xl">
        {FAQS.map((q) => (
          <button
            key={q}
            type="button"
            className="w-full bg-white border border-[#E5E5E5] p-4 md:p-5 rounded-xl text-left hover:border-primary transition-colors flex items-center justify-between gap-4"
          >
            <span className="text-sm font-bold text-black">{q}</span>
            <Icon name="add" className="text-primary shrink-0" />
          </button>
        ))}
      </div>
    </section>
  )
}
