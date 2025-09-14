'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  TrendingUp,
  Search,
  Eye,
  LogOut,
  ArrowLeft,
  Shield,
  Package,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Settings,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

interface Stats {
  users: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    recent: User[];
  };
  products: {
    total: number;
    active: number;
    outOfStock: number;
    featured: number;
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
    totalRevenue: number;
  };
  charts: {
    dailyRegistrations: Array<{ date: string; users: number }>;
    monthlyRevenue: Array<{ month: string; revenue: number }>;
    orderStatusDistribution: Array<{ status: string; _count: { status: number } }>;
  };
  topProducts: Array<{
    id: string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
  }>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('admin_token');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }

    fetchStats();
    fetchUsers();
  }, [router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/advanced-stats');
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/users?page=${currentPage}&search=${searchTerm}`);
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    toast.success('تم تسجيل الخروج بنجاح');
    router.push('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-primary-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-b border-red-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="inline-flex items-center text-text-secondary hover:text-accent-blue transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                العودة للموقع
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-red-400" />
                <h1 className="text-2xl font-orbitron font-bold text-white">لوحة الإدارة</h1>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex space-x-4 mb-8"
        >
          <Link href="/admin/dashboard" className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg">
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="px-4 py-2 text-text-secondary hover:text-accent-blue transition-colors">
            <Package className="w-4 h-4 inline mr-2" />
            Products
          </Link>
          <Link href="/admin/orders" className="px-4 py-2 text-text-secondary hover:text-accent-blue transition-colors">
            <ShoppingCart className="w-4 h-4 inline mr-2" />
            Orders
          </Link>
          <Link href="/admin/users" className="px-4 py-2 text-text-secondary hover:text-accent-blue transition-colors">
            <Users className="w-4 h-4 inline mr-2" />
            Users
          </Link>
          <Link href="/admin/settings" className="px-4 py-2 text-text-secondary hover:text-accent-blue transition-colors">
            <Settings className="w-4 h-4 inline mr-2" />
            Settings
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">إجمالي المستخدمين</p>
                <p className="text-3xl font-bold text-white">{stats.users.total}</p>
                <p className="text-xs text-green-400">+{stats.users.today} اليوم</p>
              </div>
              <Users className="w-8 h-8 text-accent-blue" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">المنتجات</p>
                <p className="text-3xl font-bold text-white">{stats.products.total}</p>
                <p className="text-xs text-yellow-400">{stats.products.outOfStock} نفدت</p>
              </div>
              <Package className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">الطلبات</p>
                <p className="text-3xl font-bold text-white">{stats.orders.total}</p>
                <p className="text-xs text-red-400">{stats.orders.pending} في الانتظار</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">الإيرادات</p>
                <p className="text-3xl font-bold text-white">${stats.orders.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-400">إجمالي المبيعات</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Daily Registrations Chart */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">تسجيل المستخدمين اليومي</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.charts.dailyRegistrations}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">الإيرادات الشهرية</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.charts.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey="revenue" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">أفضل المنتجات</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.topProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-3 p-3 bg-accent-gray/20 rounded-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{product.name}</h4>
                  <p className="text-text-secondary text-xs">${product.price}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-text-secondary text-xs">({product.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-orbitron font-bold text-white">المستخدمين</h2>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="البحث في المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-accent-gray/50 border border-accent-gray rounded-lg text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-text-secondary">جاري تحميل المستخدمين...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-accent-gray">
                    <th className="text-right py-3 px-4 text-text-secondary font-medium">الاسم</th>
                    <th className="text-right py-3 px-4 text-text-secondary font-medium">البريد الإلكتروني</th>
                    <th className="text-right py-3 px-4 text-text-secondary font-medium">تاريخ التسجيل</th>
                    <th className="text-right py-3 px-4 text-text-secondary font-medium">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-accent-gray/50 hover:bg-accent-gray/20 transition-colors">
                      <td className="py-3 px-4 text-white">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {user.email}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-accent-blue hover:text-accent-purple transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
