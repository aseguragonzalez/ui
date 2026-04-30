import { forwardRef } from 'react';
import { TextArea, type TextAreaSize } from '../../primitives/TextArea/TextArea';
import { Label } from '../../primitives/Label/Label';
import { Hint } from '../../primitives/Hint/Hint';
import { ErrorMessage } from '../../primitives/ErrorMessage/ErrorMessage';
import { useFieldIds } from '../shared/useFieldIds';
import styles from './TextAreaField.module.css';

export interface TextAreaFieldProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'id'> {
  /** Visible label text. Always required — never use placeholder as a label. */
  label: string;
  /** Helper text shown below the textarea when there is no error. */
  hint?: string;
  /** Validation error. Replaces hint when present. */
  error?: string;
  size?: TextAreaSize;
  /** Marks the field as required visually and via aria-required. */
  required?: boolean;
  /** Grows to fit content; disables the manual resize handle. */
  autoResize?: boolean;
  /** Custom id for the textarea. Auto-generated if omitted. */
  inputId?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      label,
      hint,
      error,
      size = 'md',
      required = false,
      disabled = false,
      autoResize = false,
      inputId,
      className,
      ...textareaProps
    },
    ref,
  ) => {
    const { id, hintId, errorId, describedBy } = useFieldIds({ inputId, hint, error });

    return (
      <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
        <Label htmlFor={id} required={required} disabled={disabled}>
          {label}
        </Label>

        <TextArea
          ref={ref}
          id={id}
          size={size}
          hasError={Boolean(error)}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-describedby={describedBy}
          autoResize={autoResize}
          {...textareaProps}
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

TextAreaField.displayName = 'TextAreaField';

export { TextAreaField };
