import { forwardRef } from 'react';
import styles from './Card.module.css';

export type CardVariant = 'outlined' | 'elevated' | 'flat';
export type CardPadding = 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
}

type SectionProps = React.HTMLAttributes<HTMLDivElement>;

const paddingClass: Record<CardPadding, string> = {
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
};

const CardMedia = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={[styles.media, className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    />
  ),
);
CardMedia.displayName = 'Card.Media';

const CardHeader = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={[styles.header, className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    />
  ),
);
CardHeader.displayName = 'Card.Header';

const CardBody = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={[styles.body, className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    />
  ),
);
CardBody.displayName = 'Card.Body';

const CardFooter = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={[styles.footer, className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    />
  ),
);
CardFooter.displayName = 'Card.Footer';

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'outlined', padding = 'md', className, ...rest }, ref) => {
    const classNames = [
      styles.root,
      styles[variant],
      paddingClass[padding],
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return <div ref={ref} className={classNames} {...rest} />;
  },
);
CardRoot.displayName = 'Card';

export const Card = Object.assign(CardRoot, {
  Media: CardMedia,
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
