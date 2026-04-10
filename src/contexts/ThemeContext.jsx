import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  argbFromHex,
  hexFromArgb,
  Hct,
  SchemeTonalSpot,
  MaterialDynamicColors,
} from '@material/material-color-utilities';

const ThemeContext = createContext();

const PRESET_COLORS = [
  { label: 'Purple', hex: '#6750A4' },
  { label: 'Blue', hex: '#0061A4' },
  { label: 'Teal', hex: '#006A6A' },
  { label: 'Green', hex: '#386A20' },
  { label: 'Orange', hex: '#8B5000' },
  { label: 'Red', hex: '#BA1A1A' },
  { label: 'Pink', hex: '#984061' },
  { label: 'Indigo', hex: '#4355B9' },
];

function generateScheme(seedHex, isDark) {
  const sourceColor = Hct.fromInt(argbFromHex(seedHex));
  const scheme = new SchemeTonalSpot(sourceColor, isDark, 0.0);
  const colors = new MaterialDynamicColors();

  return {
    primary: hexFromArgb(colors.primary().getArgb(scheme)),
    onPrimary: hexFromArgb(colors.onPrimary().getArgb(scheme)),
    primaryContainer: hexFromArgb(colors.primaryContainer().getArgb(scheme)),
    onPrimaryContainer: hexFromArgb(colors.onPrimaryContainer().getArgb(scheme)),

    secondary: hexFromArgb(colors.secondary().getArgb(scheme)),
    onSecondary: hexFromArgb(colors.onSecondary().getArgb(scheme)),
    secondaryContainer: hexFromArgb(colors.secondaryContainer().getArgb(scheme)),
    onSecondaryContainer: hexFromArgb(colors.onSecondaryContainer().getArgb(scheme)),

    tertiary: hexFromArgb(colors.tertiary().getArgb(scheme)),
    onTertiary: hexFromArgb(colors.onTertiary().getArgb(scheme)),
    tertiaryContainer: hexFromArgb(colors.tertiaryContainer().getArgb(scheme)),
    onTertiaryContainer: hexFromArgb(colors.onTertiaryContainer().getArgb(scheme)),

    error: hexFromArgb(colors.error().getArgb(scheme)),
    onError: hexFromArgb(colors.onError().getArgb(scheme)),
    errorContainer: hexFromArgb(colors.errorContainer().getArgb(scheme)),
    onErrorContainer: hexFromArgb(colors.onErrorContainer().getArgb(scheme)),

    surface: hexFromArgb(colors.surface().getArgb(scheme)),
    onSurface: hexFromArgb(colors.onSurface().getArgb(scheme)),
    onSurfaceVariant: hexFromArgb(colors.onSurfaceVariant().getArgb(scheme)),

    surfaceDim: hexFromArgb(colors.surfaceDim().getArgb(scheme)),
    surfaceBright: hexFromArgb(colors.surfaceBright().getArgb(scheme)),
    surfaceContainerLowest: hexFromArgb(colors.surfaceContainerLowest().getArgb(scheme)),
    surfaceContainerLow: hexFromArgb(colors.surfaceContainerLow().getArgb(scheme)),
    surfaceContainer: hexFromArgb(colors.surfaceContainer().getArgb(scheme)),
    surfaceContainerHigh: hexFromArgb(colors.surfaceContainerHigh().getArgb(scheme)),
    surfaceContainerHighest: hexFromArgb(colors.surfaceContainerHighest().getArgb(scheme)),

    inverseSurface: hexFromArgb(colors.inverseSurface().getArgb(scheme)),
    inverseOnSurface: hexFromArgb(colors.inverseOnSurface().getArgb(scheme)),
    inversePrimary: hexFromArgb(colors.inversePrimary().getArgb(scheme)),

    outline: hexFromArgb(colors.outline().getArgb(scheme)),
    outlineVariant: hexFromArgb(colors.outlineVariant().getArgb(scheme)),

    shadow: hexFromArgb(colors.shadow().getArgb(scheme)),
    scrim: hexFromArgb(colors.scrim().getArgb(scheme)),
  };
}

