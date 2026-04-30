import styles from './Hint.module.css';

export interface HintProps extends React.HTMLAttributes<HTMLSpanElement> {}

function Hint({ children, className, ...nativeProps }: HintProps) {
  return (
    <span
      className={[styles.hint, className ?? ''].filter(Boolean).join(' ')}
      {...nativeProps}
    >
      {children}
    </span>
  );
}

Hint.displayName = 'Hint';

export { Hint };
