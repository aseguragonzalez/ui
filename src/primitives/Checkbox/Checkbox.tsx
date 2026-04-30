import { forwardRef } from 'react';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  hasError?: boolean;
  size?: CheckboxSize;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ hasError = false, size = 'md', className, ...nativeProps }, ref) => {
    const classNames = [
      styles.checkbox,
      size !== 'md' ? styles[size] : '',
      hasError ? styles.error : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        ref={ref}
        type="checkbox"
        aria-invalid={hasError || undefined}
        className={classNames}
        {...nativeProps}
      />
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
