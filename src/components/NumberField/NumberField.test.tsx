import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { NumberField } from './NumberField';

describe('NumberField', () => {
  describe('rendering', () => {
    it('renders a number input', () => {
      render(<NumberField label="Cantidad" />);
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });

    it('renders the label', () => {
      render(<NumberField label="Precio unitario" />);
      expect(screen.getByText('Precio unitario')).toBeInTheDocument();
    });

    it('associates label with input via htmlFor', () => {
      render(<NumberField label="Cantidad" />);
      expect(screen.getByLabelText('Cantidad')).toBeInTheDocument();
    });

    it('renders hint when provided', () => {
      render(<NumberField label="Cantidad" hint="Entre 1 y 100" />);
      expect(screen.getByText('Entre 1 y 100')).toBeInTheDocument();
    });

    it('renders error when provided', () => {
      render(<NumberField label="Cantidad" error="Valor fuera de rango" />);
      expect(screen.getByText('Valor fuera de rango')).toBeInTheDocument();
    });

    it('shows error instead of hint when both are provided', () => {
      render(<NumberField label="Cantidad" hint="Entre 1 y 100" error="Valor fuera de rango" />);
      expect(screen.getByText('Valor fuera de rango')).toBeInTheDocument();
      expect(screen.queryByText('Entre 1 y 100')).not.toBeInTheDocument();
    });

    it('forwards the ref to the input', () => {
      const ref = { current: null };
      render(<NumberField ref={ref} label="Cantidad" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('ARIA', () => {
    it('sets aria-required when required is true', () => {
      render(<NumberField label="Cantidad" required />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-required', 'true');
    });

    it('sets aria-invalid when error is provided', () => {
      render(<NumberField label="Cantidad" error="Obligatorio" />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error with input via aria-describedby', () => {
      render(<NumberField label="Cantidad" error="Valor fuera de rango" />);
      const input = screen.getByRole('spinbutton');
      const errorId = input.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      expect(document.getElementById(errorId!)).toHaveTextContent('Valor fuera de rango');
    });

    it('associates hint with input via aria-describedby', () => {
      render(<NumberField label="Cantidad" hint="Entre 1 y 100" />);
      const input = screen.getByRole('spinbutton');
      const hintId = input.getAttribute('aria-describedby');
      expect(document.getElementById(hintId!)).toHaveTextContent('Entre 1 y 100');
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(<NumberField label="Cantidad" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with hint', async () => {
      const { container } = render(<NumberField label="Precio" hint="En euros" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(<NumberField label="Cantidad" error="Valor inválido" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — required', async () => {
      const { container } = render(<NumberField label="Cantidad" required />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<NumberField label="Cantidad" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with min/max/step', async () => {
      const { container } = render(
        <NumberField label="Valoración" min={1} max={10} step={1} />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
