import { forwardRef } from 'react';
import styles from './Grid.module.css';

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

export type GridSpacingKey = keyof typeof spaceMap;
export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12;

export type ResponsiveGridCols = {
  mobile?: GridCols;
  tablet?: GridCols;
  desktop?: GridCols;
};

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridCols | ResponsiveGridCols;
  gap?: GridSpacingKey;
  /** Independent column and row gap. Overrides `gap` if provided. */
  columnGap?: GridSpacingKey;
  rowGap?: GridSpacingKey;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    { cols = 1, gap = 4, columnGap, rowGap, className, style, ...rest },
    ref,
  ) => {
    const isResponsive = typeof cols !== 'number';

    const colStyle: React.CSSProperties = isResponsive
      ? ({
          ...(cols.mobile  !== undefined && { '--grid-cols-mobile':  String(cols.mobile)  }),
          ...(cols.tablet  !== undefined && { '--grid-cols-tablet':  String(cols.tablet)  }),
          ...(cols.desktop !== undefined && { '--grid-cols-desktop': String(cols.desktop) }),
        } as React.CSSProperties)
      : { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` };

    const classNames = [
      styles.grid,
      isResponsive ? styles.responsive : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        style={{
          ...colStyle,
          gap: spaceMap[gap],
          ...(columnGap !== undefined && { columnGap: spaceMap[columnGap] }),
          ...(rowGap    !== undefined && { rowGap:    spaceMap[rowGap]    }),
          ...style,
        }}
        {...rest}
      />
    );
  },
);

Grid.displayName = 'Grid';

export { Grid };
