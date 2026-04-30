import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { NumberInput } from './NumberInput';

describe('NumberInput', () => {
  describe('rendering', () => {
    it('renders as type="number"', () => {
      render(<NumberInput aria-label="Cantidad" />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
    });

    it('forwards the ref to the input element', () => {
      const ref = { current: null };
      render(<NumberInput ref={ref} aria-label="Cantidad" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('passes native attributes', () => {
      render(<NumberInput aria-label="Cantidad" data-testid="num" />);
      expect(screen.getByTestId('num')).toBeInTheDocument();
    });

    it('passes min, max, and step to the input', () => {
      render(<NumberInput aria-label="Cantidad" min={0} max={100} step={5} />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
      expect(input).toHaveAttribute('step', '5');
    });
  });

  describe('error state', () => {
    it('sets aria-invalid when hasError is true', () => {
      render(<NumberInput aria-label="Cantidad" hasError />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when hasError is false', () => {
      render(<NumberInput aria-label="Cantidad" />);
      expect(screen.getByRole('spinbutton')).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<NumberInput aria-label="Cantidad" disabled />);
      expect(screen.getByRole('spinbutton')).toBeDisabled();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(<NumberInput aria-label="Cantidad" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with value', async () => {
      const { container } = render(
        <NumberInput aria-label="Precio" value={42} readOnly />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <NumberInput aria-label="Cantidad" hasError aria-describedby="err" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<NumberInput aria-label="Cantidad" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
