import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from './Button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('renders as a native button element', () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole('button')).toBeInstanceOf(HTMLButtonElement);
    });

    it('forwards ref', () => {
      const ref = { current: null };
      render(<Button ref={ref}>Test</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('states', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Test</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('is disabled when isLoading is true', () => {
      render(<Button isLoading>Test</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('sets aria-busy when isLoading is true', () => {
      render(<Button isLoading>Test</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('shows loadingText when provided and loading', () => {
      render(<Button isLoading loadingText="Cargando...">Enviar</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Cargando...');
    });

    it('does not fire onClick when disabled', async () => {
      const onClick = vi.fn();
      render(<Button disabled onClick={onClick}>Test</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not fire onClick when loading', async () => {
      const onClick = vi.fn();
      render(<Button isLoading onClick={onClick}>Test</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (primary)', async () => {
      const { container } = render(<Button>Aceptar</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations (secondary)', async () => {
      const { container } = render(<Button variant="secondary">Cancelar</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations (destructive)', async () => {
      const { container } = render(<Button variant="destructive">Eliminar</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations (disabled)', async () => {
      const { container } = render(<Button disabled>Desactivado</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
