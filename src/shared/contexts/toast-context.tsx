// components/ToastProvider.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import { ErrorIcon } from '../components/icons/ErrorIcon';
import { CheckedIcon } from '../components/icons/CheckedIcon';
import { InfoIcon } from '../components/icons/InfoIcon';

// === 1. Tipos ===
type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

// === 2. Contexto con tipo y valor por defecto ===
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// === 3. Provider ===
let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = ++toastId;
    const newToast: Toast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed right-4 top-4 flex flex-col items-center gap-1 pointer-events-none z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`pointer-events-auto cursor-pointer min-w-[120px] max-w-xs px-4 py-2 rounded-xl text-white text-sm font-normal text-center transition-all animate-in slide-in-from-bottom flex items-center gap-1 bg-[#27282c]`}
          >
            {
              toast.type === 'error'
                ?
                <ErrorIcon stroke='#ff6b6b' />
                : toast.type === 'success' ?
                  <CheckedIcon stroke='#26b0a1' /> :
                  <InfoIcon stroke='#0072d5'/>
            }
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// === 4. Hook tipado (¡este es el que soluciona el error!) ===
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe usarse dentro de ToastProvider');
  }
  return context;
};