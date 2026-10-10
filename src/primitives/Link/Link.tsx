import { forwardRef } from 'react';
import type { LinkComponent } from './LinkComponent';
import styles from './Link.module.css';

export interface LinkProps extends Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> {
  href: string;
  /**
   * Renders the link through this component, typically the router's link, instead of a plain `<a>`. It receives
   * `href`, the merged `className` and every other prop given to `Link`, except `linkComponent` and `ref`: the
   * ref only reaches the default `<a>`.
   */
  linkComponent?: LinkComponent;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ linkComponent: Component, className, ...rest }, ref) => {
    const classNames = [styles.link, className ?? ''].filter(Boolean).join(' ');

    return Component ? (
      <Component className={classNames} {...rest} />
    ) : (
      <a ref={ref} className={classNames} {...rest} />
    );
  },
);

Link.displayName = 'Link';

export { Link };
