import React from 'react';
import { ClientProviders } from '@/components/layout/ClientProviders';

// Force dynamic rendering for the entire app
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ff9a9e" />
        <meta name="description" content="FlexFlow - Flexibility in Motion. Your all-in-one transportation platform." />
        <title>FlexFlow - Flexibility in Motion</title>
        
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Load fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Accessibility improvements - Updated for dark mode support */}
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
      </head>
      <body suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
        
        {/* Focus management script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Focus-visible polyfill for better keyboard navigation
              (function() {
                var hadKeyboardEvent = true;
                var keyboardThrottleId = null;
                
                function markKeyboardUsed() {
                  hadKeyboardEvent = true;
                  if (keyboardThrottleId) clearTimeout(keyboardThrottleId);
                  keyboardThrottleId = setTimeout(function() {
                    hadKeyboardEvent = false;
                  }, 100);
                }
                
                function markMouseUsed() {
                  hadKeyboardEvent = false;
                }
                
                document.addEventListener('keydown', markKeyboardUsed, true);
                document.addEventListener('mousedown', markMouseUsed, true);
                
                // Add focus-visible class to elements focused via keyboard
                document.addEventListener('focusin', function(e) {
                  if (hadKeyboardEvent || e.target.matches(':focus-visible')) {
                    e.target.classList.add('focus-visible');
                  }
                });
                
                document.addEventListener('focusout', function(e) {
                  e.target.classList.remove('focus-visible');
                });
              })();
            `,
          }}
        />
        
        {/* High contrast detection */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Detect and apply high contrast mode
              if (window.matchMedia('(prefers-contrast: high)').matches) {
                document.documentElement.classList.add('high-contrast');
              }
              
              // Listen for changes
              window.matchMedia('(prefers-contrast: high)').addEventListener('change', function(e) {
                if (e.matches) {
                  document.documentElement.classList.add('high-contrast');
                } else {
                  document.documentElement.classList.remove('high-contrast');
                }
              });
              
              // Detect and apply reduced motion
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.classList.add('reduce-motion');
              }
              
              window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function(e) {
                if (e.matches) {
                  document.documentElement.classList.add('reduce-motion');
                } else {
                  document.documentElement.classList.remove('reduce-motion');
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}