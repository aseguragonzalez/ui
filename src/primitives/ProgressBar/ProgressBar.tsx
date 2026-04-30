import { forwardRef } from 'react';
import styles from './ProgressBar.module.css';

export type ProgressBarVariant = 'default' | 'accent' | 'success' | 'error' | 'warning';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible name — required by ARIA for role="progressbar". */
  label: string;
  /** 0–100. Omit for indeterminate state. */
  value?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    { label, value, variant = 'default', size = 'md', className, ...rest },
    ref,
  ) => {
    const isIndeterminate = value === undefined;
    const clamped = isIndeterminate ? undefined : clamp(value, 0, 100);

    const trackClass = [
      styles.track,
      styles[size],
      styles[variant],
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    const fillClass = [
      styles.fill,
      isIndeterminate ? styles.indeterminate : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={isIndeterminate ? undefined : 0}
        aria-valuemax={isIndeterminate ? undefined : 100}
        className={trackClass}
        {...rest}
      >
        <div
          className={fillClass}
          style={clamped !== undefined ? { width: `${clamped}%` } : undefined}
        />
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
