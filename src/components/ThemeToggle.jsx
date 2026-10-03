import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiDroplet, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const {
    theme,
    toggleTheme,
    seedColor,
    setSeedColor,
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
      {/* Accent Color Popover */}
      <div className="color-picker-wrap" ref={pickerRef}>
        <button
          className="neo-icon-btn"
          onClick={() => setShowPicker(!showPicker)}
          aria-label="Change neo theme color"
          title="Change theme color"
        >
          <FiDroplet size={18} />
          <span className="neo-swatch-indicator" style={{ background: seedColor }} />
        </button>

        <AnimatePresence>
          {showPicker && (
            <motion.div
              className="neo-popover"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              <div className="neo-popover-header">
                <span className="neo-popover-title">NEO ACCENT PALETTE</span>
              </div>

              <div className="neo-swatches-grid">
                {presetColors.map((color) => {
                  const isSelected = seedColor.toLowerCase() === color.hex.toLowerCase();
                  return (
                    <button
                      key={color.id}
                      className={`neo-swatch-tile ${isSelected ? 'selected' : ''}`}
                      style={{ background: color.hex }}
                      onClick={() => {
                        setSeedColor(color.hex);
                        setShowPicker(false);
                      }}
                      title={color.label}
                    >
                      {isSelected && <FiCheck size={18} color="#000000" strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dark / Light Toggle */}
      <button
        className="neo-icon-btn"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Toggle to ${theme === 'dark' ? 'Light (Paper)' : 'Dark (Cyber)'} mode`}
      >
        {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
      </button>
    </div>
  );
}
