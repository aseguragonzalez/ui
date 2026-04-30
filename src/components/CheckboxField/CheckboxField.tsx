import { forwardRef } from 'react';
import { Checkbox, type CheckboxSize } from '../../primitives/Checkbox/Checkbox';
import { Hint } from '../../primitives/Hint/Hint';
import { ErrorMessage } from '../../primitives/ErrorMessage/ErrorMessage';
import { useFieldIds } from '../shared/useFieldIds';
import styles from './CheckboxField.module.css';

export interface CheckboxFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'id'> {
  /** Visible label text adjacent to the checkbox. */
  label: React.ReactNode;
  hint?: string;
  error?: string;
  size?: CheckboxSize;
  inputId?: string;
}

/**
 * Composite: Checkbox + inline label + optional hint/error.
 * Layout: [☑] Label text
 *              hint or error below
 *
 * For groups of checkboxes, compose several CheckboxField inside a
 * <fieldset> + <legend> at the page level.
 */
const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  (
    {
      label,
      hint,
      error,
      size = 'md',
      disabled = false,
      inputId,
      className,
      ...inputProps
    },
    ref,
  ) => {
    const { id, hintId, errorId, describedBy } = useFieldIds({ inputId, hint, error });

    return (
      <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
        <div className={styles.row}>
          <Checkbox
            ref={ref}
            id={id}
            size={size}
            hasError={Boolean(error)}
            disabled={disabled}
            aria-describedby={describedBy}
            {...inputProps}
          />
          <label
            htmlFor={id}
            className={[styles.label, disabled ? styles.disabled : ''].filter(Boolean).join(' ')}
          >
            {label}
          </label>
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

CheckboxField.displayName = 'CheckboxField';

export { CheckboxField };
