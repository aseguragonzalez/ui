import { forwardRef, useEffect, useState } from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

export type AvatarImgProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'className'
>;

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name — used for accessible label and to derive initials. */
  name: string;
  src?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  /** When true, the avatar is hidden from assistive technology — use it next to the visible name. */
  decorative?: boolean;
  /** Attributes forwarded to the inner `<img>`, such as `referrerPolicy`. */
  imgProps?: AvatarImgProps;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      name,
      src,
      size = 'md',
      shape = 'circle',
      decorative = false,
      imgProps,
      className,
      ...rest
    },
    ref,
  ) => {
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
        role={decorative ? undefined : 'img'}
        aria-label={decorative ? undefined : name}
        aria-hidden={decorative ? true : undefined}
        className={classNames}
        {...rest}
      >
        {showImage ? (
          <img
            {...imgProps}
            src={src}
            alt=""
            aria-hidden="true"
            className={styles.image}
            onError={(event) => {
              setImgError(true);
              imgProps?.onError?.(event);
            }}
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
