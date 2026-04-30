import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { DateInput } from './DateInput';

describe('DateInput', () => {
  describe('rendering', () => {
    it('renders as type="date"', () => {
      render(<DateInput aria-label="Fecha de nacimiento" />);
      expect(screen.getByLabelText('Fecha de nacimiento')).toHaveAttribute('type', 'date');
    });

    it('forwards the ref to the input element', () => {
      const ref = { current: null };
      render(<DateInput ref={ref} aria-label="Fecha" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('passes native attributes', () => {
      render(<DateInput aria-label="Fecha" data-testid="date-input" />);
      expect(screen.getByTestId('date-input')).toBeInTheDocument();
    });

    it('accepts ISO 8601 value', () => {
      render(<DateInput aria-label="Fecha" value="2026-04-27" readOnly />);
      expect(screen.getByLabelText('Fecha')).toHaveValue('2026-04-27');
    });

    it('passes min and max as ISO 8601 strings', () => {
      render(<DateInput aria-label="Fecha" min="2020-01-01" max="2030-12-31" />);
      const input = screen.getByLabelText('Fecha');
      expect(input).toHaveAttribute('min', '2020-01-01');
      expect(input).toHaveAttribute('max', '2030-12-31');
    });
  });

  describe('error state', () => {
    it('sets aria-invalid when hasError is true', () => {
      render(<DateInput aria-label="Fecha" hasError />);
      expect(screen.getByLabelText('Fecha')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid by default', () => {
      render(<DateInput aria-label="Fecha" />);
      expect(screen.getByLabelText('Fecha')).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<DateInput aria-label="Fecha" disabled />);
      expect(screen.getByLabelText('Fecha')).toBeDisabled();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(<DateInput aria-label="Fecha de inicio" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with value', async () => {
      const { container } = render(
        <DateInput aria-label="Fecha" value="2026-04-27" readOnly />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <DateInput aria-label="Fecha" hasError aria-describedby="err" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<DateInput aria-label="Fecha" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
