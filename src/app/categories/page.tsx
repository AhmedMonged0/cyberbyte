'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Laptop, 
  Headphones, 
  Cpu, 
  Monitor, 
  Keyboard,
  HardDrive,
  Search,
  Filter,
  Grid,
  List,
  Star,
  TrendingUp,
  Clock,
  Users,
  ShoppingCart,
  ArrowRight,
  Zap,
  Shield,
  Award
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: any;
  image: string;
  color: string;
  count: number;
  featured: boolean;
  trending: boolean;
  newArrivals: number;
  avgRating: number;
  totalSales: number;
  discount: number;
  lastUpdated: string;
  topBrands: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'laptops',
      name: 'Gaming Laptops',
      description: 'High-performance laptops for gaming and professional work',
      icon: Laptop,
      image: '/api/placeholder/400/300',
      color: 'from-blue-500 to-cyan-500',
      count: 24,
      featured: true,
      trending: true,
      newArrivals: 5,
      avgRating: 4.8,
      totalSales: 1250,
      discount: 15,
      lastUpdated: '2 days ago',
      topBrands: ['Alienware', 'ASUS ROG', 'Razer', 'MSI'],
      priceRange: { min: 800, max: 3500 }
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Keyboards, mice, headsets, and more',
      icon: Headphones,
      image: '/api/placeholder/400/300',
      color: 'from-purple-500 to-pink-500',
      count: 156,
      featured: false,
      trending: true,
      newArrivals: 12,
      avgRating: 4.6,
      totalSales: 3200,
      discount: 20,
      lastUpdated: '1 day ago',
      topBrands: ['Corsair', 'Logitech', 'SteelSeries', 'HyperX'],
      priceRange: { min: 25, max: 500 }
    },
    {
      id: 'components',
      name: 'Components',
      description: 'CPUs, GPUs, RAM, and storage solutions',
      icon: Cpu,
      image: '/api/placeholder/400/300',
      color: 'from-green-500 to-emerald-500',
      count: 89,
      featured: true,
      trending: false,
      newArrivals: 8,
      avgRating: 4.9,
      totalSales: 2100,
      discount: 10,
      lastUpdated: '3 days ago',
      topBrands: ['Intel', 'AMD', 'NVIDIA', 'Samsung'],
      priceRange: { min: 50, max: 2000 }
    },
    {
      id: 'monitors',
      name: 'Monitors',
      description: '4K displays, gaming monitors, and professional screens',
      icon: Monitor,
      image: '/api/placeholder/400/300',
      color: 'from-orange-500 to-red-500',
      count: 6,
      featured: false,
      trending: true,
      newArrivals: 3,
      avgRating: 4.7,
      totalSales: 890,
      discount: 25,
      lastUpdated: '4 days ago',
      topBrands: ['ASUS', 'LG', 'Samsung', 'Dell'],
      priceRange: { min: 150, max: 1200 }
    },
    {
      id: 'peripherals',
      name: 'Peripherals',
      description: 'Keyboards, mice, and input devices',
      icon: Keyboard,
      image: '/api/placeholder/400/300',
      color: 'from-indigo-500 to-purple-500',
      count: 7,
      featured: false,
      trending: false,
      newArrivals: 6,
      avgRating: 4.5,
      totalSales: 1800,
      discount: 18,
      lastUpdated: '1 week ago',
      topBrands: ['Corsair', 'Razer', 'Logitech', 'Keychron'],
      priceRange: { min: 30, max: 300 }
    },
    {
      id: 'storage',
      name: 'Storage',
      description: 'SSDs, HDDs, and external storage',
      icon: HardDrive,
      image: '/api/placeholder/400/300',
      color: 'from-yellow-500 to-orange-500',
      count: 8,
      featured: false,
      trending: false,
      newArrivals: 4,
      avgRating: 4.4,
      totalSales: 950,
      discount: 12,
      lastUpdated: '5 days ago',
      topBrands: ['Samsung', 'WD', 'Seagate', 'Crucial'],
      priceRange: { min: 40, max: 800 }
    }
  ];

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterBy === 'featured') return category.featured;
    if (filterBy === 'trending') return category.trending;
    if (filterBy === 'new') return category.newArrivals > 0;
    
    return matchesSearch;
  });

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'count':
        return b.count - a.count;
      case 'rating':
        return b.avgRating - a.avgRating;
      case 'sales':
        return b.totalSales - a.totalSales;
      case 'trending':
        return Number(b.trending) - Number(a.trending);
      default:
        return Number(b.featured) - Number(a.featured);
    }
  });

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'featured': return 'from-purple-500 to-pink-500';
      case 'trending': return 'from-orange-500 to-red-500';
      case 'new': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'featured': return Award;
      case 'trending': return TrendingUp;
      case 'new': return Zap;
      default: return Star;
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
            <h1 className="text-4xl lg:text-6xl font-orbitron font-bold mb-6">
              <span className="text-white">Product</span>
              <br />
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                Categories
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Explore our comprehensive range of computer products organized by category. 
              Find exactly what you need with our detailed product classifications.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-accent-gray border border-accent-blue/30 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-8 bg-gradient-to-r from-primary-black to-primary-black-secondary border-b border-accent-blue/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-accent-blue" />
                <span className="text-white font-medium">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', name: 'All', count: categories.length },
                  { id: 'featured', name: 'Featured', count: categories.filter(c => c.featured).length },
                  { id: 'trending', name: 'Trending', count: categories.filter(c => c.trending).length },
                  { id: 'new', name: 'New', count: categories.filter(c => c.newArrivals > 0).length }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setFilterBy(filter.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      filterBy === filter.id
                        ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white'
                        : 'bg-accent-gray text-text-secondary hover:bg-accent-gray/70 hover:text-white'
                    }`}
                  >
                    {filter.name} ({filter.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & View */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-accent-gray border border-accent-blue/30 rounded-lg text-white focus:outline-none focus:border-accent-blue"
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name</option>
                  <option value="count">Product Count</option>
                  <option value="rating">Rating</option>
                  <option value="sales">Sales</option>
                  <option value="trending">Trending</option>
                </select>
              </div>

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
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }
          >
            {sortedCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="group"
              >
                <Link href={`/products/${category.id}`}>
                  <div className={`relative bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-2xl overflow-hidden border border-accent-blue/30 hover-lift ${
                    viewMode === 'list' ? 'flex' : 'h-80'
                  }`}>
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                      {category.featured && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
                          <Award className="w-3 h-3" />
                          Featured
                        </div>
                      )}
                      {category.trending && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </div>
                      )}
                      {category.newArrivals > 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full">
                          <Zap className="w-3 h-3" />
                          {category.newArrivals} New
                        </div>
                      )}
                    </div>

                    {/* Discount Badge */}
                    {category.discount > 0 && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                          -{category.discount}%
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className={`relative z-10 p-8 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : 'h-full flex flex-col justify-between'}`}>
                      <div>
                        <div className="w-16 h-16 mb-6 bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <category.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors duration-300">
                          {category.name}
                        </h3>
                        
                        <p className="text-text-secondary mb-4">
                          {category.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-accent-blue">{category.count}</div>
                            <div className="text-xs text-text-secondary">Products</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-accent-purple">{category.avgRating}</div>
                            <div className="text-xs text-text-secondary">Rating</div>
                          </div>
                        </div>

                        {/* Price Range */}
                        <div className="mb-4">
                          <div className="text-sm text-text-secondary mb-1">Price Range</div>
                          <div className="text-lg font-semibold text-white">
                            ${category.priceRange.min} - ${category.priceRange.max}
                          </div>
                        </div>

                        {/* Top Brands */}
                        <div className="mb-4">
                          <div className="text-sm text-text-secondary mb-2">Top Brands</div>
                          <div className="flex flex-wrap gap-1">
                            {category.topBrands.slice(0, 3).map((brand, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-accent-gray/50 text-xs text-accent-blue rounded"
                              >
                                {brand}
                              </span>
                            ))}
                            {category.topBrands.length > 3 && (
                              <span className="px-2 py-1 bg-accent-gray/50 text-xs text-text-secondary rounded">
                                +{category.topBrands.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {category.totalSales} sold
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {category.lastUpdated}
                          </div>
                        </div>
                        
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-accent-blue group-hover:text-white transition-colors duration-300"
                        >
                          <ArrowRight className="w-6 h-6" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {sortedCategories.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-accent-gray/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-accent-blue" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">No categories found</h3>
              <p className="text-text-secondary mb-8">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterBy('all');
                }}
                className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
