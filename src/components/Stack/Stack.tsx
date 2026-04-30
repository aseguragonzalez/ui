import { forwardRef } from 'react';
import styles from './Stack.module.css';

const spaceMap = {
  0:  '0',
  1:  'var(--ds-space-1)',
  2:  'var(--ds-space-2)',
  3:  'var(--ds-space-3)',
  4:  'var(--ds-space-4)',
  5:  'var(--ds-space-5)',
  6:  'var(--ds-space-6)',
  8:  'var(--ds-space-8)',
  10: 'var(--ds-space-10)',
  12: 'var(--ds-space-12)',
  16: 'var(--ds-space-16)',
} as const;

export type SpacingKey = keyof typeof spaceMap;
export type StackDirection = 'row' | 'column';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  gap?: SpacingKey;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
}

const justifyMap: Record<StackJustify, string> = {
  start:   'flex-start',
  center:  'center',
  end:     'flex-end',
  between: 'space-between',
  around:  'space-around',
  evenly:  'space-evenly',
};

const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'column',
      gap = 4,
      align = 'stretch',
      justify = 'start',
      wrap = false,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const classNames = [styles.stack, className ?? ''].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        style={{
          flexDirection: direction,
          gap: spaceMap[gap],
          alignItems: align,
          justifyContent: justifyMap[justify],
          flexWrap: wrap ? 'wrap' : 'nowrap',
          ...style,
        }}
        {...rest}
      />
    );
  },
);

Stack.displayName = 'Stack';

export { Stack };
