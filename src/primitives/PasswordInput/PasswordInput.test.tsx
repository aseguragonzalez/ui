import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
  describe('rendering', () => {
    it('renders as type="password" by default', () => {
      render(<PasswordInput aria-label="Contraseña" />);
      expect(screen.getByLabelText('Contraseña')).toHaveAttribute('type', 'password');
    });

    it('renders the show-password toggle button', () => {
      render(<PasswordInput aria-label="Contraseña" />);
      expect(screen.getByRole('button', { name: 'Show password' })).toBeInTheDocument();
    });

    it('sets aria-pressed="false" on the button when password is hidden', () => {
      render(<PasswordInput aria-label="Contraseña" />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    });

    it('sets aria-invalid when hasError is true', () => {
      render(<PasswordInput aria-label="Contraseña" hasError />);
      expect(screen.getByLabelText('Contraseña')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when hasError is false', () => {
      render(<PasswordInput aria-label="Contraseña" />);
      expect(screen.getByLabelText('Contraseña')).not.toHaveAttribute('aria-invalid');
    });

    it('disables both input and button when disabled', () => {
      render(<PasswordInput aria-label="Contraseña" disabled />);
      expect(screen.getByLabelText('Contraseña')).toBeDisabled();
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('forwards the ref to the input element', () => {
      const ref = { current: null };
      render(<PasswordInput aria-label="Contraseña" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it.each(['sm', 'md', 'lg'] as const)('renders size variant "%s" without errors', (size) => {
      render(<PasswordInput aria-label="Contraseña" size={size} />);
      expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    });

    it('applies className to the wrapper element', () => {
      const { container } = render(<PasswordInput aria-label="Contraseña" className="custom-wrap" />);
      expect(container.firstChild).toHaveClass('custom-wrap');
    });

    it('sets tabIndex=-1 on the toggle button when disabled', () => {
      render(<PasswordInput aria-label="Contraseña" disabled />);
      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('show/hide toggle', () => {
    it('shows password when toggle button is clicked', async () => {
      const user = userEvent.setup();
      render(<PasswordInput aria-label="Contraseña" />);
      const input = screen.getByLabelText('Contraseña');

      await user.click(screen.getByRole('button', { name: 'Show password' }));

      expect(input).toHaveAttribute('type', 'text');
    });

    it('updates button aria-label to hide after clicking show', async () => {
      const user = userEvent.setup();
      render(<PasswordInput aria-label="Contraseña" />);

      await user.click(screen.getByRole('button', { name: 'Show password' }));

      expect(screen.getByRole('button', { name: 'Hide password' })).toBeInTheDocument();
    });

    it('sets aria-pressed="true" on the button when password is visible', async () => {
      const user = userEvent.setup();
      render(<PasswordInput aria-label="Contraseña" />);

      await user.click(screen.getByRole('button', { name: 'Show password' }));

      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('hides password again when toggle is clicked twice', async () => {
      const user = userEvent.setup();
      render(<PasswordInput aria-label="Contraseña" />);

      await user.click(screen.getByRole('button', { name: 'Show password' }));
      await user.click(screen.getByRole('button', { name: 'Hide password' }));

      expect(screen.getByLabelText('Contraseña')).toHaveAttribute('type', 'password');
    });

    it('returns focus to the input after toggling visibility', async () => {
      const user = userEvent.setup();
      render(<PasswordInput aria-label="Contraseña" />);
      const input = screen.getByLabelText('Contraseña');
      await user.click(screen.getByRole('button', { name: 'Show password' }));
      expect(input).toHaveFocus();
    });

    it('uses custom label props for the toggle button', async () => {
      render(
        <PasswordInput
          aria-label="Contraseña"
          showPasswordLabel="Mostrar contraseña"
          hidePasswordLabel="Ocultar contraseña"
        />,
      );
      expect(
        screen.getByRole('button', { name: 'Mostrar contraseña' }),
      ).toBeInTheDocument();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — hidden password', async () => {
      const { container } = render(<PasswordInput aria-label="Contraseña" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — visible password', async () => {
      const user = userEvent.setup();
      const { container } = render(<PasswordInput aria-label="Contraseña" />);
      await user.click(screen.getByRole('button', { name: 'Show password' }));
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(<PasswordInput aria-label="Contraseña" hasError />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<PasswordInput aria-label="Contraseña" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
