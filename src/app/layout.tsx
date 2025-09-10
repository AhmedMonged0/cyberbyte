import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout/Layout';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}