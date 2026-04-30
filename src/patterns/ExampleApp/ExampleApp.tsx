import { useState } from 'react';
import { ThemeProvider } from '../../components/ThemeProvider/ThemeProvider';
import { AppShell } from './AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { SettingsPage } from './pages/SettingsPage';
import type { Page } from './mockData';

export function ExampleApp() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  return (
    <ThemeProvider defaultTheme="light" storageKey="ds-theme-example-app">
      <AppShell currentPage={currentPage} onNavigate={setCurrentPage}>
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'users'     && <UsersPage />}
        {currentPage === 'settings'  && <SettingsPage />}
      </AppShell>
    </ThemeProvider>
  );
}
