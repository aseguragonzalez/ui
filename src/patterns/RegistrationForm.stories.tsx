import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from '../components/TextField/TextField';
import { EmailField } from '../components/EmailField/EmailField';
import { PasswordField } from '../components/PasswordField/PasswordField';
import { SelectField } from '../components/SelectField/SelectField';
import { RadioGroup } from '../components/RadioGroup/RadioGroup';
import { TextAreaField } from '../components/TextAreaField/TextAreaField';
import { CheckboxField } from '../components/CheckboxField/CheckboxField';
import { ToggleField } from '../components/ToggleField/ToggleField';
import { Alert } from '../primitives/Alert/Alert';
import { Button } from '../primitives/Button/Button';
import { ProgressBar } from '../primitives/ProgressBar/ProgressBar';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface FormValues {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  pais: string;
  plan: string;
  bio: string;
  notificaciones: boolean;
  terminos: boolean;
}

interface FormErrors {
  nombre?: string;
  apellidos?: string;
  email?: string;
  password?: string;
  pais?: string;
  plan?: string;
  terminos?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.nombre.trim()) errors.nombre = 'First name is required.';
  if (!values.apellidos.trim()) errors.apellidos = 'Last name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }
  if (!values.pais) errors.pais = 'Please select a country.';
  if (!values.plan) errors.plan = 'Please choose a plan.';
  if (!values.terminos) errors.terminos = 'You must accept the terms to continue.';
  return errors;
}

function completionPercent(values: FormValues): number {
  const fields: (keyof FormValues)[] = [
    'nombre', 'apellidos', 'email', 'password', 'pais', 'plan', 'terminos',
  ];
  const filled = fields.filter((k) => {
    const v = values[k];
    return typeof v === 'boolean' ? v : String(v).trim().length > 0;
  });
  return Math.round((filled.length / fields.length) * 100);
}

/* ------------------------------------------------------------------ */
/*  Form component                                                      */
/* ------------------------------------------------------------------ */

const PAISES = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
];

const PLANES = [
  { value: 'basic', label: 'Basic — free up to 100 conversations/month' },
  { value: 'pro', label: 'Pro — €49/month, up to 5,000 conversations' },
  { value: 'enterprise', label: 'Enterprise — contact sales' },
];

function RegistrationForm() {
  const [values, setValues] = useState<FormValues>({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    pais: '',
    plan: '',
    bio: '',
    notificaciones: true,
    terminos: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = <K extends keyof FormValues>(key: K) =>
    (value: FormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      if (errors[key as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus(Math.random() > 0.3 ? 'success' : 'error');
    }, 1800);
  };

  const completion = completionPercent(values);
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '520px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* ---- Progress ---- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
          Form {completion}% complete
        </span>
        <ProgressBar
          label={`Form progress: ${completion}%`}
          value={completion}
          variant={completion === 100 ? 'success' : 'default'}
          size="sm"
        />
      </div>

      {/* ---- Form-level alerts ---- */}
      {hasErrors && status === 'idle' && (
        <Alert variant="error" title="Please review the form">
          Some fields have errors. Fix them before continuing.
        </Alert>
      )}
      {status === 'success' && (
        <Alert variant="success" title="Account created!">
          We have sent a confirmation email to {values.email}.
        </Alert>
      )}
      {status === 'error' && (
        <Alert variant="error" title="Failed to create account" onDismiss={() => setStatus('idle')}>
          Something went wrong. Please try again in a few minutes.
        </Alert>
      )}

      {/* ---- Section: Personal details ---- */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <legend style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
          Personal details
        </legend>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <TextField
            label="First name"
            required
            value={values.nombre}
            onChange={(e) => set('nombre')(e.target.value)}
            error={errors.nombre}
            placeholder="E.g. Jane"
          />
          <TextField
            label="Last name"
            required
            value={values.apellidos}
            onChange={(e) => set('apellidos')(e.target.value)}
            error={errors.apellidos}
            placeholder="E.g. Smith"
          />
        </div>
        <EmailField
          label="Email"
          required
          value={values.email}
          onChange={(e) => set('email')(e.target.value)}
          error={errors.email}
          hint="We will use this email to confirm your account."
          placeholder="you@company.com"
        />
        <PasswordField
          label="Password"
          required
          value={values.password}
          onChange={(e) => set('password')(e.target.value)}
          error={errors.password}
          hint="Minimum 8 characters."
        />
      </fieldset>

      {/* ---- Section: Preferences ---- */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <legend style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
          Preferences
        </legend>
        <SelectField
          label="Country"
          required
          options={PAISES}
          placeholder="Select your country..."
          value={values.pais}
          onChange={(e) => set('pais')(e.target.value)}
          error={errors.pais}
        />
        <RadioGroup
          legend="Plan"
          name="plan"
          options={PLANES}
          value={values.plan}
          onChange={set('plan')}
          error={errors.plan}
          required
        />
        <TextAreaField
          label="About you"
          value={values.bio}
          onChange={(e) => set('bio')(e.target.value)}
          hint="Optional. Tell us briefly what you will use Landbot for."
          placeholder="I am a marketing manager at a company that..."
          rows={3}
        />
        <ToggleField
          label="Email notifications"
          checked={values.notificaciones}
          onChange={(e) => set('notificaciones')(e.target.checked)}
          hint="You will receive weekly summaries and product updates."
        />
      </fieldset>

      {/* ---- Terms ---- */}
      <CheckboxField
        label={
          <>
            I accept the{' '}
            <a href="#" style={{ color: '#2563eb' }}>terms of use</a>
            {' '}and the{' '}
            <a href="#" style={{ color: '#2563eb' }}>privacy policy</a>
          </>
        }
        required
        checked={values.terminos}
        onChange={(e) => set('terminos')(e.target.checked)}
        error={errors.terminos}
      />

      {/* ---- Submit ---- */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={status === 'loading'}
        loadingText="Creating account..."
        disabled={status === 'success'}
        fullWidth
      >
        Create account
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Story metadata                                                      */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: 'Patterns/RegistrationForm',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <RegistrationForm />,
};
