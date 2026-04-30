import { forwardRef } from 'react';
import styles from './Divider.module.css';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientation;
  /**
   * When true (default), the divider is purely visual — aria-hidden="true".
   * When false, it acts as a semantic thematic break with role="separator".
   */
  decorative?: boolean;
  /** Accessible label for semantic dividers (decorative=false). */
  label?: string;
}

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', decorative = true, label, className, ...rest }, ref) => {
    const classNames = [styles.divider, styles[orientation], className ?? '']
      .filter(Boolean)
      .join(' ');

    return (
      <hr
        ref={ref}
        aria-hidden={decorative ? true : undefined}
        aria-orientation={!decorative && orientation === 'vertical' ? 'vertical' : undefined}
        aria-label={!decorative ? label : undefined}
        className={classNames}
        {...rest}
      />
    );
  },
);

Divider.displayName = 'Divider';

export { Divider };
