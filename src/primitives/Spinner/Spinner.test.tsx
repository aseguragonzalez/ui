import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe('rendering', () => {
    it('renders as a <span> element', () => {
      render(<Spinner />);
      expect(screen.getByRole('status').tagName).toBe('SPAN');
    });

    it('has role="status"', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders default label text "Loading..." for screen readers', () => {
      render(<Spinner />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders custom label when provided', () => {
      render(<Spinner label="Guardando cambios..." />);
      expect(screen.getByText('Guardando cambios...')).toBeInTheDocument();
    });

    it('forwards the ref to the root span', () => {
      const ref = { current: null };
      render(<Spinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('passes native HTML attributes to the root span', () => {
      render(<Spinner data-testid="my-spinner" />);
      expect(screen.getByTestId('my-spinner')).toBeInTheDocument();
    });

    it('renders without errors for all sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      sizes.forEach((size) => {
        const { unmount } = render(<Spinner size={size} />);
        expect(screen.getByRole('status')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(<Spinner />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — sm', async () => {
      const { container } = render(<Spinner size="sm" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — lg', async () => {
      const { container } = render(<Spinner size="lg" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — custom label', async () => {
      const { container } = render(<Spinner label="Procesando pago..." />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
