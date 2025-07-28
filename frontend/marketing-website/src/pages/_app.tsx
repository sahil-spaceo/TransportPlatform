import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { DefaultSeo } from 'next-seo';
import { marketingTheme } from '@/styles/theme';
import GlobalStyles from '@/styles/GlobalStyles';
import { seoConfig } from '@/utils/seo';
import PerformanceMonitor from '@/components/analytics/PerformanceMonitor';
import PerformanceDashboard from '@/components/analytics/PerformanceDashboard';

// Font imports for typography system
import { Inter, Poppins, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <DefaultSeo {...seoConfig} />
      <PerformanceMonitor 
        measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
        enabled={process.env.NODE_ENV === 'production'}
      />
      <ThemeProvider theme={marketingTheme}>
        <GlobalStyles />
        <Component {...pageProps} />
        {process.env.NODE_ENV === 'development' && <PerformanceDashboard />}
      </ThemeProvider>
    </div>
  );
}