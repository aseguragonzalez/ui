import { useRef } from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ToastProvider, useToast } from './Toast';

function ShowButton({ message = 'Hola', variant = 'info' as const, duration = 0 } = {}) {
  const toast = useToast();
  return (
    <button onClick={() => toast.show({ message, variant, duration })}>
      Mostrar toast
    </button>
  );
}

function TestHarness({ message = 'Mensaje', variant = 'info' as const, duration = 0 } = {}) {
  return (
    <ToastProvider>
      <ShowButton message={message} variant={variant} duration={duration} />
    </ToastProvider>
  );
}

function click(label: string) {
  fireEvent.click(screen.getByRole('button', { name: label }));
}

function IdCapture({ onId }: { onId: (id: string) => void }) {
  const toast = useToast();
  return (
    <button onClick={() => onId(toast.show({ message: 'Captured', variant: 'info' }))}>
      Capture id
    </button>
  );
}

function ShowAndDismiss() {
  const toast = useToast();
  const idRef = useRef('');
  return (
    <>
      <button onClick={() => { idRef.current = toast.show({ message: 'Dismiss me', variant: 'info' }); }}>
        Show dismiss
      </button>
      <button onClick={() => toast.dismiss(idRef.current)}>Dismiss by id</button>
    </>
  );
}

function DefaultDurationButton() {
  const toast = useToast();
  return (
    <button onClick={() => toast.show({ message: 'Default duration' })}>Show default</button>
  );
}

function ReactNodeMessageButton() {
  const toast = useToast();
  return (
    <button onClick={() => toast.show({ message: <strong>Bold content</strong>, variant: 'info' })}>
      Show node
    </button>
  );
}

