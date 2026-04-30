import { useState } from 'react';
import {
  TextField,
  EmailField,
  PasswordField,
  NumberField,
  TextAreaField,
  SelectField,
  RadioGroup,
  CheckboxField,
  ToggleField,
  Button,
} from '@aseguragonzalez/ui';

type FormErrors = Partial<Record<string, string>>;

const COUNTRY_OPTIONS = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
];

const PLAN_OPTIONS = [
  { value: 'free', label: 'Gratuito' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
];

export function RegisterForm() {
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(data: FormData): FormErrors {
    const errs: FormErrors = {};
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const terms = data.get('terms');

    if (!email.includes('@')) errs.email = 'Introduce un correo válido.';
    if (password.length < 8) errs.password = 'La contraseña debe tener al menos 8 caracteres.';
    if (!terms) errs.terms = 'Debes aceptar los términos para continuar.';
    return errs;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    // submit...
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 480 }}>
      <TextField
        name="nombre"
        label="Nombre completo"
        required
      />

      <EmailField
        name="email"
        label="Correo electrónico"
        error={errors.email}
        required
      />

      <PasswordField
        name="password"
        label="Contraseña"
        hint="Mínimo 8 caracteres."
        error={errors.password}
        required
      />

      <NumberField
        name="edad"
        label="Edad"
        min={18}
        max={120}
        hint="Debes ser mayor de 18 años."
      />

      <SelectField
        name="pais"
        label="País"
        options={COUNTRY_OPTIONS}
        placeholder="Selecciona tu país"
        required
      />

      <RadioGroup
        legend="Plan"
        name="plan"
        options={PLAN_OPTIONS}
        defaultValue="free"
        required
      />

      <TextAreaField
        name="bio"
        label="Descripción"
        hint="Cuéntanos brevemente quién eres (opcional)."
        rows={4}
      />

      <ToggleField
        name="notificaciones"
        label="Recibir notificaciones por correo"
        defaultChecked
      />

      <CheckboxField
        name="terms"
        label={<>Acepto los <a href="/terminos">términos y condiciones</a></>}
        error={errors.terms}
        required
      />

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Button type="submit">Crear cuenta</Button>
        <Button type="button" variant="ghost">Cancelar</Button>
      </div>
    </form>
  );
}
