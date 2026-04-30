import { forwardRef } from 'react';
import styles from '../TextInput/TextInput.module.css';

export type EmailInputSize = 'sm' | 'md' | 'lg';

export interface EmailInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  hasError?: boolean;
  size?: EmailInputSize;
}

/**
 * Primitive email input — wraps input[type="email"].
 * Does not manage label, hint, or error rendering.
 * Use EmailField for the full accessible field composition.
 */
const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ hasError = false, size = 'md', className, ...nativeProps }, ref) => {
    const classNames = [
      styles.input,
      styles[size],
      hasError ? styles.error : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        ref={ref}
        type="email"
        aria-invalid={hasError || undefined}
        className={classNames}
        {...nativeProps}
      />
    );
  },
);

EmailInput.displayName = 'EmailInput';

export { EmailInput };
