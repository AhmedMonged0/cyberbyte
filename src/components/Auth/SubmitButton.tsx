'use client';

import { motion } from 'framer-motion';

interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export default function SubmitButton({
  isLoading,
  loadingText,
  children,
  disabled = false,
  className = '',
}: SubmitButtonProps) {
  return (
    <motion.button
      type="submit"
      disabled={isLoading || disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-neon hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}
