import HeroSection from '@/components/Home/HeroSection';
import ProductCategories from '@/components/Home/ProductCategories';
import FeaturedProducts from '@/components/Home/FeaturedProducts';

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-black overflow-x-hidden">
      <HeroSection />
      <div className="bg-gradient-tech overflow-x-hidden">
        <ProductCategories />
        <FeaturedProducts />
      </div>
    </div>
  );
}