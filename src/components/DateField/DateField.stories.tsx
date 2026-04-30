import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateField } from './DateField';

const meta: Meta<typeof DateField> = {
  title: 'Components/DateField',
  component: DateField,
  tags: ['autodocs'],
  args: { label: 'Start date', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof DateField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'The project must start after January 1, 2026.' },
};

export const WithError: Story = {
  args: { error: 'The date cannot be in the past.', value: '2020-01-01' },
};

export const WithMinMax: Story = {
  args: { label: 'Booking date', min: '2026-01-01', max: '2026-12-31', hint: 'Dates in 2026 only.' },
};

export const Required: Story = {
  args: { required: true, label: 'Date of birth' },
};

export const Disabled: Story = {
  args: { disabled: true, value: '2026-04-27' },
};
