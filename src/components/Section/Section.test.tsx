import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Section } from './Section';

describe('Section', () => {
  describe('rendering', () => {
    it('renders a <div> element', () => {
      render(<Section data-testid="s">content</Section>);
      expect(screen.getByTestId('s').tagName).toBe('DIV');
    });

    it('renders children', () => {
      render(<Section><p>Hello</p></Section>);
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('forwards ref to root div', () => {
      const ref = { current: null };
      render(<Section ref={ref}>content</Section>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes native HTML attributes', () => {
      render(<Section data-testid="s" id="my-section">content</Section>);
      expect(screen.getByTestId('s')).toHaveAttribute('id', 'my-section');
    });

    it('merges className', () => {
      render(<Section data-testid="s" className="custom">content</Section>);
      expect(screen.getByTestId('s').className).toContain('custom');
    });
  });

  describe('variant prop', () => {
    const variants = ['surface', 'flat'] as const;

    variants.forEach((variant) => {
      it(`renders without error — ${variant}`, () => {
        render(<Section data-testid="s" variant={variant}>content</Section>);
        expect(screen.getByTestId('s')).toBeInTheDocument();
      });
    });
  });

  describe('padding prop', () => {
    const sizes = ['none', 'sm', 'md', 'lg'] as const;

    sizes.forEach((padding) => {
      it(`renders without error — padding ${padding}`, () => {
        render(<Section data-testid="s" padding={padding}>content</Section>);
        expect(screen.getByTestId('s')).toBeInTheDocument();
      });
    });
  });

  describe('gap prop', () => {
    it('applies gap as inline style', () => {
      render(<Section data-testid="s" gap={6}>content</Section>);
      expect(screen.getByTestId('s')).toHaveStyle({ gap: 'var(--ds-space-6)' });
    });

    it('applies zero gap', () => {
      render(<Section data-testid="s" gap={0}>content</Section>);
      expect(screen.getByTestId('s')).toHaveStyle({ gap: '0' });
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — surface (default)', async () => {
      const { container } = render(
        <Section>
          <h2>Section title</h2>
          <p>Section content</p>
        </Section>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — flat', async () => {
      const { container } = render(
        <Section variant="flat" padding="sm">
          <p>Flat section content</p>
        </Section>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — padding none', async () => {
      const { container } = render(
        <Section padding="none">
          <p>Content</p>
        </Section>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
