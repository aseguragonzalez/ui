import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.css';

export type ToastVariant = 'info' | 'success' | 'error' | 'warning';

export interface ToastItem {
  id: string;
  message: React.ReactNode;
  variant: ToastVariant;
  /** Auto-dismiss delay in ms. 0 = persist until dismissed. Default: 5000. */
  duration: number;
}

export interface ToastOptions {
  message: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  show: (opts: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<ToastVariant, React.ReactElement> = {
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v4M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6L6 10M6 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2L14.9 14H1.1L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 6.5v3M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

function ToastElement({
  item,
  onDismiss,
  onPause,
  onResume,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
}) {
  return (
    <div
      className={[styles.toast, styles[item.variant]].join(' ')}
      role="status"
      onMouseEnter={() => onPause(item.id)}
      onMouseLeave={() => onResume(item.id)}
      onFocus={() => onPause(item.id)}
      onBlur={() => onResume(item.id)}
    >
      <span className={styles.icon}>{icons[item.variant]}</span>
      <span className={styles.message}>{item.message}</span>
      <button
        type="button"
        aria-label="Close notification"
        className={styles.closeButton}
        onClick={() => onDismiss(item.id)}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Max toasts visible at once. Default: 5. */
  maxToasts?: number;
}

export function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const pausedAtRef = useRef<Map<string, number>>(new Map());
  const remainingRef = useRef<Map<string, number>>(new Map());
  const counterRef = useRef(0);

  const dismiss = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    pausedAtRef.current.delete(id);
    remainingRef.current.delete(id);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const scheduleTimer = useCallback(
    (id: string, delay: number) => {
      const timer = setTimeout(() => dismiss(id), delay);
      timersRef.current.set(id, timer);
    },
    [dismiss],
  );

  const pause = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer === undefined) return;
    clearTimeout(timer);
    timersRef.current.delete(id);
    pausedAtRef.current.set(id, Date.now());
  }, []);

  const resume = useCallback(
    (id: string) => {
      const pausedAt = pausedAtRef.current.get(id);
      if (pausedAt === undefined) return;
      const elapsed = Date.now() - pausedAt;
      const remaining = Math.max(0, (remainingRef.current.get(id) ?? 0) - elapsed);
      pausedAtRef.current.delete(id);
      remainingRef.current.set(id, remaining);
      if (remaining > 0) scheduleTimer(id, remaining);
      else dismiss(id);
    },
    [dismiss, scheduleTimer],
  );

  const show = useCallback(
    (opts: ToastOptions): string => {
      const id = `toast-${++counterRef.current}`;
      const variant = opts.variant ?? 'info';
      const duration = opts.duration ?? 5000;

      const item: ToastItem = { id, message: opts.message, variant, duration };

      setToasts((prev) => {
        const next = [...prev, item];
        return next.length > maxToasts ? next.slice(next.length - maxToasts) : next;
      });

      if (duration > 0) {
        remainingRef.current.set(id, duration);
        scheduleTimer(id, duration);
      }

      return id;
    },
    [maxToasts, scheduleTimer],
  );

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      {createPortal(
        <div
          role="region"
          className={styles.region}
          aria-label="Notifications"
          aria-live="polite"
          aria-atomic="false"
          aria-relevant="additions text"
        >
          {toasts.map((item) => (
            <ToastElement
              key={item.id}
              item={item}
              onDismiss={dismiss}
              onPause={pause}
              onResume={resume}
            />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

ToastProvider.displayName = 'ToastProvider';

// eslint-disable-next-line react-refresh/only-export-components
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside a <ToastProvider>');
  return ctx;
}
