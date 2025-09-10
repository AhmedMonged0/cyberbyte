'use client';

import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Globe, 
  Zap, 
  Shield, 
  Heart,
  Target,
  Lightbulb,
  Rocket,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Globe, value: "100+", label: "Countries Served" },
    { icon: Award, value: "4.9/5", label: "Customer Rating" },
    { icon: Zap, value: "24/7", label: "Support Available" }
  ];

  const timeline = [
    {
      year: "2020",
      title: "CyberByte Founded",
      description: "Started as a small tech startup with a vision to revolutionize computer retail.",
      icon: Rocket
    },
    {
      year: "2021",
      title: "First 1000 Customers",
      description: "Reached our first major milestone with 1000 satisfied customers worldwide.",
      icon: Target
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded our services to over 50 countries with localized support.",
      icon: Globe
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Introduced AI-powered product recommendations and customer support.",
      icon: Lightbulb
    },
    {
      year: "2024",
      title: "Future Vision",
      description: "Continuing to innovate with cutting-edge technology and exceptional service.",
      icon: TrendingUp
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous testing to ensure the highest quality standards.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. Your satisfaction is our priority.",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We constantly push boundaries to bring you the latest and greatest technology.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving customers worldwide with fast, reliable shipping and local support.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "/api/placeholder/200/200",
      description: "Tech visionary with 15+ years in computer hardware industry."
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "/api/placeholder/200/200",
      description: "Expert in AI and machine learning, driving our tech innovation."
    },
    {
      name: "Mike Rodriguez",
      role: "Head of Operations",
      image: "/api/placeholder/200/200",
      description: "Ensuring smooth operations and exceptional customer experience."
    },
    {
      name: "Emily Davis",
      role: "Head of Design",
      image: "/api/placeholder/200/200",
      description: "Creating beautiful, user-friendly experiences for our customers."
    }
  ];

  return (
    <div className="min-h-screen bg-primary-black">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-black to-primary-black-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-orbitron font-bold mb-6">
              <span className="text-white">About</span>
              <br />
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                CyberByte
              </span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              We&apos;re passionate about technology and committed to bringing you the best 
              computer products and services. Our mission is to make cutting-edge technology 
              accessible to everyone, everywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-accent-gray/20 to-primary-black-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-orbitron font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                To democratize access to cutting-edge technology by providing high-quality 
                computer products at competitive prices, backed by exceptional customer service 
                and innovative solutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent-blue" />
                  <span className="text-white">Premium quality products</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent-blue" />
                  <span className="text-white">Global shipping and support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent-blue" />
                  <span className="text-white">Innovative technology solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent-blue" />
                  <span className="text-white">Customer-first approach</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-2xl overflow-hidden border border-accent-blue/30">
                <div className="w-full h-full bg-gradient-to-br from-accent-gray to-primary-black-secondary flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
                      <span className="text-4xl font-orbitron font-bold">B</span>
                    </div>
                    <p className="text-text-secondary">Mission Visualization</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg flex items-center justify-center text-white font-bold text-sm"
              >
                <Star className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-orbitron font-bold text-white mb-6">
              Our Journey
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              From a small startup to a global leader in computer technology retail.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent-blue to-accent-purple"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="glass-effect rounded-2xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-accent-blue">{item.year}</div>
                          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-text-secondary">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center relative z-10">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-accent-gray/20 to-primary-black-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-orbitron font-bold text-white mb-6">
              Our Values
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-text-secondary">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-orbitron font-bold text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              The passionate individuals behind CyberByte&apos;s success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-accent-gray to-primary-black-secondary rounded-full overflow-hidden border border-accent-blue/30 group-hover:border-accent-blue transition-colors duration-300">
                    <div className="w-full h-full bg-gradient-to-br from-accent-gray to-primary-black-secondary flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center">
                          <span className="text-2xl font-orbitron font-bold text-white">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary">Photo</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <div className="text-accent-blue font-medium mb-3">{member.role}</div>
                <p className="text-text-secondary text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-orbitron font-bold text-white mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Join thousands of satisfied customers who trust CyberByte for their technology needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
              >
                Shop Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-effect border border-accent-blue/30 text-white font-semibold rounded-lg hover:border-accent-blue transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
