'use client';

import HeroSection from '@/components/Home/HeroSection';
import ProductCategories from '@/components/Home/ProductCategories';
import FeaturedProducts from '@/components/Home/FeaturedProducts';
import Header from '@/components/Layout/Header';

export default function Home() {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div className="bg-gradient-tech overflow-x-hidden">
      <Header onSearch={handleSearch} />
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
    </div>
  );
}