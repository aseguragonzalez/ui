import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Navbar } from './Navbar';

const items = [
  { key: 'home', label: 'Home', href: '/', isActive: true },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'contact', label: 'Contact', href: '/contact' },
];

describe('Navbar', () => {
  describe('rendering', () => {
    it('renders brand content', () => {
      render(<Navbar brand={<span>Acme</span>} items={items} />);
      expect(screen.getByText('Acme')).toBeInTheDocument();
    });

    it('renders all nav items', () => {
      render(<Navbar items={items} />);
      // Each item appears in both desktop and mobile nav
      expect(screen.getAllByRole('link', { name: 'Home' }).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByRole('link', { name: 'About' }).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByRole('link', { name: 'Contact' }).length).toBeGreaterThanOrEqual(1);
    });

    it('sets aria-current="page" on the active item', () => {
      render(<Navbar items={items} />);
      const activeLinks = screen.getAllByRole('link', { name: 'Home' });
      activeLinks.forEach((link) =>
        expect(link).toHaveAttribute('aria-current', 'page'),
      );
    });

    it('renders actions slot', () => {
      render(<Navbar items={items} actions={<button type="button">Login</button>} />);
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });
  });

  describe('mobile menu', () => {
    it('renders the hamburger button', () => {
      render(<Navbar items={items} />);
      expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
    });

    it('toggles aria-expanded on hamburger click', async () => {
      const user = userEvent.setup();
      render(<Navbar items={items} />);
      const btn = screen.getByRole('button', { name: 'Open menu' });
      expect(btn).toHaveAttribute('aria-expanded', 'false');
      await user.click(btn);
      expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
        'aria-expanded',
        'true',
      );
    });

    it('calls onMobileOpenChange when hamburger is clicked', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();
      render(<Navbar items={items} onMobileOpenChange={handler} />);
      await user.click(screen.getByRole('button', { name: 'Open menu' }));
      expect(handler).toHaveBeenCalledWith(true);
    });

    it('respects controlled isMobileOpen prop', () => {
      render(<Navbar items={items} isMobileOpen={true} />);
      expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
        'aria-expanded',
        'true',
      );
    });
  });

  describe('mobile menu — close on nav item click', () => {
    it('clicking a mobile nav item calls onMobileOpenChange(false)', async () => {
      const user = userEvent.setup();
      const onMobileOpenChange = vi.fn();
      render(
        <Navbar
          items={items}
          isMobileOpen={true}
          onMobileOpenChange={onMobileOpenChange}
          aria-label="Main navigation"
        />,
      );
      const mobileNav = screen.getByRole('navigation', { name: 'Main navigation — menu' });
      await user.click(within(mobileNav).getByRole('link', { name: 'Home' }));
      expect(onMobileOpenChange).toHaveBeenCalledWith(false);
    });

    it('mobile nav item click invokes item.onClick before closing', async () => {
      const user = userEvent.setup();
      const itemClick = vi.fn();
      const onMobileOpenChange = vi.fn();
      render(
        <Navbar
          items={[{ key: 'home', label: 'Home', href: '/', onClick: itemClick }]}
          isMobileOpen={true}
          onMobileOpenChange={onMobileOpenChange}
          aria-label="Main navigation"
        />,
      );
      const mobileNav = screen.getByRole('navigation', { name: 'Main navigation — menu' });
      await user.click(within(mobileNav).getByRole('link', { name: 'Home' }));
      expect(itemClick).toHaveBeenCalledTimes(1);
      expect(onMobileOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(
        <Navbar brand={<span>Acme</span>} items={items} aria-label="Main navigation" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with active item', async () => {
      const { container } = render(
        <Navbar
          brand={<span>Acme</span>}
          items={[{ key: 'home', label: 'Home', href: '/', isActive: true }]}
          aria-label="Main navigation"
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — mobile menu open', async () => {
      const { container } = render(
        <Navbar items={items} isMobileOpen={true} aria-label="Main navigation" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
