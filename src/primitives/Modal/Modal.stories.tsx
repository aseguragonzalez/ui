import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal, ModalBody, ModalFooter } from './Modal';
import { Button } from '../Button/Button';
import { TextField } from '../../components/TextField/TextField';
import { Alert } from '../Alert/Alert';

const meta: Meta<typeof Modal> = {
  title: 'Primitives/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Confirm action">
          <ModalBody>
            <p style={{ margin: 0 }}>Are you sure you want to continue with this action? This operation cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>Delete item</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Delete item">
          <ModalBody>
            <Alert variant="error">
              This action is permanent and cannot be undone. The item will be deleted permanently.
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Edit profile</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Edit profile" size="md">
          <ModalBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextField label="First name" placeholder="Your first name" />
              <TextField label="Last name" placeholder="Your last name" />
              <TextField label="Email" placeholder="you@email.com" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Save changes</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [open, setOpen] = useState<'sm' | 'md' | 'lg' | null>(null);
    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <Button key={size} variant="secondary" size="sm" onClick={() => setOpen(size)}>
            {size.toUpperCase()}
          </Button>
        ))}
        {open && (
          <Modal open onClose={() => setOpen(null)} title={`Modal ${open.toUpperCase()}`} size={open}>
            <ModalBody>
              <p style={{ margin: 0 }}>This is a <strong>{open}</strong> size modal. The maximum width is {open === 'sm' ? '400px' : open === 'md' ? '560px' : '720px'}.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="primary" onClick={() => setOpen(null)}>Got it</Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>Modal with scroll</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Terms and conditions">
          <ModalBody>
            {Array.from({ length: 8 }, (_, i) => (
              <p key={i} style={{ marginTop: 0 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>Decline</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Accept terms</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
