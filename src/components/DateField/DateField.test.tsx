import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { DateField } from './DateField';

describe('DateField', () => {
  describe('rendering', () => {
    it('renders a date input', () => {
      render(<DateField label="Fecha de inicio" />);
      expect(screen.getByLabelText('Fecha de inicio')).toHaveAttribute('type', 'date');
    });

    it('renders the label', () => {
      render(<DateField label="Fecha de nacimiento" />);
      expect(screen.getByText('Fecha de nacimiento')).toBeInTheDocument();
    });

    it('associates label with input via htmlFor', () => {
      render(<DateField label="Fecha de inicio" />);
      expect(screen.getByLabelText('Fecha de inicio')).toBeInTheDocument();
    });

    it('renders hint when provided', () => {
      render(<DateField label="Fecha" hint="Formato: DD/MM/AAAA" />);
      expect(screen.getByText('Formato: DD/MM/AAAA')).toBeInTheDocument();
    });

    it('renders error when provided', () => {
      render(<DateField label="Fecha" error="Fecha inválida" />);
      expect(screen.getByText('Fecha inválida')).toBeInTheDocument();
    });

    it('shows error instead of hint when both are provided', () => {
      render(<DateField label="Fecha" hint="Ayuda" error="Error" />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.queryByText('Ayuda')).not.toBeInTheDocument();
    });

    it('forwards the ref to the input', () => {
      const ref = { current: null };
      render(<DateField ref={ref} label="Fecha" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('ARIA', () => {
    it('sets aria-required when required is true', () => {
      render(<DateField label="Fecha de inicio" required />);
      expect(screen.getByLabelText(/fecha de inicio/i)).toHaveAttribute('aria-required', 'true');
    });

    it('sets aria-invalid when error is provided', () => {
      render(<DateField label="Fecha" error="Fecha inválida" />);
      expect(screen.getByLabelText(/fecha/i)).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error with input via aria-describedby', () => {
      render(<DateField label="Fecha" error="Fecha fuera de rango" />);
      const input = screen.getByLabelText(/fecha/i);
      const errorId = input.getAttribute('aria-describedby');
      expect(document.getElementById(errorId!)).toHaveTextContent('Fecha fuera de rango');
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(<DateField label="Fecha de inicio" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with hint', async () => {
      const { container } = render(<DateField label="Fecha" hint="Selecciona una fecha" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(<DateField label="Fecha" error="Fecha inválida" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — required', async () => {
      const { container } = render(<DateField label="Fecha de nacimiento" required />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with min/max', async () => {
      const { container } = render(
        <DateField label="Fecha" min="2020-01-01" max="2030-12-31" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<DateField label="Fecha" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
