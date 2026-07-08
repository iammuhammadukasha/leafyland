import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutLayout } from './components/checkout/CheckoutLayout';
import { Header } from './components/layout/Header';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CataloguePage } from './pages/CataloguePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceBookPage } from './pages/ServiceBookPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { VendorDashboard } from './pages/VendorDashboard';
import { OrderSuccessPage, BookingSuccessPage } from './pages/SuccessPages';
import { OrderTrackPage } from './pages/OrderTrackPage';
import { StaticPage } from './pages/StaticPages';
import { AdminLayout } from './pages/admin/AdminLayout';
import { SiteIcon } from './components/ui/site-icons';
import {
  AdminDashboard,
  AdminProducts,
  AdminCategories,
  AdminServices,
  AdminOrders,
  AdminBookings,
  AdminVendors,
  AdminBulkImport,
} from './pages/admin';

function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AnnouncementBar />
      <Header />
      <div className="flex-1 pb-16 md:pb-0">{children}</div>
      <Footer />
      <a
        href="https://wa.me/919867909355"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 md:bottom-6 right-4 z-40 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-lg hover:bg-primary-hover transition-colors"
        aria-label="WhatsApp"
      >
        <SiteIcon name="whatsapp" className="w-6 h-6" />
      </a>
      <MobileBottomNav />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <CartDrawer />
          <Routes>
            <Route path="/" element={<StoreLayout><HomePage /></StoreLayout>} />
            <Route path="/products" element={<StoreLayout><ProductsPage /></StoreLayout>} />
            <Route path="/products/:slug" element={<StoreLayout><ProductDetailPage /></StoreLayout>} />
            <Route path="/catalogue" element={<StoreLayout><CataloguePage /></StoreLayout>} />
            <Route path="/services" element={<StoreLayout><ServicesPage /></StoreLayout>} />
            <Route path="/services/:slug/book" element={<StoreLayout><ServiceBookPage /></StoreLayout>} />
            <Route path="/cart" element={<StoreLayout><CartPage /></StoreLayout>} />
            <Route
              path="/checkout"
              element={
                <CheckoutLayout>
                  <CheckoutPage />
                </CheckoutLayout>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/order/success" element={<StoreLayout><OrderSuccessPage /></StoreLayout>} />
            <Route path="/booking/success" element={<StoreLayout><BookingSuccessPage /></StoreLayout>} />
            <Route path="/orders/:id" element={<StoreLayout><OrderTrackPage /></StoreLayout>} />
            <Route path="/about" element={<StoreLayout><StaticPage page="about" /></StoreLayout>} />
            <Route path="/contact" element={<StoreLayout><StaticPage page="contact" /></StoreLayout>} />
            <Route path="/privacy" element={<StoreLayout><StaticPage page="privacy" /></StoreLayout>} />
            <Route path="/terms" element={<StoreLayout><StaticPage page="terms" /></StoreLayout>} />
            <Route path="/faq" element={<StoreLayout><StaticPage page="faq" /></StoreLayout>} />
            <Route path="/vendor" element={<VendorDashboard />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="import" element={<AdminBulkImport />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="vendors" element={<AdminVendors />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
