import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { RadioGroup } from './RadioGroup';

const SIZE_OPTIONS = [
  { value: 'S', label: 'Small' },
  { value: 'M', label: 'Medium' },
  { value: 'L', label: 'Large' },
];

describe('RadioGroup', () => {
  describe('rendering', () => {
    it('renders a fieldset with legend', () => {
      render(<RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} />);
      expect(screen.getByRole('group', { name: 'Talla' })).toBeInTheDocument();
    });

    it('renders all radio options', () => {
      render(<RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} />);
      expect(screen.getByRole('radio', { name: 'Small' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'Medium' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'Large' })).toBeInTheDocument();
    });

    it('renders hint text', () => {
      render(
        <RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} hint="Consulta la guía de tallas" />,
      );
      expect(screen.getByText('Consulta la guía de tallas')).toBeInTheDocument();
    });

    it('renders error and hides hint', () => {
      render(
        <RadioGroup
          legend="Talla"
          name="size"
          options={SIZE_OPTIONS}
          hint="Ayuda"
          error="Selecciona una talla"
        />,
      );
      expect(screen.getByText('Selecciona una talla')).toBeInTheDocument();
      expect(screen.queryByText('Ayuda')).not.toBeInTheDocument();
    });
  });

  describe('controlled behaviour', () => {
    it('marks the correct option as checked', () => {
      render(<RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} value="M" />);
      expect(screen.getByRole('radio', { name: 'Medium' })).toBeChecked();
      expect(screen.getByRole('radio', { name: 'Small' })).not.toBeChecked();
    });

    it('calls onChange with the selected value', async () => {
      const onChange = vi.fn();
      render(<RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} value="S" onChange={onChange} />);
      await userEvent.click(screen.getByRole('radio', { name: 'Large' }));
      expect(onChange).toHaveBeenCalledWith('L');
    });
  });

  describe('accessibility wiring', () => {
    it('uses fieldset+legend for group semantics', () => {
      render(<RadioGroup legend="Preferencia" name="pref" options={SIZE_OPTIONS} />);
      const group = screen.getByRole('group', { name: 'Preferencia' });
      expect(group.tagName).toBe('FIELDSET');
    });

    it('disables all radios when disabled prop is true', () => {
      render(<RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} disabled />);
      screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());
    });

    it('disables individual options', () => {
      const options = [
        { value: 'S', label: 'Small' },
        { value: 'M', label: 'Medium', disabled: true },
      ];
      render(<RadioGroup legend="Talla" name="size" options={options} />);
      expect(screen.getByRole('radio', { name: 'Medium' })).toBeDisabled();
      expect(screen.getByRole('radio', { name: 'Small' })).not.toBeDisabled();
    });

    it('connects fieldset with hint via aria-describedby', () => {
      render(<RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} hint="Consulta la guía" />);
      const fieldset = screen.getByRole('group');
      const describedBy = fieldset.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy!)).toHaveTextContent('Consulta la guía');
    });

    it('connects fieldset with error via aria-describedby', () => {
      render(<RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} error="Selecciona una opción" />);
      const fieldset = screen.getByRole('group');
      const describedBy = fieldset.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy!)).toHaveTextContent('Selecciona una opción');
    });

    it('has no aria-describedby when neither hint nor error is provided', () => {
      render(<RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} />);
      expect(screen.getByRole('group')).not.toHaveAttribute('aria-describedby');
    });

    it('sets aria-invalid on all radios when error is present', () => {
      render(<RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} error="Error" />);
      screen.getAllByRole('radio').forEach((radio) =>
        expect(radio).toHaveAttribute('aria-invalid', 'true'),
      );
    });

    it('marks only the first radio as required when required prop is true', () => {
      render(<RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} required />);
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).toBeRequired();
      radios.slice(1).forEach((radio) => expect(radio).not.toBeRequired());
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — base', async () => {
      const { container } = render(
        <RadioGroup legend="Talla de camiseta" name="size" options={SIZE_OPTIONS} />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with selected value', async () => {
      const { container } = render(
        <RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} value="M" onChange={() => {}} />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} error="Selecciona una talla" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — required', async () => {
      const { container } = render(
        <RadioGroup legend="Talla" name="size" options={SIZE_OPTIONS} required />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
