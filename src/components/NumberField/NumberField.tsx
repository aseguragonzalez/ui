import { forwardRef } from 'react';
import { NumberInput, type NumberInputSize } from '../../primitives/NumberInput/NumberInput';
import { Label } from '../../primitives/Label/Label';
import { Hint } from '../../primitives/Hint/Hint';
import { ErrorMessage } from '../../primitives/ErrorMessage/ErrorMessage';
import { useFieldIds } from '../shared/useFieldIds';
import styles from './NumberField.module.css';

export interface NumberFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'id'> {
  /** Visible label text. Always required — never use placeholder as a label. */
  label: string;
  /** Helper text shown below the input when there is no error. */
  hint?: string;
  /** Validation error. Replaces hint when present. */
  error?: string;
  size?: NumberInputSize;
  /** Marks the field as required visually and via aria-required. */
  required?: boolean;
  /** Custom id for the input. Auto-generated if omitted. */
  inputId?: string;
  min?: number;
  max?: number;
  step?: number;
}

const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      label,
      hint,
      error,
      size = 'md',
      required = false,
      disabled = false,
      inputId,
      min,
      max,
      step,
      className,
      ...inputProps
    },
    ref,
  ) => {
    const { id, hintId, errorId, describedBy } = useFieldIds({ inputId, hint, error });

    return (
      <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
        <Label htmlFor={id} required={required} disabled={disabled}>
          {label}
        </Label>

        <div className={styles.inputWrapper}>
          <NumberInput
            ref={ref}
            id={id}
            size={size}
            hasError={Boolean(error)}
            disabled={disabled}
            required={required}
            aria-required={required}
            aria-describedby={describedBy}
            min={min}
            max={max}
            step={step}
            {...inputProps}
          />
        </div>

        {error ? (
          <ErrorMessage id={errorId}>{error}</ErrorMessage>
        ) : hint ? (
          <Hint id={hintId}>{hint}</Hint>
        ) : null}
      </div>
    );
  },
);

NumberField.displayName = 'NumberField';

export { NumberField };
