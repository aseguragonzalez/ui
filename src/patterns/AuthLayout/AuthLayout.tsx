import type { ReactNode } from 'react';
import styles from './AuthLayout.module.css';

export interface AuthLayoutProps {
  /** Form or main content rendered in the right panel. */
  children: ReactNode;
  /** Custom branding content for the left panel. Replaces the default logo and tagline. */
  branding?: ReactNode;
  /** Tagline shown under the logo in the branding panel. Default: `'Build better products, together.'`. */
  tagline?: ReactNode;
  /**
   * Logo shown at the top of the form panel on mobile, and inside the branding panel on desktop
   * (only on mobile when `branding` is set). Only the copy on screen is exposed to assistive
   * technology, so a meaningful logo (an image with alternative text, a product name) is announced
   * once on every viewport. Mark a decorative logo `aria-hidden`, as the default logo is.
   */
  logo?: ReactNode;
  /** Accessible name of the branding panel's complementary landmark. Default: `'Product branding'`. */
  brandingLabel?: string;
  /**
   * Page footer. Rendered in a `<footer>` after `<main>`, not inside it, so it is exposed as the
   * `contentinfo` landmark. On desktop it sits below the form panel.
   */
  footer?: ReactNode;
}

const DefaultLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <rect width="36" height="36" rx="8" fill="var(--ds-color-action-primary)" />
    <path
      d="M10 12h16M10 18h11M10 24h8"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export function AuthLayout({
  children,
  branding,
  tagline,
  logo,
  brandingLabel = 'Product branding',
  footer,
}: AuthLayoutProps) {
  const logoEl = logo ?? <DefaultLogo />;

  return (
    <div className={[styles.layout, footer ? styles.withFooter : ''].filter(Boolean).join(' ')}>
      {/* Branding panel — hidden on mobile */}
      <aside className={styles.brandPanel} aria-label={brandingLabel}>
        <div className={styles.brandContent}>
          {branding ?? (
            <>
              <div className={styles.brandLogo}>{logoEl}</div>
              <p className={styles.brandTagline}>
                {tagline ?? (
                  <>
                    Build better products,<br />together.
                  </>
                )}
              </p>
            </>
          )}
        </div>
      </aside>

      {/* Form panel */}
      <main className={styles.formPanel}>
        <div className={styles.formContent}>
          {/* Logo visible only on mobile (branding panel is hidden) */}
          <div className={styles.mobileLogo}>{logoEl}</div>
          {children}
        </div>
      </main>

      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
}

AuthLayout.displayName = 'AuthLayout';
