import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectField } from './SelectField';

const COUNTRY_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

const meta: Meta<typeof SelectField> = {
  title: 'Components/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Country of residence',
    name: 'country',
    placeholder: 'Select a country',
    options: COUNTRY_OPTIONS,
    size: 'md',
    required: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SelectField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Select the country where you currently reside.' },
};

export const WithError: Story = {
  args: { error: 'Please select a valid option.' },
};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'us' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <SelectField label="Small" name="sm" size="sm" options={COUNTRY_OPTIONS} placeholder="Select..." />
      <SelectField label="Medium" name="md" size="md" options={COUNTRY_OPTIONS} placeholder="Select..." />
      <SelectField label="Large" name="lg" size="lg" options={COUNTRY_OPTIONS} placeholder="Select..." />
    </div>
  ),
};

export const ChildrenAPI: Story = {
  render: () => (
    <SelectField label="Category" name="category" placeholder="Select a category">
      <optgroup label="Technology">
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="devops">DevOps</option>
      </optgroup>
      <optgroup label="Design">
        <option value="ux">UX</option>
        <option value="ui">UI</option>
      </optgroup>
    </SelectField>
  ),
};
