import { Icon } from '../ui/primitives'

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E5E5] pt-12 pb-24 md:pb-8">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <Icon name="eco" className="text-primary text-3xl filled" />
            <span className="text-xl font-bold text-primary">LeafyLand</span>
          </div>
          <p className="text-sm text-black leading-relaxed">
            India&apos;s integrated green ecosystem connecting products, services, and sustainable living.
          </p>
          <div className="space-y-1 text-sm text-black font-medium">
            <p className="flex items-center gap-2">
              <Icon name="call" className="text-base" /> +91 98679 09355
            </p>
            <p className="flex items-center gap-2">
              <Icon name="mail" className="text-base" /> hello@leafyland.com
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-primary uppercase mb-4">Products</h4>
          <ul className="space-y-2 text-sm text-black">
            {['Plants', 'Gardening Supplies', 'Ayurvedic', 'Eco Products', 'Agritech'].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-primary uppercase mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-black">
            {['Landscaping', 'Hardscape', 'Civil & Interior', 'ESG', 'Jobs & Tenders'].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-primary uppercase mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-black">
            {['About', 'Contact', 'Workshops', 'Franchise', 'Become a Vendor'].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h4 className="text-sm font-bold text-primary uppercase mb-4">Stay Updated</h4>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-11 px-4 border border-[#E5E5E5] rounded-lg text-sm text-black placeholder:text-black/50 focus:border-primary outline-none"
            />
            <button type="button" className="w-full bg-primary text-white font-bold h-11 rounded-lg hover:bg-primary-hover transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 mt-10 pt-6 border-t border-[#E5E5E5] flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-sm text-black">© 2026 LeafyLand. All rights reserved.</p>
        <div className="flex gap-5 text-sm text-black">
          {['Terms', 'Privacy', 'Refund', 'Shipping'].map((l) => (
            <a key={l} href="#" className="hover:text-primary transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
