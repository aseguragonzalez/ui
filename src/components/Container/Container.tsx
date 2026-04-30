import { forwardRef } from 'react';
import styles from './Container.module.css';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max-width breakpoint. Defaults to "lg". */
  size?: ContainerSize;
  /** Apply horizontal padding. Defaults to true. */
  padding?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', padding = true, className, ...rest }, ref) => {
    const classNames = [
      styles.container,
      styles[size],
      padding ? styles.padding : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return <div ref={ref} className={classNames} {...rest} />;
  },
);

Container.displayName = 'Container';

export { Container };
