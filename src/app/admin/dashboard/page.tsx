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
  Shield
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  usersToday: number;
  usersThisWeek: number;
  usersThisMonth: number;
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
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      if (response.ok) {
        setStats(data.stats);
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
                <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-accent-blue" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">اليوم</p>
                <p className="text-3xl font-bold text-white">{stats.usersToday}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">هذا الأسبوع</p>
                <p className="text-3xl font-bold text-white">{stats.usersThisWeek}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">هذا الشهر</p>
                <p className="text-3xl font-bold text-white">{stats.usersThisMonth}</p>
              </div>
              <UserPlus className="w-8 h-8 text-purple-400" />
            </div>
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
