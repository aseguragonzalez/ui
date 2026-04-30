import { forwardRef } from 'react';
import styles from './Heading.module.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type HeadingColor = 'default' | 'muted' | 'inherit';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading level — determines the rendered HTML element (h1–h6). */
  level: HeadingLevel;
  /**
   * Visual size. Defaults to a size appropriate for the level.
   * Allows decoupling semantic hierarchy from visual hierarchy.
   */
  size?: HeadingSize;
  color?: HeadingColor;
}

const defaultSizes: Record<HeadingLevel, HeadingSize> = {
  1: 'xl',
  2: 'lg',
  3: 'md',
  4: 'sm',
  5: 'xs',
  6: 'xs',
};

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, size, color = 'default', className, children, ...rest }, ref) => {
    const resolvedSize = size ?? defaultSizes[level];

    const classNames = [
      styles.heading,
      styles[resolvedSize],
      color !== 'default' ? styles[color] : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    const props = { ref, className: classNames, ...rest };

    switch (level) {
      case 1: return <h1 {...props}>{children}</h1>;
      case 2: return <h2 {...props}>{children}</h2>;
      case 3: return <h3 {...props}>{children}</h3>;
      case 4: return <h4 {...props}>{children}</h4>;
      case 5: return <h5 {...props}>{children}</h5>;
      case 6: return <h6 {...props}>{children}</h6>;
    }
  },
);

Heading.displayName = 'Heading';

export { Heading };
