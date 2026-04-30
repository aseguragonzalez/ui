import { forwardRef } from 'react';
import { Select, type SelectSize } from '../../primitives/Select/Select';
import { Label } from '../../primitives/Label/Label';
import { Hint } from '../../primitives/Hint/Hint';
import { ErrorMessage } from '../../primitives/ErrorMessage/ErrorMessage';
import { useFieldIds } from '../shared/useFieldIds';
import styles from './SelectField.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectFieldProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'id'> {
  label: string;
  /** Structured options — use this OR children, not both. */
  options?: SelectOption[];
  /** Placeholder option shown when no value is selected. */
  placeholder?: string;
  hint?: string;
  error?: string;
  size?: SelectSize;
  required?: boolean;
  inputId?: string;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      label,
      options,
      placeholder,
      hint,
      error,
      size = 'md',
      required = false,
      disabled = false,
      inputId,
      className,
      children,
      ...selectProps
    },
    ref,
  ) => {
    const { id, hintId, errorId, describedBy } = useFieldIds({ inputId, hint, error });

    return (
      <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
        <Label htmlFor={id} required={required} disabled={disabled}>
          {label}
        </Label>

        <Select
          ref={ref}
          id={id}
          size={size}
          hasError={Boolean(error)}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-describedby={describedBy}
          {...selectProps}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </Select>

        {error ? (
          <ErrorMessage id={errorId}>{error}</ErrorMessage>
        ) : hint ? (
          <Hint id={hintId}>{hint}</Hint>
        ) : null}
      </div>
    );
  },
);

SelectField.displayName = 'SelectField';

export { SelectField };
