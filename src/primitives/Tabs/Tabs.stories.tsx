import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';
import { Badge } from '../Badge/Badge';
import { Alert } from '../Alert/Alert';

const meta: Meta = {
  title: 'Primitives/Tabs',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabList label="Product section">
        <Tab value="overview">Overview</Tab>
        <Tab value="features">Features</Tab>
        <Tab value="pricing">Pricing</Tab>
      </TabList>
      <TabPanel value="overview">
        <p style={{ fontFamily: 'system-ui', margin: 0 }}>
          Product overview. This section shows the main information.
        </p>
      </TabPanel>
      <TabPanel value="features">
        <p style={{ fontFamily: 'system-ui', margin: 0 }}>
          List of available features and functionality.
        </p>
      </TabPanel>
      <TabPanel value="pricing">
        <p style={{ fontFamily: 'system-ui', margin: 0 }}>
          Information about plans and pricing.
        </p>
      </TabPanel>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabList label="Bot status">
        <Tab value="active">Active</Tab>
        <Tab value="draft">Draft</Tab>
        <Tab value="archived" disabled>Archived</Tab>
      </TabList>
      <TabPanel value="active">
        <p style={{ fontFamily: 'system-ui', margin: 0 }}>This bot is published and receiving conversations.</p>
      </TabPanel>
      <TabPanel value="draft">
        <p style={{ fontFamily: 'system-ui', margin: 0 }}>Draft currently being edited.</p>
      </TabPanel>
      <TabPanel value="archived">
        <p style={{ fontFamily: 'system-ui', margin: 0 }}>Archived content.</p>
      </TabPanel>
    </Tabs>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="inbox">
      <TabList label="Inbox">
        <Tab value="inbox">
          Pending
          <Badge variant="error" size="sm">12</Badge>
        </Tab>
        <Tab value="resolved">
          Resolved
          <Badge variant="success" size="sm">48</Badge>
        </Tab>
        <Tab value="spam">Spam</Tab>
      </TabList>
      <TabPanel value="inbox">
        <Alert variant="info">You have 12 conversations waiting for a reply.</Alert>
      </TabPanel>
      <TabPanel value="resolved">
        <Alert variant="success">48 conversations resolved this week.</Alert>
      </TabPanel>
      <TabPanel value="spam">
        <p style={{ fontFamily: 'system-ui', margin: 0, color: '#6b7280' }}>
          The spam folder is empty.
        </p>
      </TabPanel>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [active, setActive] = useState('settings');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Tabs value={active} onChange={setActive}>
          <TabList label="Configuration">
            <Tab value="general">General</Tab>
            <Tab value="settings">Settings</Tab>
            <Tab value="billing">Billing</Tab>
          </TabList>
          <TabPanel value="general">General configuration.</TabPanel>
          <TabPanel value="settings">Advanced settings.</TabPanel>
          <TabPanel value="billing">Billing information.</TabPanel>
        </Tabs>
        <p style={{ fontFamily: 'system-ui', fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
          Active tab (controlled): <strong>{active}</strong>
        </p>
      </div>
    );
  },
};
