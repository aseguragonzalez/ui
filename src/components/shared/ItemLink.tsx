import type { LinkComponent, LinkComponentProps } from '../../primitives/Link/LinkComponent';

export interface ItemLinkProps extends Omit<LinkComponentProps, 'href'> {
  href?: string;
  linkComponent?: LinkComponent;
}

/** Renders a navigation item's link through `linkComponent` when it has an `href`, otherwise as a plain `<a>`. */
export function ItemLink({ linkComponent: Link, href, ...rest }: ItemLinkProps) {
  return Link && href ? <Link href={href} {...rest} /> : <a href={href} {...rest} />;
}
