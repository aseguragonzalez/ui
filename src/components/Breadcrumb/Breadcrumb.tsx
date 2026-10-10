import { forwardRef } from 'react';
import styles from './Breadcrumb.module.css';
import { ItemLink } from '../shared/ItemLink';
import type { LinkComponent } from '../../primitives/Link/LinkComponent';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  'aria-label'?: string;
  /**
   * Component rendered for ancestor items with an `href` instead of a plain `<a>`, such as an adapter over the
   * router's link, so navigation happens without a full page load. Defaults to `<a>`.
   */
  linkComponent?: LinkComponent;
  className?: string;
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, 'aria-label': ariaLabel = 'Breadcrumb', linkComponent, className }, ref) => (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={[styles.nav, className ?? ''].filter(Boolean).join(' ')}
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {isCurrent ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <ItemLink linkComponent={linkComponent} href={item.href} className={styles.link}>
                  {item.label}
                </ItemLink>
              ) : (
                <span className={styles.link}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  ),
);

Breadcrumb.displayName = 'Breadcrumb';
export { Breadcrumb };
