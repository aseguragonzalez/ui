import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { SelectField } from './SelectField';

const COUNTRY_OPTIONS = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
];

describe('SelectField', () => {
  describe('rendering', () => {
    it('renders label and select', () => {
      render(<SelectField label="País" name="country" options={COUNTRY_OPTIONS} />);
      expect(screen.getByRole('combobox', { name: 'País' })).toBeInTheDocument();
    });

    it('renders all options', () => {
      render(<SelectField label="País" name="country" options={COUNTRY_OPTIONS} />);
      expect(screen.getByRole('option', { name: 'España' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'México' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Argentina' })).toBeInTheDocument();
    });

    it('renders placeholder option', () => {
      render(
        <SelectField
          label="País"
          name="country"
          options={COUNTRY_OPTIONS}
          placeholder="Selecciona un país"
        />,
      );
      expect(screen.getByRole('option', { name: 'Selecciona un país' })).toBeInTheDocument();
    });

    it('renders hint text', () => {
      render(
        <SelectField
          label="País"
          name="country"
          options={COUNTRY_OPTIONS}
          hint="Selecciona tu país de residencia"
        />,
      );
      expect(screen.getByText('Selecciona tu país de residencia')).toBeInTheDocument();
    });

    it('renders error and hides hint', () => {
      render(
        <SelectField
          label="País"
          name="country"
          options={COUNTRY_OPTIONS}
          hint="Ayuda"
          error="Selecciona una opción válida"
        />,
      );
      expect(screen.getByText('Selecciona una opción válida')).toBeInTheDocument();
      expect(screen.queryByText('Ayuda')).not.toBeInTheDocument();
    });
  });

  describe('accessibility wiring', () => {
    it('sets aria-invalid when error is present', () => {
      render(<SelectField label="País" name="country" options={COUNTRY_OPTIONS} error="Obligatorio" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets aria-required when required prop is true', () => {
      render(<SelectField label="País" name="country" options={COUNTRY_OPTIONS} required />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true');
    });

    it('disables the select when disabled', () => {
      render(<SelectField label="País" name="country" options={COUNTRY_OPTIONS} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — base', async () => {
      const { container } = render(
        <SelectField label="País de residencia" name="country" options={COUNTRY_OPTIONS} />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <SelectField
          label="País"
          name="country"
          options={COUNTRY_OPTIONS}
          error="Selecciona una opción"
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — required', async () => {
      const { container } = render(
        <SelectField label="País" name="country" options={COUNTRY_OPTIONS} required />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
