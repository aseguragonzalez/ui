import { useState } from 'react';
import { Modal, ModalBody, ModalFooter, Button, useToast } from '@aseguragonzalez/ui';

// Destructive confirmation modal
export function DeleteProjectButton({ projectName }: { projectName: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { show } = useToast();

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteProject();
      setOpen(false);
      show({ message: `"${projectName}" eliminado correctamente.`, variant: 'success' });
    } catch {
      show({ message: 'No se pudo eliminar el proyecto.', variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Eliminar proyecto
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Eliminar proyecto"
        size="sm"
        closeLabel="Cancelar y cerrar"
      >
        <ModalBody>
          <p>
            Estás a punto de eliminar <strong>{projectName}</strong>. Esta acción es permanente
            y no se puede deshacer.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? 'Eliminando…' : 'Eliminar'}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

// Non-destructive confirmation modal (e.g. publish)
export function PublishButton({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const { show } = useToast();

  async function handlePublish() {
    await publishContent();
    setOpen(false);
    show({ message: 'Publicado correctamente.', variant: 'success' });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Publicar</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirmar publicación"
        size="sm"
      >
        <ModalBody>
          <p>
            <strong>{title}</strong> estará visible públicamente en cuanto confirmes.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handlePublish}>Publicar ahora</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
