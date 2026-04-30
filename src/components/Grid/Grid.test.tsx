import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Grid } from './Grid';

describe('Grid', () => {
  describe('rendering', () => {
    it('renders a <div> element', () => {
      render(<Grid data-testid="grid">content</Grid>);
      expect(screen.getByTestId('grid').tagName).toBe('DIV');
    });

    it('renders children', () => {
      render(<Grid><span>Cell</span></Grid>);
      expect(screen.getByText('Cell')).toBeInTheDocument();
    });

    it('forwards the ref to the root div', () => {
      const ref = { current: null };
      render(<Grid ref={ref}>content</Grid>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes native HTML attributes', () => {
      render(<Grid data-testid="grid" id="my-grid">content</Grid>);
      expect(screen.getByTestId('grid')).toHaveAttribute('id', 'my-grid');
    });
  });

  describe('inline styles', () => {
    it('applies repeat(1, minmax(0, 1fr)) by default', () => {
      render(<Grid data-testid="grid">content</Grid>);
      expect(screen.getByTestId('grid')).toHaveStyle({
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      });
    });

    it('applies correct grid-template-columns for cols=3', () => {
      render(<Grid data-testid="grid" cols={3}>content</Grid>);
      expect(screen.getByTestId('grid')).toHaveStyle({
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      });
    });
  });

  describe('responsive cols', () => {
    it('applies the responsive CSS class when cols is an object', () => {
      render(<Grid data-testid="grid" cols={{ mobile: 1, desktop: 3 }}>content</Grid>);
      expect(screen.getByTestId('grid').className).toMatch(/responsive/);
    });

    it('sets --grid-cols-mobile custom property', () => {
      render(<Grid data-testid="grid" cols={{ mobile: 2, desktop: 4 }}>content</Grid>);
      const el = screen.getByTestId('grid');
      expect(el.style.getPropertyValue('--grid-cols-mobile')).toBe('2');
    });

    it('sets --grid-cols-desktop custom property', () => {
      render(<Grid data-testid="grid" cols={{ mobile: 1, desktop: 4 }}>content</Grid>);
      const el = screen.getByTestId('grid');
      expect(el.style.getPropertyValue('--grid-cols-desktop')).toBe('4');
    });

    it('does not set tablet property when tablet is omitted', () => {
      render(<Grid data-testid="grid" cols={{ mobile: 1, desktop: 3 }}>content</Grid>);
      const el = screen.getByTestId('grid');
      expect(el.style.getPropertyValue('--grid-cols-tablet')).toBe('');
    });

    it('does not apply the responsive class when cols is a number', () => {
      render(<Grid data-testid="grid" cols={3}>content</Grid>);
      expect(screen.getByTestId('grid').className).not.toMatch(/responsive/);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(<Grid><span>A</span></Grid>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — 3 columns', async () => {
      const { container } = render(
        <Grid cols={3} gap={4}>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </Grid>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
