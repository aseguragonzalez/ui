import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { CheckboxField } from './CheckboxField';

describe('CheckboxField', () => {
  describe('rendering', () => {
    it('renders checkbox and label', () => {
      render(<CheckboxField label="Acepto los términos" name="terms" />);
      expect(screen.getByRole('checkbox', { name: 'Acepto los términos' })).toBeInTheDocument();
    });

    it('renders hint text', () => {
      render(<CheckboxField label="Newsletter" name="newsletter" hint="Recibirás un email semanal" />);
      expect(screen.getByText('Recibirás un email semanal')).toBeInTheDocument();
    });

    it('renders error and hides hint when both provided', () => {
      render(
        <CheckboxField
          label="Términos"
          name="terms"
          hint="Texto de ayuda"
          error="Debes aceptar los términos"
        />,
      );
      expect(screen.getByText('Debes aceptar los términos')).toBeInTheDocument();
      expect(screen.queryByText('Texto de ayuda')).not.toBeInTheDocument();
    });
  });

  describe('accessibility wiring', () => {
    it('associates label with checkbox via htmlFor', () => {
      render(<CheckboxField label="Acepto" name="accept" />);
      const checkbox = screen.getByRole('checkbox', { name: 'Acepto' });
      expect(checkbox).toBeInTheDocument();
    });

    it('sets aria-invalid when error is present', () => {
      render(<CheckboxField label="Acepto" name="accept" error="Obligatorio" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('connects checkbox with error via aria-describedby', () => {
      render(<CheckboxField label="Acepto" name="accept" error="Debes aceptar" />);
      const describedBy = screen.getByRole('checkbox').getAttribute('aria-describedby');
      expect(document.getElementById(describedBy!)).toHaveTextContent('Debes aceptar');
    });

    it('disables the checkbox when disabled prop is true', () => {
      render(<CheckboxField label="Acepto" name="accept" disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — base', async () => {
      const { container } = render(<CheckboxField label="Acepto los términos y condiciones" name="terms" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <CheckboxField label="Acepto" name="terms" error="Debes aceptar los términos" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<CheckboxField label="Acepto" name="terms" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
