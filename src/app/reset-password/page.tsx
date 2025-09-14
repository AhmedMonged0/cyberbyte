'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  const validateEmail = () => {
    if (!email) {
      setErrors({ email: 'Email is required' });
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Email is invalid' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful password reset request
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Password reset error:', error);
      setErrors({ general: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-primary-black tech-grid flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              href="/login"
              className="inline-flex items-center text-text-secondary hover:text-accent-blue transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="mx-auto h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-orbitron font-bold text-gradient-neon mb-4">
              Check Your Email
            </h2>
            <p className="text-text-secondary mb-6">
              We've sent a password reset link to <span className="text-accent-blue font-medium">{email}</span>
            </p>
            <div className="glass-card rounded-xl p-6 space-y-4">
              <p className="text-sm text-text-secondary">
                If you don't see the email in your inbox, please check your spam folder or try again.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                  className="flex-1 py-2 px-4 bg-accent-gray hover:bg-accent-blue/20 text-text-primary rounded-lg transition-colors duration-300"
                >
                  Try Different Email
                </button>
                <Link
                  href="/login"
                  className="flex-1 py-2 px-4 bg-gradient-neon hover:shadow-neon text-white rounded-lg transition-all duration-300 text-center flex items-center justify-center"
                >
                  Back to Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-black tech-grid flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link 
            href="/login"
            className="inline-flex items-center text-text-secondary hover:text-accent-blue transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="mx-auto h-12 w-12 bg-gradient-neon rounded-lg flex items-center justify-center shadow-neon">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-orbitron font-bold text-gradient-neon">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="glass-card rounded-xl p-8 space-y-6">
            {/* General Error */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm"
              >
                {errors.general}
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-secondary" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 bg-accent-gray border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-accent-blue/30'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-neon hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending reset link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </motion.button>

            {/* Additional Info */}
            <div className="text-center">
              <p className="text-sm text-text-secondary">
                Remember your password?{' '}
                <Link
                  href="/login"
                  className="font-medium text-accent-blue hover:text-accent-purple transition-colors duration-300"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Help Text */}
            <div className="bg-accent-gray/30 rounded-lg p-4">
              <h3 className="text-sm font-medium text-text-primary mb-2">Need Help?</h3>
              <p className="text-xs text-text-secondary">
                If you're having trouble accessing your account, please contact our support team at{' '}
                <a 
                  href="mailto:support@cyberbyte.com" 
                  className="text-accent-blue hover:text-accent-purple transition-colors duration-300"
                >
                  support@cyberbyte.com
                </a>
              </p>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
