import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { EmailField } from './EmailField';

describe('EmailField', () => {
  describe('rendering', () => {
    it('renders the label and an email input', () => {
      render(<EmailField label="Email" name="email" />);
      expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    });

    it('renders hint text', () => {
      render(<EmailField label="Email" name="email" hint="Introduce tu email corporativo." />);
      expect(screen.getByText('Introduce tu email corporativo.')).toBeInTheDocument();
    });

    it('renders error message and hides hint when both are provided', () => {
      render(
        <EmailField label="Email" name="email" hint="Texto de ayuda" error="El email no es válido" />,
      );
      expect(screen.getByText('El email no es válido')).toBeInTheDocument();
      expect(screen.queryByText('Texto de ayuda')).not.toBeInTheDocument();
    });
  });

  describe('accessibility wiring', () => {
    it('associates label with input via htmlFor/id', () => {
      render(<EmailField label="Email" name="email" />);
      expect(screen.getByLabelText('Email').tagName).toBe('INPUT');
    });

    it('sets aria-required when required prop is true', () => {
      render(<EmailField label="Email" name="email" required />);
      expect(screen.getByRole('textbox', { name: /email/i })).toHaveAttribute(
        'aria-required',
        'true',
      );
    });

    it('sets aria-invalid when error is present', () => {
      render(<EmailField label="Email" name="email" error="Formato incorrecto" />);
      expect(screen.getByRole('textbox', { name: /email/i })).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });

    it('does not set aria-invalid when there is no error', () => {
      render(<EmailField label="Email" name="email" />);
      expect(screen.getByRole('textbox', { name: /email/i })).not.toHaveAttribute('aria-invalid');
    });

    it('connects input with hint via aria-describedby', () => {
      render(<EmailField label="Email" name="email" hint="Ayuda" />);
      const input = screen.getByRole('textbox');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy!)).toHaveTextContent('Ayuda');
    });

    it('connects input with error via aria-describedby', () => {
      render(<EmailField label="Email" name="email" error="Error de validación" />);
      const input = screen.getByRole('textbox');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy!)).toHaveTextContent('Error de validación');
    });

    it('disables the input when disabled prop is true', () => {
      render(<EmailField label="Email" name="email" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — base field', async () => {
      const { container } = render(<EmailField label="Email" name="email" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with hint', async () => {
      const { container } = render(
        <EmailField label="Email" name="email" hint="Introduce tu email corporativo." />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <EmailField label="Email" name="email" error="El email no es válido." />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — required', async () => {
      const { container } = render(<EmailField label="Email" name="email" required />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<EmailField label="Email" name="email" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
