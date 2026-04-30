import { forwardRef } from 'react';
import { PasswordInput, type PasswordInputSize } from '../../primitives/PasswordInput/PasswordInput';
import { Label } from '../../primitives/Label/Label';
import { Hint } from '../../primitives/Hint/Hint';
import { ErrorMessage } from '../../primitives/ErrorMessage/ErrorMessage';
import { useFieldIds } from '../shared/useFieldIds';
import styles from './PasswordField.module.css';

export interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'id'> {
  /** Visible label text. Always required — never use placeholder as a label. */
  label: string;
  /** Helper text shown below the input when there is no error. */
  hint?: string;
  /** Validation error. Replaces hint when present. */
  error?: string;
  size?: PasswordInputSize;
  /** Marks the field as required visually and via aria-required. */
  required?: boolean;
  /** Accessible label for the "show password" button state. */
  showPasswordLabel?: string;
  /** Accessible label for the "hide password" button state. */
  hidePasswordLabel?: string;
  /** Custom id for the input. Auto-generated if omitted. */
  inputId?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      hint,
      error,
      size = 'md',
      required = false,
      disabled = false,
      showPasswordLabel,
      hidePasswordLabel,
      inputId,
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

        <PasswordInput
          ref={ref}
          id={id}
          size={size}
          hasError={Boolean(error)}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-describedby={describedBy}
          showPasswordLabel={showPasswordLabel}
          hidePasswordLabel={hidePasswordLabel}
          {...inputProps}
        />

        {error ? (
          <ErrorMessage id={errorId}>{error}</ErrorMessage>
        ) : hint ? (
          <Hint id={hintId}>{hint}</Hint>
        ) : null}
      </div>
    );
  },
);

PasswordField.displayName = 'PasswordField';

export { PasswordField };
