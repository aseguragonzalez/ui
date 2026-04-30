import { forwardRef } from 'react';
import { Toggle, type ToggleSize } from '../../primitives/Toggle/Toggle';
import { Label } from '../../primitives/Label/Label';
import { Hint } from '../../primitives/Hint/Hint';
import { ErrorMessage } from '../../primitives/ErrorMessage/ErrorMessage';
import { useFieldIds } from '../shared/useFieldIds';
import styles from './ToggleField.module.css';

export interface ToggleFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'id'> {
  /** Visible label text. */
  label: string;
  /** Helper text shown below the field when there is no error. */
  hint?: string;
  /** Validation error. Replaces hint when present. */
  error?: string;
  size?: ToggleSize;
  /** Marks the field as required visually and via aria-required. */
  required?: boolean;
  /** Custom id for the input. Auto-generated if omitted. */
  inputId?: string;
}

const ToggleField = forwardRef<HTMLInputElement, ToggleFieldProps>(
  (
    {
      label,
      hint,
      error,
      size = 'md',
      required = false,
      disabled = false,
      inputId,
      className,
      ...toggleProps
    },
    ref,
  ) => {
    const { id, hintId, errorId, describedBy } = useFieldIds({ inputId, hint, error });

    return (
      <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
        <div className={styles.field}>
          <Label htmlFor={id} required={required} disabled={disabled}>
            {label}
          </Label>
          <Toggle
            ref={ref}
            id={id}
            size={size}
            hasError={Boolean(error)}
            disabled={disabled}
            required={required}
            aria-required={required}
            aria-describedby={describedBy}
            {...toggleProps}
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

ToggleField.displayName = 'ToggleField';

export { ToggleField };
