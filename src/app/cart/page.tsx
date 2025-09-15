'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Check
} from 'lucide-react';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  inStock: boolean;
  discount?: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cyberbyte-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // Mock cart data
      const mockCart: CartItem[] = [
        {
          id: 1,
          name: "Alienware X17 R2 Gaming Laptop",
          price: 2499,
          originalPrice: 2799,
          image: "/api/placeholder/200/150",
          quantity: 1,
          inStock: true,
          discount: 11
        },
        {
          id: 2,
          name: "Corsair K95 RGB Keyboard",
          price: 199,
          originalPrice: 249,
          image: "/api/placeholder/200/150",
          quantity: 2,
          inStock: true,
          discount: 20
        },
        {
          id: 3,
          name: "Logitech MX Master 3S",
          price: 99,
          image: "/api/placeholder/200/150",
          quantity: 1,
          inStock: true
        }
      ];
      setCartItems(mockCart);
    }
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cyberbyte-cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cyberbyte-cart', JSON.stringify(updatedCart));
  };

  const moveToWishlist = (item: CartItem) => {
    // Add to wishlist logic here
    removeItem(item.id);
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const originalSubtotal = cartItems.reduce((total, item) => total + ((item.originalPrice || item.price) * item.quantity), 0);
  const savings = originalSubtotal - subtotal;
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // setCheckoutStep(1);
  };

  const getBadgeColor = (discount?: number) => {
    if (!discount) return 'from-gray-500 to-gray-600';
    if (discount >= 20) return 'from-red-500 to-pink-500';
    if (discount >= 10) return 'from-orange-500 to-red-500';
    return 'from-green-500 to-emerald-500';
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-primary-black">
        <div className="container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-orbitron font-bold text-white mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-black">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-accent-gray rounded-lg text-white hover:bg-accent-blue/20 transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
            </Link>
            <h1 className="text-4xl font-orbitron font-bold text-white">
              Shopping Cart
            </h1>
          </div>
          <div className="text-center lg:text-right">
            <p className="text-text-secondary text-lg">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
            </p>
            <p className="text-2xl font-bold text-accent-blue">
              ${total.toFixed(2)}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Product Image */}
                  <div className="relative w-32 h-32 lg:w-24 lg:h-24 bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-xl overflow-hidden border border-accent-blue/30">
                    <div className="w-full h-full bg-gradient-to-br from-accent-gray to-primary-black-secondary flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-10 h-10 lg:w-8 lg:h-8 mx-auto mb-1 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
                          <span className="text-sm font-orbitron font-bold">B</span>
                        </div>
                        <p className="text-xs text-text-secondary">Image</p>
                      </div>
                    </div>
                    
                    {/* Discount Badge */}
                    {item.discount && item.discount > 0 && (
                      <div className="absolute -top-2 -right-2">
                        <div className={`px-2 py-1 bg-gradient-to-r ${getBadgeColor(item.discount)} text-white text-xs font-bold rounded-full`}>
                          -{item.discount}%
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-white">
                          ${item.price}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-lg text-text-secondary line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.inStock 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-accent-blue/30 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-accent-blue/20 transition-colors duration-300"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span className="px-4 py-2 text-white font-semibold min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={!item.inStock}
                          className="p-2 hover:bg-accent-blue/20 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      <div className="text-lg font-bold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => moveToWishlist(item)}
                      className="p-2 bg-accent-gray rounded-lg text-white hover:bg-accent-blue/20 transition-colors duration-300"
                      title="Move to Wishlist"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.id)}
                      className="p-2 bg-accent-gray rounded-lg text-red-400 hover:bg-red-500/20 transition-colors duration-300"
                      title="Remove Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="glass-effect rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-text-secondary">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between text-text-secondary">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-accent-gray/30 pt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300 mb-4"
              >
                Proceed to Checkout
              </motion.button>

              {/* Security Info */}
              <div className="space-y-3 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-accent-blue" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-accent-blue" />
                  <span>Free shipping on orders over $99</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-accent-blue" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckingOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-effect rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-orbitron font-bold text-white mb-4">
                Checkout
              </h2>
              
              <p className="text-text-secondary mb-6">
                This is a demo checkout. In a real application, this would redirect to a payment processor.
              </p>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    ${total.toFixed(2)}
                  </div>
                  <p className="text-text-secondary">
                    Total for {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1 py-3 px-4 bg-accent-gray border border-accent-blue/30 rounded-lg text-white hover:border-accent-blue transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsCheckingOut(false);
                      setCartItems([]);
                      localStorage.removeItem('cyberbyte-cart');
                    }}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
                  >
                    Complete Order
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
