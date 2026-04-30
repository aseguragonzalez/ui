import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { PageLayout } from './PageLayout';

describe('PageLayout', () => {
  describe('rendering', () => {
    it('renders a <div> element', () => {
      render(<PageLayout data-testid="pl">content</PageLayout>);
      expect(screen.getByTestId('pl').tagName).toBe('DIV');
    });

    it('renders children', () => {
      render(<PageLayout><p>Page content</p></PageLayout>);
      expect(screen.getByText('Page content')).toBeInTheDocument();
    });

    it('forwards ref to root div', () => {
      const ref = { current: null };
      render(<PageLayout ref={ref}>content</PageLayout>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes native HTML attributes', () => {
      render(<PageLayout data-testid="pl" id="page">content</PageLayout>);
      expect(screen.getByTestId('pl')).toHaveAttribute('id', 'page');
    });

    it('merges className', () => {
      render(<PageLayout data-testid="pl" className="custom">content</PageLayout>);
      expect(screen.getByTestId('pl').className).toContain('custom');
    });
  });

  describe('gap prop', () => {
    it('applies gap as inline style', () => {
      render(<PageLayout data-testid="pl" gap={8}>content</PageLayout>);
      expect(screen.getByTestId('pl')).toHaveStyle({ gap: 'var(--ds-space-8)' });
    });
  });

  describe('maxWidth prop', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;

    sizes.forEach((maxWidth) => {
      it(`renders without error — maxWidth ${maxWidth}`, () => {
        render(<PageLayout data-testid="pl" maxWidth={maxWidth}>content</PageLayout>);
        expect(screen.getByTestId('pl')).toBeInTheDocument();
      });
    });
  });

  describe('padding prop', () => {
    it('applies padding class when padding=true (default)', () => {
      render(<PageLayout data-testid="pl">content</PageLayout>);
      expect(screen.getByTestId('pl').className).toMatch(/padding/);
    });

    it('does not apply padding class when padding=false', () => {
      render(<PageLayout data-testid="pl" padding={false}>content</PageLayout>);
      const classList = screen.getByTestId('pl').className;
      expect(classList).not.toMatch(/\bpadding\b/);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(
        <PageLayout>
          <h1>Page title</h1>
          <p>Page content</p>
        </PageLayout>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — padding false, maxWidth sm', async () => {
      const { container } = render(
        <PageLayout padding={false} maxWidth="sm">
          <p>Content</p>
        </PageLayout>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
