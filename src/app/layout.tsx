import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Load Geist Sans font, assign CSS variable for usage in CSS
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: '400', // default weight, adjust if needed
});

// Load Geist Mono font, assign CSS variable
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: '400',
});

// Metadata for SEO and page info
export const metadata: Metadata = {
  title: 'Chambers of the Mind',
  description: 'A surreal psychological narrative game inside the Mind Palace',
};

/**
 * RootLayout wraps the entire app with html and body tags.
 * - Injects Geist fonts CSS variables for global use
 * - Applies antialiasing for smoother text rendering
 * - Wraps all child pages/components
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
