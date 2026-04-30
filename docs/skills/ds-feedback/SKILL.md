---
name: ds-feedback
description: Wire up user feedback patterns. Use when asked for toast notifications, inline alerts, error banners, or confirmation modals.
compatibility: Requires @aseguragonzalez/ui. React 18+.
metadata:
  layer: ui
  pattern: feedback
allowed-tools: Read Glob Write Edit
---

Wire up feedback patterns using `ToastProvider` + `useToast`, `Alert`, and `Modal`. Each pattern has a distinct role — choose based on context.

## Pattern guide

| Pattern | When to use |
|---|---|
| **Toast** | Transient confirmation of an action the user just took (saved, deleted, copied). Disappears automatically. |
| **Alert** | Inline, persistent feedback about the current page state (form error summary, degraded service, required action). Does not disappear on its own. |
| **Modal (confirm)** | Blocking confirmation before a destructive or irreversible action (delete, revoke access, submit for review). Requires an explicit response. |

---

## Toast

### Setup (once, at app root)

`ToastProvider` must wrap the application root. It injects an `aria-live` region via portal:

```tsx
// main.tsx or App.tsx
import { ToastProvider } from '@aseguragonzalez/ui';

createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <App />
  </ToastProvider>
);
```

### Usage inside components

```ts
import { useToast } from '@aseguragonzalez/ui';

const { show, dismiss } = useToast();

// Show a toast
show({ message: 'Cambios guardados', variant: 'success' });

// Persist until manually dismissed (duration: 0)
const id = show({ message: 'Exportando datos…', variant: 'info', duration: 0 });
// later:
dismiss(id);
```

`variant`: `'info' | 'success' | 'error' | 'warning'` (default: `'info'`)  
`duration`: ms before auto-dismiss (default: `5000`; `0` = never auto-dismiss)

---

## Alert

Inline banner, not a portal. Place it directly in the component tree where the message belongs:

```tsx
import { Alert } from '@aseguragonzalez/ui';

// Non-dismissible
<Alert variant="warning" title="Servicio degradado">
  Algunos datos pueden estar desactualizados. Estamos trabajando en ello.
</Alert>

// Dismissible
const [visible, setVisible] = useState(true);
{visible && (
  <Alert
    variant="error"
    title="No se pudo guardar"
    onDismiss={() => setVisible(false)}
    dismissLabel="Cerrar alerta de error"
  >
    Revisa tu conexión e inténtalo de nuevo.
  </Alert>
)}
```

`variant` determines role automatically: `'error'` and `'warning'` → `role="alert"` (assertive); `'success'` and `'info'` → `role="status"` (polite). Override with the `role` prop only if necessary.

---

## Modal (confirmation)

`Modal` traps focus and restores it on close — do not manage focus manually inside it.

```tsx
import { Modal, ModalBody, ModalFooter, Button } from '@aseguragonzalez/ui';

const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Eliminar proyecto"
  size="sm"
>
  <ModalBody>
    <p>Esta acción es permanente y no se puede deshacer. ¿Confirmas que quieres eliminar el proyecto?</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
  </ModalFooter>
</Modal>
```

`size`: `'sm' | 'md' | 'lg'` (default: `'md'`). Use `'sm'` for short confirmation dialogs.  
`closeLabel`: label for the built-in ✕ button (default: `"Cerrar"`).

---

## Step — Write the files

Read asset templates:
- `assets/toast_usage.tsx` — ToastProvider setup + usage in a page component
- `assets/alert_inline.tsx` — dismissible and non-dismissible Alert examples
- `assets/modal_confirm.tsx` — destructive confirmation modal pattern

## Gotchas

- **`ToastProvider` must be an ancestor.** `useToast()` throws if called outside the provider. Place it as high as possible in the tree — typically at the root.
- **Do not use `Alert` for transient notifications.** Alert is not an `aria-live` region — it only announces when first mounted. For post-action feedback, use Toast.
- **`Modal.title` is required** — it becomes the `aria-labelledby` for the dialog. Never omit it or replace it with a visual-only heading.
- **Do not manage focus inside `Modal`.** The component focuses the first focusable element on open and restores focus on close. Adding manual `focus()` calls will conflict with this behavior.
- **Confirmation modal button order:** Cancel on the left, destructive/confirm action on the right — consistent with platform conventions.
- **`duration: 0` toasts must be dismissed programmatically.** Save the returned `id` from `show()` and call `dismiss(id)` when the operation completes.
