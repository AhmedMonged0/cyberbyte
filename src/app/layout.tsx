import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout/Layout';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CyberByte - Premium Computer Products',
  description: 'Your premier destination for cutting-edge computer products. We deliver the latest technology with unmatched quality and service.',
  keywords: 'laptops, gaming, computers, accessories, components, technology',
  authors: [{ name: 'CyberByte Team' }],
  openGraph: {
    title: 'CyberByte - Premium Computer Products',
    description: 'Your premier destination for cutting-edge computer products.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CyberByte - Premium Computer Products',
    description: 'Your premier destination for cutting-edge computer products.',
  },
  other: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            html {
              background-color: #0a0a0a !important;
              color: #ffffff !important;
            }
          `
        }} />
      </head>
      <body className={`${inter.className} bg-primary-black text-text-primary`}>
        <AuthProvider>
          <CartProvider>
            <Layout>
              {children}
            </Layout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}