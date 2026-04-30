import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthLayout } from './AuthLayout';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../primitives/Button/Button';
import { Divider } from '../../primitives/Divider/Divider';
import { Heading } from '../../primitives/Heading/Heading';

const meta: Meta = {
  title: 'Patterns/AuthLayout',
  parameters: {
    layout: 'fullscreen',
    skipThemeDecorator: true,
  },
};

export default meta;
type Story = StoryObj;

/* ---- Shared form pieces ---- */

function LoginForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'system-ui' }}>
      <div>
        <Heading level={1} size="md">Sign in</Heading>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-color-text-muted)' }}>
          Welcome back — enter your credentials to continue.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField label="Email address" type="email" placeholder="you@company.com" />
        <TextField label="Password" type="password" placeholder="••••••••" />
      </div>
      <Button variant="primary" fullWidth>Sign in</Button>
      <Divider />
      <p style={{ margin: 0, fontSize: '0.875rem', textAlign: 'center', color: 'var(--ds-color-text-muted)' }}>
        Don't have an account?{' '}
        <a href="#" style={{ color: 'var(--ds-color-action-primary)', fontWeight: 500 }}>
          Sign up
        </a>
      </p>
    </div>
  );
}

function RegisterForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'system-ui' }}>
      <div>
        <Heading level={1} size="md">Create account</Heading>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ds-color-text-muted)' }}>
          Start your free trial — no credit card required.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <TextField label="First name" placeholder="Jane" />
          <TextField label="Last name" placeholder="Smith" />
        </div>
        <TextField label="Work email" type="email" placeholder="jane@company.com" />
        <TextField label="Password" type="password" placeholder="Min. 8 characters" />
      </div>
      <Button variant="primary" fullWidth>Create account</Button>
      <p style={{ margin: 0, fontSize: '0.75rem', textAlign: 'center', color: 'var(--ds-color-text-muted)', lineHeight: 1.5 }}>
        By signing up you agree to our{' '}
        <a href="#" style={{ color: 'var(--ds-color-action-primary)' }}>Terms</a>
        {' '}and{' '}
        <a href="#" style={{ color: 'var(--ds-color-action-primary)' }}>Privacy Policy</a>.
      </p>
    </div>
  );
}

/* ---- Stories ---- */

export const Login: Story = {
  render: () => (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  ),
};

export const Register: Story = {
  render: () => (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  ),
};

export const CustomBranding: Story = {
  render: () => (
    <AuthLayout
      branding={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.2" />
              <path d="M12 14h16M12 20h12M12 26h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'system-ui', fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>
              FlowDesk
            </span>
          </div>
          <p style={{ fontFamily: 'system-ui', fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.3, color: 'white', margin: 0 }}>
            "Onboarding customers<br />is now a joy, not a chore."
          </p>
          <p style={{ fontFamily: 'system-ui', fontSize: '0.875rem', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
            — María García, Product Lead at Acme Corp
          </p>
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  ),
};
