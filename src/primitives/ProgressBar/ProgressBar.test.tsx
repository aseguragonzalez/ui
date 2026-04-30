import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  describe('rendering', () => {
    it('renders with role="progressbar"', () => {
      render(<ProgressBar label="Cargando archivo" value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('forwards the ref to the root element', () => {
      const ref = { current: null };
      render(<ProgressBar ref={ref} label="Progreso" value={0} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes native HTML attributes to the root element', () => {
      render(<ProgressBar label="Progreso" value={50} data-testid="bar" />);
      expect(screen.getByTestId('bar')).toBeInTheDocument();
    });
  });

  describe('accessible name', () => {
    it('uses label as aria-label', () => {
      render(<ProgressBar label="Subiendo imagen" value={30} />);
      expect(screen.getByRole('progressbar', { name: 'Subiendo imagen' })).toBeInTheDocument();
    });
  });

  describe('determinate mode (value provided)', () => {
    it('sets aria-valuenow to the provided value', () => {
      render(<ProgressBar label="Progreso" value={42} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42');
    });

    it('sets aria-valuemin=0 and aria-valuemax=100', () => {
      render(<ProgressBar label="Progreso" value={50} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuemin', '0');
      expect(bar).toHaveAttribute('aria-valuemax', '100');
    });

    it('clamps value below 0 to 0', () => {
      render(<ProgressBar label="Progreso" value={-10} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });

    it('clamps value above 100 to 100', () => {
      render(<ProgressBar label="Progreso" value={150} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    });

    it('renders at 0%', () => {
      render(<ProgressBar label="Progreso" value={0} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });

    it('renders at 100%', () => {
      render(<ProgressBar label="Progreso" value={100} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    });
  });

  describe('indeterminate mode (no value)', () => {
    it('does not set aria-valuenow when value is undefined', () => {
      render(<ProgressBar label="Procesando..." />);
      expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
    });

    it('does not set aria-valuemin or aria-valuemax when indeterminate', () => {
      render(<ProgressBar label="Procesando..." />);
      const bar = screen.getByRole('progressbar');
      expect(bar).not.toHaveAttribute('aria-valuemin');
      expect(bar).not.toHaveAttribute('aria-valuemax');
    });
  });

  describe('variants', () => {
    const variants = ['default', 'success', 'error', 'warning'] as const;

    variants.forEach((variant) => {
      it(`renders without errors — ${variant}`, () => {
        render(<ProgressBar label="Progreso" value={50} variant={variant} />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
      });
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders without errors — ${size}`, () => {
        render(<ProgressBar label="Progreso" value={50} size={size} />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
      });
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — determinate 50%', async () => {
      const { container } = render(<ProgressBar label="Subiendo archivo" value={50} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — determinate 0%', async () => {
      const { container } = render(<ProgressBar label="Iniciando..." value={0} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — determinate 100%', async () => {
      const { container } = render(<ProgressBar label="Completado" value={100} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — indeterminate', async () => {
      const { container } = render(<ProgressBar label="Procesando..." />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — success variant', async () => {
      const { container } = render(<ProgressBar label="Completado" value={100} variant="success" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — error variant', async () => {
      const { container } = render(<ProgressBar label="Error al subir" value={60} variant="error" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
