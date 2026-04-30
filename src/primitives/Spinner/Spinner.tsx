import { forwardRef } from 'react';
import styles from './Spinner.module.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  label?: string;
}

const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'md', label = 'Loading...', className, ...rest }, ref) => {
    const classNames = [styles.spinner, styles[size], className ?? '']
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} role="status" className={classNames} {...rest}>
        <span className={styles.srOnly}>{label}</span>
      </span>
    );
  },
);

Spinner.displayName = 'Spinner';

export { Spinner };
