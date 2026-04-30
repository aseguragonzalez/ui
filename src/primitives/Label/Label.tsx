import styles from './Label.module.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
}

function Label({ required, disabled, children, className, ...nativeProps }: LabelProps) {
  const classNames = [styles.label, disabled ? styles.disabled : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classNames} {...nativeProps}>
      {children}
      {required && (
        <span className={styles.required} aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

Label.displayName = 'Label';

export { Label };
