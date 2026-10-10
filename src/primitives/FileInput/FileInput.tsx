import { forwardRef } from 'react';
import textInputStyles from '../TextInput/TextInput.module.css';
import styles from './FileInput.module.css';

export type FileInputSize = 'sm' | 'md' | 'lg';

export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'value'> {
  hasError?: boolean;
  size?: FileInputSize;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ hasError = false, size = 'md', className, ...nativeProps }, ref) => {
    const classNames = [
      textInputStyles.input,
      textInputStyles[size],
      hasError ? textInputStyles.error : '',
      styles.fileInput,
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        ref={ref}
        type="file"
        aria-invalid={hasError || undefined}
        className={classNames}
        {...nativeProps}
      />
    );
  },
);

FileInput.displayName = 'FileInput';

export { FileInput };
