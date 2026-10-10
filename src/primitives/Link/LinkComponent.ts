import type { AriaAttributes, ComponentType, MouseEventHandler, ReactNode } from 'react';

/** Props a navigation component passes to a consumer-supplied link component. */
export interface LinkComponentProps {
  href: string;
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  'aria-current'?: AriaAttributes['aria-current'];
  'aria-label'?: string;
  title?: string;
}

/**
 * A link component, typically a thin adapter over the router's own (`<Link to={href} … />`), that a
 * navigation component renders for items with an `href` instead of a plain `<a>`.
 */
export type LinkComponent = ComponentType<LinkComponentProps>;
