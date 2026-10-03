import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext();

export const NEO_PRESETS = [
  { id: 'yellow', label: 'Cyber Yellow', hex: '#FFE600', text: '#000000' },
  { id: 'cyan', label: 'Electric Mint', hex: '#00F0FF', text: '#000000' },
  { id: 'pink', label: 'Bubblegum Pink', hex: '#FF66C4', text: '#000000' },
  { id: 'lime', label: 'Neo Lime', hex: '#A3E635', text: '#000000' },
  { id: 'orange', label: 'Vivid Tangerine', hex: '#FB923C', text: '#000000' },
  { id: 'purple', label: 'Retro Lilac', hex: '#C4B5FD', text: '#000000' },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('rf-theme') || 'light';
  });

  const [seedColor, setSeedColor] = useState(() => {
    return localStorage.getItem('rf-seed-color') || '#FFE600';
  });

  const isDark = theme === 'dark';

  const currentPreset = useMemo(() => {
    return NEO_PRESETS.find(p => p.hex.toLowerCase() === seedColor.toLowerCase()) || NEO_PRESETS[0];
  }, [seedColor]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.setProperty('--neo-primary', currentPreset.hex);
    root.style.setProperty('--neo-primary-fg', currentPreset.text);
    root.style.setProperty('--accent', currentPreset.hex);
    root.style.setProperty('--md-sys-color-primary', currentPreset.hex);
    root.style.setProperty('--md-sys-color-on-primary', currentPreset.text);
    root.style.setProperty('--gradient-start', currentPreset.hex);

    localStorage.setItem('rf-theme', theme);
    localStorage.setItem('rf-seed-color', seedColor);
  }, [theme, seedColor, currentPreset]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark,
      toggleTheme,
      seedColor,
      setSeedColor,
      currentPreset,
      presetColors: NEO_PRESETS,
      dynamicColor: true,
      setDynamicColor: () => {},
    }),
    [theme, isDark, toggleTheme, seedColor, currentPreset]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
