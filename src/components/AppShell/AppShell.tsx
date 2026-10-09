import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import styles from './AppShell.module.css';

export type AppShellVariant = 'sidebar-only' | 'navbar-only' | 'both';

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Layout variant. If omitted, auto-detected from the `sidebar` and `navbar` slots:
   * both provided → `'both'`; sidebar only → `'sidebar-only'`; navbar only → `'navbar-only'`.
   */
  variant?: AppShellVariant;
  /** Content for the sidebar slot. */
  sidebar?: ReactNode;
  /** Content for the top navigation slot. */
  navbar?: ReactNode;
  /** Main page content. Rendered inside a `<main>` element. */
  children: ReactNode;
  /**
   * Page footer. Rendered in a `<footer>` after `<main>`, not inside it, so it is exposed as the
   * `contentinfo` landmark. It scrolls with the main content and sits at the bottom when the content is short.
   */
  footer?: ReactNode;
}

const variantClass: Record<AppShellVariant, string> = {
  'sidebar-only': styles.sidebarOnly,
  'navbar-only':  styles.navbarOnly,
  both:           styles.both,
};

const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  ({ variant, sidebar, navbar, footer, children, className, ...rest }, ref) => {
    const resolved: AppShellVariant =
      variant ?? (sidebar && navbar ? 'both' : sidebar ? 'sidebar-only' : 'navbar-only');

    const classNames = [
      styles.shell,
      variantClass[resolved],
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...rest}>
        {sidebar && <div className={styles.sidebarSlot}>{sidebar}</div>}
        {navbar  && <div className={styles.navbarSlot}>{navbar}</div>}
        {footer ? (
          <div className={[styles.mainArea, styles.withFooter].join(' ')}>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>{footer}</footer>
          </div>
        ) : (
          <main className={styles.mainArea}>{children}</main>
        )}
      </div>
    );
  },
);

AppShell.displayName = 'AppShell';

export { AppShell };
