import { useState } from 'react';
import { Heading } from '../../../primitives/Heading/Heading';
import { Text } from '../../../primitives/Text/Text';
import { Alert } from '../../../primitives/Alert/Alert';
import { Button } from '../../../primitives/Button/Button';
import { TextField } from '../../../components/TextField/TextField';
import { EmailField } from '../../../components/EmailField/EmailField';
import { SelectField } from '../../../components/SelectField/SelectField';
import { RadioGroup } from '../../../components/RadioGroup/RadioGroup';
import { ToggleField } from '../../../components/ToggleField/ToggleField';
import { ROLE_OPTIONS, NOTIFICATION_OPTIONS } from '../mockData';

interface SettingsValues {
  displayName: string;
  email: string;
  role: string;
  notifications: string;
  emailDigest: boolean;
  marketingEmails: boolean;
}

const DEFAULTS: SettingsValues = {
  displayName: 'Jane Smith',
  email: 'jane.smith@acme.com',
  role: 'admin',
  notifications: 'mentions',
  emailDigest: true,
  marketingEmails: false,
};

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ds-space-4)',
  padding: 'var(--ds-space-5)',
  background: 'var(--ds-color-bg-surface)',
  border: '1px solid var(--ds-color-border-subtle)',
  borderRadius: 'var(--ds-radius-lg)',
  boxShadow: 'var(--ds-elevation-1)',
};

export function SettingsPage() {
  const [values, setValues] = useState<SettingsValues>(DEFAULTS);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  function set<K extends keyof SettingsValues>(key: K) {
    return (value: SettingsValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      if (status === 'saved') setStatus('idle');
    };
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus('saving');
    setTimeout(() => setStatus('saved'), 1200);
  }

  function handleReset() {
    setValues(DEFAULTS);
    setStatus('idle');
  }

  return (
    <form
      onSubmit={handleSave}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-6)', maxWidth: '600px' }}
    >
      <Heading level={1} size="xl">Settings</Heading>

      {status === 'saved' && (
        <Alert variant="success" title="Changes saved" onDismiss={() => setStatus('idle')}>
          Your profile has been updated successfully.
        </Alert>
      )}

      {/* Profile section */}
      <div style={sectionStyle}>
        <Text size="sm" weight="semibold" color="muted">Profile</Text>
        <TextField
          label="Display name"
          value={values.displayName}
          onChange={(e) => set('displayName')(e.target.value)}
          placeholder="Your full name"
        />
        <EmailField
          label="Email address"
          value={values.email}
          onChange={(e) => set('email')(e.target.value)}
          hint="Used for sign-in and notifications."
          placeholder="you@company.com"
        />
      </div>

      {/* Account section */}
      <div style={sectionStyle}>
        <Text size="sm" weight="semibold" color="muted">Account</Text>
        <SelectField
          label="Role"
          options={ROLE_OPTIONS}
          value={values.role}
          onChange={(e) => set('role')(e.target.value)}
        />
        <RadioGroup
          legend="Notifications"
          name="notifications"
          options={NOTIFICATION_OPTIONS}
          value={values.notifications}
          onChange={set('notifications')}
        />
      </div>

      {/* Preferences section */}
      <div style={sectionStyle}>
        <Text size="sm" weight="semibold" color="muted">Preferences</Text>
        <ToggleField
          label="Weekly email digest"
          checked={values.emailDigest}
          onChange={(e) => set('emailDigest')(e.target.checked)}
          hint="Receive a weekly summary of activity."
        />
        <ToggleField
          label="Marketing emails"
          checked={values.marketingEmails}
          onChange={(e) => set('marketingEmails')(e.target.checked)}
          hint="Product updates, tips and offers."
        />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 'var(--ds-space-3)' }}>
        <Button
          type="submit"
          variant="primary"
          isLoading={status === 'saving'}
          loadingText="Saving…"
        >
          Save changes
        </Button>
        <Button type="button" variant="ghost" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}
