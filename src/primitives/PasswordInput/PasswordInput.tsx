import { forwardRef, useState, useCallback, useRef } from 'react';
import styles from './PasswordInput.module.css';

export type PasswordInputSize = 'sm' | 'md' | 'lg';

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  hasError?: boolean;
  size?: PasswordInputSize;
  /** Accessible label for the "show password" button state. */
  showPasswordLabel?: string;
  /** Accessible label for the "hide password" button state. */
  hidePasswordLabel?: string;
}

const EyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeSlashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/**
 * Primitive password input — wraps input[type="password"] with an integrated show/hide toggle.
 * Does not manage label, hint, or error rendering.
 * Use PasswordField for the full accessible field composition.
 */
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      hasError = false,
      size = 'md',
      disabled = false,
      showPasswordLabel = 'Show password',
      hidePasswordLabel = 'Hide password',
      className,
      ...nativeProps
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const innerRef = useRef<HTMLInputElement | null>(null);

    const setRef = useCallback(
      (el: HTMLInputElement | null) => {
        innerRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
      },
      [ref],
    );

    const handleToggle = () => {
      setIsVisible((prev) => !prev);
      // Return focus to the input after toggling so the user can continue typing.
      innerRef.current?.focus();
    };

    const rootClassNames = [styles.root, styles[size], className ?? ''].filter(Boolean).join(' ');

    const inputClassNames = [styles.input, hasError ? styles.error : ''].filter(Boolean).join(' ');

    return (
      <div className={rootClassNames}>
        <input
          ref={setRef}
          type={isVisible ? 'text' : 'password'}
          aria-invalid={hasError || undefined}
          disabled={disabled}
          className={inputClassNames}
          {...nativeProps}
        />
        <button
          type="button"
          className={styles.toggle}
          aria-label={isVisible ? hidePasswordLabel : showPasswordLabel}
          aria-pressed={isVisible}
          onClick={handleToggle}
          disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
        >
          {isVisible ? <EyeSlashIcon /> : <EyeIcon />}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
