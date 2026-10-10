import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { FileInput } from './FileInput';

describe('FileInput', () => {
  describe('rendering', () => {
    it('renders as type="file"', () => {
      render(<FileInput aria-label="Documento" />);
      expect(screen.getByLabelText('Documento')).toHaveAttribute('type', 'file');
    });

    it('forwards the ref to the input element', () => {
      const ref = { current: null };
      render(<FileInput ref={ref} aria-label="Documento" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('forwards accept and multiple', () => {
      render(<FileInput aria-label="Documentos" accept="image/*,.pdf" multiple />);
      const input = screen.getByLabelText('Documentos');
      expect(input).toHaveAttribute('accept', 'image/*,.pdf');
      expect(input).toHaveAttribute('multiple');
    });

    it('passes native attributes', () => {
      render(<FileInput aria-label="Documento" name="document" data-testid="file-input" />);
      expect(screen.getByTestId('file-input')).toHaveAttribute('name', 'document');
    });

    it('merges a custom className', () => {
      render(<FileInput aria-label="Documento" className="custom" />);
      expect(screen.getByLabelText('Documento')).toHaveClass('custom');
    });
  });

  describe('interaction', () => {
    it('calls onChange with the selected files', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const file = new File(['contenido'], 'factura.pdf', { type: 'application/pdf' });
      render(<FileInput aria-label="Factura" onChange={onChange} />);
      const input = screen.getByLabelText<HTMLInputElement>('Factura');
      await user.upload(input, file);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(input.files?.[0]).toBe(file);
    });

    it('receives keyboard focus', async () => {
      const user = userEvent.setup();
      render(<FileInput aria-label="Documento" />);
      await user.tab();
      expect(screen.getByLabelText('Documento')).toHaveFocus();
    });
  });

  describe('error state', () => {
    it('sets aria-invalid when hasError is true', () => {
      render(<FileInput aria-label="Documento" hasError />);
      expect(screen.getByLabelText('Documento')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid by default', () => {
      render(<FileInput aria-label="Documento" />);
      expect(screen.getByLabelText('Documento')).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<FileInput aria-label="Documento" disabled />);
      expect(screen.getByLabelText('Documento')).toBeDisabled();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(<FileInput aria-label="Documento" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — multiple with accept', async () => {
      const { container } = render(
        <FileInput aria-label="Imágenes" accept="image/*" multiple />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <FileInput aria-label="Documento" hasError aria-describedby="err" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<FileInput aria-label="Documento" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
