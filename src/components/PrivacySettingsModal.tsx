'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, Eye, Lock, Database } from 'lucide-react'
import toast from 'react-hot-toast'

interface PrivacySettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacySettingsModal({ isOpen, onClose }: PrivacySettingsModalProps) {
  const [settings, setSettings] = useState({
    profileVisibility: 'private',
    dataSharing: false,
    analytics: true,
    marketing: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = (key: keyof typeof settings) => {
    if (key === 'profileVisibility') return
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleProfileVisibilityChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      profileVisibility: value
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Privacy settings updated successfully!')
      onClose()
    } catch (error) {
      toast.error('Failed to update privacy settings')
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
                  <Shield className="w-5 h-5 text-accent-blue" />
                </div>
                <h2 className="text-xl font-orbitron font-bold text-text-primary">
                  Privacy Settings
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
                {/* Profile Visibility */}
                <div className="p-4 bg-bg-secondary/30 rounded-lg border border-accent-blue/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <Eye className="w-5 h-5 text-accent-blue" />
                    <div>
                      <h3 className="font-medium text-text-primary">Profile Visibility</h3>
                      <p className="text-sm text-text-secondary">Who can see your profile</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="public"
                        checked={settings.profileVisibility === 'public'}
                        onChange={(e) => handleProfileVisibilityChange(e.target.value)}
                        className="text-accent-blue focus:ring-accent-blue"
                      />
                      <span className="text-text-primary">Public - Everyone can see</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="private"
                        checked={settings.profileVisibility === 'private'}
                        onChange={(e) => handleProfileVisibilityChange(e.target.value)}
                        className="text-accent-blue focus:ring-accent-blue"
                      />
                      <span className="text-text-primary">Private - Only you can see</span>
                    </label>
                  </div>
                </div>

                {/* Data Sharing */}
                <div className="flex items-center justify-between p-4 bg-bg-secondary/30 rounded-lg border border-accent-blue/20">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-accent-blue" />
                    <div>
                      <h3 className="font-medium text-text-primary">Data Sharing</h3>
                      <p className="text-sm text-text-secondary">Share data for improvements</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('dataSharing')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      settings.dataSharing ? 'bg-accent-blue' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        settings.dataSharing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between p-4 bg-bg-secondary/30 rounded-lg border border-accent-blue/20">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-accent-blue" />
                    <div>
                      <h3 className="font-medium text-text-primary">Analytics</h3>
                      <p className="text-sm text-text-secondary">Help us improve the service</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('analytics')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      settings.analytics ? 'bg-accent-blue' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        settings.analytics ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between p-4 bg-bg-secondary/30 rounded-lg border border-accent-blue/20">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-accent-blue" />
                    <div>
                      <h3 className="font-medium text-text-primary">Marketing</h3>
                      <p className="text-sm text-text-secondary">Receive marketing communications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('marketing')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      settings.marketing ? 'bg-accent-blue' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        settings.marketing ? 'translate-x-6' : 'translate-x-1'
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
                  {isLoading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
