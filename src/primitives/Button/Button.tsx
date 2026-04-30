import { forwardRef } from 'react';
import { Spinner, type SpinnerSize } from '../Spinner/Spinner';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

const spinnerSize: Record<ButtonSize, SpinnerSize> = { sm: 'sm', md: 'sm', lg: 'md' };

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      loadingText,
      disabled,
      children,
      className,
      ...nativeProps
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth ? styles.fullWidth : '',
      isLoading ? styles.loading : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={classNames}
        {...nativeProps}
      >
        {isLoading && (
          <Spinner size={spinnerSize[size]} label={loadingText ?? 'Loading...'} />
        )}
        {isLoading && loadingText ? loadingText : children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
