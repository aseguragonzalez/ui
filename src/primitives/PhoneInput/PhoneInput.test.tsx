import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { PhoneInput } from './PhoneInput';

describe('PhoneInput', () => {
  describe('rendering', () => {
    it('renders as type="tel"', () => {
      render(<PhoneInput aria-label="Teléfono" />);
      expect(screen.getByLabelText('Teléfono')).toHaveAttribute('type', 'tel');
    });

    it('sets aria-invalid when hasError is true', () => {
      render(<PhoneInput aria-label="Teléfono" hasError />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when hasError is false', () => {
      render(<PhoneInput aria-label="Teléfono" />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
    });

    it('renders as disabled', () => {
      render(<PhoneInput aria-label="Teléfono" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('forwards the ref to the input element', () => {
      const ref = { current: null };
      render(<PhoneInput aria-label="Teléfono" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations', async () => {
      const { container } = render(<PhoneInput aria-label="Teléfono" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(<PhoneInput aria-label="Teléfono" hasError />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
