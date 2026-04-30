import { useFieldIds } from '../shared/useFieldIds';
import { RadioButton, type RadioButtonSize } from '../../primitives/RadioButton/RadioButton';
import { Hint } from '../../primitives/Hint/Hint';
import { ErrorMessage } from '../../primitives/ErrorMessage/ErrorMessage';
import styles from './RadioGroup.module.css';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Group label — rendered as <legend> inside <fieldset>. */
  legend: string;
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  size?: RadioButtonSize;
  className?: string;
}

/**
 * Composite radio group using <fieldset> + <legend> — the WCAG-correct
 * pattern for grouped form controls. Each option gets its own <label>.
 */
function RadioGroup({
  legend,
  name,
  options,
  value,
  defaultValue,
  onChange,
  hint,
  error,
  required = false,
  disabled = false,
  size = 'md',
  className,
}: RadioGroupProps) {
  const { id: groupId, hintId, errorId, describedBy } = useFieldIds({ hint, error });

  return (
    <fieldset
      className={[styles.fieldset, className ?? ''].filter(Boolean).join(' ')}
      aria-describedby={describedBy}
      disabled={disabled}
    >
      <legend className={[styles.legend, disabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
        {legend}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </legend>

      {options.map((option, index) => {
        const optionId = `${groupId}-${option.value}`;
        const isDisabled = disabled || option.disabled;

        return (
          <div key={option.value} className={styles.option}>
            <RadioButton
              id={optionId}
              name={name}
              value={option.value}
              size={size}
              hasError={Boolean(error)}
              disabled={isDisabled}
              required={required && index === 0}
              checked={value !== undefined ? value === option.value : undefined}
              defaultChecked={defaultValue !== undefined ? defaultValue === option.value : undefined}
              onChange={onChange ? () => onChange(option.value) : undefined}
            />
            <label
              htmlFor={optionId}
              className={[
                styles.optionLabel,
                isDisabled ? styles.disabled : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {option.label}
            </label>
          </div>
        );
      })}

      {(error || hint) && (
        <div className={styles.footer}>
          {error ? (
            <ErrorMessage id={errorId}>{error}</ErrorMessage>
          ) : hint ? (
            <Hint id={hintId}>{hint}</Hint>
          ) : null}
        </div>
      )}
    </fieldset>
  );
}

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
