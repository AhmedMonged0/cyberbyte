'use client';

import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Settings, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import EmailPreferencesModal from '@/components/EmailPreferencesModal';
import PrivacySettingsModal from '@/components/PrivacySettingsModal';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-black tech-grid flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary-black tech-grid py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center text-text-secondary hover:text-accent-blue transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-8 mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="h-20 w-20 bg-gradient-neon rounded-full flex items-center justify-center shadow-neon">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-orbitron font-bold text-gradient-neon">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-text-secondary mt-1">
                Welcome to your CyberByte profile
              </p>
            </div>
          </div>
        </motion.div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-6"
          >
            <h2 className="text-xl font-orbitron font-bold text-text-primary mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-accent-blue" />
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  First Name
                </label>
                <p className="text-text-primary">{user.firstName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Last Name
                </label>
                <p className="text-text-primary">{user.lastName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Email Address
                </label>
                <p className="text-text-primary flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-accent-blue" />
                  {user.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Member Since
                </label>
                <p className="text-text-primary flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-accent-blue" />
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-6"
          >
            <h2 className="text-xl font-orbitron font-bold text-text-primary mb-6 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-accent-blue" />
              Account Settings
            </h2>
            <div className="space-y-4">
              <button 
                onClick={() => setIsChangePasswordModalOpen(true)}
                className="w-full text-left p-4 bg-accent-gray/30 hover:bg-accent-blue/30 hover:backdrop-blur-sm hover:border-accent-blue/50 border border-transparent hover:border-accent-blue/30 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20"
              >
                <h3 className="font-medium text-text-primary">Change Password</h3>
                <p className="text-sm text-text-secondary">Update your account password</p>
              </button>
              <button 
                onClick={() => setIsEmailModalOpen(true)}
                className="w-full text-left p-4 bg-accent-gray/30 hover:bg-accent-blue/30 hover:backdrop-blur-sm hover:border-accent-blue/50 border border-transparent hover:border-accent-blue/30 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20"
              >
                <h3 className="font-medium text-text-primary">Email Preferences</h3>
                <p className="text-sm text-text-secondary">Manage your email notifications</p>
              </button>
              <button 
                onClick={() => setIsPrivacyModalOpen(true)}
                className="w-full text-left p-4 bg-accent-gray/30 hover:bg-accent-blue/30 hover:backdrop-blur-sm hover:border-accent-blue/50 border border-transparent hover:border-accent-blue/30 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20"
              >
                <h3 className="font-medium text-text-primary">Privacy Settings</h3>
                <p className="text-sm text-text-secondary">Control your privacy and data</p>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Order History Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-6 mt-8"
        >
          <h2 className="text-xl font-orbitron font-bold text-text-primary mb-6">
            Order History
          </h2>
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-accent-gray rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-text-secondary" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">No orders yet</h3>
            <p className="text-text-secondary mb-6">
              Start shopping to see your order history here
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-gradient-neon hover:shadow-neon text-white rounded-lg transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        userId={user.id}
      />
      
      <EmailPreferencesModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
      
      <PrivacySettingsModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
}

