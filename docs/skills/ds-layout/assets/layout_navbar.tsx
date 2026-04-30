import { Navbar, type NavItem, Avatar, Button } from '@aseguragonzalez/ui';

const LogoWordmark = () => (
  <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
    Acme
  </span>
);

const NAV_ITEMS: NavItem[] = [
  { key: 'producto', label: 'Producto', href: '/producto' },
  { key: 'precios', label: 'Precios', href: '/precios' },
  { key: 'docs', label: 'Documentación', href: '/docs', isActive: true },
  { key: 'blog', label: 'Blog', href: '/blog' },
];

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar
        brand={<LogoWordmark />}
        items={NAV_ITEMS}
        actions={
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Button variant="ghost" size="sm">Iniciar sesión</Button>
            <Button size="sm">Empezar gratis</Button>
          </div>
        }
        sticky
        aria-label="Navegación del sitio"
      />

      <main style={{ padding: '2rem' }}>
        {children}
      </main>
    </>
  );
}

// App variant: Navbar + user avatar in actions
export function AppNavbar() {
  return (
    <Navbar
      brand={<LogoWordmark />}
      items={[
        { key: 'dashboard', label: 'Dashboard', href: '/dashboard', isActive: true },
        { key: 'proyectos', label: 'Proyectos', href: '/proyectos' },
        { key: 'equipo', label: 'Equipo', href: '/equipo' },
      ]}
      actions={
        <Avatar
          src="/avatar.jpg"
          alt="Carlos López"
          size="sm"
        />
      }
      sticky
    />
  );
}
