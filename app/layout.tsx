'use client';
// import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata: Metadata = {
//   title: 'Student Dashboard',
//   description: 'Coded by Prince Ceejay, inspired by UNN PORTAL',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col overflow-x-hidden'>
        <ClerkProvider>
          <Navbar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <main className='flex w-full'>
            {isOpen && (
              <aside className='mt-4 min-w-screen md:min-w-64'>
                <Sidebar />
              </aside>
            )}
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
