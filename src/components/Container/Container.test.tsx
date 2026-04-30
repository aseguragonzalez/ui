import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Container } from './Container';

describe('Container', () => {
  describe('rendering', () => {
    it('renders a <div> element', () => {
      render(<Container data-testid="container">content</Container>);
      expect(screen.getByTestId('container').tagName).toBe('DIV');
    });

    it('renders children', () => {
      render(<Container><span>Content</span></Container>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('forwards the ref to the root div', () => {
      const ref = { current: null };
      render(<Container ref={ref}>content</Container>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes native HTML attributes', () => {
      render(<Container data-testid="ct" id="my-container">content</Container>);
      expect(screen.getByTestId('ct')).toHaveAttribute('id', 'my-container');
    });
  });

  describe('size variants', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;

    sizes.forEach((size) => {
      it(`renders without errors — ${size}`, () => {
        render(<Container data-testid="ct" size={size}>content</Container>);
        expect(screen.getByTestId('ct')).toBeInTheDocument();
      });
    });
  });

  describe('padding', () => {
    it('has padding class by default', () => {
      render(<Container data-testid="ct">content</Container>);
      expect(screen.getByTestId('ct').className).toMatch(/padding/);
    });

    it('does not have padding class when padding=false', () => {
      render(<Container data-testid="ct" padding={false}>content</Container>);
      expect(screen.getByTestId('ct').className).not.toMatch(/padding/);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(<Container><p>Hello world</p></Container>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — sm size, no padding', async () => {
      const { container } = render(
        <Container size="sm" padding={false}><p>Content</p></Container>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
