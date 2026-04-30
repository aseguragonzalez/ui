import { forwardRef } from 'react';
import styles from './Text.module.css';

export type TextSize = 'lg' | 'md' | 'sm' | 'xs';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextColor =
  | 'default'
  | 'muted'
  | 'disabled'
  | 'error'
  | 'success'
  | 'warning'
  | 'inherit';
export type TextAs = 'p' | 'span' | 'div' | 'em' | 'strong' | 'small';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Rendered HTML element. Defaults to 'p'. */
  as?: TextAs;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
}

const Text = forwardRef<HTMLElement, TextProps>(
  (
    { as: Tag = 'p', size = 'md', weight = 'regular', color = 'default', className, ...rest },
    ref,
  ) => {
    const classNames = [
      styles.text,
      styles[size],
      styles[weight],
      color !== 'default' ? styles[color] : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    // React.ElementType cast is necessary for polymorphic forwardRef components.
    const Component = Tag as React.ElementType;
    return <Component ref={ref} className={classNames} {...rest} />;
  },
);

Text.displayName = 'Text';

export { Text };
