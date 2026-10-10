import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Link } from './Link';
import type { LinkComponentProps } from './LinkComponent';

const RouterLink = ({ href, ...rest }: LinkComponentProps) => (
  <a data-router-link="" href={`#router${href}`} {...rest} />
);

describe('Link', () => {
  describe('rendering', () => {
    it('renders an <a> with the href by default', () => {
      render(<Link href="/terminos">Términos</Link>);
      const link = screen.getByRole('link', { name: 'Términos' });
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/terminos');
      expect(link).not.toHaveAttribute('data-router-link');
    });

    it('applies the link styles and merges a custom className', () => {
      render(<Link href="/" className="custom">Inicio</Link>);
      const link = screen.getByRole('link', { name: 'Inicio' });
      expect(link.className).toMatch(/link/);
      expect(link).toHaveClass('custom');
    });

    it('passes native anchor attributes', () => {
      render(<Link href="https://example.com" target="_blank" rel="noreferrer">Externo</Link>);
      const link = screen.getByRole('link', { name: 'Externo' });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });

    it('forwards the ref to the anchor', () => {
      const ref = createRef<HTMLAnchorElement>();
      render(<Link ref={ref} href="/">Inicio</Link>);
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('linkComponent', () => {
    it('renders through the consumer-supplied component with the href', () => {
      render(<Link href="/ajustes" linkComponent={RouterLink}>Ajustes</Link>);
      const link = screen.getByRole('link', { name: 'Ajustes' });
      expect(link).toHaveAttribute('data-router-link');
      expect(link).toHaveAttribute('href', '#router/ajustes');
    });

    it('keeps the link styles and the custom className', () => {
      render(<Link href="/ajustes" className="custom" linkComponent={RouterLink}>Ajustes</Link>);
      const link = screen.getByRole('link', { name: 'Ajustes' });
      expect(link.className).toMatch(/link/);
      expect(link).toHaveClass('custom');
    });

    it('passes the link props to the consumer-supplied component', () => {
      render(
        <Link href="/ajustes" aria-current="page" title="Ir a ajustes" linkComponent={RouterLink}>
          Ajustes
        </Link>,
      );
      const link = screen.getByRole('link', { name: 'Ajustes' });
      expect(link).toHaveAttribute('aria-current', 'page');
      expect(link).toHaveAttribute('title', 'Ir a ajustes');
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default anchor', async () => {
      const { container } = render(
        <p>
          Lee los <Link href="/terminos">términos del servicio</Link>.
        </p>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — consumer-supplied component', async () => {
      const { container } = render(
        <p>
          Abre los <Link href="/ajustes" linkComponent={RouterLink}>ajustes</Link>.
        </p>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
