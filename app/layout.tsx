import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { UISync } from '@/features/layout/ui-sync';
import { ConvexClientProvider } from '@/components/ConvexClientProvider';

export const metadata: Metadata = {
  title: 'Bidlo',
  description: 'AI bidding and analytics for civil and public works contractors',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        <ConvexClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
            <Toaster position="top-center" />
            <UISync />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
