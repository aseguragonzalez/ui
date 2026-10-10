import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileField } from './FileField';

const meta: Meta<typeof FileField> = {
  title: 'Components/FileField',
  component: FileField,
  tags: ['autodocs'],
  args: { label: 'Attachment', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof FileField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'PDF or image, up to 5 MB.', accept: 'application/pdf,image/*' },
};

export const WithError: Story = {
  args: { error: 'The file is larger than 5 MB.' },
};

export const Multiple: Story = {
  args: { label: 'Photos', multiple: true, accept: 'image/*', hint: 'You can select several images.' },
};

export const Required: Story = {
  args: { required: true, label: 'Identity document' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
