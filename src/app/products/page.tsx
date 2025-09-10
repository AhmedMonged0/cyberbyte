'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, 
  Grid, 
  List, 
  Search, 
  Star,
  Heart,
  ShoppingCart,
  Eye
} from 'lucide-react';
// import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  features: string[];
  inStock: boolean;
  discount?: number;
  category: string;
  brand: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Mock data
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Alienware X17 R2 Gaming Laptop",
        price: 2499,
        originalPrice: 2799,
        rating: 4.8,
        reviews: 124,
        image: "/api/placeholder/400/300",
        badge: "Best Seller",
        features: ["RTX 4080", "32GB RAM", "1TB SSD"],
        inStock: true,
        discount: 11,
        category: "laptops",
        brand: "Alienware"
      },
      {
        id: 2,
        name: "ASUS ROG Strix G15",
        price: 1899,
        originalPrice: 2199,
        rating: 4.7,
        reviews: 89,
        image: "/api/placeholder/400/300",
        badge: "New Arrival",
        features: ["RTX 4070", "16GB RAM", "512GB SSD"],
        inStock: true,
        discount: 14,
        category: "laptops",
        brand: "ASUS"
      },
      {
        id: 3,
        name: "MacBook Pro 16-inch M2 Max",
        price: 3299,
        originalPrice: 3299,
        rating: 4.9,
        reviews: 203,
        image: "/api/placeholder/400/300",
        badge: "Premium",
        features: ["M2 Max", "32GB RAM", "1TB SSD"],
        inStock: true,
        discount: 0,
        category: "laptops",
        brand: "Apple"
      },
      {
        id: 4,
        name: "Razer Blade 15 Advanced",
        price: 2199,
        originalPrice: 2499,
        rating: 4.6,
        reviews: 67,
        image: "/api/placeholder/400/300",
        badge: "Editor's Choice",
        features: ["RTX 4070", "16GB RAM", "1TB SSD"],
        inStock: false,
        discount: 12,
        category: "laptops",
        brand: "Razer"
      },
      {
        id: 5,
        name: "Corsair K95 RGB Keyboard",
        price: 199,
        originalPrice: 249,
        rating: 4.5,
        reviews: 156,
        image: "/api/placeholder/400/300",
        badge: "Gaming",
        features: ["Mechanical", "RGB", "Macro Keys"],
        inStock: true,
        discount: 20,
        category: "accessories",
        brand: "Corsair"
      },
      {
        id: 6,
        name: "Logitech MX Master 3S",
        price: 99,
        originalPrice: 99,
        rating: 4.7,
        reviews: 234,
        image: "/api/placeholder/400/300",
        badge: "Professional",
        features: ["Wireless", "Ergonomic", "Precision"],
        inStock: true,
        discount: 0,
        category: "accessories",
        brand: "Logitech"
      },
      {
        id: 7,
        name: "Intel Core i9-13900K",
        price: 599,
        originalPrice: 699,
        rating: 4.8,
        reviews: 89,
        image: "/api/placeholder/400/300",
        badge: "High Performance",
        features: ["24 Cores", "5.8GHz", "DDR5"],
        inStock: true,
        discount: 14,
        category: "components",
        brand: "Intel"
      },
      {
        id: 8,
        name: "NVIDIA RTX 4090",
        price: 1599,
        originalPrice: 1799,
        rating: 4.9,
        reviews: 167,
        image: "/api/placeholder/400/300",
        badge: "Flagship",
        features: ["24GB VRAM", "Ray Tracing", "DLSS 3"],
        inStock: true,
        discount: 11,
        category: "components",
        brand: "NVIDIA"
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Price range filter
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
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

  const categories = ['all', 'laptops', 'accessories', 'components'];
  const brands = ['all', 'Alienware', 'ASUS', 'Apple', 'Razer', 'Corsair', 'Logitech', 'Intel', 'NVIDIA'];

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

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-black to-primary-black-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-orbitron font-bold mb-6">
              <span className="text-white">Our</span>
              <br />
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Discover our comprehensive collection of cutting-edge computer products, 
              carefully selected to meet all your technology needs.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
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

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-accent-gray border border-accent-blue/30 rounded-lg text-white focus:outline-none focus:border-accent-blue"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
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
                  setSelectedCategory('all');
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
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-accent-gray border border-accent-blue/30 rounded-lg text-white hover:border-accent-blue transition-colors duration-300"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
                
                <p className="text-text-secondary">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-accent-gray border border-accent-blue/30 rounded-lg text-white focus:outline-none focus:border-accent-blue"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>

                {/* View Mode */}
                <div className="flex border border-accent-blue/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-accent-blue text-white' : 'bg-accent-gray text-text-secondary hover:text-white'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-accent-blue text-white' : 'bg-accent-gray text-text-secondary hover:text-white'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-6'
            }>
              {paginatedProducts.map((product, index) => (
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
                        <div className={`px-3 py-1 bg-gradient-to-r ${getBadgeColor(product.badge)} text-white text-xs font-semibold rounded-full`}>
                          {product.badge}
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
                        <div className="w-full h-full bg-gradient-to-br from-accent-gray to-primary-black-secondary flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
                              <span className="text-2xl font-orbitron font-bold">B</span>
                            </div>
                            <p className="text-text-secondary text-sm">Product Image</p>
                          </div>
                        </div>
                        
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
                        <div className="w-full h-full bg-gradient-to-br from-accent-gray to-primary-black-secondary flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
                              <span className="text-xl font-orbitron font-bold">B</span>
                            </div>
                            <p className="text-text-secondary text-xs">Product Image</p>
                          </div>
                        </div>
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
                              disabled={!product.inStock}
                              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
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
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-accent-gray border border-accent-blue/30 rounded-lg text-white hover:border-accent-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                      currentPage === index + 1
                        ? 'bg-accent-blue text-white'
                        : 'bg-accent-gray text-text-secondary hover:text-white'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-accent-gray border border-accent-blue/30 rounded-lg text-white hover:border-accent-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
