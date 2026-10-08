import { ParallaxProvider } from 'react-scroll-parallax';
import { StoreProvider } from '@/store/StoreContext';
import Navbar from '@/components/layout/Navbar';
import HeroParallax from '@/components/layout/HeroParallax';
import ProductGrid from '@/components/products/ProductGrid';
import BenefitsSection from '@/components/layout/BenefitsSection';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

export default function App() {
  return (
    <ParallaxProvider>
      <StoreProvider>
        <div className="min-h-screen bg-[#0a0a0f] text-slate-100 antialiased">
          <Navbar />
          <main>
            <HeroParallax />
            <ProductGrid />
            <BenefitsSection />
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </StoreProvider>
    </ParallaxProvider>
  );
}
