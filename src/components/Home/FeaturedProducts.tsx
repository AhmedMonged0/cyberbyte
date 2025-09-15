'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import { getProductImage, getFallbackImage } from '@/data/productImages';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  features: string[];
  inStock: boolean;
  discount: number | null;
  isFeatured: boolean;
}

export default function FeaturedProducts() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get product image
  const getProductImageSrc = (product: Product) => {
    const productImage = getProductImage(product.category, product.id);
    return productImage?.main || getFallbackImage(product.category);
  };

  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products?featured=true&limit=6');
        const data = await response.json();
        
        if (response.ok) {
          setProducts(data.products);
        } else {
          setError(data.error || 'Failed to fetch products');
        }
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const slidesPerView = 3;
  const totalSlides = Math.ceil(products.length / slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getBadgeColor = (product: Product) => {
    if (product.discount && product.discount > 0) {
      return 'from-red-500 to-pink-500';
    }
    if (product.isFeatured) {
      return 'from-green-500 to-emerald-500';
    }
    return 'from-gray-500 to-gray-600';
  };

  const getBadgeText = (product: Product) => {
    if (product.discount && product.discount > 0) {
      return `-${product.discount}%`;
    }
    if (product.isFeatured) {
      return 'Featured';
    }
    return 'New';
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-text-secondary">Loading featured products...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-400 mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No products state
  if (products.length === 0) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-text-secondary">No featured products available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-orbitron font-bold mb-8">
            <span className="text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Featured</span>
            <br />
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue bg-clip-text text-transparent text-4xl lg:text-5xl font-light">
              Products
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed font-light">
            Discover our handpicked selection of premium computer products, 
            featuring the latest technology and unbeatable performance.
          </p>
        </motion.div>

        {/* Products Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products
                      .slice(slideIndex * slidesPerView, (slideIndex + 1) * slidesPerView)
                      .map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="relative bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-2xl overflow-hidden border border-accent-blue/30 hover-lift">
                            {/* Product Badge */}
                            <div className="absolute top-4 left-4 z-10">
                              <div className={`px-3 py-1 bg-gradient-to-r ${getBadgeColor(product)} text-white text-xs font-semibold rounded-full`}>
                                {getBadgeText(product)}
                              </div>
                            </div>

                            {/* Discount Badge */}
                            {product.discount && product.discount > 0 && (
                              <div className="absolute top-4 right-4 z-10">
                                <div className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                  -{product.discount}%
                                </div>
                              </div>
                            )}

                            {/* Product Image */}
                            <div className="relative h-48 bg-gradient-to-br from-accent-gray to-primary-black-secondary overflow-hidden">
                              <ProductImage
                                src={getProductImageSrc(product)}
                                alt={product.name}
                                name={product.name}
                                className="w-full h-full"
                                onQuickView={() => console.log('Quick view:', product.name)}
                              />
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-blue transition-colors duration-300">
                                {product.name}
                              </h3>
                              
                              {/* Rating */}
                              <div className="flex items-center space-x-2 mb-3">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.floor(product.rating)
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-400'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-text-secondary">
                                  {product.rating} ({product.reviews})
                                </span>
                              </div>

                              {/* Features */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {product.features.map((feature, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-accent-gray/50 text-xs text-accent-blue rounded"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>

                              {/* Price */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-2xl font-bold text-white">
                                    ${product.price}
                                  </span>
                                  {product.originalPrice && product.originalPrice > product.price && (
                                    <span className="text-lg text-text-secondary line-through">
                                      ${product.originalPrice}
                                    </span>
                                  )}
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-semibold ${
                                  product.inStock 
                                    ? 'bg-green-500/20 text-green-400' 
                                    : 'bg-red-500/20 text-red-400'
                                }`}>
                                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </div>
                              </div>

                              {/* Add to Cart Button */}
                              <Link href={`/products/${product.id}`}>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  disabled={!product.inStock}
                                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                                    product.inStock
                                      ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-lg hover:shadow-accent-blue/25'
                                      : 'bg-accent-gray text-text-secondary cursor-not-allowed'
                                  }`}
                                >
                                  <ShoppingCart className="w-5 h-5" />
                                  <span>{product.inStock ? 'View Details' : 'Out of Stock'}</span>
                                </motion.button>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-accent-gray/80 backdrop-blur-sm border border-accent-blue/30 rounded-full flex items-center justify-center text-white hover:bg-accent-blue/20 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-accent-gray/80 backdrop-blur-sm border border-accent-blue/30 rounded-full flex items-center justify-center text-white hover:bg-accent-blue/20 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-accent-blue scale-125'
                  : 'bg-accent-gray hover:bg-accent-blue/50'
              }`}
            />
          ))}
        </div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass-effect border border-accent-blue/30 text-white font-semibold rounded-lg hover:border-accent-blue hover:bg-accent-blue/10 transition-all duration-300"
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
