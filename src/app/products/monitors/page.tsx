'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Filter, 
  Grid, 
  List, 
  Search, 
  Star,
  Heart,
  ShoppingCart,
  Eye,
  AlertCircle,
  Monitor,
  ArrowLeft
} from 'lucide-react';
import { getProductImage, getFallbackImage } from '@/data/productImages';
import ProductImage from '@/components/ProductImage';
import { useCart } from '@/contexts/CartContext';

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

export default function MonitorsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Function to get product image
  const getProductImageSrc = (product: Product) => {
    const productIdMap: { [key: string]: string } = {
      'ASUS ROG Swift PG32UQX': 'asus-rog-swift-pg32uqx',
      'LG UltraGear 27GN950-B': 'lg-ultragear-27gn950',
      'Samsung Odyssey G7 32-inch': 'samsung-odyssey-g7-32',
      'Dell UltraSharp U2723QE': 'dell-ultrasharp-u2723qe',
      'Dell S2721QS 27-inch 4K Monitor': 'dell-s2721qs-4k',
      'Acer Predator XB273K 27-inch 4K Gaming Monitor': 'acer-predator-xb273k'
    };
    
    const productId = productIdMap[product.name] || product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const productImage = getProductImage(product.category, productId);
    return productImage?.main || getFallbackImage(product.category);
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/products?category=monitors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedBrand, priceRange, sortBy]);

  const brands = ['all', 'ASUS', 'LG', 'Samsung', 'Dell', 'Acer'];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller': return 'from-green-500 to-emerald-500';
      case 'New Arrival': return 'from-blue-500 to-cyan-500';
      case 'Premium': return 'from-purple-500 to-pink-500';
      case 'Gaming': return 'from-red-500 to-pink-500';
      case 'Professional': return 'from-indigo-500 to-purple-500';
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
              <Link href="/products" className="mr-4 p-2 rounded-lg bg-accent-gray hover:bg-accent-blue/20 transition-colors">
                <ArrowLeft className="w-5 h-5 text-accent-blue" />
              </Link>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Monitor className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-orbitron font-bold mb-6">
              <span className="text-white">Gaming</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Monitors
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Discover our collection of high-performance gaming monitors with 4K resolution, 
              high refresh rates, and advanced features for the ultimate gaming experience.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Gaming Monitors</h2>
              <p className="text-text-secondary text-lg">
                Showing {filteredProducts.length} monitors
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search monitors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-accent-gray border border-accent-blue/30 rounded-lg text-white hover:bg-accent-blue/20 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            <div className="flex border border-accent-blue/30 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-accent-blue text-white' : 'bg-accent-gray text-text-secondary hover:text-white'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-accent-blue text-white' : 'bg-accent-gray text-text-secondary hover:text-white'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-white font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-accent-gray border border-accent-blue/30 rounded-lg text-white focus:outline-none focus:border-accent-blue"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="glass-effect rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-text-secondary hover:text-accent-blue"
                >
                  ×
                </button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-2 bg-accent-gray border border-accent-blue/30 rounded-lg text-white focus:outline-none focus:border-accent-blue"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>
                      {brand.charAt(0).toUpperCase() + brand.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBrand('all');
                  setPriceRange([0, 5000]);
                }}
                className="w-full py-2 px-4 bg-accent-gray border border-accent-blue/30 rounded-lg text-white hover:border-accent-blue transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Products Grid/List */}
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-6'
            }>
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center py-20">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-text-secondary">Loading monitors...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-20">
                  <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-12 h-12 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Error loading monitors</h3>
                  <p className="text-text-secondary mb-8">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <div className="w-24 h-24 bg-accent-gray/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-accent-blue" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">No monitors found</h3>
                  <p className="text-text-secondary mb-8">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedBrand('all');
                      setPriceRange([0, 5000]);
                    }}
                    className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    {viewMode === 'grid' ? (
                      // Grid View
                      <div className="relative bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-2xl overflow-hidden border border-accent-blue/30 hover-lift">
                        {/* Product Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <div className={`px-3 py-1 bg-gradient-to-r ${getBadgeColor(product.isFeatured ? 'Featured' : 'Gaming')} text-white text-xs font-semibold rounded-full`}>
                            {product.isFeatured ? 'Featured' : 'Gaming'}
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
                        <div className="relative h-48 bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-t-2xl overflow-hidden">
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
                            {product.features.slice(0, 2).map((feature, index) => (
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
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => addToCart(product)}
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
                    ) : (
                      // List View
                      <div className="flex bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-2xl overflow-hidden border border-accent-blue/30 hover-lift">
                        {/* Product Image */}
                        <div className="relative w-48 h-48 bg-gradient-to-br from-accent-gray to-primary-black-secondary overflow-hidden">
                          <ProductImage
                            src={getProductImageSrc(product)}
                            alt={product.name}
                            name={product.name}
                            className="w-full h-full"
                            showQuickView={false}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent-blue transition-colors duration-300">
                                {product.name}
                              </h3>
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="flex items-center space-x-1">
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
                                    {product.rating} ({product.reviews} reviews)
                                  </span>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-semibold ${
                                  product.inStock 
                                    ? 'bg-green-500/20 text-green-400' 
                                    : 'bg-red-500/20 text-red-400'
                                }`}>
                                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-3xl font-bold text-white mb-2">
                                ${product.price}
                              </div>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <div className="text-lg text-text-secondary line-through">
                                  ${product.originalPrice}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {product.features.map((feature, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-accent-gray/50 text-xs text-accent-blue rounded"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-accent-gray rounded-lg text-white hover:bg-accent-blue transition-colors duration-300"
                              >
                                <Heart className="w-5 h-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-accent-gray rounded-lg text-white hover:bg-accent-blue transition-colors duration-300"
                              >
                                <Eye className="w-5 h-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => addToCart(product)}
                                disabled={!product.inStock}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                                  product.inStock
                                    ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-lg hover:shadow-accent-blue/25'
                                    : 'bg-accent-gray text-text-secondary cursor-not-allowed'
                                }`}
                              >
                                <ShoppingCart className="w-5 h-5" />
                                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                              </motion.button>
                              <Link href={`/products/${product.id}`}>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="px-4 py-2 bg-accent-gray text-white rounded-lg hover:bg-accent-blue transition-colors duration-300"
                                >
                                  View Details
                                </motion.button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
