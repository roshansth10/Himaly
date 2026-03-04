import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

const THEME_KEY = 'nepal_tourism_theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, [theme]);

  const setLightTheme = useCallback(() => {
    setTheme('light');
    localStorage.setItem(THEME_KEY, 'light');
    document.documentElement.classList.remove('dark');
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme('dark');
    localStorage.setItem(THEME_KEY, 'dark');
    document.documentElement.classList.add('dark');
  }, []);

  return { theme, toggleTheme, setLightTheme, setDarkTheme, mounted };
}
