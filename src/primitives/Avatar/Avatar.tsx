import { forwardRef, useEffect, useState } from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name — used for accessible label and to derive initials. */
  name: string;
  src?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, src, size = 'md', shape = 'circle', className, ...rest }, ref) => {
    const [imgError, setImgError] = useState(false);

    // Reset error state whenever src changes
    useEffect(() => {
      setImgError(false);
    }, [src]);

    const showImage = Boolean(src) && !imgError;
    const classNames = [styles.avatar, styles[size], styles[shape], className ?? '']
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        role="img"
        aria-label={name}
        className={classNames}
        {...rest}
      >
        {showImage ? (
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className={styles.image}
            onError={() => setImgError(true)}
          />
        ) : (
          <span aria-hidden="true" className={styles.initials}>
            {getInitials(name)}
          </span>
        )}
      </span>
    );
  },
);

Avatar.displayName = 'Avatar';

export { Avatar };
