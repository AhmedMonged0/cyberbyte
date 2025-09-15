'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Lock, 
  Truck, 
  Shield, 
  Check,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';


export default function CheckoutPage() {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    // Generate order number
    setOrderNumber(`CB-${Date.now().toString().slice(-8)}`);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0 && !orderComplete) {
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
              <CreditCard className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-orbitron font-bold text-white mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-md mx-auto">
              Add some products to your cart before proceeding to checkout.
            </p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-primary-black">
        <div className="container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Check className="w-16 h-16 text-white" />
            </div>
            
            <h1 className="text-4xl font-orbitron font-bold text-white mb-4">
              Order Placed Successfully!
            </h1>
            
            <p className="text-xl text-text-secondary mb-8">
              Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            </p>

            <div className="glass-effect rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Order Details</h2>
              
              <div className="space-y-4 text-left">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Order Number:</span>
                  <span className="text-white font-semibold">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Amount:</span>
                  <span className="text-white font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Items:</span>
                  <span className="text-white font-semibold">{cartItems.length} products</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Estimated Delivery:</span>
                  <span className="text-white font-semibold">3-5 business days</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
                >
                  Continue Shopping
                </motion.button>
              </Link>
              <Link href="/profile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-accent-gray border border-accent-blue/30 text-white font-semibold rounded-lg hover:border-accent-blue transition-all duration-300"
                >
                  View Orders
                </motion.button>
              </Link>
            </div>
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
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-accent-gray rounded-lg text-white hover:bg-accent-blue/20 transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
            </Link>
            <h1 className="text-4xl font-orbitron font-bold text-white">
              Checkout
            </h1>
          </div>
          
          <div className="text-right">
            <p className="text-text-secondary">Order #{orderNumber}</p>
            <p className="text-2xl font-bold text-accent-blue">
              ${total.toFixed(2)}
            </p>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: 'Shipping', icon: Truck },
              { step: 2, title: 'Payment', icon: CreditCard },
              { step: 3, title: 'Review', icon: Check }
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  currentStep >= step
                    ? 'bg-gradient-to-r from-accent-blue to-accent-purple border-transparent text-white'
                    : 'bg-accent-gray border-accent-blue/30 text-text-secondary'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`ml-3 font-semibold ${
                  currentStep >= step ? 'text-white' : 'text-text-secondary'
                }`}>
                  {title}
                </span>
                {step < 3 && (
                  <div className={`w-16 h-0.5 ml-8 ${
                    currentStep > step ? 'bg-accent-blue' : 'bg-accent-gray'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl p-8"
            >
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-white mb-2">Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                        placeholder="Enter your street address"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                        placeholder="Enter ZIP code"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Country *</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Payment Information</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-white mb-4">Payment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          paymentMethod === 'card'
                            ? 'border-accent-blue bg-accent-blue/20'
                            : 'border-accent-blue/30 bg-accent-gray hover:border-accent-blue/50'
                        }`}
                      >
                        <CreditCard className="w-8 h-8 text-white mx-auto mb-2" />
                        <span className="text-white font-medium">Credit Card</span>
                      </button>
                      
                      <button
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          paymentMethod === 'paypal'
                            ? 'border-accent-blue bg-accent-blue/20'
                            : 'border-accent-blue/30 bg-accent-gray hover:border-accent-blue/50'
                        }`}
                      >
                        <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">P</span>
                        </div>
                        <span className="text-white font-medium">PayPal</span>
                      </button>
                      
                      <button
                        onClick={() => setPaymentMethod('apple')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          paymentMethod === 'apple'
                            ? 'border-accent-blue bg-accent-blue/20'
                            : 'border-accent-blue/30 bg-accent-gray hover:border-accent-blue/50'
                        }`}
                      >
                        <div className="w-8 h-8 bg-black rounded mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">🍎</span>
                        </div>
                        <span className="text-white font-medium">Apple Pay</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Expiry Date *</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">CVV *</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Name on Card *</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                          placeholder="Enter name as it appears on card"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="mt-8 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 text-sm">
                        Your payment information is secure and encrypted. We never store your card details.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Review Your Order</h2>
                  
                  {/* Order Summary */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Shipping Address</h3>
                      <div className="p-4 bg-accent-gray/50 rounded-lg">
                        <p className="text-white">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-text-secondary">{formData.address}</p>
                        <p className="text-text-secondary">
                          {formData.city}, {formData.zipCode} {formData.country}
                        </p>
                        <p className="text-text-secondary">{formData.email}</p>
                        <p className="text-text-secondary">{formData.phone}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
                      <div className="p-4 bg-accent-gray/50 rounded-lg">
                        <p className="text-white capitalize">{paymentMethod} Payment</p>
                        {paymentMethod === 'card' && (
                          <p className="text-text-secondary">
                            **** **** **** {formData.cardNumber.slice(-4)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 bg-accent-gray/50 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-lg flex items-center justify-center">
                                <span className="text-xs text-text-secondary">IMG</span>
                              </div>
                              <div>
                                <p className="text-white font-medium">{item.name}</p>
                                <p className="text-text-secondary">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="text-white font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white hover:border-accent-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  Previous
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

              {/* Security Features */}
              <div className="space-y-3 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-accent-blue" />
                  <span>256-bit SSL encryption</span>
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
    </div>
  );
}
