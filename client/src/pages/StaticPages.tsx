import { PageShell } from '../components/ui/PageShell';

const PAGES: Record<string, { title: string; body: string }> = {
  about: {
    title: 'About LeafyLand',
    body: 'LeafyLand is India\'s integrated green super-platform — buy plants, book landscaping services, and grow your green ecosystem. Based in Mumbai, serving customers across India.',
  },
  contact: {
    title: 'Contact Us',
    body: 'Email: hello@leafyland.com\nPhone: +91 98679 09355\nWhatsApp: https://wa.me/919867909355\nAddress: Mumbai, Maharashtra, India',
  },
  privacy: {
    title: 'Privacy Policy',
    body: 'We collect name, email, phone, and address only to process orders and service bookings. Payment data is handled securely by Razorpay. We do not sell your data to third parties.',
  },
  terms: {
    title: 'Terms & Conditions',
    body: 'By using LeafyLand you agree to our pricing, delivery timelines, and refund policy. Plants are living products — minor variations in size and colour are natural.',
  },
  faq: {
    title: 'FAQ',
    body: 'Q: How long does delivery take?\nA: 3-7 business days across India.\n\nQ: Can I book a service for tomorrow?\nA: Yes, select your preferred date and time slot.\n\nQ: What payment methods are accepted?\nA: UPI, cards, netbanking via Razorpay.',
  },
};

export function StaticPage({ page }: { page: keyof typeof PAGES }) {
  const { title, body } = PAGES[page];
  return (
    <PageShell title={title}>
      <div className="prose text-black whitespace-pre-line leading-relaxed max-w-2xl">{body}</div>
    </PageShell>
  );
}
