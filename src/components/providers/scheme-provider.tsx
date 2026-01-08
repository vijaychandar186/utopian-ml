'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const COOKIE_NAME = 'active_scheme';
const DEFAULT_SCHEME = 'default';

function setSchemeCookie(scheme: string) {
  if (typeof window === 'undefined') return;

  document.cookie = `${COOKIE_NAME}=${scheme}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`;
}

type SchemeContextType = {
  activeScheme: string;
  setActiveScheme: (scheme: string) => void;
  customColor: string;
  setCustomColor: (color: string) => void;
  customForeground: string;
  setCustomForeground: (color: string) => void;
};

const SchemeContext = createContext<SchemeContextType | undefined>(undefined);

export function ActiveSchemeProvider({
  children,
  activeSchemeValue,
  customColor: initialCustomColor,
  customForeground: initialCustomForeground
}: {
  children: ReactNode;
  activeSchemeValue?: string;
  customColor?: string;
  customForeground?: string;
}) {
  const [activeScheme, setActiveScheme] = useState<string>(() => {
    if (typeof window !== 'undefined' && !activeSchemeValue) {
      const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${COOKIE_NAME}=`))
        ?.split('=')[1];
      return cookieValue || DEFAULT_SCHEME;
    }
    return activeSchemeValue || DEFAULT_SCHEME;
  });

  const [customColor, setCustomColor] = useState<string>(
    initialCustomColor || '#000000'
  );
  const [customForeground, setCustomForeground] = useState<string>(
    initialCustomForeground || '#ffffff'
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    setSchemeCookie(activeScheme);

    Array.from(document.body.classList)
      .filter((className) => className.startsWith('scheme-'))
      .forEach((className) => {
        document.body.classList.remove(className);
      });
    document.body.classList.add(`scheme-${activeScheme}`);
    if (activeScheme.endsWith('-scaled')) {
      document.body.classList.add('scheme-scaled');
    } else {
      document.body.classList.remove('scheme-scaled');
    }

    if (activeScheme === 'custom' || activeScheme === 'custom-scaled') {
      document.documentElement.style.setProperty('--custom-color', customColor);
      document.documentElement.style.setProperty(
        '--custom-foreground',
        customForeground
      );
    }
  }, [activeScheme, customColor, customForeground, mounted]);

  if (!mounted && !activeSchemeValue) {
    return null;
  }

  return (
    <>
      {(activeScheme === 'custom' || activeScheme === 'custom-scaled') && (
        <style>
          {`:root {
            --custom-color: ${customColor};
            --custom-foreground: ${customForeground};
          }`}
        </style>
      )}
      <SchemeContext.Provider
        value={{
          activeScheme,
          setActiveScheme,
          customColor,
          setCustomColor,
          customForeground,
          setCustomForeground
        }}
      >
        {children}
      </SchemeContext.Provider>
    </>
  );
}

export function useSchemeConfig() {
  const context = useContext(SchemeContext);
  if (context === undefined) {
    throw new Error(
      'useSchemeConfig must be used within an ActiveSchemeProvider'
    );
  }
  return context;
}
