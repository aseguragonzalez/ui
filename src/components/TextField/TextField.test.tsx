import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TextField } from './TextField';

describe('TextField', () => {
  describe('rendering', () => {
    it('renders the label and input', () => {
      render(<TextField label="Nombre" name="name" />);
      expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    });

    it('renders hint text', () => {
      render(<TextField label="Email" name="email" hint="Usaremos este email para contactarte" />);
      expect(screen.getByText('Usaremos este email para contactarte')).toBeInTheDocument();
    });

    it('renders error message and hides hint when both are provided', () => {
      render(
        <TextField
          label="Email"
          name="email"
          hint="Texto de ayuda"
          error="El email no es válido"
        />,
      );
      expect(screen.getByText('El email no es válido')).toBeInTheDocument();
      expect(screen.queryByText('Texto de ayuda')).not.toBeInTheDocument();
    });
  });

  describe('accessibility wiring', () => {
    it('associates label with input via htmlFor/id', () => {
      render(<TextField label="Apellidos" name="surname" />);
      const input = screen.getByLabelText('Apellidos');
      expect(input.tagName).toBe('INPUT');
    });

    it('sets aria-required when required prop is true', () => {
      render(<TextField label="Nombre" name="name" required />);
      expect(screen.getByRole('textbox', { name: /nombre/i })).toHaveAttribute(
        'aria-required',
        'true',
      );
    });

    it('sets aria-invalid when error is present', () => {
      render(<TextField label="Email" name="email" error="Campo obligatorio" />);
      expect(screen.getByRole('textbox', { name: /email/i })).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });

    it('does not set aria-invalid when there is no error', () => {
      render(<TextField label="Email" name="email" />);
      expect(screen.getByRole('textbox', { name: /email/i })).not.toHaveAttribute('aria-invalid');
    });

    it('connects input with hint via aria-describedby', () => {
      render(<TextField label="Email" name="email" hint="Ayuda" />);
      const input = screen.getByRole('textbox');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      const hintEl = document.getElementById(describedBy!);
      expect(hintEl).toHaveTextContent('Ayuda');
    });

    it('connects input with error via aria-describedby', () => {
      render(<TextField label="Email" name="email" error="Error de validación" />);
      const input = screen.getByRole('textbox');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      const errorEl = document.getElementById(describedBy!);
      expect(errorEl).toHaveTextContent('Error de validación');
    });

    it('has no aria-describedby when neither hint nor error is provided', () => {
      render(<TextField label="Nombre" name="name" />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby');
    });

    it('disables the input when disabled prop is true', () => {
      render(<TextField label="Nombre" name="name" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — base field', async () => {
      const { container } = render(<TextField label="Nombre completo" name="name" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with hint', async () => {
      const { container } = render(
        <TextField label="Email" name="email" hint="Introduce tu email corporativo" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <TextField label="Email" name="email" error="El formato no es válido" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — required field', async () => {
      const { container } = render(<TextField label="Nombre" name="name" required />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled field', async () => {
      const { container } = render(<TextField label="Nombre" name="name" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
