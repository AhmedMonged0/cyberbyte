'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  AlertCircle,
  Search
} from 'lucide-react';
import { getProductImage, getFallbackImage } from '@/data/productImages';
import ProductImage from '@/components/ProductImage';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  features: string[];
  inStock: boolean;
  discount: number | null;
  category: string;
  brand: string;
  isFeatured: boolean;
}

export default function AccessoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to get product image
  const getProductImageSrc = (product: Product) => {
    const productIdMap: { [key: string]: string } = {
      'Corsair K95 RGB Keyboard': 'corsair-k95-rgb',
      'Logitech MX Master 3S': 'logitech-mx-master-3s',
      'SteelSeries Arctis 7P': 'steelseries-arctis-7p',
      'ASUS ROG Swift PG279Q': 'asus-rog-swift-pg279q',
      'Razer DeathAdder V3': 'razer-deathadder-v3'
    };
    
    const productId = productIdMap[product.name] || product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const productImage = getProductImage(product.category, productId);
    return productImage?.main || getFallbackImage(product.category);
  };

  // Fetch accessories from API
  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const params = new URLSearchParams({
          category: 'accessories',
          limit: '20',
          ...(searchQuery && { search: searchQuery })
        });

        const response = await fetch(`/api/products?${params}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Error fetching accessories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch accessories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessories();
  }, [searchQuery]);

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller': return 'from-green-500 to-emerald-500';
      case 'New Arrival': return 'from-blue-500 to-cyan-500';
      case 'Premium': return 'from-purple-500 to-pink-500';
      case 'Editor\'s Choice': return 'from-orange-500 to-red-500';
      case 'Gaming': return 'from-red-500 to-pink-500';
      case 'Professional': return 'from-indigo-500 to-purple-500';
      case 'High Performance': return 'from-yellow-500 to-orange-500';
      case 'Flagship': return 'from-cyan-500 to-blue-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-black to-primary-black-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Link
                href="/products"
                className="flex items-center space-x-2 text-accent-blue hover:text-accent-blue/80 transition-colors mr-8"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Products</span>
              </Link>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-orbitron font-bold mb-6">
              <span className="text-white">Gaming & Professional</span>
              <br />
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                Accessories
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Enhance your setup with our premium collection of keyboards, mice, 
              headsets, monitors, and other essential accessories.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-text-secondary">Loading accessories...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Error loading accessories</h3>
            <p className="text-text-secondary mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-accent-gray/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-accent-blue" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">No accessories found</h3>
            <p className="text-text-secondary mb-8">
              {searchQuery 
                ? "Try adjusting your search terms to find what you're looking for."
                : "No accessories are available at the moment. Please check back later."
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-2xl overflow-hidden border border-accent-blue/30 hover-lift">
                  {/* Product Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`px-3 py-1 bg-gradient-to-r ${getBadgeColor(product.isFeatured ? 'Featured' : 'New')} text-white text-xs font-semibold rounded-full`}>
                      {product.isFeatured ? 'Featured' : 'New'}
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
                  <div className="relative h-64 bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-t-2xl overflow-hidden">
                    <ProductImage
                      src={getProductImageSrc(product)}
                      alt={product.name}
                      name={product.name}
                      className="w-full h-full"
                      showQuickView={true}
                    />
                    
                    {/* Quick Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-accent-blue rounded-full text-white hover:bg-accent-purple transition-colors duration-300"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-accent-gray rounded-full text-white hover:bg-accent-blue transition-colors duration-300"
                      >
                        <Heart className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-accent-blue font-medium">{product.brand}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-text-secondary">{product.rating}</span>
                        <span className="text-xs text-text-secondary">({product.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-accent-blue transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-white">${product.price}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-lg text-text-secondary line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-text-secondary">Stock</div>
                        <div className={`text-sm font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-accent-blue/20 text-accent-blue text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-1 bg-gradient-to-r from-accent-blue to-accent-purple text-white py-3 px-4 rounded-lg font-medium text-center hover:from-accent-purple hover:to-accent-blue transition-all duration-300 transform hover:scale-105"
                      >
                        View Details
                      </Link>
                      <button
                        disabled={!product.inStock}
                        className="px-4 py-3 bg-accent-gray text-white rounded-lg hover:bg-accent-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
