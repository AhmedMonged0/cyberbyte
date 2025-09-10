'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Play, Star, Zap, Shield, Award } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heroSlides = [
    {
      id: 1,
      title: "Next-Gen Gaming Laptops",
      subtitle: "Experience the future of gaming",
      description: "Powerful RTX 40 series graphics, lightning-fast processors, and stunning displays for the ultimate gaming experience.",
      image: "/api/placeholder/800/600",
      cta: "Shop Gaming Laptops",
      features: ["RTX 40 Series", "240Hz Display", "RGB Lighting"]
    },
    {
      id: 2,
      title: "Professional Workstations",
      subtitle: "Built for creators and professionals",
      description: "High-performance workstations designed for content creation, development, and professional applications.",
      image: "/api/placeholder/800/600",
      cta: "Explore Workstations",
      features: ["Intel i9 Processors", "64GB RAM", "4K Displays"]
    },
    {
      id: 3,
      title: "Premium Accessories",
      subtitle: "Complete your setup",
      description: "High-quality peripherals and accessories to enhance your computing experience and productivity.",
      image: "/api/placeholder/800/600",
      cta: "Browse Accessories",
      features: ["Mechanical Keyboards", "Gaming Mice", "High-Res Monitors"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const stats = [
    { icon: Star, value: "4.9/5", label: "Customer Rating" },
    { icon: Zap, value: "24/7", label: "Fast Delivery" },
    { icon: Shield, value: "2 Year", label: "Warranty" },
    { icon: Award, value: "10K+", label: "Happy Customers" }
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-tech">
      {/* Animated Background */}
      <div className="absolute inset-0 tech-pattern opacity-30" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-blue rounded-full opacity-30"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl lg:text-6xl font-orbitron font-bold leading-tight mb-6"
                >
                  <span className="text-white block mb-2">{heroSlides[currentSlide].title}</span>
                  <span className="text-gradient-neon block">
                    {heroSlides[currentSlide].subtitle}
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-text-secondary max-w-lg"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                {heroSlides[currentSlide].features.map((feature, index) => (
                  <motion.span
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className="px-4 py-2 bg-accent-gray/50 border border-accent-blue/30 rounded-full text-sm text-accent-blue"
                  >
                    {feature}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-neon text-white font-semibold rounded-xl hover:shadow-neon transition-all duration-300 flex items-center space-x-2 animate-glow"
                >
                  <span>{heroSlides[currentSlide].cta}</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-effect border border-accent-blue/30 text-white font-semibold rounded-lg hover:border-accent-blue transition-all duration-300 flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                className="text-center glass-card p-4 rounded-xl hover-lift"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-neon rounded-full flex items-center justify-center shadow-neon">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Product Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px]">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 rounded-2xl blur-3xl" />
                  <div className="relative w-full h-full bg-accent-gray rounded-2xl overflow-hidden border border-accent-blue/30">
                    <div className="w-full h-full bg-gradient-to-br from-accent-gray to-primary-black-secondary flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
                          <span className="text-4xl font-orbitron font-bold">B</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {heroSlides[currentSlide].title}
                        </h3>
                        <p className="text-text-secondary">
                          High-quality product image
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg flex items-center justify-center text-white font-bold text-sm"
              >
                New
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-gray border border-accent-blue/30 rounded-lg flex items-center justify-center"
              >
                <Star className="w-6 h-6 text-accent-blue" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
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

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-8 w-12 h-12 border-2 border-accent-blue rounded-full flex items-center justify-center"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1 h-4 bg-accent-blue rounded-full"
        />
      </motion.div>
    </section>
  );
}
