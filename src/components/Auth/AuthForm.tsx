'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AuthFormProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  icon: ReactNode;
}

export default function AuthForm({ children, title, subtitle, icon }: AuthFormProps) {
  return (
    <div className="min-h-screen bg-primary-black tech-grid flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="mx-auto h-12 w-12 bg-gradient-neon rounded-lg flex items-center justify-center shadow-neon">
            {icon}
          </div>
          <h2 className="mt-6 text-3xl font-orbitron font-bold text-gradient-neon">
            {title}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {subtitle}
          </p>
        </motion.div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 space-y-6"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

