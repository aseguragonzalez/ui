import { createContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY_DEFAULT = 'ds-theme';

function applyTheme(theme: Theme, resolved: ResolvedTheme) {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', resolved);
  }
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEY_DEFAULT,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = (localStorage.getItem(storageKey) as Theme) ?? defaultTheme;
    return stored;
  });

  const [systemDark, setSystemDark] = useState<boolean>(
    () => typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
  );

  const resolvedTheme: ResolvedTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    applyTheme(theme, resolvedTheme);
  }, [theme, resolvedTheme]);

  // Listen for OS-level colour-scheme changes. handleSystemChange only calls
  // setSystemDark — it does not close over `theme` or `resolvedTheme`, so an
  // empty dependency array is correct here.
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    function handleSystemChange() {
      setSystemDark(mql.matches);
    }

    mql.addEventListener('change', handleSystemChange);
    return () => mql.removeEventListener('change', handleSystemChange);
  }, []);

  function setTheme(next: Theme) {
    localStorage.setItem(storageKey, next);
    setThemeState(next);
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.displayName = 'ThemeProvider';
