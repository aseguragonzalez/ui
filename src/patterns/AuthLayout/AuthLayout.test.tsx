import { render, screen } from '@testing-library/react';
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
