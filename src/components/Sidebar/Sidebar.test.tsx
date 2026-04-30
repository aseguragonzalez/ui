import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Sidebar } from './Sidebar';

const items = [
  { key: 'home', label: 'Home', href: '/', isActive: true },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'settings', label: 'Settings', href: '/settings' },
];

describe('Sidebar', () => {
  describe('rendering', () => {
    it('renders all nav items', () => {
      render(<Sidebar items={items} />);
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument();
    });

    it('sets aria-current="page" on active item', () => {
      render(<Sidebar items={items} />);
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
        'aria-current',
        'page',
      );
    });

    it('does not set aria-current on inactive items', () => {
      render(<Sidebar items={items} />);
      expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
    });

    it('renders logo slot', () => {
      render(<Sidebar items={items} logo={<span>Logo</span>} />);
      expect(screen.getByText('Logo')).toBeInTheDocument();
    });

    it('renders header slot', () => {
      render(<Sidebar items={items} header={<span>Acme</span>} />);
      expect(screen.getByText('Acme')).toBeInTheDocument();
    });

    it('renders footer slot', () => {
      render(<Sidebar items={items} footer={<span>v1.0.0</span>} />);
      expect(screen.getByText('v1.0.0')).toBeInTheDocument();
    });

    it('renders both logo and header together', () => {
      render(
        <Sidebar
          items={items}
          logo={<span>Icon</span>}
          header={<span>Acme</span>}
        />,
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Acme')).toBeInTheDocument();
    });
  });

  describe('collapse behaviour', () => {
    it('renders collapse toggle button', () => {
      render(<Sidebar items={items} />);
      expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument();
    });

    it('toggles aria-expanded on collapse button click', async () => {
      const user = userEvent.setup();
      render(<Sidebar items={items} />);
      const btn = screen.getByRole('button', { name: 'Collapse sidebar' });
      expect(btn).toHaveAttribute('aria-expanded', 'true');
      await user.click(btn);
      expect(screen.getByRole('button', { name: 'Expand sidebar' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    });

    it('calls onCollapsedChange when toggled', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();
      render(<Sidebar items={items} onCollapsedChange={handler} />);
      await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
      expect(handler).toHaveBeenCalledWith(true);
    });

    it('respects controlled isCollapsed prop', () => {
      render(<Sidebar items={items} isCollapsed={true} />);
      expect(
        screen.getByRole('button', { name: 'Expand sidebar' }),
      ).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('mobile drawer', () => {
    function mockMobile() {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(max-width: 767px)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    }

    afterEach(() => {
      vi.restoreAllMocks();
      document.body.style.overflow = '';
    });

    it('renders controlled open state with isMobileOpen', () => {
      render(<Sidebar items={items} isMobileOpen={true} />);
      expect(screen.getByRole('button', { name: 'Close sidebar' })).toBeInTheDocument();
    });

    it('renders uncontrolled open state with defaultMobileOpen', () => {
      render(<Sidebar items={items} defaultMobileOpen={true} />);
      expect(screen.getByRole('button', { name: 'Close sidebar' })).toBeInTheDocument();
    });

    it('calls onMobileOpenChange(false) when close button is clicked', async () => {
      const user = userEvent.setup();
      const onMobileOpenChange = vi.fn();
      render(
        <Sidebar items={items} isMobileOpen={true} onMobileOpenChange={onMobileOpenChange} />,
      );
      await user.click(screen.getByRole('button', { name: 'Close sidebar' }));
      expect(onMobileOpenChange).toHaveBeenCalledWith(false);
    });

    it('calls onMobileOpenChange(false) when close button clicked with logo slot', async () => {
      const user = userEvent.setup();
      const onMobileOpenChange = vi.fn();
      render(
        <Sidebar
          items={items}
          isMobileOpen={true}
          onMobileOpenChange={onMobileOpenChange}
          logo={<span>Logo</span>}
          header={<span>Brand</span>}
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Close sidebar' }));
      expect(onMobileOpenChange).toHaveBeenCalledWith(false);
    });

    it('closes on Escape key', () => {
      const onMobileOpenChange = vi.fn();
      render(
        <Sidebar items={items} isMobileOpen={true} onMobileOpenChange={onMobileOpenChange} />,
      );
      const panel = screen.getByRole('navigation').parentElement!;
      fireEvent.keyDown(panel, { key: 'Escape' });
      expect(onMobileOpenChange).toHaveBeenCalledWith(false);
    });

    it('closes on backdrop click', () => {
      const onMobileOpenChange = vi.fn();
      render(
        <Sidebar items={items} isMobileOpen={true} onMobileOpenChange={onMobileOpenChange} />,
      );
      const backdrop = document.body.querySelector('div[aria-hidden="true"]') as HTMLElement;
      fireEvent.click(backdrop);
      expect(onMobileOpenChange).toHaveBeenCalledWith(false);
    });

    it('locks scroll when drawer opens on mobile viewport', () => {
      mockMobile();
      render(<Sidebar items={items} isMobileOpen={true} />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores scroll when drawer closes on mobile viewport', () => {
      mockMobile();
      const { rerender } = render(<Sidebar items={items} isMobileOpen={true} />);
      rerender(<Sidebar items={items} isMobileOpen={false} />);
      expect(document.body.style.overflow).toBe('');
    });

    it('has no axe violations when mobile drawer is open', async () => {
      const { container } = render(
        <Sidebar items={items} isMobileOpen={true} aria-label="Sidebar navigation" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(
        <Sidebar items={items} aria-label="Sidebar navigation" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — collapsed', async () => {
      const { container } = render(
        <Sidebar items={items} defaultCollapsed aria-label="Sidebar navigation" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with logo, header and footer', async () => {
      const { container } = render(
        <Sidebar
          items={items}
          logo={<span>🔷</span>}
          header={<span>Acme</span>}
          footer={<span>v1.0.0</span>}
          aria-label="Sidebar navigation"
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
