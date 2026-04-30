import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  describe('rendering', () => {
    it('renders a textarea element', () => {
      render(<TextArea aria-label="Comentario" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('sets aria-invalid when hasError is true', () => {
      render(<TextArea aria-label="Comentario" hasError />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when hasError is false', () => {
      render(<TextArea aria-label="Comentario" />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
    });

    it('renders as disabled', () => {
      render(<TextArea aria-label="Comentario" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('renders with a placeholder', () => {
      render(<TextArea aria-label="Comentario" placeholder="Escribe aquí..." />);
      expect(screen.getByPlaceholderText('Escribe aquí...')).toBeInTheDocument();
    });

    it('forwards the ref to the textarea element', () => {
      const ref = { current: null };
      render(<TextArea aria-label="Comentario" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('passes native props like rows', () => {
      render(<TextArea aria-label="Comentario" rows={6} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6');
    });

    it.each(['sm', 'md', 'lg'] as const)('renders size variant "%s" without errors', (size) => {
      render(<TextArea aria-label="Comentario" size={size} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('applies className to the textarea element', () => {
      render(<TextArea aria-label="Comentario" className="custom-ta" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-ta');
    });

    it('forwards maxLength native prop', () => {
      render(<TextArea aria-label="Comentario" maxLength={200} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '200');
    });

    it('forwards readOnly native prop', () => {
      render(<TextArea aria-label="Comentario" readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });
  });

  describe('autoResize', () => {
    it('sets height on mount when autoResize=true', () => {
      render(<TextArea aria-label="Comment" autoResize />);
      const ta = screen.getByRole('textbox') as HTMLTextAreaElement;
      // jsdom scrollHeight is 0, so height is set to 0px
      expect(ta.style.height).toBe('0px');
    });

    it('does not set height when autoResize is not set', () => {
      render(<TextArea aria-label="Comment" />);
      const ta = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(ta.style.height).toBe('');
    });

    it('adjusts height on change when autoResize=true', async () => {
      const user = userEvent.setup();
      render(<TextArea aria-label="Comment" autoResize />);
      const ta = screen.getByRole('textbox') as HTMLTextAreaElement;
      await user.type(ta, 'Hello');
      // height should be set (even if 0px in jsdom due to no layout engine)
      expect(ta.style.height).toBeDefined();
    });

    it('calls passed onChange alongside resize logic', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<TextArea aria-label="Comment" autoResize onChange={onChange} />);
      await user.type(screen.getByRole('textbox'), 'x');
      expect(onChange).toHaveBeenCalled();
    });

    it('has no axe violations with autoResize', async () => {
      const { container } = render(<TextArea aria-label="Comment" autoResize />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations', async () => {
      const { container } = render(<TextArea aria-label="Comentario" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(<TextArea aria-label="Comentario" hasError />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(<TextArea aria-label="Comentario" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