describe('Toast / ToastProvider', () => {
  describe('rendering', () => {
    it('renders the live region immediately (even with no toasts)', () => {
      render(<ToastProvider><div /></ToastProvider>);
      expect(screen.getByRole('region', { name: 'Notifications' })).toBeInTheDocument();
    });

    it('shows a toast after show() is called', () => {
      render(<TestHarness message="Toast visible" />);
      click('Mostrar toast');
      expect(screen.getByText('Toast visible')).toBeInTheDocument();
    });

    it('shows the dismiss button on each toast', () => {
      render(<TestHarness />);
      click('Mostrar toast');
      expect(screen.getByRole('button', { name: 'Close notification' })).toBeInTheDocument();
    });

    it('stacks multiple toasts', () => {
      render(<TestHarness />);
      click('Mostrar toast');
      click('Mostrar toast');
      expect(screen.getAllByRole('status')).toHaveLength(2);
    });

    it('renders ReactNode as toast message', () => {
      render(
        <ToastProvider>
          <ReactNodeMessageButton />
        </ToastProvider>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Show node' }));
      expect(screen.getByText('Bold content')).toBeInTheDocument();
    });
  });

  describe('dismissal', () => {
    it('removes the toast when dismiss button is clicked', () => {
      render(<TestHarness message="Para eliminar" />);
      click('Mostrar toast');
      expect(screen.getByText('Para eliminar')).toBeInTheDocument();
      click('Close notification');
      expect(screen.queryByText('Para eliminar')).not.toBeInTheDocument();
    });

    it('auto-dismisses after the specified duration', () => {
      vi.useFakeTimers();
      render(<TestHarness message="Auto-dismiss" duration={3000} />);
      act(() => click('Mostrar toast'));
      expect(screen.getByText('Auto-dismiss')).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(3000));
      expect(screen.queryByText('Auto-dismiss')).not.toBeInTheDocument();
      vi.useRealTimers();
    });

    it('does not auto-dismiss when duration=0', () => {
      vi.useFakeTimers();
      render(<TestHarness message="Persistente" duration={0} />);
      act(() => click('Mostrar toast'));
      act(() => vi.advanceTimersByTime(60000));
      expect(screen.getByText('Persistente')).toBeInTheDocument();
      vi.useRealTimers();
    });

    it('auto-dismisses after the default 5000ms when no duration is provided', () => {
      vi.useFakeTimers();
      render(
        <ToastProvider>
          <DefaultDurationButton />
        </ToastProvider>,
      );
      act(() => fireEvent.click(screen.getByRole('button', { name: 'Show default' })));
      expect(screen.getByText('Default duration')).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(5000));
      expect(screen.queryByText('Default duration')).not.toBeInTheDocument();
      vi.useRealTimers();
    });
  });

  describe('variants', () => {
    it.each(['info', 'success', 'error', 'warning'] as const)(
      'renders variant %s',
      (variant) => {
        render(<TestHarness variant={variant} message={`Toast ${variant}`} />);
        click('Mostrar toast');
        expect(screen.getByText(`Toast ${variant}`)).toBeInTheDocument();
      },
    );
  });

  describe('useToast — error boundary', () => {
    it('throws when used outside a ToastProvider', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => render(<ShowButton />)).toThrow('useToast must be used inside a <ToastProvider>');
      consoleError.mockRestore();
    });
  });

  describe('programmatic dismiss and return value', () => {
    it('show() returns a unique string id', () => {
      let capturedId = '';
      render(
        <ToastProvider>
          <IdCapture onId={(id) => { capturedId = id; }} />
        </ToastProvider>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Capture id' }));
      expect(capturedId).toMatch(/^toast-\d+$/);
    });

    it('dismiss(id) removes a specific toast without affecting others', () => {
      render(
        <ToastProvider>
          <ShowAndDismiss />
        </ToastProvider>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Show dismiss' }));
      expect(screen.getByText('Dismiss me')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Dismiss by id' }));
      expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
    });
  });

  describe('maxToasts', () => {
    it('enforces maxToasts limit', () => {
      render(
        <ToastProvider maxToasts={2}>
          <ShowButton />
        </ToastProvider>,
      );
      click('Mostrar toast');
      click('Mostrar toast');
      click('Mostrar toast');
      expect(screen.getAllByRole('status')).toHaveLength(2);
    });
  });

  describe('ARIA', () => {
    it('live region has aria-live="polite"', () => {
      render(<ToastProvider><div /></ToastProvider>);
      expect(screen.getByRole('region', { name: 'Notifications' })).toHaveAttribute('aria-live', 'polite');
    });

    it('each toast has role="status"', () => {
      render(<TestHarness />);
      click('Mostrar toast');
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('pause / resume on hover and focus', () => {
    it('mouseenter pauses the auto-dismiss timer', () => {
      vi.useFakeTimers();
      render(<TestHarness message="Paused" duration={3000} />);
      act(() => click('Mostrar toast'));
      act(() => vi.advanceTimersByTime(1500));
      fireEvent.mouseEnter(screen.getByRole('status'));
      act(() => vi.advanceTimersByTime(5000));
      expect(screen.getByText('Paused')).toBeInTheDocument();
      vi.useRealTimers();
    });

    it('mouseleave resumes and the toast eventually dismisses', () => {
      vi.useFakeTimers();
      render(<TestHarness message="Resumed" duration={1000} />);
      act(() => click('Mostrar toast'));
      fireEvent.mouseEnter(screen.getByRole('status'));
      act(() => vi.advanceTimersByTime(100));
      fireEvent.mouseLeave(screen.getByRole('status'));
      act(() => vi.advanceTimersByTime(1000));
      expect(screen.queryByText('Resumed')).not.toBeInTheDocument();
      vi.useRealTimers();
    });

    it('focus pauses the timer', () => {
      vi.useFakeTimers();
      render(<TestHarness message="Focus paused" duration={2000} />);
      act(() => click('Mostrar toast'));
      fireEvent.focus(screen.getByRole('status'));
      act(() => vi.advanceTimersByTime(5000));
      expect(screen.getByText('Focus paused')).toBeInTheDocument();
      vi.useRealTimers();
    });

    it('blur resumes and the toast eventually dismisses', () => {
      vi.useFakeTimers();
      render(<TestHarness message="Blur resumed" duration={1000} />);
      act(() => click('Mostrar toast'));
      fireEvent.focus(screen.getByRole('status'));
      act(() => vi.advanceTimersByTime(100));
      fireEvent.blur(screen.getByRole('status'));
      act(() => vi.advanceTimersByTime(1000));
      expect(screen.queryByText('Blur resumed')).not.toBeInTheDocument();
      vi.useRealTimers();
    });

    it('resume dismisses immediately when all time elapsed during the pause', () => {
      vi.useFakeTimers();
      render(<TestHarness message="Expired" duration={500} />);
      act(() => click('Mostrar toast'));
      // Pause at t=0 (pausedAt=0), advance 1000ms while paused (elapsed=1000 > duration=500)
      fireEvent.mouseEnter(screen.getByRole('status'));
      act(() => vi.advanceTimersByTime(1000));
      // Un-pause: remaining = max(0, 500 − 1000) = 0 → dismiss immediately
      fireEvent.mouseLeave(screen.getByRole('status'));
      expect(screen.queryByText('Expired')).not.toBeInTheDocument();
      vi.useRealTimers();
    });

    it('hovering a persistent toast (duration=0) is a no-op', () => {
      render(<TestHarness message="Persistent" duration={0} />);
      click('Mostrar toast');
      // no timer set — pause/resume must not throw
      fireEvent.mouseEnter(screen.getByRole('status'));
      fireEvent.mouseLeave(screen.getByRole('status'));
      expect(screen.getByText('Persistent')).toBeInTheDocument();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations with no toasts', async () => {
      const { container } = render(<ToastProvider><button>Test</button></ToastProvider>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations with a visible toast', async () => {
      const { container } = render(<TestHarness message="Axe test" />);
      click('Mostrar toast');
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
