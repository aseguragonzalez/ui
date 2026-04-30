import type { ReactNode } from 'react';
import styles from './AuthLayout.module.css';

export interface AuthLayoutProps {
  /** Form or main content rendered in the right panel. */
  children: ReactNode;
  /** Custom branding content for the left panel. Replaces the default tagline. */
  branding?: ReactNode;
  /** Logo shown at the top of the form panel on mobile, and inside the branding panel on desktop. */
  logo?: ReactNode;
  /** Accessible label for the branding panel (hidden from visual display). */
  brandingLabel?: string;
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
  logo,
  brandingLabel = 'Product branding',
}: AuthLayoutProps) {
  const logoEl = logo ?? <DefaultLogo />;

  return (
    <div className={styles.layout}>
      {/* Branding panel — hidden on mobile */}
      <aside
        className={styles.brandPanel}
        aria-label={brandingLabel}
        aria-hidden="true"
      >
        <div className={styles.brandContent}>
          {branding ?? (
            <>
              <div className={styles.brandLogo}>{logoEl}</div>
              <p className={styles.brandTagline}>
                Build better products,<br />together.
              </p>
            </>
          )}
        </div>
      </aside>

      {/* Form panel */}
      <main className={styles.formPanel}>
        <div className={styles.formContent}>
          {/* Logo visible only on mobile (branding panel is hidden) */}
          <div className={styles.mobileLogo} aria-hidden="true">
            {logoEl}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

AuthLayout.displayName = 'AuthLayout';
