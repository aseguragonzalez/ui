import { forwardRef } from 'react';
import styles from './RadioButton.module.css';

export type RadioButtonSize = 'sm' | 'md' | 'lg';

export interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  hasError?: boolean;
  size?: RadioButtonSize;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ hasError = false, size = 'md', className, ...nativeProps }, ref) => {
    const classNames = [
      styles.radio,
      size !== 'md' ? styles[size] : '',
      hasError ? styles.error : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        ref={ref}
        type="radio"
        aria-invalid={hasError || undefined}
        className={classNames}
        {...nativeProps}
      />
    );
  },
);

RadioButton.displayName = 'RadioButton';

export { RadioButton };
