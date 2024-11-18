import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/config/site';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>
        <main className='h-screen flex flex-col justify-center items-center'>
          <Navbar />
          {children}
        </main>
        <Toaster />
        </Provider>
      </body>
    </html>
  );
}
