import { useState } from 'react';
import { useFieldIds } from '../shared/useFieldIds';
import { Checkbox, type CheckboxSize } from '../../primitives/Checkbox/Checkbox';
import { Hint } from '../../primitives/Hint/Hint';
import { ErrorMessage } from '../../primitives/ErrorMessage/ErrorMessage';
import styles from './CheckboxGroup.module.css';

export interface CheckboxOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  legend: string;
  name: string;
  options: CheckboxOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  hint?: string;
  error?: string;
  disabled?: boolean;
  size?: CheckboxSize;
  className?: string;
}

function CheckboxGroup({
  legend,
  name,
  options,
  value,
  defaultValue,
  onChange,
  hint,
  error,
  disabled = false,
  size = 'md',
  className,
}: CheckboxGroupProps) {
  const { id: groupId, hintId, errorId, describedBy } = useFieldIds({ hint, error });
  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(defaultValue ?? []);
  const selected = value ?? uncontrolledValue;

  function toggle(optionValue: string, checked: boolean) {
    const next = options
      .map((option) => option.value)
      .filter((candidate) => (candidate === optionValue ? checked : selected.includes(candidate)));
    if (value === undefined) {
      setUncontrolledValue(next);
    }
    onChange?.(next);
  }

  return (
    <fieldset
      className={[styles.fieldset, className ?? ''].filter(Boolean).join(' ')}
      aria-describedby={describedBy}
      disabled={disabled}
    >
      <legend className={[styles.legend, disabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
        {legend}
      </legend>

      {options.map((option, index) => {
        const optionId = `${groupId}-${index}`;
        const isDisabled = disabled || option.disabled;

        return (
          <div key={option.value} className={styles.option}>
            <Checkbox
              id={optionId}
              name={name}
              value={option.value}
              size={size}
              hasError={Boolean(error)}
              disabled={isDisabled}
              checked={selected.includes(option.value)}
              onChange={(event) => toggle(option.value, event.target.checked)}
            />
            <label
              htmlFor={optionId}
              className={[styles.optionLabel, isDisabled ? styles.disabled : ''].filter(Boolean).join(' ')}
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

CheckboxGroup.displayName = 'CheckboxGroup';

export { CheckboxGroup };
