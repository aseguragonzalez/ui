import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import { AuthLayout } from './AuthLayout';

describe('AuthLayout', () => {
  describe('rendering', () => {
    it('renders children inside a <main> element', () => {
      render(
        <AuthLayout>
          <p>Sign in form</p>
        </AuthLayout>,
      );
      expect(screen.getByRole('main')).toHaveTextContent('Sign in form');
    });
  });

  describe('footer', () => {
    it('renders the footer as the contentinfo landmark outside <main>', () => {
      render(
        <AuthLayout footer={<p>Legal links</p>}>
          <p>Sign in form</p>
        </AuthLayout>,
      );
      const footer = screen.getByRole('contentinfo');
      expect(footer.tagName).toBe('FOOTER');
      expect(footer).toHaveTextContent('Legal links');
      expect(screen.getByRole('main')).not.toContainElement(footer);
    });

    it('renders no footer when footer is absent', () => {
      render(
        <AuthLayout>
          <p>Sign in form</p>
        </AuthLayout>,
      );
      expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });
  });

  describe('branding panel', () => {
    it('exposes the branding panel as a complementary landmark labelled by the default label', () => {
      render(
        <AuthLayout>
          <h1>Sign in</h1>
        </AuthLayout>,
      );
      const aside = screen.getByRole('complementary', { name: 'Product branding' });
      expect(aside.tagName).toBe('ASIDE');
      expect(aside).not.toHaveAttribute('aria-hidden');
    });

    it('labels the branding panel with brandingLabel', () => {
      render(
        <AuthLayout brandingLabel="Marca del producto">
          <h1>Iniciar sesión</h1>
        </AuthLayout>,
      );
      expect(screen.getByRole('complementary', { name: 'Marca del producto' })).toBeInTheDocument();
    });

    it('exposes custom branding content to assistive technology', () => {
      render(
        <AuthLayout branding={<p>Custom branding</p>}>
          <h1>Sign in</h1>
        </AuthLayout>,
      );
      expect(screen.getByRole('complementary', { name: 'Product branding' })).toHaveTextContent(
        'Custom branding',
      );
    });
  });

  describe('logo', () => {
    const meaningfulLogo = <img src="logo.svg" alt="Acme" />;

    it('exposes the mobile copy of a meaningful logo in the form panel', () => {
      render(
        <AuthLayout logo={meaningfulLogo}>
          <h1>Sign in</h1>
        </AuthLayout>,
      );
      expect(within(screen.getByRole('main')).getByRole('img', { name: 'Acme' })).toBeInTheDocument();
    });

    it('exposes the desktop copy of a meaningful logo in the branding panel', () => {
      render(
        <AuthLayout logo={meaningfulLogo}>
          <h1>Sign in</h1>
        </AuthLayout>,
      );
      expect(
        within(screen.getByRole('complementary', { name: 'Product branding' })).getByRole('img', {
          name: 'Acme',
        }),
      ).toBeInTheDocument();
    });

    it('renders no other copy of the logo', () => {
      render(
        <AuthLayout logo={meaningfulLogo}>
          <h1>Sign in</h1>
        </AuthLayout>,
      );
      expect(screen.getAllByRole('img', { name: 'Acme', hidden: true })).toHaveLength(2);
    });

    it('hides each copy on the viewport where the other one is shown', () => {
      const css = readFileSync(join(__dirname, 'AuthLayout.module.css'), 'utf8');
      const [mobile, desktop] = css.split('@media (min-width: 768px)');
      expect(mobile).toMatch(/\.brandPanel \{[^}]*display: none;/);
      expect(mobile).not.toMatch(/\.mobileLogo \{[^}]*display: none;/);
      expect(desktop).toMatch(/\.brandPanel \{[^}]*display: flex;/);
      expect(desktop).toMatch(/\.mobileLogo \{[^}]*display: none;/);
    });

    it('exposes only the form panel copy when custom branding replaces the logo', () => {
      render(
        <AuthLayout logo={meaningfulLogo} branding={<p>Custom branding</p>}>
          <h1>Sign in</h1>
        </AuthLayout>,
      );
      expect(screen.getAllByRole('img', { name: 'Acme', hidden: true })).toHaveLength(1);
      expect(within(screen.getByRole('main')).getByRole('img', { name: 'Acme' })).toBeInTheDocument();
    });

    it('keeps the default logo hidden from assistive technology', () => {
      const { container } = render(
        <AuthLayout>
          <h1>Sign in</h1>
        </AuthLayout>,
      );
      const svgs = container.querySelectorAll('svg');
      expect(svgs).toHaveLength(2);
      svgs.forEach((svg) => expect(svg).toHaveAttribute('aria-hidden', 'true'));
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('tagline', () => {
    it('shows the English tagline by default', () => {
      const { container } = render(
        <AuthLayout>
          <h1>Sign in</h1>
        </AuthLayout>,
      );
      expect(container).toHaveTextContent('Build better products,together.');
    });

    it('shows the given tagline', () => {
      const { container } = render(
        <AuthLayout tagline="Crea mejores productos, juntos.">
          <h1>Iniciar sesión</h1>
        </AuthLayout>,
      );
      expect(container).toHaveTextContent('Crea mejores productos, juntos.');
      expect(container).not.toHaveTextContent('Build better products');
    });
  });

  describe('a11y — axe', () => {
    it('has no violations', async () => {
      const { container } = render(
        <AuthLayout>
          <h1>Sign in</h1>
        </AuthLayout>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with footer', async () => {
      const { container } = render(
        <AuthLayout footer={<p>Legal links</p>}>
          <h1>Sign in</h1>
        </AuthLayout>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — custom branding and brandingLabel', async () => {
      const { container } = render(
        <AuthLayout branding={<p>Custom branding</p>} brandingLabel="Marca del producto">
          <h1>Iniciar sesión</h1>
        </AuthLayout>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — meaningful logo', async () => {
      const { container } = render(
        <AuthLayout logo={<img src="logo.svg" alt="Acme" />}>
          <h1>Sign in</h1>
        </AuthLayout>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — meaningful logo with custom branding', async () => {
      const { container } = render(
        <AuthLayout logo={<img src="logo.svg" alt="Acme" />} branding={<p>Custom branding</p>}>
          <h1>Sign in</h1>
        </AuthLayout>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — custom tagline', async () => {
      const { container } = render(
        <AuthLayout tagline="Crea mejores productos, juntos.">
          <h1>Iniciar sesión</h1>
        </AuthLayout>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
