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

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY_DEFAULT = 'ds-theme';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

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
    const resolved: ResolvedTheme = stored === 'system' ? getSystemTheme() : (stored as ResolvedTheme);
    applyTheme(stored, resolved);
    return stored;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    theme === 'system' ? getSystemTheme() : theme,
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    function resolve(t: Theme): ResolvedTheme {
      return t === 'system' ? (mql.matches ? 'dark' : 'light') : t;
    }

    const resolved = resolve(theme);
    setResolvedTheme(resolved);
    applyTheme(theme, resolved);

    function handleSystemChange() {
      if (theme === 'system') {
        const next = mql.matches ? 'dark' : ('light' as ResolvedTheme);
        setResolvedTheme(next);
        applyTheme('system', next);
      }
    }

    mql.addEventListener('change', handleSystemChange);
    return () => mql.removeEventListener('change', handleSystemChange);
  }, [theme]);

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
