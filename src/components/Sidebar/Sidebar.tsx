import { createPortal } from 'react-dom';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Sidebar.module.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M10 4L6 8L10 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6 4L10 8L6 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
  </svg>
);

export interface SidebarItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  items: SidebarItem[];
  /** Always-visible slot — shown even when sidebar is collapsed. Ideal for a logo/icon. */
  logo?: React.ReactNode;
  /** Text/content slot — fades out when collapsed. Shown next to the logo. */
  header?: React.ReactNode;
  /** Pinned to the bottom of the panel, above the collapse button. */
  footer?: React.ReactNode;
  'aria-label'?: string;
  /** Desktop collapse — uncontrolled default */
  defaultCollapsed?: boolean;
  /** Desktop collapse — controlled */
  isCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Mobile drawer — uncontrolled default */
  defaultMobileOpen?: boolean;
  /** Mobile drawer — controlled */
  isMobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  className?: string;
}

const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      logo,
      header,
      footer,
      'aria-label': ariaLabel = 'Sidebar navigation',
      defaultCollapsed = false,
      isCollapsed: controlledCollapsed,
      onCollapsedChange,
      defaultMobileOpen = false,
      isMobileOpen: controlledMobileOpen,
      onMobileOpenChange,
      className,
    },
    ref,
  ) => {
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
    const collapsed = controlledCollapsed ?? internalCollapsed;

    const [internalMobileOpen, setInternalMobileOpen] = useState(defaultMobileOpen);
    const mobileOpen = controlledMobileOpen ?? internalMobileOpen;

    const [mounted, setMounted] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      const onMobile = window.matchMedia?.('(max-width: 767px)')?.matches ?? false;
      if (!onMobile) return;

      if (mobileOpen) {
        previousFocusRef.current = document.activeElement as HTMLElement;
        document.body.style.overflow = 'hidden';
        const focusable = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
        focusable?.focus();
      } else {
        document.body.style.overflow = '';
        previousFocusRef.current?.focus();
        previousFocusRef.current = null;
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [mobileOpen]);

    const toggleCollapse = useCallback(() => {
      const next = !collapsed;
      if (controlledCollapsed === undefined) setInternalCollapsed(next);
      onCollapsedChange?.(next);
    }, [collapsed, controlledCollapsed, onCollapsedChange]);

    const closeMobile = useCallback(() => {
      if (controlledMobileOpen === undefined) setInternalMobileOpen(false);
      onMobileOpenChange?.(false);
    }, [controlledMobileOpen, onMobileOpenChange]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') closeMobile();
      },
      [closeMobile],
    );

    const sidebarClasses = [
      styles.sidebar,
      collapsed ? styles.collapsed : '',
      mobileOpen ? styles.mobileOpen : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <aside ref={ref} className={sidebarClasses}>
        {mounted &&
          mobileOpen &&
          createPortal(
            <div className={styles.backdrop} onClick={closeMobile} aria-hidden="true" />,
            document.body,
          )}

        <div ref={panelRef} className={styles.panel} onKeyDown={handleKeyDown} tabIndex={-1}>
          {/* Header: logo (always visible) + header text (fades when collapsed) */}
          {(logo || header) && (
            <div className={styles.panelTop}>
              <div className={styles.logoRow}>
                {logo && <div className={styles.logoSlot}>{logo}</div>}
                {header && <div className={styles.headerContent}>{header}</div>}
              </div>
              <button
                type="button"
                className={styles.mobileCloseButton}
                onClick={closeMobile}
                aria-label="Close sidebar"
              >
                <CloseIcon />
              </button>
            </div>
          )}

          {/* When there's no logo/header, still show the mobile close button */}
          {!logo && !header && (
            <div className={styles.mobileCloseRow}>
              <button
                type="button"
                className={styles.mobileCloseButton}
                onClick={closeMobile}
                aria-label="Close sidebar"
              >
                <CloseIcon />
              </button>
            </div>
          )}

          <nav aria-label={ariaLabel} className={styles.nav}>
            <ul className={styles.navList} tabIndex={0}>
              {items.map((item) => (
                <li key={item.key} className={styles.navItem}>
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className={[styles.navLink, item.isActive ? styles.navLinkActive : '']
                      .filter(Boolean)
                      .join(' ')}
                    aria-current={item.isActive ? 'page' : undefined}
                    aria-label={item.icon && collapsed ? item.label : undefined}
                    title={item.icon && collapsed ? item.label : undefined}
                  >
                    {item.icon && (
                      <span className={styles.navLinkIcon} aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    <span className={styles.navLinkLabel}>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {footer && <div className={styles.footer}>{footer}</div>}

          <button
            type="button"
            className={styles.collapseButton}
            onClick={toggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        </div>
      </aside>
    );
  },
);

Sidebar.displayName = 'Sidebar';
export { Sidebar };
