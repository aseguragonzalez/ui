import { forwardRef } from 'react';
import styles from './Section.module.css';

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

type SectionSpacingKey = keyof typeof spaceMap;

export type SectionVariant = 'surface' | 'flat';
export type SectionPadding = 'none' | 'sm' | 'md' | 'lg';

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual treatment. `surface` = bg + border + shadow; `flat` = subtle bg only. */
  variant?: SectionVariant;
  /** Inner padding. Defaults to `'md'`. */
  padding?: SectionPadding;
  /** Gap between child elements. Defaults to `4`. */
  gap?: SectionSpacingKey;
}

const paddingClass: Record<SectionPadding, string> = {
  none: styles.paddingNone,
  sm:   styles.paddingSm,
  md:   styles.paddingMd,
  lg:   styles.paddingLg,
};

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ variant = 'surface', padding = 'md', gap = 4, className, style, ...rest }, ref) => {
    const classNames = [
      styles.section,
      styles[variant],
      paddingClass[padding],
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

Section.displayName = 'Section';

export { Section };
