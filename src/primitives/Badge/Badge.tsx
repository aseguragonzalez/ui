import { forwardRef } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'neutral' | 'brand' | 'accent' | 'error' | 'warning' | 'success' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', size = 'md', className, ...rest }, ref) => {
    const classNames = [styles.badge, styles[variant], styles[size], className ?? '']
      .filter(Boolean)
      .join(' ');

    return <span ref={ref} className={classNames} {...rest} />;
  },
);

Badge.displayName = 'Badge';

export { Badge };
