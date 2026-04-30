import { forwardRef } from 'react';
import styles from './Skeleton.module.css';

export type SkeletonShape = 'rect' | 'circle' | 'text';

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  shape?: SkeletonShape;
  /** CSS value for the width. Defaults to 100%. */
  width?: string | number;
  /** CSS value for the height. */
  height?: string | number;
  /**
   * Number of text lines to render. Only applies when shape="text".
   * The last line is rendered at 70% width to mimic natural text endings.
   */
  lines?: number;
}

function toCss(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  (
    { shape = 'rect', width, height, lines = 1, className, style, ...rest },
    ref,
  ) => {
    if (shape === 'text' && lines > 1) {
      return (
        <span
          ref={ref}
          aria-hidden="true"
          className={[styles.textGroup, className ?? ''].filter(Boolean).join(' ')}
          style={width ? { width: toCss(width), ...style } : style}
          {...rest}
        >
          {Array.from({ length: lines }, (_, i) => (
            <span
              key={i}
              className={styles.skeleton}
              style={{ width: i === lines - 1 ? '70%' : '100%' }}
            />
          ))}
        </span>
      );
    }

    const classNames = [
      styles.skeleton,
      shape === 'circle' ? styles.circle : '',
      shape === 'text' ? styles.text : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={classNames}
        style={{
          ...(width !== undefined && { width: toCss(width) }),
          ...(height !== undefined && { height: toCss(height) }),
          ...style,
        }}
        {...rest}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
