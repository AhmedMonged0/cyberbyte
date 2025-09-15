'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Laptop, 
  Headphones, 
  Cpu, 
  Monitor, 
  Keyboard,
  HardDrive
} from 'lucide-react';

export default function ProductCategories() {

  const categories = [
    {
      id: 'laptops',
      name: 'Gaming Laptops',
      description: 'High-performance laptops for gaming and professional work',
      icon: Laptop,
      image: '/api/placeholder/400/300',
      color: 'from-blue-500 to-cyan-500',
      count: 24,
      featured: true
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Keyboards, mice, headsets, and more',
      icon: Headphones,
      image: '/api/placeholder/400/300',
      color: 'from-purple-500 to-pink-500',
      count: 156,
      featured: false
    },
    {
      id: 'components',
      name: 'Components',
      description: 'CPUs, GPUs, RAM, and storage solutions',
      icon: Cpu,
      image: '/api/placeholder/400/300',
      color: 'from-green-500 to-emerald-500',
      count: 89,
      featured: true
    },
    {
      id: 'monitors',
      name: 'Monitors',
      description: '4K displays, gaming monitors, and professional screens',
      icon: Monitor,
      image: '/api/placeholder/400/300',
      color: 'from-orange-500 to-red-500',
      count: 42,
      featured: false
    },
    {
      id: 'peripherals',
      name: 'Peripherals',
      description: 'Keyboards, mice, and input devices',
      icon: Keyboard,
      image: '/api/placeholder/400/300',
      color: 'from-indigo-500 to-purple-500',
      count: 78,
      featured: false
    },
    {
      id: 'storage',
      name: 'Storage',
      description: 'SSDs, HDDs, and external storage',
      icon: HardDrive,
      image: '/api/placeholder/400/300',
      color: 'from-yellow-500 to-orange-500',
      count: 34,
      featured: false
    }
  ];

  const featuredCategories = categories.filter(cat => cat.featured);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 border border-accent-blue/20 rounded"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

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
            <span className="text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Explore Our</span>
            <br />
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue bg-clip-text text-transparent text-4xl lg:text-5xl font-light">
              Product Categories
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed font-light">
            Discover our comprehensive range of cutting-edge computer products, 
            carefully curated to meet all your technology needs.
          </p>
        </motion.div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/products/${category.id}`}>
                <div className="relative h-80 bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-2xl overflow-hidden border border-accent-blue/30 hover-lift">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-between">
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
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-accent-blue font-semibold">
                        {category.count} Products
                      </span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="text-accent-blue group-hover:text-white transition-colors duration-300"
                      >
                        →
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

        {/* All Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Link href={`/products/${category.id}`}>
                <div className="bg-accent-gray/50 border border-accent-blue/20 rounded-xl p-6 text-center hover:border-accent-blue/50 hover:bg-accent-gray transition-all duration-300">
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-accent-blue transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-xs text-text-secondary mb-3">
                    {category.count} items
                  </p>
                  
                  <div className="w-6 h-6 mx-auto bg-accent-blue/20 rounded-full flex items-center justify-center group-hover:bg-accent-blue group-hover:text-white transition-all duration-300">
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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
