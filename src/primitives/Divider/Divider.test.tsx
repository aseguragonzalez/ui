import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Divider } from './Divider';

describe('Divider', () => {
  describe('rendering', () => {
    it('renders as an <hr> element', () => {
      const { container } = render(<Divider />);
      expect(container.querySelector('hr')).toBeInTheDocument();
    });

    it('forwards the ref to the hr element', () => {
      const ref = { current: null };
      render(<Divider ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLHRElement);
    });

    it('passes native HTML attributes to the element', () => {
      render(<Divider data-testid="divider" />);
      expect(screen.getByTestId('divider')).toBeInTheDocument();
    });
  });

  describe('decorative (default)', () => {
    it('is aria-hidden by default', () => {
      render(<Divider data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('aria-hidden', 'true');
    });

    it('is aria-hidden when decorative=true is explicit', () => {
      render(<Divider decorative data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('semantic (decorative=false)', () => {
    it('does not set aria-hidden when decorative=false', () => {
      render(<Divider decorative={false} data-testid="divider" />);
      expect(screen.getByTestId('divider')).not.toHaveAttribute('aria-hidden');
    });

    it('renders with role="separator" when decorative=false', () => {
      render(<Divider decorative={false} />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('sets aria-label when label is provided and decorative=false', () => {
      render(<Divider decorative={false} label="Sección de configuración" />);
      expect(screen.getByRole('separator', { name: 'Sección de configuración' })).toBeInTheDocument();
    });

    it('sets aria-orientation="vertical" for semantic vertical divider', () => {
      render(<Divider decorative={false} orientation="vertical" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('does not set aria-orientation for horizontal semantic divider', () => {
      render(<Divider decorative={false} orientation="horizontal" data-testid="divider" />);
      expect(screen.getByTestId('divider')).not.toHaveAttribute('aria-orientation');
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — decorative horizontal', async () => {
      const { container } = render(<Divider />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — decorative vertical', async () => {
      const { container } = render(<Divider orientation="vertical" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — semantic horizontal', async () => {
      const { container } = render(<Divider decorative={false} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — semantic with label', async () => {
      const { container } = render(<Divider decorative={false} label="Separación de contenido" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — semantic vertical', async () => {
      const { container } = render(<Divider decorative={false} orientation="vertical" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