function applySchemeToDOM(scheme, isDark) {
  const root = document.documentElement;

  const tokenMap = {
    '--md-sys-color-primary': scheme.primary,
    '--md-sys-color-on-primary': scheme.onPrimary,
    '--md-sys-color-primary-container': scheme.primaryContainer,
    '--md-sys-color-on-primary-container': scheme.onPrimaryContainer,
    '--md-sys-color-secondary': scheme.secondary,
    '--md-sys-color-on-secondary': scheme.onSecondary,
    '--md-sys-color-secondary-container': scheme.secondaryContainer,
    '--md-sys-color-on-secondary-container': scheme.onSecondaryContainer,
    '--md-sys-color-tertiary': scheme.tertiary,
    '--md-sys-color-on-tertiary': scheme.onTertiary,
    '--md-sys-color-tertiary-container': scheme.tertiaryContainer,
    '--md-sys-color-on-tertiary-container': scheme.onTertiaryContainer,
    '--md-sys-color-error': scheme.error,
    '--md-sys-color-on-error': scheme.onError,
    '--md-sys-color-error-container': scheme.errorContainer,
    '--md-sys-color-on-error-container': scheme.onErrorContainer,
    '--md-sys-color-surface': scheme.surface,
    '--md-sys-color-on-surface': scheme.onSurface,
    '--md-sys-color-on-surface-variant': scheme.onSurfaceVariant,
    '--md-sys-color-surface-dim': scheme.surfaceDim,
    '--md-sys-color-surface-bright': scheme.surfaceBright,
    '--md-sys-color-surface-container-lowest': scheme.surfaceContainerLowest,
    '--md-sys-color-surface-container-low': scheme.surfaceContainerLow,
    '--md-sys-color-surface-container': scheme.surfaceContainer,
    '--md-sys-color-surface-container-high': scheme.surfaceContainerHigh,
    '--md-sys-color-surface-container-highest': scheme.surfaceContainerHighest,
    '--md-sys-color-inverse-surface': scheme.inverseSurface,
    '--md-sys-color-inverse-on-surface': scheme.inverseOnSurface,
    '--md-sys-color-inverse-primary': scheme.inversePrimary,
    '--md-sys-color-outline': scheme.outline,
    '--md-sys-color-outline-variant': scheme.outlineVariant,
    '--md-sys-color-shadow': scheme.shadow,
    '--md-sys-color-scrim': scheme.scrim,
  };

  Object.entries(tokenMap).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });

  // Update backward-compat aliases that depend on dynamic values
  const r = parseInt(scheme.primary.slice(1, 3), 16);
  const g = parseInt(scheme.primary.slice(3, 5), 16);
  const b = parseInt(scheme.primary.slice(5, 7), 16);
  root.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, ${isDark ? 0.25 : 0.18})`);

  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('rf-theme') || 'dark';
  });

  const [seedColor, setSeedColor] = useState(() => {
    return localStorage.getItem('rf-seed-color') || '#6750A4';
  });

  const [dynamicColor, setDynamicColor] = useState(() => {
    return localStorage.getItem('rf-dynamic-color') !== 'false';
  });

  const isDark = theme === 'dark';

  const scheme = useMemo(() => {
    if (!dynamicColor) return null;
    return generateScheme(seedColor, isDark);
  }, [seedColor, isDark, dynamicColor]);

  useEffect(() => {
    if (dynamicColor && scheme) {
      applySchemeToDOM(scheme, isDark);
    } else {
      // Remove inline styles so CSS token defaults take over
      const root = document.documentElement;
      root.removeAttribute('style');
      root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
    localStorage.setItem('rf-theme', theme);
    localStorage.setItem('rf-seed-color', seedColor);
    localStorage.setItem('rf-dynamic-color', String(dynamicColor));
  }, [scheme, isDark, dynamicColor, theme, seedColor]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const value = useMemo(() => ({
    theme,
    toggleTheme,
    seedColor,
    setSeedColor,
    dynamicColor,
    setDynamicColor,
    presetColors: PRESET_COLORS,
  }), [theme, toggleTheme, seedColor, dynamicColor]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
