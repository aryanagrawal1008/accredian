import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Accredian Enterprise | Next-Gen Expertise For Your Enterprise',
  description:
    'Cultivate high-performance teams through expert learning. Accredian Enterprise delivers tailored corporate training programs with industry insights and expert guidance.',
  keywords: 'enterprise learning, corporate training, upskilling, L&D, Accredian',
  openGraph: {
    title: 'Accredian Enterprise | Next-Gen Expertise For Your Enterprise',
    description: 'Tailored Solutions. Industry Insights. Expert Guidance.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
