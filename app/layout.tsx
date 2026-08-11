import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/context';

export const metadata: Metadata = {
  title: 'AgriVision | AI-Powered Intelligence for Smarter Farming',
  description: 'AgriVision connects farm location, soil pH, crop health, satellite weather, disease image recognition, and mandi prices into actionable decisions for Indian farmers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-forest-200 selection:text-forest-900">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
