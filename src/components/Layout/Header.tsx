'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  User, 
  Heart,
  Sun,
  Moon,
  Laptop,
  Headphones,
  Cpu
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onSearch: (query: string) => void;
}

export default function Header({ cartCount, onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isCategoriesOpen && !(event.target as Element).closest('.categories-dropdown')) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCategoriesOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const categories = [
    { name: 'Laptops', icon: Laptop, href: '/products?category=laptops' },
    { name: 'Accessories', icon: Headphones, href: '/products?category=accessories' },
    { name: 'Components', icon: Cpu, href: '/products?category=components' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 left-0 right-0 z-[9998] transition-all duration-300 ${
        isScrolled 
          ? 'glass-card backdrop-blur-md shadow-neon' 
          : 'bg-primary-black/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-gradient-neon rounded-lg flex items-center justify-center shadow-neon"
            >
              <span className="text-white font-orbitron font-bold text-xl">B</span>
            </motion.div>
            <span className="text-xl font-orbitron font-bold text-gradient-neon">
              CyberByte
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-text-secondary hover:text-accent-blue transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="text-text-secondary hover:text-accent-blue transition-colors duration-300 font-medium"
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className="text-text-secondary hover:text-accent-blue transition-colors duration-300 font-medium"
            >
              About
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative categories-dropdown">
              <button 
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="text-text-secondary hover:text-accent-blue transition-colors duration-300 font-medium flex items-center space-x-1"
              >
                Categories
                <motion.div
                  animate={{ rotate: isCategoriesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4"
                >
                  ▼
                </motion.div>
              </button>
              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="fixed top-16 left-1/2 transform -translate-x-1/2 w-48 glass-card rounded-lg shadow-xl z-[9999] mt-2"
                  >
                <div className="py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={() => setIsCategoriesOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:text-accent-blue hover:bg-accent-gray transition-all duration-300"
                    >
                      <category.icon className="w-4 h-4" />
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-accent-gray hover:bg-accent-blue/20 transition-colors duration-300"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-accent-gray hover:bg-accent-blue/20 transition-colors duration-300 relative"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-accent-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </motion.button>

            {/* Cart */}
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-accent-gray hover:bg-accent-blue/20 transition-colors duration-300 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-accent-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* User Account Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-accent-gray hover:bg-accent-blue/20 transition-colors duration-300"
              >
                <User className="w-5 h-5" />
              </motion.button>
              
              {/* Auth Links */}
              <div className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-xl z-50 hidden group-hover:block">
                <div className="py-2">
                  <Link
                    href="/login"
                    className="flex items-center px-4 py-2 text-text-secondary hover:text-accent-blue hover:bg-accent-gray transition-all duration-300"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center px-4 py-2 text-text-secondary hover:text-accent-blue hover:bg-accent-gray transition-all duration-300"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-accent-gray hover:bg-accent-blue/20 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 glass-card rounded-lg overflow-hidden z-50"
            >
              <div className="py-4">
                <Link 
                  href="/" 
                  className="block px-4 py-2 text-text-secondary hover:text-accent-blue transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/products" 
                  className="block px-4 py-2 text-text-secondary hover:text-accent-blue transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  href="/about" 
                  className="block px-4 py-2 text-text-secondary hover:text-accent-blue transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                
                {/* Mobile Search */}
                <div className="px-4 py-2">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 pl-10 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all duration-300"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  </form>
                </div>

                {/* Mobile Categories */}
                <div className="px-4 py-2">
                  <div className="text-text-secondary font-medium mb-2">Categories</div>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center space-x-3 px-2 py-1 text-text-secondary hover:text-accent-blue transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <category.icon className="w-4 h-4" />
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
