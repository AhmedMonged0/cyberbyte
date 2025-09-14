'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.8]);

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


  return (
    <section ref={containerRef} className="relative min-h-screen bg-gradient-tech z-0">
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
        className="relative z-10 h-full flex items-center pt-16 pb-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl lg:text-7xl font-orbitron font-bold leading-tight mb-8"
                >
                  <span className="text-white block mb-4">{heroSlides[currentSlide].title}</span>
                  <span className="text-gradient-neon block text-3xl lg:text-4xl font-light">
                    {heroSlides[currentSlide].subtitle}
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl lg:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-3 mb-12"
              >
                {heroSlides[currentSlide].features.map((feature, index) => (
                  <motion.span
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className="px-6 py-3 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 border border-accent-blue/40 rounded-full text-sm font-medium text-accent-blue backdrop-blur-sm hover:border-accent-blue/60 transition-all duration-300"
                  >
                    ✨ {feature}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
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
