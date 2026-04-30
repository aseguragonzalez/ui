import { forwardRef } from 'react';
import styles from '../TextInput/TextInput.module.css';

export type DateInputSize = 'sm' | 'md' | 'lg';

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  hasError?: boolean;
  size?: DateInputSize;
  /** ISO 8601 date string (YYYY-MM-DD). */
  value?: string;
  /** ISO 8601 date string (YYYY-MM-DD). */
  min?: string;
  /** ISO 8601 date string (YYYY-MM-DD). */
  max?: string;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
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
        type="date"
        aria-invalid={hasError || undefined}
        className={classNames}
        {...nativeProps}
      />
    );
  },
);

DateInput.displayName = 'DateInput';

export { DateInput };
