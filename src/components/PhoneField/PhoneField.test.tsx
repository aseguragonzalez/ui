import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { PhoneField } from './PhoneField';

describe('PhoneField', () => {
  describe('rendering', () => {
    it('renders the label and a tel input', () => {
      render(<PhoneField label="Teléfono" name="phone" />);
      expect(screen.getByLabelText('Teléfono')).toHaveAttribute('type', 'tel');
    });

    it('renders hint text', () => {
      render(<PhoneField label="Teléfono" name="phone" hint="Formato: +34 612 345 678." />);
      expect(screen.getByText('Formato: +34 612 345 678.')).toBeInTheDocument();
    });

    it('renders error message and hides hint when both are provided', () => {
      render(
        <PhoneField label="Teléfono" name="phone" hint="Texto de ayuda" error="Formato incorrecto" />,
      );
      expect(screen.getByText('Formato incorrecto')).toBeInTheDocument();
      expect(screen.queryByText('Texto de ayuda')).not.toBeInTheDocument();
    });
  });

  describe('accessibility wiring', () => {
    it('associates label with input via htmlFor/id', () => {
      render(<PhoneField label="Teléfono" name="phone" />);
      expect(screen.getByLabelText('Teléfono').tagName).toBe('INPUT');
    });

    it('sets aria-required when required prop is true', () => {
      render(<PhoneField label="Teléfono" name="phone" required />);
      expect(screen.getByRole('textbox', { name: /teléfono/i })).toHaveAttribute(
        'aria-required',
        'true',
      );
    });

    it('sets aria-invalid when error is present', () => {
      render(<PhoneField label="Teléfono" name="phone" error="Formato incorrecto" />);
      expect(screen.getByRole('textbox', { name: /teléfono/i })).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });

    it('does not set aria-invalid when there is no error', () => {
      render(<PhoneField label="Teléfono" name="phone" />);
      expect(screen.getByRole('textbox', { name: /teléfono/i })).not.toHaveAttribute(
        'aria-invalid',
      );
    });

    it('disables the input when disabled prop is true', () => {
      render(<PhoneField label="Teléfono" name="phone" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — base field', async () => {
      const { container } = render(<PhoneField label="Teléfono" name="phone" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with hint', async () => {
      const { container } = render(
        <PhoneField label="Teléfono" name="phone" hint="Formato: +34 612 345 678." />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <PhoneField label="Teléfono" name="phone" error="Formato incorrecto." />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — required', async () => {
      const { container } = render(<PhoneField label="Teléfono" name="phone" required />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<PhoneField label="Teléfono" name="phone" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
