import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useState } from 'react';
import { FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';
const ToastContext = createContext();
export function ToastProvider({
  children
}) {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, {
      id,
      message,
      type
    }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);
  const toast = {
    success: msg => addToast(msg, 'success'),
    error: msg => addToast(msg, 'error'),
    info: msg => addToast(msg, 'info')
  };
  return <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map(t => <motion.div key={t.id} className={`toast toast-${t.type}`} initial={{
          opacity: 0,
          x: 80,
          scale: 0.9
        }} animate={{
          opacity: 1,
          x: 0,
          scale: 1
        }} exit={{
          opacity: 0,
          x: 80,
          scale: 0.9
        }} transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30
        }}>
              {t.type === 'success' && <FiCheckCircle size={18} />}
              {t.type === 'error' && <FiXCircle size={18} />}
              {t.type === 'info' && <FiInfo size={18} />}
              {t.message}
            </motion.div>)}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>;
}
export const useToast = () => useContext(ToastContext);