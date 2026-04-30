import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Alert } from './Alert';

describe('Alert', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Alert variant="info">Algo importante</Alert>);
      expect(screen.getByText('Algo importante')).toBeInTheDocument();
    });

    it('renders title when provided', () => {
      render(<Alert variant="error" title="Ha ocurrido un error">Descripción</Alert>);
      expect(screen.getByText('Ha ocurrido un error')).toBeInTheDocument();
    });

    it('does not render a title element when title is not provided', () => {
      render(<Alert variant="info">Sin título</Alert>);
      expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
    });

    it('renders dismiss button when onDismiss is provided', () => {
      render(<Alert variant="success" onDismiss={() => {}}>Mensaje</Alert>);
      expect(screen.getByRole('button', { name: 'Close alert' })).toBeInTheDocument();
    });

    it('does not render dismiss button when onDismiss is not provided', () => {
      render(<Alert variant="success">Mensaje</Alert>);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('forwards the ref to the root div', () => {
      const ref = { current: null };
      render(<Alert ref={ref} variant="info">Mensaje</Alert>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes native HTML attributes to the root element', () => {
      render(<Alert variant="info" data-testid="my-alert">Mensaje</Alert>);
      expect(screen.getByTestId('my-alert')).toBeInTheDocument();
    });
  });

  describe('ARIA roles', () => {
    it('uses role="alert" for error variant', () => {
      render(<Alert variant="error">Error</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('uses role="alert" for warning variant', () => {
      render(<Alert variant="warning">Aviso</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('uses role="status" for success variant', () => {
      render(<Alert variant="success">Éxito</Alert>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('uses role="status" for info variant', () => {
      render(<Alert variant="info">Información</Alert>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('overrides the default role when role prop is provided', () => {
      render(<Alert variant="error" role="status">Error silencioso</Alert>);
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('dismiss button has default aria-label "Close alert"', () => {
      render(<Alert variant="info" onDismiss={() => {}}>Mensaje</Alert>);
      expect(screen.getByRole('button', { name: 'Close alert' })).toBeInTheDocument();
    });

    it('dismiss button uses custom dismissLabel when provided', () => {
      render(
        <Alert variant="info" onDismiss={() => {}} dismissLabel="Descartar notificación">
          Mensaje
        </Alert>,
      );
      expect(screen.getByRole('button', { name: 'Descartar notificación' })).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onDismiss when the dismiss button is clicked', async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(<Alert variant="success" onDismiss={onDismiss}>Mensaje</Alert>);
      await user.click(screen.getByRole('button', { name: 'Close alert' }));
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — error variant', async () => {
      const { container } = render(<Alert variant="error">Error al guardar los cambios.</Alert>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — warning variant', async () => {
      const { container } = render(<Alert variant="warning">Tu sesión expirará en 5 minutos.</Alert>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — success variant', async () => {
      const { container } = render(<Alert variant="success">Cambios guardados correctamente.</Alert>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — info variant', async () => {
      const { container } = render(<Alert variant="info">El mantenimiento programado es el viernes.</Alert>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with title', async () => {
      const { container } = render(
        <Alert variant="error" title="Error de validación">
          Revisa los campos marcados en rojo.
        </Alert>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with dismiss button', async () => {
      const { container } = render(
        <Alert variant="info" onDismiss={() => {}}>
          Tienes 3 notificaciones nuevas.
        </Alert>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with title and dismiss button', async () => {
      const { container } = render(
        <Alert variant="warning" title="Atención" onDismiss={() => {}}>
          Esta acción no se puede deshacer.
        </Alert>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
