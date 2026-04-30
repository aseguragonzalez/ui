import { forwardRef } from 'react';
import styles from './Toggle.module.css';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  hasError?: boolean;
  size?: ToggleSize;
}

/**
 * Primitive toggle switch — wraps input[type="checkbox"] with role="switch".
 * Semantically distinct from Checkbox: activates/deactivates something immediately.
 * Does not manage label, hint, or error rendering.
 * Use ToggleField for the full accessible field composition.
 */
const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ hasError = false, size = 'md', className, ...nativeProps }, ref) => {
    return (
      <span className={[styles.root, styles[size], className ?? ''].filter(Boolean).join(' ')}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          aria-invalid={hasError || undefined}
          className={styles.input}
          {...nativeProps}
        />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
      </span>
    );
  },
);

Toggle.displayName = 'Toggle';

export { Toggle };
