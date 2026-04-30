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
}

const variantClass: Record<AppShellVariant, string> = {
  'sidebar-only': styles.sidebarOnly,
  'navbar-only':  styles.navbarOnly,
  both:           styles.both,
};

const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  ({ variant, sidebar, navbar, children, className, ...rest }, ref) => {
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
        <main className={styles.mainArea}>{children}</main>
      </div>
    );
  },
);

AppShell.displayName = 'AppShell';

export { AppShell };
