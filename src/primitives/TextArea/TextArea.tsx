import { forwardRef, useCallback, useEffect, useRef } from 'react';
import styles from './TextArea.module.css';

export type TextAreaSize = 'sm' | 'md' | 'lg';

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  hasError?: boolean;
  size?: TextAreaSize;
  /** Grows to fit content; disables the manual resize handle. */
  autoResize?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { hasError = false, size = 'md', autoResize = false, className, onChange, ...nativeProps },
    ref,
  ) => {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    const setRef = useCallback(
      (el: HTMLTextAreaElement | null) => {
        innerRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
      },
      [ref],
    );

    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      if (autoResize) {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
      } else {
        el.style.height = '';
      }
    }, [autoResize]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (autoResize) {
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
        }
        onChange?.(e);
      },
      [autoResize, onChange],
    );

    const classNames = [
      styles.textarea,
      styles[size],
      hasError ? styles.error : '',
      autoResize ? styles.autoResize : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <textarea
        ref={setRef}
        aria-invalid={hasError || undefined}
        className={classNames}
        onChange={handleChange}
        {...nativeProps}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export { TextArea };
