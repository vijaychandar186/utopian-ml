import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function ThemeProvider({
  children,
  activeThemeValue
}: {
  children: React.ReactNode;
  activeThemeValue?: string;
}) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      forcedTheme={activeThemeValue}
    >
      {children}
    </NextThemesProvider>
  );
}
