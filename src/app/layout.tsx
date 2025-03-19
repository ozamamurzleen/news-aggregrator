import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PreferencesProvider } from '@/context/preferences-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'News Aggregator',
  description: 'Aggregated news from multiple sources',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PreferencesProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </PreferencesProvider>
      </body>
    </html>
  );
}