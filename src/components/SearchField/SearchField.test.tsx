import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { SearchField } from './SearchField';

describe('SearchField', () => {
  describe('rendering', () => {
    it('renders the label and a search input with role searchbox', () => {
      render(<SearchField label="Buscar" name="q" />);
      expect(screen.getByRole('searchbox', { name: 'Buscar' })).toBeInTheDocument();
    });

    it('renders as type="search"', () => {
      render(<SearchField label="Buscar" name="q" />);
      expect(screen.getByLabelText('Buscar')).toHaveAttribute('type', 'search');
    });

    it('renders hint text', () => {
      render(<SearchField label="Buscar" name="q" hint="Pulsa Enter para buscar." />);
      expect(screen.getByText('Pulsa Enter para buscar.')).toBeInTheDocument();
    });

    it('renders error message and hides hint when both are provided', () => {
      render(
        <SearchField label="Buscar" name="q" hint="Texto de ayuda" error="Introduce al menos 3 caracteres" />,
      );
      expect(screen.getByText('Introduce al menos 3 caracteres')).toBeInTheDocument();
      expect(screen.queryByText('Texto de ayuda')).not.toBeInTheDocument();
    });
  });

  describe('accessibility wiring', () => {
    it('associates label with input via htmlFor/id', () => {
      render(<SearchField label="Buscar" name="q" />);
      expect(screen.getByLabelText('Buscar').tagName).toBe('INPUT');
    });

    it('sets aria-invalid when error is present', () => {
      render(<SearchField label="Buscar" name="q" error="Sin resultados" />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when there is no error', () => {
      render(<SearchField label="Buscar" name="q" />);
      expect(screen.getByRole('searchbox')).not.toHaveAttribute('aria-invalid');
    });

    it('connects input with hint via aria-describedby', () => {
      render(<SearchField label="Buscar" name="q" hint="Pulsa Enter." />);
      const input = screen.getByRole('searchbox');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy!)).toHaveTextContent('Pulsa Enter.');
    });

    it('disables the input when disabled prop is true', () => {
      render(<SearchField label="Buscar" name="q" disabled />);
      expect(screen.getByRole('searchbox')).toBeDisabled();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — base field', async () => {
      const { container } = render(<SearchField label="Buscar" name="q" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with hint', async () => {
      const { container } = render(
        <SearchField label="Buscar" name="q" hint="Pulsa Enter para buscar." />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <SearchField label="Buscar" name="q" error="Introduce al menos 3 caracteres." />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<SearchField label="Buscar" name="q" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
