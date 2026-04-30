import { forwardRef, useId, useState } from 'react';
import styles from './Navbar.module.css';

export interface NavItem {
  key: string;
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface NavbarProps {
  brand?: React.ReactNode;
  items?: NavItem[];
  actions?: React.ReactNode;
  sticky?: boolean;
  'aria-label'?: string;
  defaultMobileOpen?: boolean;
  isMobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  className?: string;
}

const HamburgerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
      clipRule="evenodd"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
  </svg>
);

const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      brand,
      items = [],
      actions,
      sticky = false,
      'aria-label': ariaLabel = 'Main navigation',
      defaultMobileOpen = false,
      isMobileOpen: controlledMobileOpen,
      onMobileOpenChange,
      className,
    },
    ref,
  ) => {
    const [internalMobileOpen, setInternalMobileOpen] = useState(defaultMobileOpen);
    const mobileOpen = controlledMobileOpen ?? internalMobileOpen;
    const mobileMenuId = useId();

    const toggleMobile = () => {
      const next = !mobileOpen;
      if (controlledMobileOpen === undefined) setInternalMobileOpen(next);
      onMobileOpenChange?.(next);
    };

    const closeMobile = () => {
      if (controlledMobileOpen === undefined) setInternalMobileOpen(false);
      onMobileOpenChange?.(false);
    };

    const classNames = [styles.navbar, sticky ? styles.sticky : '', className ?? '']
      .filter(Boolean)
      .join(' ');

    return (
      <header ref={ref} className={classNames}>
        <div className={styles.inner}>
          {brand && <div className={styles.brand}>{brand}</div>}

          {items.length > 0 && (
            <nav className={styles.nav} aria-label={ariaLabel}>
              <ul className={styles.navList}>
                {items.map((item) => (
                  <li key={item.key} className={styles.navItem}>
                    <a
                      href={item.href}
                      onClick={item.onClick}
                      className={[styles.navLink, item.isActive ? styles.navLinkActive : '']
                        .filter(Boolean)
                        .join(' ')}
                      aria-current={item.isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {actions && <div className={styles.actions}>{actions}</div>}

          <button
            type="button"
            className={styles.menuButton}
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>

        {/* Mobile dropdown menu — CSS hides on desktop regardless of state.
            Uses a distinct aria-label so both nav landmarks are unique when
            both are in the DOM (desktop nav is visually hidden via CSS on mobile). */}
        <div
          id={mobileMenuId}
          className={[styles.mobileMenu, mobileOpen ? styles.mobileMenuOpen : '']
            .filter(Boolean)
            .join(' ')}
        >
          <nav aria-label={`${ariaLabel} — menu`}>
            <ul className={styles.mobileNavList}>
              {items.map((item) => (
                <li key={item.key} className={styles.mobileNavItem}>
                  <a
                    href={item.href}
                    onClick={() => {
                      item.onClick?.();
                      closeMobile();
                    }}
                    className={[
                      styles.mobileNavLink,
                      item.isActive ? styles.mobileNavLinkActive : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-current={item.isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    );
  },
);

Navbar.displayName = 'Navbar';
export { Navbar };
