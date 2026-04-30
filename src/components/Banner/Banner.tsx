import { forwardRef } from 'react';
import styles from './Banner.module.css';

export type BannerVariant = 'info' | 'success' | 'warning' | 'error' | 'promotional';
export type BannerLayout = 'horizontal' | 'stacked';

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Required headline — also used as the accessible name for landmark regions. */
  headline: string;
  description?: string;
  variant?: BannerVariant;
  layout?: BannerLayout;
  /** Icon or illustration override. Defaults to the variant icon. */
  media?: React.ReactNode;
  /** CTA buttons or links. */
  actions?: React.ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
}

const defaultRole: Record<BannerVariant, React.AriaRole> = {
  error: 'alert',
  warning: 'alert',
  success: 'status',
  info: 'status',
  promotional: 'region',
};

const icons: Record<BannerVariant, React.ReactElement> = {
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  promotional: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
};

const CloseIcon = () => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      headline,
      description,
      variant = 'info',
      layout = 'horizontal',
      media,
      actions,
      onDismiss,
      dismissLabel = 'Close banner',
      role,
      className,
      ...rest
    },
    ref,
  ) => {
    const resolvedRole = role ?? defaultRole[variant];
    const classNames = [
      styles.root,
      styles[variant],
      layout === 'stacked' ? styles.stacked : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role={resolvedRole}
        aria-label={resolvedRole === 'region' ? headline : undefined}
        {...rest}
        className={classNames}
      >
        <span className={styles.icon}>{media ?? icons[variant]}</span>

        <div className={styles.content}>
          <p className={styles.headline}>{headline}</p>
          {description && <p className={styles.description}>{description}</p>}
          {layout === 'stacked' && actions && (
            <div className={styles.actions}>{actions}</div>
          )}
        </div>

        {layout === 'horizontal' && actions && (
          <div className={styles.actions}>{actions}</div>
        )}

        {onDismiss && (
          <button
            type="button"
            className={styles.dismiss}
            aria-label={dismissLabel}
            onClick={onDismiss}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  },
);

Banner.displayName = 'Banner';

export { Banner };
