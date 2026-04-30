import { forwardRef } from 'react';
import styles from './TextInput.module.css';

export type TextInputSize = 'sm' | 'md' | 'lg';

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  hasError?: boolean;
  size?: TextInputSize;
}

/**
 * Primitive text input — wraps input[type="text"].
 * Does not manage label, hint, or error rendering.
 * Use TextField for the full accessible field composition.
 */
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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
        type="text"
        aria-invalid={hasError || undefined}
        className={classNames}
        {...nativeProps}
      />
    );
  },
);

TextInput.displayName = 'TextInput';

export { TextInput };
