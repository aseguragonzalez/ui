import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('rendering', () => {
    it('renders as a <span> element', () => {
      render(<Badge>Activo</Badge>);
      expect(screen.getByText('Activo').tagName).toBe('SPAN');
    });

    it('renders children', () => {
      render(<Badge>Borrador</Badge>);
      expect(screen.getByText('Borrador')).toBeInTheDocument();
    });

    it('forwards the ref to the underlying span', () => {
      const ref = { current: null };
      render(<Badge ref={ref}>Etiqueta</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('passes native HTML attributes to the span', () => {
      render(<Badge data-testid="my-badge">Etiqueta</Badge>);
      expect(screen.getByTestId('my-badge')).toBeInTheDocument();
    });

    it('renders without errors using default props', () => {
      render(<Badge data-testid="badge">Default</Badge>);
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    const variants = ['neutral', 'primary', 'error', 'warning', 'success', 'info'] as const;

    variants.forEach((variant) => {
      it(`renders without errors — ${variant}`, () => {
        render(<Badge variant={variant}>{variant}</Badge>);
        expect(screen.getByText(variant)).toBeInTheDocument();
      });
    });
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders without errors — ${size}`, () => {
        render(<Badge size={size}>Etiqueta</Badge>);
        expect(screen.getByText('Etiqueta')).toBeInTheDocument();
      });
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — neutral', async () => {
      const { container } = render(<Badge>Neutral</Badge>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — primary', async () => {
      const { container } = render(<Badge variant="primary">Nuevo</Badge>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — error', async () => {
      const { container } = render(<Badge variant="error">Error</Badge>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — warning', async () => {
      const { container } = render(<Badge variant="warning">Pendiente</Badge>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — success', async () => {
      const { container } = render(<Badge variant="success">Publicado</Badge>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — info', async () => {
      const { container } = render(<Badge variant="info">Beta</Badge>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — sm size', async () => {
      const { container } = render(<Badge size="sm">Activo</Badge>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — lg size', async () => {
      const { container } = render(<Badge size="lg">Activo</Badge>);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
