import { forwardRef } from 'react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  'aria-label'?: string;
  className?: string;
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, 'aria-label': ariaLabel = 'Breadcrumb', className }, ref) => (
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
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
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
