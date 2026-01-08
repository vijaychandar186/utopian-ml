import type { Metadata } from 'next';
import { fontVariables } from '@/lib/font';
import { cookies } from 'next/headers';
import './globals.css';
import './scheme.css';
import Provider from '@/components/providers/Provider';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

export const metadata: Metadata = {
  title: 'Vijay Chandar | Portfolio',
  description: 'Home page'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('theme')?.value;
  const activeSchemeValue = cookieStore.get('active_scheme')?.value;
  const customColor = cookieStore.get('custom_color')?.value;
  const customForeground = cookieStore.get('custom_foreground')?.value;
  const isScaled = activeSchemeValue?.endsWith('-scaled') || false;

  const bodyClasses = [
    fontVariables,
    'overflow-hidden',
    'overscroll-none',
    'antialiased',
    activeThemeValue ? `theme-${activeThemeValue}` : '',
    activeSchemeValue ? `scheme-${activeSchemeValue}` : '',
    isScaled ? 'scheme-scaled' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='theme-color' content={META_THEME_COLORS.light} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}');
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body className={bodyClasses}>
        <Provider
          activeThemeValue={activeThemeValue}
          activeSchemeValue={activeSchemeValue}
          customColor={customColor}
          customForeground={customForeground}
        >
          {children}
        </Provider>
      </body>
    </html>
  );
}
