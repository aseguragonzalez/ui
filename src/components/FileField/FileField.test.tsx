import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { FileField } from './FileField';

describe('FileField', () => {
  describe('rendering', () => {
    it('renders a file input associated with the label', () => {
      render(<FileField label="Adjunto" />);
      expect(screen.getByLabelText('Adjunto')).toHaveAttribute('type', 'file');
    });

    it('uses inputId as the input id when provided', () => {
      render(<FileField label="Adjunto" inputId="attachment" />);
      expect(screen.getByLabelText('Adjunto')).toHaveAttribute('id', 'attachment');
    });

    it('renders hint when provided', () => {
      render(<FileField label="Adjunto" hint="PDF de hasta 5 MB" />);
      expect(screen.getByText('PDF de hasta 5 MB')).toBeInTheDocument();
    });

    it('renders error when provided', () => {
      render(<FileField label="Adjunto" error="El archivo es demasiado grande" />);
      expect(screen.getByText('El archivo es demasiado grande')).toBeInTheDocument();
    });

    it('shows error instead of hint when both are provided', () => {
      render(<FileField label="Adjunto" hint="Ayuda" error="Error" />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.queryByText('Ayuda')).not.toBeInTheDocument();
    });

    it('forwards the ref to the input', () => {
      const ref = { current: null };
      render(<FileField ref={ref} label="Adjunto" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('forwards native props such as accept, multiple and name', () => {
      render(<FileField label="Fotos" accept="image/*" multiple name="photos" />);
      const input = screen.getByLabelText('Fotos');
      expect(input).toHaveAttribute('accept', 'image/*');
      expect(input).toHaveAttribute('multiple');
      expect(input).toHaveAttribute('name', 'photos');
    });

    it('is disabled when disabled prop is true', () => {
      render(<FileField label="Adjunto" disabled />);
      expect(screen.getByLabelText('Adjunto')).toBeDisabled();
    });
  });

  describe('interaction', () => {
    it('calls onChange with the selected files', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const files = [
        new File(['a'], 'a.png', { type: 'image/png' }),
        new File(['b'], 'b.png', { type: 'image/png' }),
      ];
      render(<FileField label="Fotos" multiple onChange={onChange} />);
      const input = screen.getByLabelText<HTMLInputElement>('Fotos');
      await user.upload(input, files);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(input.files).toHaveLength(2);
    });

    it('receives keyboard focus', async () => {
      const user = userEvent.setup();
      render(<FileField label="Adjunto" />);
      await user.tab();
      expect(screen.getByLabelText('Adjunto')).toHaveFocus();
    });
  });

  describe('ARIA', () => {
    it('sets required and aria-required when required is true', () => {
      render(<FileField label="Documento" required />);
      const input = screen.getByLabelText(/documento/i);
      expect(input).toBeRequired();
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('sets aria-invalid when error is provided', () => {
      render(<FileField label="Adjunto" error="Formato no admitido" />);
      expect(screen.getByLabelText('Adjunto')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid without an error', () => {
      render(<FileField label="Adjunto" />);
      expect(screen.getByLabelText('Adjunto')).not.toHaveAttribute('aria-invalid');
    });

    it('associates hint with input via aria-describedby', () => {
      render(<FileField label="Adjunto" hint="PDF de hasta 5 MB" />);
      expect(screen.getByLabelText('Adjunto')).toHaveAccessibleDescription('PDF de hasta 5 MB');
    });

    it('associates error with input via aria-describedby', () => {
      render(<FileField label="Adjunto" hint="Ayuda" error="Formato no admitido" />);
      expect(screen.getByLabelText('Adjunto')).toHaveAccessibleDescription('Formato no admitido');
    });

    it('omits aria-describedby without hint or error', () => {
      render(<FileField label="Adjunto" />);
      expect(screen.getByLabelText('Adjunto')).not.toHaveAttribute('aria-describedby');
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default', async () => {
      const { container } = render(<FileField label="Adjunto" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with hint', async () => {
      const { container } = render(<FileField label="Adjunto" hint="PDF de hasta 5 MB" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(<FileField label="Adjunto" error="Formato no admitido" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — required', async () => {
      const { container } = render(<FileField label="Documento" required />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — multiple with accept', async () => {
      const { container } = render(<FileField label="Fotos" accept="image/*" multiple />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<FileField label="Adjunto" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
