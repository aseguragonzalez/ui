import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Stack } from './Stack';

describe('Stack', () => {
  describe('rendering', () => {
    it('renders a <div> element', () => {
      render(<Stack data-testid="stack">content</Stack>);
      expect(screen.getByTestId('stack').tagName).toBe('DIV');
    });

    it('renders children', () => {
      render(<Stack><span>Child</span></Stack>);
      expect(screen.getByText('Child')).toBeInTheDocument();
    });

    it('forwards the ref to the root div', () => {
      const ref = { current: null };
      render(<Stack ref={ref}>content</Stack>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes native HTML attributes', () => {
      render(<Stack data-testid="stack" id="my-stack">content</Stack>);
      expect(screen.getByTestId('stack')).toHaveAttribute('id', 'my-stack');
    });
  });

  describe('inline styles', () => {
    it('applies column direction by default', () => {
      render(<Stack data-testid="stack">content</Stack>);
      expect(screen.getByTestId('stack')).toHaveStyle({ flexDirection: 'column' });
    });

    it('applies row direction', () => {
      render(<Stack data-testid="stack" direction="row">content</Stack>);
      expect(screen.getByTestId('stack')).toHaveStyle({ flexDirection: 'row' });
    });

    it('applies center alignment', () => {
      render(<Stack data-testid="stack" align="center">content</Stack>);
      expect(screen.getByTestId('stack')).toHaveStyle({ alignItems: 'center' });
    });

    it('applies justify-between', () => {
      render(<Stack data-testid="stack" justify="between">content</Stack>);
      expect(screen.getByTestId('stack')).toHaveStyle({ justifyContent: 'space-between' });
    });

    it('applies flex-wrap when wrap=true', () => {
      render(<Stack data-testid="stack" wrap>content</Stack>);
      expect(screen.getByTestId('stack')).toHaveStyle({ flexWrap: 'wrap' });
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(<Stack><span>Item</span></Stack>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — row direction with multiple children', async () => {
      const { container } = render(
        <Stack direction="row" gap={4}>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </Stack>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
