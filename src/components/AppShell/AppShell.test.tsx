import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { AppShell } from './AppShell';

const SidebarStub = () => <nav aria-label="Sidebar">Sidebar</nav>;
const NavbarStub  = () => <header>Navbar</header>;

describe('AppShell', () => {
  describe('rendering', () => {
    it('renders a <div> shell element', () => {
      render(
        <AppShell data-testid="shell" navbar={<NavbarStub />}>
          content
        </AppShell>,
      );
      expect(screen.getByTestId('shell').tagName).toBe('DIV');
    });

    it('renders children inside a <main> element', () => {
      render(
        <AppShell navbar={<NavbarStub />}>
          <p>Page content</p>
        </AppShell>,
      );
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveTextContent('Page content');
    });

    it('forwards ref to root div', () => {
      const ref = { current: null };
      render(
        <AppShell ref={ref} navbar={<NavbarStub />}>
          content
        </AppShell>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes native HTML attributes', () => {
      render(
        <AppShell data-testid="shell" id="app" navbar={<NavbarStub />}>
          content
        </AppShell>,
      );
      expect(screen.getByTestId('shell')).toHaveAttribute('id', 'app');
    });

    it('merges className', () => {
      render(
        <AppShell data-testid="shell" className="custom" navbar={<NavbarStub />}>
          content
        </AppShell>,
      );
      expect(screen.getByTestId('shell').className).toContain('custom');
    });
  });

  describe('slots', () => {
    it('renders sidebar slot when sidebar prop is provided', () => {
      render(
        <AppShell sidebar={<SidebarStub />}>
          content
        </AppShell>,
      );
      expect(screen.getByRole('navigation', { name: 'Sidebar' })).toBeInTheDocument();
    });

    it('renders navbar slot when navbar prop is provided', () => {
      render(
        <AppShell navbar={<NavbarStub />}>
          content
        </AppShell>,
      );
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('omits sidebar slot when sidebar prop is absent', () => {
      render(<AppShell navbar={<NavbarStub />}>content</AppShell>);
      expect(screen.queryByRole('navigation', { name: 'Sidebar' })).not.toBeInTheDocument();
    });

    it('omits navbar slot when navbar prop is absent', () => {
      render(<AppShell sidebar={<SidebarStub />}>content</AppShell>);
      expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    });
  });

  describe('variant auto-detection', () => {
    it('resolves to "both" when sidebar and navbar are provided without explicit variant', () => {
      render(
        <AppShell data-testid="shell" sidebar={<SidebarStub />} navbar={<NavbarStub />}>
          content
        </AppShell>,
      );
      expect(screen.getByTestId('shell').className).toMatch(/both/i);
    });

    it('resolves to "sidebar-only" when only sidebar is provided', () => {
      render(
        <AppShell data-testid="shell" sidebar={<SidebarStub />}>
          content
        </AppShell>,
      );
      expect(screen.getByTestId('shell').className).toMatch(/sidebarOnly/i);
    });

    it('resolves to "navbar-only" when only navbar is provided', () => {
      render(
        <AppShell data-testid="shell" navbar={<NavbarStub />}>
          content
        </AppShell>,
      );
      expect(screen.getByTestId('shell').className).toMatch(/navbarOnly/i);
    });

    it('uses explicit variant when provided', () => {
      render(
        <AppShell data-testid="shell" variant="both" sidebar={<SidebarStub />} navbar={<NavbarStub />}>
          content
        </AppShell>,
      );
      expect(screen.getByTestId('shell').className).toMatch(/both/i);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — both variant', async () => {
      const { container } = render(
        <AppShell sidebar={<SidebarStub />} navbar={<NavbarStub />}>
          <p>Main content</p>
        </AppShell>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — sidebar-only', async () => {
      const { container } = render(
        <AppShell sidebar={<SidebarStub />}>
          <p>Main content</p>
        </AppShell>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — navbar-only', async () => {
      const { container } = render(
        <AppShell navbar={<NavbarStub />}>
          <p>Main content</p>
        </AppShell>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
