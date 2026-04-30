import { forwardRef } from 'react';
import styles from './PageLayout.module.css';

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

type PageLayoutSpacingKey = keyof typeof spaceMap;

export type PageLayoutSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width of the content area. Defaults to `'xl'` (1280px). */
  maxWidth?: PageLayoutSize;
  /** Apply horizontal and vertical padding. Defaults to `true`. */
  padding?: boolean;
  /** Gap between direct children. Defaults to `6`. */
  gap?: PageLayoutSpacingKey;
}

const sizeClass: Record<PageLayoutSize, string> = {
  sm:   styles.sm,
  md:   styles.md,
  lg:   styles.lg,
  xl:   styles.xl,
  full: styles.full,
};

const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ maxWidth = 'xl', padding = true, gap = 6, className, style, ...rest }, ref) => {
    const classNames = [
      styles.pageLayout,
      sizeClass[maxWidth],
      padding ? styles.padding : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        style={{ gap: spaceMap[gap], ...style }}
        {...rest}
      />
    );
  },
);

PageLayout.displayName = 'PageLayout';

export { PageLayout };
