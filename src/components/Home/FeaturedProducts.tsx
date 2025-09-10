'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Star, 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import ProductImage from '../ProductImage';

export default function FeaturedProducts() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const products = [
    {
      id: 1,
      name: "Alienware X17 R2 Gaming Laptop",
      price: 2499,
      originalPrice: 2799,
      rating: 4.8,
      reviews: 124,
      image: "/api/placeholder/400/300",
      productId: "alienware-x17-r2",
      category: "laptops",
      badge: "Best Seller",
      features: ["RTX 4080", "32GB RAM", "1TB SSD"],
      inStock: true,
      discount: 11
    },
    {
      id: 2,
      name: "ASUS ROG Strix G15",
      price: 1899,
      originalPrice: 2199,
      rating: 4.7,
      reviews: 89,
      image: "/api/placeholder/400/300",
      productId: "asus-rog-strix-g15",
      category: "laptops",
      badge: "New Arrival",
      features: ["RTX 4070", "16GB RAM", "512GB SSD"],
      inStock: true,
      discount: 14
    },
    {
      id: 3,
      name: "MacBook Pro 16-inch M2 Max",
      price: 3299,
      originalPrice: 3299,
      rating: 4.9,
      reviews: 203,
      image: "/api/placeholder/400/300",
      productId: "macbook-pro-16",
      category: "laptops",
      badge: "Premium",
      features: ["M2 Max", "32GB RAM", "1TB SSD"],
      inStock: true,
      discount: 0
    },
    {
      id: 4,
      name: "Razer Blade 15 Advanced",
      price: 2199,
      originalPrice: 2499,
      rating: 4.6,
      reviews: 67,
      image: "/api/placeholder/400/300",
      productId: "razer-blade-15",
      category: "laptops",
      badge: "Editor's Choice",
      features: ["RTX 4070", "16GB RAM", "1TB SSD"],
      inStock: false,
      discount: 12
    },
    {
      id: 5,
      name: "MSI GE76 Raider",
      price: 1999,
      originalPrice: 2299,
      rating: 4.5,
      reviews: 45,
      image: "/api/placeholder/400/300",
      productId: "msi-ge76-raider",
      category: "laptops",
      badge: "Gaming",
      features: ["RTX 4060", "16GB RAM", "512GB SSD"],
      inStock: true,
      discount: 13
    },
    {
      id: 6,
      name: "Dell XPS 15 OLED",
      price: 1799,
      originalPrice: 1999,
      rating: 4.7,
      reviews: 156,
      image: "/api/placeholder/400/300",
      productId: "dell-xps-15",
      category: "laptops",
      badge: "Creative",
      features: ["RTX 4050", "16GB RAM", "512GB SSD"],
      inStock: true,
      discount: 10
    }
  ];

  const slidesPerView = 3;
  const totalSlides = Math.ceil(products.length / slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller': return 'from-green-500 to-emerald-500';
      case 'New Arrival': return 'from-blue-500 to-cyan-500';
      case 'Premium': return 'from-purple-500 to-pink-500';
      case 'Editor\'s Choice': return 'from-orange-500 to-red-500';
      case 'Gaming': return 'from-red-500 to-pink-500';
      case 'Creative': return 'from-indigo-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
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
          <h2 className="text-4xl lg:text-6xl font-orbitron font-bold mb-6">
            <span className="text-white">Featured</span>
            <br />
            <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Discover our handpicked selection of premium computer products, 
            featuring the latest technology and unbeatable performance.
          </p>
        </motion.div>

        {/* Products Carousel */}
        <motion.div
          style={{ y, opacity }}
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
                              <div className={`px-3 py-1 bg-gradient-to-r ${getBadgeColor(product.badge)} text-white text-xs font-semibold rounded-full`}>
                                {product.badge}
                              </div>
                            </div>

                            {/* Discount Badge */}
                            {product.discount > 0 && (
                              <div className="absolute top-4 right-4 z-10">
                                <div className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                  -{product.discount}%
                                </div>
                              </div>
                            )}

                            {/* Product Image */}
                            <div className="relative h-48 overflow-hidden">
                              <ProductImage
                                src={product.image}
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
                                  {product.originalPrice > product.price && (
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
                                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                              </motion.button>
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
