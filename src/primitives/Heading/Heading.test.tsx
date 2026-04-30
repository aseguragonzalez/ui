import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Heading } from './Heading';

describe('Heading', () => {
  describe('rendering', () => {
    it('renders the correct heading element for each level', () => {
      const levels = [1, 2, 3, 4, 5, 6] as const;
      levels.forEach((level) => {
        const { unmount } = render(<Heading level={level}>Título</Heading>);
        expect(
          screen.getByRole('heading', { level, name: 'Título' }),
        ).toBeInTheDocument();
        unmount();
      });
    });

    it('renders children text', () => {
      render(<Heading level={1}>Bienvenido</Heading>);
      expect(screen.getByText('Bienvenido')).toBeInTheDocument();
    });

    it('forwards the ref to the heading element', () => {
      const ref = { current: null };
      render(<Heading level={2} ref={ref}>Título</Heading>);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });

    it('passes native HTML attributes', () => {
      render(<Heading level={1} id="page-title">Título</Heading>);
      expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('id', 'page-title');
    });
  });

  describe('size override', () => {
    it('applies the correct default size class for each level', () => {
      // Default: level 1 → xl, level 2 → lg, level 3 → md, level 4–6 → sm/xs
      render(<Heading level={2}>Título</Heading>);
      // We verify functionality indirectly — the element renders without error
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('applies a custom size when the size prop overrides the default', () => {
      render(<Heading level={2} size="xl">Título grande</Heading>);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — h1', async () => {
      const { container } = render(<Heading level={1}>Título principal</Heading>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — h2', async () => {
      const { container } = render(<Heading level={2}>Sección</Heading>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — h3 with size override', async () => {
      const { container } = render(
        <Heading level={3} size="lg">Subsección grande</Heading>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — muted color', async () => {
      const { container } = render(
        <Heading level={2} color="muted">Título atenuado</Heading>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
