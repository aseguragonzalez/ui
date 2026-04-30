// Root setup — main.tsx or App.tsx
import { ToastProvider } from '@aseguragonzalez/ui';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <ToastProvider maxToasts={4}>
    <App />
  </ToastProvider>
);

// ─────────────────────────────────────────────

// Usage inside any component
import { useToast, Button } from '@aseguragonzalez/ui';

export function SaveSettingsButton() {
  const { show } = useToast();

  async function handleSave() {
    try {
      await saveSettings();
      show({ message: 'Configuración guardada', variant: 'success' });
    } catch {
      show({
        message: 'No se pudo guardar. Inténtalo de nuevo.',
        variant: 'error',
        duration: 8000,
      });
    }
  }

  return <Button onClick={handleSave}>Guardar</Button>;
}

// ─────────────────────────────────────────────

// Persistent toast: dismiss when long operation finishes
import { useToast, Button } from '@aseguragonzalez/ui';

export function ExportButton() {
  const { show, dismiss } = useToast();

  async function handleExport() {
    const id = show({
      message: 'Exportando datos… esto puede tardar un momento.',
      variant: 'info',
      duration: 0,
    });

    try {
      await exportData();
      dismiss(id);
      show({ message: 'Exportación completada', variant: 'success' });
    } catch {
      dismiss(id);
      show({ message: 'La exportación ha fallado.', variant: 'error' });
    }
  }

  return <Button onClick={handleExport}>Exportar</Button>;
}
