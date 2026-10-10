import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  describe('rendering', () => {
    it('renders with role="img"', () => {
      render(<Avatar name="María García" />);
      expect(screen.getByRole('img', { name: 'María García' })).toBeInTheDocument();
    });

    it('uses name as aria-label', () => {
      render(<Avatar name="Carlos López" />);
      expect(screen.getByRole('img', { name: 'Carlos López' })).toBeInTheDocument();
    });

    it('forwards the ref to the outer span', () => {
      const ref = { current: null };
      render(<Avatar ref={ref} name="Test User" />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('passes native HTML attributes', () => {
      render(<Avatar name="Test" data-testid="avatar" />);
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });
  });

  describe('initials fallback', () => {
    it('shows initials from first and last name', () => {
      render(<Avatar name="María García" />);
      expect(screen.getByText('MG')).toBeInTheDocument();
    });

    it('shows single initial for a one-word name', () => {
      render(<Avatar name="Admin" />);
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('uses first and last word for multi-word names', () => {
      render(<Avatar name="Ana María de la Cruz" />);
      expect(screen.getByText('AC')).toBeInTheDocument();
    });

    it('hides initials from the accessibility tree', () => {
      render(<Avatar name="María García" />);
      const initials = screen.getByText('MG');
      expect(initials).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('image rendering', () => {
    it('renders an img element when src is provided', () => {
      render(<Avatar name="María García" src="https://example.com/avatar.jpg" />);
      expect(screen.getByRole('img', { name: 'María García' }).querySelector('img')).toBeInTheDocument();
    });

    it('sets alt="" on the img element (label is on the outer span)', () => {
      render(<Avatar name="María García" src="https://example.com/avatar.jpg" />);
      const img = document.querySelector('img');
      expect(img).toHaveAttribute('alt', '');
    });

    it('falls back to initials when image errors', async () => {
      render(<Avatar name="María García" src="https://broken.example.com/avatar.jpg" />);
      const img = document.querySelector('img')!;
      // Simulate image load error
      img.dispatchEvent(new Event('error'));
      expect(await screen.findByText('MG')).toBeInTheDocument();
    });
  });

  describe('decorative', () => {
    it('is hidden from assistive technology with no accessible name', () => {
      render(<Avatar name="María García" decorative data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveAttribute('aria-hidden', 'true');
      expect(avatar).not.toHaveAttribute('role');
      expect(avatar).not.toHaveAttribute('aria-label');
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('renders the img with alt=""', () => {
      render(<Avatar name="María García" src="https://example.com/a.jpg" decorative />);
      expect(document.querySelector('img')).toHaveAttribute('alt', '');
    });

    it('still shows initials visually', () => {
      render(<Avatar name="María García" decorative />);
      expect(screen.getByText('MG')).toBeInTheDocument();
    });
  });

  describe('image attributes', () => {
    it('forwards referrerPolicy to the img', () => {
      render(
        <Avatar
          name="María García"
          src="https://example.com/a.jpg"
          imgProps={{ referrerPolicy: 'no-referrer' }}
        />,
      );
      expect(document.querySelector('img')).toHaveAttribute('referrerpolicy', 'no-referrer');
    });

    it('forwards other image attributes', () => {
      render(
        <Avatar
          name="María García"
          src="https://example.com/a.jpg"
          imgProps={{ crossOrigin: 'anonymous', loading: 'lazy' }}
        />,
      );
      const img = document.querySelector('img');
      expect(img).toHaveAttribute('crossorigin', 'anonymous');
      expect(img).toHaveAttribute('loading', 'lazy');
    });

    it('keeps src, alt and the hidden state of the img', () => {
      render(
        <Avatar
          name="María García"
          src="https://example.com/a.jpg"
          imgProps={{ 'aria-hidden': false }}
        />,
      );
      const img = document.querySelector('img');
      expect(img).toHaveAttribute('src', 'https://example.com/a.jpg');
      expect(img).toHaveAttribute('alt', '');
      expect(img).toHaveAttribute('aria-hidden', 'true');
    });

    it('calls the forwarded onError and falls back to initials', async () => {
      const onError = vi.fn();
      render(
        <Avatar
          name="María García"
          src="https://broken.example.com/a.jpg"
          imgProps={{ onError }}
        />,
      );
      document.querySelector('img')!.dispatchEvent(new Event('error'));
      expect(await screen.findByText('MG')).toBeInTheDocument();
      expect(onError).toHaveBeenCalledTimes(1);
    });
  });

  describe('sizes and shapes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach((size) => {
      it(`renders without errors — size ${size}`, () => {
        render(<Avatar name="Test User" size={size} />);
        expect(screen.getByRole('img', { name: 'Test User' })).toBeInTheDocument();
      });
    });

    it('renders without errors — square shape', () => {
      render(<Avatar name="Test User" shape="square" />);
      expect(screen.getByRole('img', { name: 'Test User' })).toBeInTheDocument();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — initials fallback', async () => {
      const { container } = render(<Avatar name="María García" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with src', async () => {
      const { container } = render(
        <Avatar name="María García" src="https://example.com/a.jpg" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — decorative next to the visible name', async () => {
      const { container } = render(
        <p>
          <Avatar name="María García" src="https://example.com/a.jpg" decorative />
          <span>María García</span>
        </p>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with image attributes', async () => {
      const { container } = render(
        <Avatar
          name="María García"
          src="https://example.com/a.jpg"
          imgProps={{ referrerPolicy: 'no-referrer' }}
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — xl size', async () => {
      const { container } = render(<Avatar name="Carlos López" size="xl" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — square shape', async () => {
      const { container } = render(<Avatar name="Carlos López" shape="square" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
