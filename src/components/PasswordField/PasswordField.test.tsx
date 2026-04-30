import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { PasswordField } from './PasswordField';

describe('PasswordField', () => {
  describe('rendering', () => {
    it('renders the label and input', () => {
      render(<PasswordField label="Contraseña" name="password" />);
      expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    });

    it('renders hint text', () => {
      render(
        <PasswordField
          label="Contraseña"
          name="password"
          hint="Mínimo 8 caracteres, una mayúscula y un número."
        />,
      );
      expect(
        screen.getByText('Mínimo 8 caracteres, una mayúscula y un número.'),
      ).toBeInTheDocument();
    });

    it('renders error message and hides hint when both are provided', () => {
      render(
        <PasswordField
          label="Contraseña"
          name="password"
          hint="Texto de ayuda"
          error="La contraseña no es válida"
        />,
      );
      expect(screen.getByText('La contraseña no es válida')).toBeInTheDocument();
      expect(screen.queryByText('Texto de ayuda')).not.toBeInTheDocument();
    });
  });

  describe('accessibility wiring', () => {
    it('associates label with input via htmlFor/id', () => {
      render(<PasswordField label="Contraseña" name="password" />);
      const input = screen.getByLabelText('Contraseña');
      expect(input.tagName).toBe('INPUT');
    });

    it('sets aria-required when required prop is true', () => {
      render(<PasswordField label="Contraseña" name="password" required />);
      // Regex needed: required asterisk is in the label DOM so exact string no longer matches
      expect(screen.getByLabelText(/contraseña/i)).toHaveAttribute('aria-required', 'true');
    });

    it('sets aria-invalid when error is present', () => {
      render(
        <PasswordField label="Contraseña" name="password" error="Contraseña incorrecta" />,
      );
      expect(screen.getByLabelText('Contraseña')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when there is no error', () => {
      render(<PasswordField label="Contraseña" name="password" />);
      expect(screen.getByLabelText('Contraseña')).not.toHaveAttribute('aria-invalid');
    });

    it('connects input with hint via aria-describedby', () => {
      render(<PasswordField label="Contraseña" name="password" hint="Ayuda" />);
      const input = screen.getByLabelText('Contraseña');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      const hintEl = document.getElementById(describedBy!);
      expect(hintEl).toHaveTextContent('Ayuda');
    });

    it('connects input with error via aria-describedby', () => {
      render(
        <PasswordField label="Contraseña" name="password" error="Error de validación" />,
      );
      const input = screen.getByLabelText('Contraseña');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      const errorEl = document.getElementById(describedBy!);
      expect(errorEl).toHaveTextContent('Error de validación');
    });

    it('has no aria-describedby when neither hint nor error is provided', () => {
      render(<PasswordField label="Contraseña" name="password" />);
      expect(screen.getByLabelText('Contraseña')).not.toHaveAttribute('aria-describedby');
    });

    it('disables the input when disabled prop is true', () => {
      render(<PasswordField label="Contraseña" name="password" disabled />);
      expect(screen.getByLabelText('Contraseña')).toBeDisabled();
    });
  });

  describe('show/hide toggle', () => {
    it('toggles password visibility within the field', async () => {
      const user = userEvent.setup();
      render(<PasswordField label="Contraseña" name="password" />);
      const input = screen.getByLabelText('Contraseña');

      expect(input).toHaveAttribute('type', 'password');

      await user.click(screen.getByRole('button', { name: 'Show password' }));

      expect(input).toHaveAttribute('type', 'text');
      expect(screen.getByRole('button', { name: 'Hide password' })).toBeInTheDocument();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — base field', async () => {
      const { container } = render(<PasswordField label="Contraseña" name="password" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with hint', async () => {
      const { container } = render(
        <PasswordField
          label="Contraseña"
          name="password"
          hint="Mínimo 8 caracteres."
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <PasswordField label="Contraseña" name="password" error="La contraseña no es válida." />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — required field', async () => {
      const { container } = render(
        <PasswordField label="Contraseña" name="password" required />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled field', async () => {
      const { container } = render(
        <PasswordField label="Contraseña" name="password" disabled />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — password visible', async () => {
      const user = userEvent.setup();
      const { container } = render(<PasswordField label="Contraseña" name="password" />);
      await user.click(screen.getByRole('button', { name: 'Show password' }));
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
