import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Breadcrumb } from './Breadcrumb';

const items = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Detalles' },
];

describe('Breadcrumb', () => {
  describe('rendering', () => {
    it('renders all item labels', () => {
      render(<Breadcrumb items={items} />);
      expect(screen.getByText('Inicio')).toBeInTheDocument();
      expect(screen.getByText('Productos')).toBeInTheDocument();
      expect(screen.getByText('Detalles')).toBeInTheDocument();
    });

    it('renders non-current items with href as links', () => {
      render(<Breadcrumb items={items} />);
      expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', { name: 'Productos' })).toHaveAttribute('href', '/productos');
    });

    it('renders the last item without a link', () => {
      render(<Breadcrumb items={items} />);
      expect(screen.queryByRole('link', { name: 'Detalles' })).not.toBeInTheDocument();
      expect(screen.getByText('Detalles')).toBeInTheDocument();
    });

    it('sets aria-current="page" on the last item', () => {
      render(<Breadcrumb items={items} />);
      expect(screen.getByText('Detalles')).toHaveAttribute('aria-current', 'page');
    });

    it('does not set aria-current on non-current items', () => {
      render(<Breadcrumb items={items} />);
      expect(screen.getByRole('link', { name: 'Inicio' })).not.toHaveAttribute('aria-current');
    });
  });

  describe('navigation landmark', () => {
    it('renders a nav element with default aria-label', () => {
      render(<Breadcrumb items={items} />);
      expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    });

    it('uses a custom aria-label when provided', () => {
      render(<Breadcrumb items={items} aria-label="Ruta de navegación" />);
      expect(screen.getByRole('navigation', { name: 'Ruta de navegación' })).toBeInTheDocument();
    });

    it('renders items inside an ordered list', () => {
      const { container } = render(<Breadcrumb items={items} />);
      expect(container.querySelector('ol')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('renders a single item as current page', () => {
      render(<Breadcrumb items={[{ label: 'Inicio' }]} />);
      expect(screen.getByText('Inicio')).toHaveAttribute('aria-current', 'page');
    });

    it('renders items without href as non-link spans', () => {
      render(
        <Breadcrumb
          items={[
            { label: 'Paso 1' },
            { label: 'Paso 2' },
            { label: 'Paso 3' },
          ]}
        />,
      );
      expect(screen.queryAllByRole('link')).toHaveLength(0);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(<Breadcrumb items={items} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — single item', async () => {
      const { container } = render(<Breadcrumb items={[{ label: 'Inicio' }]} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — deep nesting', async () => {
      const { container } = render(
        <Breadcrumb
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Empresa', href: '/empresa' },
            { label: 'Equipos', href: '/empresa/equipos' },
            { label: 'Frontend' },
          ]}
          aria-label="Ruta de navegación"
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
