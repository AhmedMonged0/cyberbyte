'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Bell, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

interface EmailPreferencesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EmailPreferencesModal({ isOpen, onClose }: EmailPreferencesModalProps) {
  console.log('EmailPreferencesModal rendered, isOpen:', isOpen);
  
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    promotions: false,
    securityAlerts: true,
    newsletter: true
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Email preferences updated successfully!')
      onClose()
    } catch {
      toast.error('Failed to update preferences')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-bg-primary rounded-xl shadow-2xl border border-accent-blue/50 shadow-accent-blue/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-accent-blue/20 bg-accent-blue/5">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent-blue/20 rounded-lg">
                  <Mail className="w-5 h-5 text-accent-blue" />
                </div>
                <h2 className="text-xl font-orbitron font-bold text-text-primary">
                  Email Preferences
                </h2>
              </div>
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="p-2 hover:bg-accent-gray/20 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                {/* Order Updates */}
                <div className="flex items-center justify-between p-4 bg-bg-secondary/30 rounded-lg border border-accent-blue/20">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-accent-blue" />
                    <div>
                      <h3 className="font-medium text-text-primary">Order Updates</h3>
                      <p className="text-sm text-text-secondary">Get notified about your orders</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('orderUpdates')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      preferences.orderUpdates ? 'bg-accent-blue' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        preferences.orderUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Promotions */}
                <div className="flex items-center justify-between p-4 bg-bg-secondary/30 rounded-lg border border-accent-blue/20">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-accent-blue" />
                    <div>
                      <h3 className="font-medium text-text-primary">Promotions</h3>
                      <p className="text-sm text-text-secondary">Receive promotional emails</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('promotions')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      preferences.promotions ? 'bg-accent-blue' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        preferences.promotions ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Security Alerts */}
                <div className="flex items-center justify-between p-4 bg-bg-secondary/30 rounded-lg border border-accent-blue/20">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-accent-blue" />
                    <div>
                      <h3 className="font-medium text-text-primary">Security Alerts</h3>
                      <p className="text-sm text-text-secondary">Important security notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('securityAlerts')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      preferences.securityAlerts ? 'bg-accent-blue' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        preferences.securityAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Newsletter */}
                <div className="flex items-center justify-between p-4 bg-bg-secondary/30 rounded-lg border border-accent-blue/20">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-accent-blue" />
                    <div>
                      <h3 className="font-medium text-text-primary">Newsletter</h3>
                      <p className="text-sm text-text-secondary">Weekly tech updates and news</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('newsletter')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      preferences.newsletter ? 'bg-accent-blue' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        preferences.newsletter ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-accent-gray/50 backdrop-blur-sm hover:bg-accent-gray/70 text-text-primary rounded-lg font-medium transition-all duration-200 disabled:opacity-50 border border-accent-gray/30"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-accent-blue/80 backdrop-blur-sm hover:bg-accent-blue text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent-blue/20"
                >
                  {isLoading ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
