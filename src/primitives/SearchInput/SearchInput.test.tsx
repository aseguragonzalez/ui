import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  describe('rendering', () => {
    it('renders as type="search" with implicit role searchbox', () => {
      render(<SearchInput aria-label="Buscar" />);
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('renders as type="search"', () => {
      render(<SearchInput aria-label="Buscar" />);
      expect(screen.getByLabelText('Buscar')).toHaveAttribute('type', 'search');
    });

    it('sets aria-invalid when hasError is true', () => {
      render(<SearchInput aria-label="Buscar" hasError />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when hasError is false', () => {
      render(<SearchInput aria-label="Buscar" />);
      expect(screen.getByRole('searchbox')).not.toHaveAttribute('aria-invalid');
    });

    it('renders as disabled', () => {
      render(<SearchInput aria-label="Buscar" disabled />);
      expect(screen.getByRole('searchbox')).toBeDisabled();
    });

    it('forwards the ref to the input element', () => {
      const ref = { current: null };
      render(<SearchInput aria-label="Buscar" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations', async () => {
      const { container } = render(<SearchInput aria-label="Buscar" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(<SearchInput aria-label="Buscar" hasError />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
