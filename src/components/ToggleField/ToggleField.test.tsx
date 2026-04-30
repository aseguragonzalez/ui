import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ToggleField } from './ToggleField';

describe('ToggleField', () => {
  describe('rendering', () => {
    it('renders the label and switch', () => {
      render(<ToggleField label="Activar notificaciones" name="notifications" />);
      expect(
        screen.getByRole('switch', { name: 'Activar notificaciones' }),
      ).toBeInTheDocument();
    });

    it('renders hint text', () => {
      render(
        <ToggleField
          label="Modo oscuro"
          name="darkMode"
          hint="Ajusta el contraste según tus preferencias."
        />,
      );
      expect(
        screen.getByText('Ajusta el contraste según tus preferencias.'),
      ).toBeInTheDocument();
    });

    it('renders error message and hides hint when both are provided', () => {
      render(
        <ToggleField
          label="Aceptar condiciones"
          name="terms"
          hint="Texto de ayuda"
          error="Debes aceptar las condiciones para continuar."
        />,
      );
      expect(
        screen.getByText('Debes aceptar las condiciones para continuar.'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Texto de ayuda')).not.toBeInTheDocument();
    });
  });

  describe('accessibility wiring', () => {
    it('associates label with input via htmlFor/id', () => {
      render(<ToggleField label="Activar notificaciones" name="notifications" />);
      const input = screen.getByRole('switch', { name: 'Activar notificaciones' });
      expect(input.tagName).toBe('INPUT');
    });

    it('sets aria-required when required prop is true', () => {
      render(<ToggleField label="Aceptar condiciones" name="terms" required />);
      expect(
        screen.getByRole('switch', { name: /aceptar condiciones/i }),
      ).toHaveAttribute('aria-required', 'true');
    });

    it('sets aria-invalid when error is present', () => {
      render(
        <ToggleField label="Aceptar condiciones" name="terms" error="Campo obligatorio" />,
      );
      expect(
        screen.getByRole('switch', { name: /aceptar condiciones/i }),
      ).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when there is no error', () => {
      render(<ToggleField label="Activar notificaciones" name="notifications" />);
      expect(
        screen.getByRole('switch', { name: /activar notificaciones/i }),
      ).not.toHaveAttribute('aria-invalid');
    });

    it('connects switch with hint via aria-describedby', () => {
      render(
        <ToggleField label="Modo oscuro" name="darkMode" hint="Cambia la apariencia." />,
      );
      const input = screen.getByRole('switch');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      const hintEl = document.getElementById(describedBy!);
      expect(hintEl).toHaveTextContent('Cambia la apariencia.');
    });

    it('connects switch with error via aria-describedby', () => {
      render(
        <ToggleField
          label="Aceptar condiciones"
          name="terms"
          error="Debes aceptar para continuar."
        />,
      );
      const input = screen.getByRole('switch');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      const errorEl = document.getElementById(describedBy!);
      expect(errorEl).toHaveTextContent('Debes aceptar para continuar.');
    });

    it('has no aria-describedby when neither hint nor error is provided', () => {
      render(<ToggleField label="Activar notificaciones" name="notifications" />);
      expect(screen.getByRole('switch')).not.toHaveAttribute('aria-describedby');
    });

    it('disables the input when disabled prop is true', () => {
      render(<ToggleField label="Activar notificaciones" name="notifications" disabled />);
      expect(screen.getByRole('switch')).toBeDisabled();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — base field', async () => {
      const { container } = render(
        <ToggleField label="Activar notificaciones" name="notifications" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with hint', async () => {
      const { container } = render(
        <ToggleField
          label="Modo oscuro"
          name="darkMode"
          hint="Ajusta el contraste."
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <ToggleField
          label="Aceptar condiciones"
          name="terms"
          error="Debes aceptar para continuar."
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — required field', async () => {
      const { container } = render(
        <ToggleField label="Aceptar condiciones" name="terms" required />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled field', async () => {
      const { container } = render(
        <ToggleField label="Activar notificaciones" name="notifications" disabled />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — checked', async () => {
      const { container } = render(
        <ToggleField label="Activar notificaciones" name="notifications" defaultChecked />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
