import { forwardRef } from 'react';
import styles from '../TextInput/TextInput.module.css';

export type SearchInputSize = 'sm' | 'md' | 'lg';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  hasError?: boolean;
  size?: SearchInputSize;
}

/**
 * Primitive search input — wraps input[type="search"] (implicit role: searchbox).
 * The native browser cancel button is suppressed via CSS for visual consistency.
 * Does not manage label, hint, or error rendering.
 * Use SearchField for the full accessible field composition.
 */
const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ hasError = false, size = 'md', className, ...nativeProps }, ref) => {
    const classNames = [
      styles.input,
      styles[size],
      hasError ? styles.error : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        ref={ref}
        type="search"
        aria-invalid={hasError || undefined}
        className={classNames}
        {...nativeProps}
      />
    );
  },
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };
