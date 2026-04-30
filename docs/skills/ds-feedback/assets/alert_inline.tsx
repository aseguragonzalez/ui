import { useState } from 'react';
import { Alert } from '@aseguragonzalez/ui';

// Non-dismissible — persistent status message
export function ServiceDegradedBanner() {
  return (
    <Alert variant="warning" title="Servicio con incidencia">
      Algunos reportes pueden mostrar datos desactualizados. Estamos trabajando para resolverlo.
    </Alert>
  );
}

// Dismissible — user can clear it
export function DismissibleErrorBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert
      variant="error"
      title="No se pudo guardar"
      onDismiss={() => setVisible(false)}
      dismissLabel="Cerrar alerta de error"
    >
      Revisa tu conexión a internet e inténtalo de nuevo.
    </Alert>
  );
}

// Success confirmation after an irreversible action (e.g. email sent)
export function ConfirmationAlert() {
  return (
    <Alert variant="success" title="Invitación enviada">
      El usuario recibirá un correo en los próximos minutos.
    </Alert>
  );
}

// Informational — no title
export function InfoBanner() {
  return (
    <Alert variant="info">
      Tu plan gratuito caduca en 7 días. <a href="/planes">Ver opciones de renovación</a>.
    </Alert>
  );
}
