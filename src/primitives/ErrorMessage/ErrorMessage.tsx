import styles from './ErrorMessage.module.css';

export type ErrorMessageProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * Renders a validation error for a form field.
 * Must be connected to the input via aria-describedby on the input side.
 * We do NOT use role="alert" here — the parent TextField sets aria-invalid
 * on the input, which is the correct WCAG pattern for inline form errors.
 */
function ErrorMessage({ children, className, ...nativeProps }: ErrorMessageProps) {
  return (
    <span
      className={[styles.error, className ?? ''].filter(Boolean).join(' ')}
      {...nativeProps}
    >
      {children}
    </span>
  );
}

ErrorMessage.displayName = 'ErrorMessage';

export { ErrorMessage };
