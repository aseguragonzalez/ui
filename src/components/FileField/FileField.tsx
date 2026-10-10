import { forwardRef } from 'react';
import { FileInput, type FileInputSize } from '../../primitives/FileInput/FileInput';
import { Label } from '../../primitives/Label/Label';
import { Hint } from '../../primitives/Hint/Hint';
import { ErrorMessage } from '../../primitives/ErrorMessage/ErrorMessage';
import { useFieldIds } from '../shared/useFieldIds';
import styles from './FileField.module.css';

export interface FileFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'id' | 'value'> {
  /** Visible label text. Always required — never use placeholder as a label. */
  label: string;
  /** Helper text shown below the input when there is no error. */
  hint?: string;
  /** Validation error. Replaces hint when present. */
  error?: string;
  size?: FileInputSize;
  /** Marks the field as required visually and via aria-required. */
  required?: boolean;
  /** Custom id for the input. Auto-generated if omitted. */
  inputId?: string;
}

const FileField = forwardRef<HTMLInputElement, FileFieldProps>(
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

        <FileInput
          ref={ref}
          id={id}
          size={size}
          hasError={Boolean(error)}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-describedby={describedBy}
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

FileField.displayName = 'FileField';

export { FileField };
