import type { LinkComponentProps } from '../primitives/Link/LinkComponent';

export const RouterLink = ({ href, ...rest }: LinkComponentProps) => (
  <a data-router-link="" href={`#${href}`} {...rest} />
);
