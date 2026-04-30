import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TextAreaField } from './TextAreaField';

describe('TextAreaField', () => {
  describe('rendering', () => {
    it('renders the label and textarea', () => {
      render(<TextAreaField label="Descripción" name="description" />);
      expect(screen.getByLabelText('Descripción')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders hint text', () => {
      render(
        <TextAreaField
          label="Descripción"
          name="description"
          hint="Máximo 500 caracteres."
        />,
      );
      expect(screen.getByText('Máximo 500 caracteres.')).toBeInTheDocument();
    });

    it('renders error message and hides hint when both are provided', () => {
      render(
        <TextAreaField
          label="Descripción"
          name="description"
          hint="Texto de ayuda"
          error="El campo no puede estar vacío"
        />,
      );
      expect(screen.getByText('El campo no puede estar vacío')).toBeInTheDocument();
      expect(screen.queryByText('Texto de ayuda')).not.toBeInTheDocument();
    });
  });

  describe('accessibility wiring', () => {
    it('associates label with textarea via htmlFor/id', () => {
      render(<TextAreaField label="Mensaje" name="message" />);
      const textarea = screen.getByLabelText('Mensaje');
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('sets aria-required when required prop is true', () => {
      render(<TextAreaField label="Descripción" name="description" required />);
      expect(screen.getByRole('textbox', { name: /descripción/i })).toHaveAttribute(
        'aria-required',
        'true',
      );
    });

    it('sets aria-invalid when error is present', () => {
      render(<TextAreaField label="Descripción" name="description" error="Campo obligatorio" />);
      expect(screen.getByRole('textbox', { name: /descripción/i })).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });

    it('does not set aria-invalid when there is no error', () => {
      render(<TextAreaField label="Descripción" name="description" />);
      expect(screen.getByRole('textbox', { name: /descripción/i })).not.toHaveAttribute(
        'aria-invalid',
      );
    });

    it('connects textarea with hint via aria-describedby', () => {
      render(<TextAreaField label="Descripción" name="description" hint="Ayuda" />);
      const textarea = screen.getByRole('textbox');
      const describedBy = textarea.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      const hintEl = document.getElementById(describedBy!);
      expect(hintEl).toHaveTextContent('Ayuda');
    });

    it('connects textarea with error via aria-describedby', () => {
      render(
        <TextAreaField label="Descripción" name="description" error="Error de validación" />,
      );
      const textarea = screen.getByRole('textbox');
      const describedBy = textarea.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      const errorEl = document.getElementById(describedBy!);
      expect(errorEl).toHaveTextContent('Error de validación');
    });

    it('has no aria-describedby when neither hint nor error is provided', () => {
      render(<TextAreaField label="Descripción" name="description" />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby');
    });

    it('disables the textarea when disabled prop is true', () => {
      render(<TextAreaField label="Descripción" name="description" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — base field', async () => {
      const { container } = render(<TextAreaField label="Descripción" name="description" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with hint', async () => {
      const { container } = render(
        <TextAreaField
          label="Descripción"
          name="description"
          hint="Máximo 500 caracteres."
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <TextAreaField
          label="Descripción"
          name="description"
          error="El campo es obligatorio."
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — required field', async () => {
      const { container } = render(
        <TextAreaField label="Descripción" name="description" required />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled field', async () => {
      const { container } = render(
        <TextAreaField label="Descripción" name="description" disabled />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
