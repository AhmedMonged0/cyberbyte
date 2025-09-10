'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ZoomIn } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  name: string;
  className?: string;
  showQuickView?: boolean;
  onQuickView?: () => void;
}

export default function ProductImage({ 
  src, 
  alt, 
  name, 
  className = "",
  showQuickView = true,
  onQuickView 
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback image component
  const FallbackImage = () => (
    <div className={`w-full h-full bg-gradient-to-br from-accent-gray to-primary-black-secondary flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
          <span className="text-2xl font-orbitron font-bold text-white">B</span>
        </div>
        <p className="text-text-secondary text-sm">{name}</p>
      </div>
    </div>
  );

  return (
    <div className={`relative group overflow-hidden ${className}`}>
      {imageError ? (
        <FallbackImage />
      ) : (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-gray to-primary-black-secondary flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </>
      )}

      {/* Quick View Overlay */}
      {showQuickView && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onQuickView}
              className="p-3 bg-accent-blue rounded-full text-white hover:bg-accent-purple transition-colors duration-300"
              title="Quick View"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-accent-gray rounded-full text-white hover:bg-accent-blue transition-colors duration-300"
              title="Zoom"
            >
              <ZoomIn className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && !imageError && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
