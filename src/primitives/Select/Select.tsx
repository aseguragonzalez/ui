import { forwardRef } from 'react';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  hasError?: boolean;
  size?: SelectSize;
}

/**
 * Primitive select — wraps native <select>.
 * Renders inside a wrapper div that provides the custom dropdown arrow.
 * Use SelectField for the full accessible field composition.
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError = false, size = 'md', className, children, ...nativeProps }, ref) => {
    const wrapperClassNames = [
      styles.wrapper,
      styles[size],
      hasError ? styles.error : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClassNames}>
        <select
          ref={ref}
          aria-invalid={hasError || undefined}
          className={styles.select}
          {...nativeProps}
        >
          {children}
        </select>
      </div>
    );
  },
);

Select.displayName = 'Select';

export { Select };
