'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Shield,
  Truck,
  Headphones
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
    categories: [
      { name: 'Laptops', href: '/products?category=laptops' },
      { name: 'Gaming PCs', href: '/products?category=gaming' },
      { name: 'Accessories', href: '/products?category=accessories' },
      { name: 'Components', href: '/products?category=components' },
    ],
  };

  const features = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $99' },
    { icon: Shield, title: 'Secure Payment', description: '100% secure checkout' },
    { icon: Headphones, title: '24/7 Support', description: 'Expert customer service' },
    { icon: CreditCard, title: 'Easy Returns', description: '30-day return policy' },
  ];

  return (
    <footer className="bg-primary-black-secondary border-t border-accent-gray">
      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-text-secondary text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 border-t border-accent-gray">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg flex items-center justify-center">
                  <span className="text-white font-orbitron font-bold text-xl">B</span>
                </div>
                <span className="text-2xl font-orbitron font-bold neon-text">
                  CyberByte
                </span>
              </Link>
              <p className="text-text-secondary mb-6 max-w-md">
                Your premier destination for cutting-edge computer products. 
                We deliver the latest technology with unmatched quality and service.
              </p>
              
              {/* Developer Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-neon rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AM</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Ahmed Monged</p>
                    <p className="text-text-secondary text-sm">Full Stack Developer</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-text-secondary">
                    <Mail className="w-4 h-4" />
                    <span>ahmdmnjd806@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-text-secondary">
                    <Phone className="w-4 h-4" />
                    <span>+201003061972</span>
                  </div>
                  <div className="flex items-center space-x-3 text-text-secondary">
                    <MapPin className="w-4 h-4" />
                    <span>Cairo, Egypt</span>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div className="flex items-center space-x-3">
                  <motion.a
                    whileHover={{ scale: 1.2, y: -2 }}
                    href="https://www.facebook.com/ahmed.monged.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-accent-gray rounded-lg hover:bg-blue-500/20 transition-colors duration-300"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4 text-blue-400" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, y: -2 }}
                    href="https://wa.me/201148220836"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-accent-gray rounded-lg hover:bg-green-500/20 transition-colors duration-300"
                    title="WhatsApp"
                  >
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, y: -2 }}
                    href="https://www.instagram.com/ahmed_monged"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-accent-gray rounded-lg hover:bg-pink-500/20 transition-colors duration-300"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4 text-pink-400" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-accent-blue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-accent-blue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-accent-blue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-8 border-t border-accent-gray">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-white">Stay Updated</h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for the latest tech news and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-accent-gray border border-accent-blue/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all duration-300"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>


      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-6 border-t border-accent-gray">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-text-secondary text-sm mb-2">
              © {currentYear} CyberByte. All rights reserved.
            </p>
            <p className="text-text-secondary text-xs">
              Developed by <span className="text-accent-blue font-semibold">Ahmed Monged</span>
            </p>
          </motion.div>


          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-text-secondary hover:text-accent-blue transition-colors duration-300 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
