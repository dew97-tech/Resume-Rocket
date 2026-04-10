import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiDroplet, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const {
    theme,
    toggleTheme,
    seedColor,
    setSeedColor,
    dynamicColor,
    setDynamicColor,
    presetColors,
  } = useTheme();

  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    }
    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPicker]);

  return (
    <div className="theme-controls">
      {/* Color Picker Button */}
      <div className="color-picker-wrap" ref={pickerRef}>
        <motion.button
          className="theme-toggle-btn"
          onClick={() => setShowPicker(!showPicker)}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          aria-label="Change accent color"
        >
          <FiDroplet size={18} />
        </motion.button>

        <AnimatePresence>
          {showPicker && (
            <motion.div
              className="color-picker-popover"
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="picker-header">
                <span className="picker-title">Accent Color</span>
                <label className="dynamic-toggle">
                  <input
                    type="checkbox"
                    checked={dynamicColor}
                    onChange={(e) => setDynamicColor(e.target.checked)}
                  />
                  <span className="dynamic-toggle-label">Dynamic</span>
                </label>
              </div>

              <div className="preset-swatches">
                {presetColors.map((color) => (
                  <button
                    key={color.hex}
                    className={`preset-swatch ${seedColor === color.hex ? 'active' : ''}`}
                    style={{ background: color.hex }}
                    onClick={() => {
                      setSeedColor(color.hex);
                      if (!dynamicColor) setDynamicColor(true);
                    }}
                    aria-label={`Set ${color.label} accent`}
                    title={color.label}
                  />
                ))}
              </div>

              <div className="custom-color-row">
                <label className="custom-color-label">Custom</label>
                <input
                  type="color"
                  value={seedColor}
                  onChange={(e) => {
                    setSeedColor(e.target.value);
                    if (!dynamicColor) setDynamicColor(true);
                  }}
                  className="custom-color-input"
                />
                <span className="custom-color-hex">{seedColor.toUpperCase()}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Toggle Button */}
      <motion.button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.1 }}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
        </motion.div>
      </motion.button>
    </div>
  );
}
