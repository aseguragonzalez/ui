import { forwardRef } from 'react';
import styles from '../TextInput/TextInput.module.css';

export type PhoneInputSize = 'sm' | 'md' | 'lg';

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  hasError?: boolean;
  size?: PhoneInputSize;
}

/**
 * Primitive phone input — wraps input[type="tel"].
 * Does not manage label, hint, or error rendering.
 * Use PhoneField for the full accessible field composition.
 */
const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
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
        type="tel"
        aria-invalid={hasError || undefined}
        className={classNames}
        {...nativeProps}
      />
    );
  },
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
