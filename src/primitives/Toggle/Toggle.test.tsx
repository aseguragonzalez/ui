import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  describe('rendering', () => {
    it('renders with role="switch"', () => {
      render(<Toggle aria-label="Activar notificaciones" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('is unchecked by default', () => {
      render(<Toggle aria-label="Activar notificaciones" />);
      expect(screen.getByRole('switch')).not.toBeChecked();
    });

    it('renders checked when defaultChecked is true', () => {
      render(<Toggle aria-label="Activar notificaciones" defaultChecked />);
      expect(screen.getByRole('switch')).toBeChecked();
    });

    it('sets aria-invalid when hasError is true', () => {
      render(<Toggle aria-label="Activar notificaciones" hasError />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when hasError is false', () => {
      render(<Toggle aria-label="Activar notificaciones" />);
      expect(screen.getByRole('switch')).not.toHaveAttribute('aria-invalid');
    });

    it('renders as disabled', () => {
      render(<Toggle aria-label="Activar notificaciones" disabled />);
      expect(screen.getByRole('switch')).toBeDisabled();
    });

    it('forwards the ref to the input element', () => {
      const ref = { current: null };
      render(<Toggle aria-label="Activar notificaciones" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations', async () => {
      const { container } = render(<Toggle aria-label="Activar notificaciones" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — checked', async () => {
      const { container } = render(
        <Toggle aria-label="Activar notificaciones" defaultChecked />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<Toggle aria-label="Activar notificaciones" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(<Toggle aria-label="Activar notificaciones" hasError />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
