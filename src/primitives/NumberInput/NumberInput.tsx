import { forwardRef } from 'react';
import textInputStyles from '../TextInput/TextInput.module.css';
import styles from './NumberInput.module.css';

export type NumberInputSize = 'sm' | 'md' | 'lg';

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  hasError?: boolean;
  size?: NumberInputSize;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ hasError = false, size = 'md', min, max, step, className, ...nativeProps }, ref) => {
    const classNames = [
      textInputStyles.input,
      textInputStyles[size],
      hasError ? textInputStyles.error : '',
      styles.numberInput,
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        ref={ref}
        type="number"
        min={min}
        max={max}
        step={step}
        aria-invalid={hasError || undefined}
        className={classNames}
        {...nativeProps}
      />
    );
  },
);

NumberInput.displayName = 'NumberInput';

export { NumberInput };
