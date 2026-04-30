import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Called when the user requests to close (Escape key or backdrop click). */
  onClose: () => void;
  /** Accessible title rendered in the header. Required for ARIA. */
  title: string;
  children: React.ReactNode;
  /** Accessible description id — set automatically when ModalBody is used. */
  'aria-describedby'?: string;
  size?: ModalSize;
  /** Custom label for the close button. Default: "Close". */
  closeLabel?: string;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
  titleId: string;
  onClose: () => void;
  closeLabel: string;
}

export interface ModalBodyProps {
  children: React.ReactNode;
  id?: string;
}

export interface ModalFooterProps {
  children: React.ReactNode;
}

function ModalHeader({ children, titleId, onClose, closeLabel }: ModalHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 id={titleId} className={styles.title}>
        {children}
      </h2>
      <button
        type="button"
        aria-label={closeLabel}
        className={styles.closeButton}
        onClick={onClose}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function ModalBody({ children, id }: ModalBodyProps) {
  return (
    <div className={styles.body} id={id}>
      {children}
    </div>
  );
}

ModalBody.displayName = 'ModalBody';

export function ModalFooter({ children }: ModalFooterProps) {
  return <div className={styles.footer}>{children}</div>;
}

ModalFooter.displayName = 'ModalFooter';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  {
    open,
    onClose,
    title,
    children,
    'aria-describedby': ariaDescribedby,
    size = 'md',
    closeLabel = 'Close',
  },
  ref,
) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const combinedRef = useCallback(
    (el: HTMLDialogElement | null) => {
      (dialogRef as React.MutableRefObject<HTMLDialogElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLDialogElement | null>).current = el;
    },
    [ref],
  );

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
      (focusable[0] ?? dialog).focus();
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDialogElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) onClose();
    },
    [onClose],
  );

  if (!open) return null;

  const modal = (
    <dialog
      ref={combinedRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={ariaDescribedby}
      open
      className={[styles.dialog, styles[size]].join(' ')}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
    >
      <div className={styles.panel}>
        <ModalHeader titleId={titleId} onClose={onClose} closeLabel={closeLabel}>
          {title}
        </ModalHeader>
        {children}
      </div>
    </dialog>
  );

  return createPortal(modal, document.body);
});

Modal.displayName = 'Modal';
