'use client';

import { Inter, Poppins, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'styled-components';
import { adminTheme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { AuthProvider } from '@/modules/authentication/context/AuthContext';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <title>FlexFlow Admin Dashboard</title>
        <meta name="description" content="FlexFlow Platform Administration - Authority & Control" />
        <meta name="keywords" content="FlexFlow, Admin, Dashboard, Transport, Management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FlexFlow Admin" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={adminTheme}>
            <GlobalStyles />
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}