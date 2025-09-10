'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Load cart count from localStorage
    const savedCart = localStorage.getItem('cyberbyte-cart');
    if (savedCart) {
      const cart: { quantity: number }[] = JSON.parse(savedCart);
      const count = cart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
      setCartCount(count);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    // Handle search functionality
    console.log('Searching for:', query);
    // You can implement search logic here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-orbitron font-bold text-white mb-2">CyberByte</h2>
          <p className="text-text-secondary">Loading the future...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-black">
      <Header cartCount={cartCount} onSearch={handleSearch} />
      <main className="pt-16 relative z-10">
        {children}
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#ffffff',
            border: '1px solid #00d4ff',
          },
        }}
      />
    </div>
  );
}
