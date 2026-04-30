import { TextField, SelectField, Button } from '@aseguragonzalez/ui';

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Administrador' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Lector' },
];

export function InviteUserForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email') as string;
    const role = data.get('role') as string;
    console.log({ email, role });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
      <TextField
        name="email"
        label="Correo electrónico"
        type="email"
        hint="El usuario recibirá una invitación en esta dirección."
        required
      />

      <SelectField
        name="role"
        label="Rol"
        options={ROLE_OPTIONS}
        placeholder="Selecciona un rol"
        required
      />

      <Button type="submit">Enviar invitación</Button>
    </form>
  );
}
