import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Card } from './Card';

describe('Card', () => {
  describe('rendering', () => {
    it('renders a <div> root element', () => {
      render(<Card data-testid="card"><Card.Body>content</Card.Body></Card>);
      expect(screen.getByTestId('card').tagName).toBe('DIV');
    });

    it('forwards ref to root div', () => {
      const ref = { current: null };
      render(<Card ref={ref}><Card.Body>content</Card.Body></Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes native HTML attributes', () => {
      render(<Card data-testid="c" id="my-card"><Card.Body>content</Card.Body></Card>);
      expect(screen.getByTestId('c')).toHaveAttribute('id', 'my-card');
    });

    it('merges className', () => {
      render(<Card data-testid="c" className="custom"><Card.Body>content</Card.Body></Card>);
      expect(screen.getByTestId('c').className).toContain('custom');
    });
  });

  describe('sub-components', () => {
    it('renders Card.Media', () => {
      render(
        <Card>
          <Card.Media data-testid="media"><img src="/img.png" alt="Test" /></Card.Media>
        </Card>,
      );
      expect(screen.getByTestId('media')).toBeInTheDocument();
    });

    it('renders Card.Header with children', () => {
      render(
        <Card>
          <Card.Header data-testid="header"><h3>Title</h3></Card.Header>
        </Card>,
      );
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('renders Card.Body with children', () => {
      render(
        <Card>
          <Card.Body data-testid="body">Body content</Card.Body>
        </Card>,
      );
      expect(screen.getByTestId('body')).toBeInTheDocument();
      expect(screen.getByText('Body content')).toBeInTheDocument();
    });

    it('renders Card.Footer with children', () => {
      render(
        <Card>
          <Card.Body>content</Card.Body>
          <Card.Footer data-testid="footer"><button>Action</button></Card.Footer>
        </Card>,
      );
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('renders all sub-components together', () => {
      render(
        <Card>
          <Card.Media data-testid="media"><span>media</span></Card.Media>
          <Card.Header data-testid="header"><h3>Title</h3></Card.Header>
          <Card.Body data-testid="body">Body</Card.Body>
          <Card.Footer data-testid="footer"><button>Action</button></Card.Footer>
        </Card>,
      );
      expect(screen.getByTestId('media')).toBeInTheDocument();
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('body')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  describe('variant prop', () => {
    const variants = ['outlined', 'elevated', 'flat'] as const;

    variants.forEach((variant) => {
      it(`renders without error — ${variant}`, () => {
        render(
          <Card data-testid="c" variant={variant}>
            <Card.Body>content</Card.Body>
          </Card>,
        );
        expect(screen.getByTestId('c')).toBeInTheDocument();
      });
    });
  });

  describe('padding prop', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((padding) => {
      it(`renders without error — padding ${padding}`, () => {
        render(
          <Card data-testid="c" padding={padding}>
            <Card.Body>content</Card.Body>
          </Card>,
        );
        expect(screen.getByTestId('c')).toBeInTheDocument();
      });
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — outlined (default)', async () => {
      const { container } = render(
        <Card>
          <Card.Header><h3>Card title</h3></Card.Header>
          <Card.Body><p>Card content</p></Card.Body>
          <Card.Footer><button>Action</button></Card.Footer>
        </Card>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — elevated', async () => {
      const { container } = render(
        <Card variant="elevated">
          <Card.Body><p>Content</p></Card.Body>
        </Card>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — flat', async () => {
      const { container } = render(
        <Card variant="flat">
          <Card.Body><p>Content</p></Card.Body>
        </Card>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with media and img alt', async () => {
      const { container } = render(
        <Card>
          <Card.Media><img src="/img.png" alt="Product image" /></Card.Media>
          <Card.Header><h3>Title</h3></Card.Header>
          <Card.Body><p>Description</p></Card.Body>
        </Card>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
