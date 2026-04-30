import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  describe('rendering', () => {
    it('renders a <span> element', () => {
      render(<Skeleton data-testid="skel" />);
      expect(screen.getByTestId('skel').tagName).toBe('SPAN');
    });

    it('is aria-hidden', () => {
      render(<Skeleton data-testid="skel" />);
      expect(screen.getByTestId('skel')).toHaveAttribute('aria-hidden', 'true');
    });

    it('forwards the ref to the root element', () => {
      const ref = { current: null };
      render(<Skeleton ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('passes native HTML attributes', () => {
      render(<Skeleton data-testid="skel" id="test-id" />);
      expect(screen.getByTestId('skel')).toHaveAttribute('id', 'test-id');
    });

    it('applies width and height via inline style', () => {
      render(<Skeleton data-testid="skel" width="200px" height="40px" />);
      const el = screen.getByTestId('skel');
      expect(el).toHaveStyle({ width: '200px', height: '40px' });
    });

    it('converts numeric width/height to px', () => {
      render(<Skeleton data-testid="skel" width={120} height={24} />);
      const el = screen.getByTestId('skel');
      expect(el).toHaveStyle({ width: '120px', height: '24px' });
    });
  });

  describe('shapes', () => {
    it('renders rect shape (default) without errors', () => {
      render(<Skeleton data-testid="skel" shape="rect" />);
      expect(screen.getByTestId('skel')).toBeInTheDocument();
    });

    it('renders circle shape without errors', () => {
      render(<Skeleton data-testid="skel" shape="circle" width={40} />);
      expect(screen.getByTestId('skel')).toBeInTheDocument();
    });

    it('renders text shape without errors', () => {
      render(<Skeleton data-testid="skel" shape="text" />);
      expect(screen.getByTestId('skel')).toBeInTheDocument();
    });
  });

  describe('multi-line text', () => {
    it('renders a wrapper span when lines > 1', () => {
      render(<Skeleton data-testid="group" shape="text" lines={3} />);
      const group = screen.getByTestId('group');
      expect(group.querySelectorAll('span').length).toBe(3);
    });

    it('does not render a wrapper when lines = 1', () => {
      render(<Skeleton data-testid="skel" shape="text" lines={1} />);
      expect(screen.getByTestId('skel').tagName).toBe('SPAN');
      expect(screen.getByTestId('skel').querySelectorAll('span').length).toBe(0);
    });

    it('multi-line group is aria-hidden', () => {
      render(<Skeleton data-testid="group" shape="text" lines={2} />);
      expect(screen.getByTestId('group')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — rect (default)', async () => {
      const { container } = render(<Skeleton />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — circle', async () => {
      const { container } = render(<Skeleton shape="circle" width={40} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — text single line', async () => {
      const { container } = render(<Skeleton shape="text" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — text multi-line', async () => {
      const { container } = render(<Skeleton shape="text" lines={3} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
