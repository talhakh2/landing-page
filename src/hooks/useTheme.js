import { useCallback, useEffect, useState } from 'react';

const KEY = 'af-theme';

function read() {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored) return stored;
  } catch {}
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

/** Theme lives on <html data-theme>, so CSS and the 3D scene read the same source. */
export function useTheme() {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(KEY, theme);
    } catch {}
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return [theme, toggle];
}
