import { useState } from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Modal, ModalBody, ModalFooter } from './Modal';
import { Button } from '../Button/Button';

function BasicModal({ open = true, onClose = vi.fn() } = {}) {
  return (
    <Modal open={open} onClose={onClose} title="Título del modal">
      <ModalBody>Contenido del modal.</ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary">Confirmar</Button>
      </ModalFooter>
    </Modal>
  );
}

describe('Modal', () => {
  describe('rendering', () => {
    it('renders when open=true', () => {
      render(<BasicModal />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('does not render when open=false', () => {
      render(<BasicModal open={false} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders the title', () => {
      render(<BasicModal />);
      expect(screen.getByText('Título del modal')).toBeInTheDocument();
    });

    it('renders the close button', () => {
      render(<BasicModal />);
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('renders body and footer content', () => {
      render(<BasicModal />);
      expect(screen.getByText('Contenido del modal.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument();
    });
  });

  describe('ARIA', () => {
    it('has role="dialog"', () => {
      render(<BasicModal />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal="true"', () => {
      render(<BasicModal />);
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('is labelled by the title via aria-labelledby', () => {
      render(<BasicModal />);
      const dialog = screen.getByRole('dialog');
      const labelId = dialog.getAttribute('aria-labelledby')!;
      expect(document.getElementById(labelId)?.textContent).toBe('Título del modal');
    });

    it('accessible name matches title', () => {
      render(<BasicModal />);
      expect(screen.getByRole('dialog', { name: 'Título del modal' })).toBeInTheDocument();
    });

    it('forwards aria-describedby to the dialog element', () => {
      render(
        <Modal open onClose={vi.fn()} title="Test" aria-describedby="custom-desc">
          <ModalBody>Content</ModalBody>
        </Modal>,
      );
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-describedby', 'custom-desc');
    });
  });

  describe('interaction — close', () => {
    it('calls onClose when Escape is pressed', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<BasicModal onClose={onClose} />);
      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when the close button is clicked', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<BasicModal onClose={onClose} />);
      await user.click(screen.getByRole('button', { name: 'Close' }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('focus management', () => {
    it('focuses the first focusable element on open', () => {
      render(<BasicModal />);
      expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
    });

    it('focus trap: Tab wraps from last to first focusable', async () => {
      const user = userEvent.setup();
      render(<BasicModal />);
      const buttons = screen.getAllByRole('button');
      const last = buttons[buttons.length - 1];
      last.focus();
      await user.tab();
      expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
    });

    it('focus trap: Shift+Tab wraps from first to last focusable', async () => {
      const user = userEvent.setup();
      render(<BasicModal />);
      screen.getByRole('button', { name: 'Close' }).focus();
      await user.tab({ shift: true });
      const buttons = screen.getAllByRole('button');
      expect(buttons[buttons.length - 1]).toHaveFocus();
    });

    it('restores focus to the previously focused element on close', async () => {
      const user = userEvent.setup();
      function FocusRestoreHarness() {
        const [open, setOpen] = useState(false);
        return (
          <>
            <button onClick={() => setOpen(true)}>Open modal</button>
            <Modal open={open} onClose={() => setOpen(false)} title="Test">
              <ModalBody>Content</ModalBody>
            </Modal>
          </>
        );
      }
      render(<FocusRestoreHarness />);
      const trigger = screen.getByRole('button', { name: 'Open modal' });
      await user.click(trigger);
      await user.keyboard('{Escape}');
      expect(trigger).toHaveFocus();
    });
  });

  describe('backdrop click', () => {
    it('calls onClose when the backdrop (dialog element itself) is clicked', () => {
      const onClose = vi.fn();
      render(<BasicModal onClose={onClose} />);
      fireEvent.click(screen.getByRole('dialog'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when clicking inside the modal panel', () => {
      const onClose = vi.fn();
      render(<BasicModal onClose={onClose} />);
      fireEvent.click(screen.getByText('Contenido del modal.'));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('forwardRef', () => {
    it('forwards ref to the dialog element', () => {
      const ref = { current: null };
      render(
        <Modal open ref={ref} onClose={vi.fn()} title="Test">
          <ModalBody>Content</ModalBody>
        </Modal>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDialogElement);
    });

    it('forwards ref as a callback ref', () => {
      let captured: HTMLDialogElement | null = null;
      render(
        <Modal open ref={(el) => { captured = el; }} onClose={vi.fn()} title="Test">
          <ModalBody>Content</ModalBody>
        </Modal>,
      );
      expect(captured).toBeInstanceOf(HTMLDialogElement);
    });
  });

  describe('size variants', () => {
    it('renders sm size', () => {
      render(
        <Modal open onClose={vi.fn()} title="Small" size="sm">
          <ModalBody>Content</ModalBody>
        </Modal>,
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders lg size', () => {
      render(
        <Modal open onClose={vi.fn()} title="Large" size="lg">
          <ModalBody>Content</ModalBody>
        </Modal>,
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders md size (default)', () => {
      render(
        <Modal open onClose={vi.fn()} title="Medium" size="md">
          <ModalBody>Content</ModalBody>
        </Modal>,
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('body scroll lock', () => {
    it('locks body scroll (overflow: hidden) while open', () => {
      render(<BasicModal />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('clears body scroll lock when closed via rerender', () => {
      const { rerender } = render(<BasicModal />);
      expect(document.body.style.overflow).toBe('hidden');
      rerender(<BasicModal open={false} />);
      expect(document.body.style.overflow).toBe('');
    });

    it('clears body scroll lock on unmount', () => {
      const { unmount } = render(<BasicModal />);
      expect(document.body.style.overflow).toBe('hidden');
      unmount();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('custom closeLabel', () => {
    it('uses the custom label on the close button', () => {
      render(
        <Modal open onClose={vi.fn()} title="Test" closeLabel="Dismiss dialog">
          <ModalBody>Content</ModalBody>
        </Modal>,
      );
      expect(screen.getByRole('button', { name: 'Dismiss dialog' })).toBeInTheDocument();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations when open', async () => {
      const { container } = render(<BasicModal />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
