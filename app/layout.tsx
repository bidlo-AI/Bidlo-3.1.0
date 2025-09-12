import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { ConvexClientProvider } from '@/features/layout/providers/ConvexClientProvider';
import { ThemeSubscription } from '@/features/layout/components/theme/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export const metadata: Metadata = {
  title: 'Bidlo',
  description: 'AI bidding and analytics for civil and public works contractors',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased flex min-h-screen">
        <ConvexClientProvider expectAuth>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem={false}>
            <NuqsAdapter>
              {children}
              <Toaster position="top-center" />
              <ThemeSubscription />
            </NuqsAdapter>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
