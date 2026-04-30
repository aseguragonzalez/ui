import { Sidebar, type SidebarItem, Avatar, Breadcrumb } from '@aseguragonzalez/ui';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M10.707 2.293a1 1 0 0 0-1.414 0l-7 7A1 1 0 0 0 3 11h1v6a1 1 0 0 0 1 1h4v-5h2v5h4a1 1 0 0 0 1-1v-6h1a1 1 0 0 0 .707-1.707l-7-7Z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M9 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM17 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 0 0-1.5-4.33A5 5 0 0 1 19 16v1h-6.07ZM6 11a5 5 0 0 1 5 5v1H1v-1a5 5 0 0 1 5-5Z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 0 1-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 0 1 .947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 0 1 2.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 0 1 2.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 0 1 .947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 0 1-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 0 1-2.287-.947ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
  </svg>
);

const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="var(--ds-color-action-primary)" aria-hidden="true">
    <rect width="32" height="32" rx="8" />
    <path d="M8 16h16M16 8v16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const NAV_ITEMS: SidebarItem[] = [
  { key: 'inicio', label: 'Inicio', icon: <HomeIcon />, href: '/', isActive: true },
  { key: 'usuarios', label: 'Usuarios', icon: <UsersIcon />, href: '/usuarios' },
  { key: 'ajustes', label: 'Ajustes', icon: <SettingsIcon />, href: '/ajustes' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        items={NAV_ITEMS}
        logo={<LogoIcon />}
        header={<span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Mi Aplicación</span>}
        footer={
          <Avatar
            src="/avatar.jpg"
            alt="Ana García"
            size="sm"
          />
        }
        aria-label="Navegación principal"
      />

      <main style={{ flex: 1, padding: '1.5rem', overflow: 'auto' }}>
        <Breadcrumb
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Usuarios', href: '/usuarios' },
            { label: 'Detalle' },
          ]}
          aria-label="Ruta de navegación"
        />

        {children}
      </main>
    </div>
  );
}
