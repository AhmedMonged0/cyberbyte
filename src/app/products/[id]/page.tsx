'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  images: string[];
  features: string[];
  specifications: {
    [key: string]: string;
  };
  inStock: boolean;
  discount: number | null;
  category: string;
  brand: string;
  description: string;
  isFeatured: boolean;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products/${params.id}`);
        const data = await response.json();
        
        if (response.ok) {
          setProduct(data);
        } else {
          setError(data.error || 'Failed to fetch product');
        }
      } catch (err) {
        setError('Failed to fetch product');
        console.error('Error fetching product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">Error loading product</h3>
          <p className="text-text-secondary mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-primary-black flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">Product not found</h3>
          <p className="text-text-secondary mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller': return 'from-green-500 to-emerald-500';
      case 'New Arrival': return 'from-blue-500 to-cyan-500';
      case 'Premium': return 'from-purple-500 to-pink-500';
      case 'Editor\'s Choice': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-primary-black">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center space-x-2 text-sm text-text-secondary">
          <Link href="/" className="hover:text-accent-blue transition-colors duration-300">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-accent-blue transition-colors duration-300">
            Products
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-2xl overflow-hidden border border-accent-blue/30">
              <div className="w-full h-full bg-gradient-to-br from-accent-gray to-primary-black-secondary flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
                    <span className="text-4xl font-orbitron font-bold">B</span>
                  </div>
                  <p className="text-text-secondary">Product Image {selectedImage + 1}</p>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                disabled={selectedImage === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent-blue/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setSelectedImage(Math.min(product.images.length - 1, selectedImage + 1))}
                disabled={selectedImage === product.images.length - 1}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent-blue/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <div className={`px-3 py-1 bg-gradient-to-r ${getBadgeColor(product.isFeatured ? 'Featured' : 'New')} text-white text-sm font-semibold rounded-full`}>
                  {product.isFeatured ? 'Featured' : 'New'}
                </div>
              </div>

              {/* Discount Badge */}
              {product.discount && product.discount > 0 && (
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                    -{product.discount}%
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? 'border-accent-blue'
                      : 'border-accent-blue/30 hover:border-accent-blue/50'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-accent-gray to-primary-black-secondary flex items-center justify-center">
                    <span className="text-xs text-text-secondary">{index + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-orbitron font-bold text-white mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-text-secondary">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-white">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-2xl text-text-secondary line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.discount && product.discount > 0 && (
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-semibold rounded-full">
                    Save ${product.originalPrice! - product.price}
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent-gray/50 border border-accent-blue/30 text-accent-blue rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <p className="text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Quantity:</span>
                <div className="flex items-center border border-accent-blue/30 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-accent-blue/20 transition-colors duration-300"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <span className="px-4 py-2 text-white font-semibold min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-accent-blue/20 transition-colors duration-300"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    product.inStock
                      ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-lg hover:shadow-accent-blue/25'
                      : 'bg-accent-gray text-text-secondary cursor-not-allowed'
                  }`}
                >
                  {isAddedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlist}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    isWishlisted
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-accent-gray border-accent-blue/30 text-white hover:border-accent-blue'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-accent-gray border border-accent-blue/30 rounded-lg text-white hover:border-accent-blue transition-all duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Product Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-accent-gray">
              <div className="flex items-center space-x-3 text-text-secondary">
                <Truck className="w-5 h-5 text-accent-blue" />
                <span className="text-sm">{product.shipping}</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <Shield className="w-5 h-5 text-accent-blue" />
                <span className="text-sm">{product.warranty}</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <RotateCcw className="w-5 h-5 text-accent-blue" />
                <span className="text-sm">30-day returns</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <div className="glass-effect rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-orbitron font-bold text-white">Specifications</h2>
              <button
                onClick={() => setShowSpecs(!showSpecs)}
                className="flex items-center space-x-2 text-accent-blue hover:text-white transition-colors duration-300"
              >
                <span>{showSpecs ? 'Hide' : 'Show'} Specifications</span>
                <motion.div
                  animate={{ rotate: showSpecs ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </button>
            </div>

            {showSpecs && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-3 border-b border-accent-gray/30"
                  >
                    <span className="text-text-secondary font-medium">{key}</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="glass-effect rounded-2xl p-8">
            <h2 className="text-2xl font-orbitron font-bold text-white mb-8">Customer Reviews</h2>
            
            {/* Review Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2">{product.rating}</div>
                <div className="flex justify-center items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-text-secondary">Based on {product.reviews} reviews</p>
              </div>
              
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm text-text-secondary w-8">{rating}</span>
                    <div className="flex-1 bg-accent-gray rounded-full h-2">
                      <div 
                        className="bg-accent-blue h-2 rounded-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-text-secondary w-8">
                      {Math.floor(Math.random() * 50)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-6">
              {[
                {
                  name: "Alex Johnson",
                  rating: 5,
                  date: "2 days ago",
                  comment: "Absolutely amazing laptop! The RTX 4080 handles everything I throw at it. The build quality is top-notch and the display is gorgeous."
                },
                {
                  name: "Sarah Chen",
                  rating: 4,
                  date: "1 week ago",
                  comment: "Great performance and design. The only downside is the battery life could be better, but overall very satisfied with the purchase."
                },
                {
                  name: "Mike Rodriguez",
                  rating: 5,
                  date: "2 weeks ago",
                  comment: "Perfect for gaming and content creation. The RGB lighting looks fantastic and the keyboard feels great to type on."
                }
              ].map((review, index) => (
                <div key={index} className="border-b border-accent-gray/30 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{review.name}</h4>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-text-secondary text-sm">{review.date}</span>
                  </div>
                  <p className="text-text-secondary">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
