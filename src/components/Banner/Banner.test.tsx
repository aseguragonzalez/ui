import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Banner } from './Banner';
import { Button } from '../../primitives/Button/Button';

describe('Banner', () => {
  describe('rendering', () => {
    it('renders the headline', () => {
      render(<Banner headline="Scheduled maintenance tonight." />);
      expect(screen.getByText('Scheduled maintenance tonight.')).toBeInTheDocument();
    });

    it('renders the description when provided', () => {
      render(<Banner headline="Headline" description="Some extra detail." />);
      expect(screen.getByText('Some extra detail.')).toBeInTheDocument();
    });

    it('does not render a description element when omitted', () => {
      render(<Banner headline="Headline only" />);
      expect(screen.queryByText('Some extra detail.')).not.toBeInTheDocument();
    });

    it('renders actions slot', () => {
      render(<Banner headline="Headline" actions={<Button>Act</Button>} />);
      expect(screen.getByRole('button', { name: 'Act' })).toBeInTheDocument();
    });

    it('forwards ref to root div', () => {
      const ref = { current: null };
      render(<Banner ref={ref} headline="Headline" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes native HTML attributes', () => {
      render(<Banner data-testid="b" id="my-banner" headline="Headline" />);
      expect(screen.getByTestId('b')).toHaveAttribute('id', 'my-banner');
    });

    it('merges className', () => {
      render(<Banner data-testid="b" className="custom" headline="Headline" />);
      expect(screen.getByTestId('b').className).toContain('custom');
    });
  });

  describe('dismiss', () => {
    it('renders the dismiss button when onDismiss is provided', () => {
      render(<Banner headline="Headline" onDismiss={() => {}} />);
      expect(screen.getByRole('button', { name: 'Close banner' })).toBeInTheDocument();
    });

    it('does not render the dismiss button when onDismiss is absent', () => {
      render(<Banner headline="Headline" />);
      expect(screen.queryByRole('button', { name: 'Close banner' })).not.toBeInTheDocument();
    });

    it('calls onDismiss when dismiss button is clicked', async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(<Banner headline="Headline" onDismiss={onDismiss} />);
      await user.click(screen.getByRole('button', { name: 'Close banner' }));
      expect(onDismiss).toHaveBeenCalledOnce();
    });

    it('uses custom dismissLabel', () => {
      render(<Banner headline="Headline" onDismiss={() => {}} dismissLabel="Cerrar aviso" />);
      expect(screen.getByRole('button', { name: 'Cerrar aviso' })).toBeInTheDocument();
    });
  });

  describe('roles', () => {
    it('uses role="alert" for error variant', () => {
      render(<Banner data-testid="b" headline="Error" variant="error" />);
      expect(screen.getByTestId('b')).toHaveAttribute('role', 'alert');
    });

    it('uses role="alert" for warning variant', () => {
      render(<Banner data-testid="b" headline="Warning" variant="warning" />);
      expect(screen.getByTestId('b')).toHaveAttribute('role', 'alert');
    });

    it('uses role="status" for info variant', () => {
      render(<Banner data-testid="b" headline="Info" variant="info" />);
      expect(screen.getByTestId('b')).toHaveAttribute('role', 'status');
    });

    it('uses role="status" for success variant', () => {
      render(<Banner data-testid="b" headline="Success" variant="success" />);
      expect(screen.getByTestId('b')).toHaveAttribute('role', 'status');
    });

    it('uses role="region" with aria-label for promotional variant', () => {
      render(<Banner data-testid="b" headline="New feature available." variant="promotional" />);
      const el = screen.getByTestId('b');
      expect(el).toHaveAttribute('role', 'region');
      expect(el).toHaveAttribute('aria-label', 'New feature available.');
    });

    it('consumer-provided role overrides the default', () => {
      render(<Banner data-testid="b" headline="Headline" role="note" />);
      expect(screen.getByTestId('b')).toHaveAttribute('role', 'note');
    });
  });

  describe('layout', () => {
    it('renders without error — horizontal (default)', () => {
      render(<Banner data-testid="b" headline="Headline" layout="horizontal" actions={<Button>Act</Button>} />);
      expect(screen.getByTestId('b')).toBeInTheDocument();
    });

    it('renders without error — stacked', () => {
      render(<Banner data-testid="b" headline="Headline" layout="stacked" actions={<Button>Act</Button>} />);
      expect(screen.getByTestId('b')).toBeInTheDocument();
    });
  });

  describe('a11y — axe', () => {
    const variants = ['info', 'success', 'warning', 'error', 'promotional'] as const;

    variants.forEach((variant) => {
      it(`has no violations — ${variant}`, async () => {
        const { container } = render(
          <Banner
            variant={variant}
            headline="Enterprise Analytics is now available."
            description="Upgrade to unlock advanced dashboards."
          />,
        );
        expect(await axe(container)).toHaveNoViolations();
      });
    });

    it('has no violations — with actions and dismiss', async () => {
      const { container } = render(
        <Banner
          variant="promotional"
          headline="New feature available."
          description="Upgrade to unlock it."
          actions={<Button size="sm">Upgrade</Button>}
          onDismiss={() => {}}
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — stacked layout', async () => {
      const { container } = render(
        <Banner
          variant="info"
          layout="stacked"
          headline="Scheduled maintenance tonight."
          description="Some features may be unavailable."
          actions={<Button size="sm">Learn more</Button>}
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
