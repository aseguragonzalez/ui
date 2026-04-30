import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { EmailInput } from './EmailInput';

describe('EmailInput', () => {
  describe('rendering', () => {
    it('renders as type="email"', () => {
      render(<EmailInput aria-label="Email" />);
      expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    });

    it('sets aria-invalid when hasError is true', () => {
      render(<EmailInput aria-label="Email" hasError />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when hasError is false', () => {
      render(<EmailInput aria-label="Email" />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
    });

    it('renders as disabled', () => {
      render(<EmailInput aria-label="Email" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('forwards the ref to the input element', () => {
      const ref = { current: null };
      render(<EmailInput aria-label="Email" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations', async () => {
      const { container } = render(<EmailInput aria-label="Email" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(<EmailInput aria-label="Email" hasError />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
