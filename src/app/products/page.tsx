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
  AlertCircle
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

  // Function to get product image
  const getProductImageSrc = (product: Product) => {
    // Map product names to image IDs
    const productIdMap: { [key: string]: string } = {
      'Alienware X17 R2 Gaming Laptop': 'alienware-x17-r2',
      'ASUS ROG Strix G15': 'asus-rog-strix-g15',
      'MacBook Pro 16-inch M2 Max': 'macbook-pro-16',
      'Razer Blade 15 Advanced': 'razer-blade-15',
      'Corsair K95 RGB Keyboard': 'corsair-k95-rgb',
      'Logitech MX Master 3S': 'logitech-mx-master-3s',
      'Intel Core i9-13900K': 'intel-core-i9-13900k',
      'NVIDIA RTX 4090': 'nvidia-rtx-4090'
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
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '12',
          ...(searchQuery && { search: searchQuery }),
          ...(selectedCategory && { category: selectedCategory }),
          ...(sortBy && { sortBy }),
          ...(sortOrder && { sortOrder })
        });

        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();
        
        if (response.ok) {
          setProducts(data.products);
          setFilteredProducts(data.products);
          setTotalPages(data.pagination.totalPages);
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

    fetchProducts();
  }, [currentPage, searchQuery, selectedCategory, sortBy, sortOrder]);

  // Remove the old filter logic since we're now filtering on the server side
  // The API handles all filtering and sorting

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

  // Use products directly since API handles pagination
  const paginatedProducts = products;

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
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center py-20">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-text-secondary">Loading products...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-20">
                  <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-12 h-12 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Error loading products</h3>
                  <p className="text-text-secondary mb-8">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : products.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <div className="w-24 h-24 bg-accent-gray/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-accent-blue" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">No products found</h3>
                  <p className="text-text-secondary mb-8">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedBrand('all');
                      setPriceRange([0, 5000]);
                      setSortBy('featured');
                    }}
                    className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                paginatedProducts.map((product, index) => (
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
                              <Link href={`/products/${product.id}`}>
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
                                  <span>{product.inStock ? 'View Details' : 'Out of Stock'}</span>
                                </motion.button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              }
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
