import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Text } from './Text';

describe('Text', () => {
  describe('rendering', () => {
    it('renders as a <p> element by default', () => {
      render(<Text>Texto de prueba</Text>);
      expect(screen.getByText('Texto de prueba').tagName).toBe('P');
    });

    it('renders as the element specified by the as prop', () => {
      const cases: Array<{ as: React.ComponentProps<typeof Text>['as']; tag: string }> = [
        { as: 'span', tag: 'SPAN' },
        { as: 'div', tag: 'DIV' },
        { as: 'em', tag: 'EM' },
        { as: 'strong', tag: 'STRONG' },
        { as: 'small', tag: 'SMALL' },
      ];
      cases.forEach(({ as, tag }) => {
        const { unmount } = render(<Text as={as}>Texto</Text>);
        expect(screen.getByText('Texto').tagName).toBe(tag);
        unmount();
      });
    });

    it('renders children', () => {
      render(<Text>Contenido del párrafo</Text>);
      expect(screen.getByText('Contenido del párrafo')).toBeInTheDocument();
    });

    it('forwards the ref to the underlying element', () => {
      const ref = { current: null };
      render(<Text ref={ref}>Texto</Text>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it('passes native HTML attributes', () => {
      render(<Text id="intro-text">Texto</Text>);
      expect(document.getElementById('intro-text')).toBeInTheDocument();
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default paragraph', async () => {
      const { container } = render(<Text>Texto de cuerpo.</Text>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — span', async () => {
      const { container } = render(<Text as="span">Texto en línea.</Text>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — small text', async () => {
      const { container } = render(
        <Text size="xs" color="muted">Texto de ayuda</Text>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — bold text', async () => {
      const { container } = render(<Text weight="bold">Texto destacado.</Text>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — error color', async () => {
      const { container } = render(<Text color="error">Mensaje de error.</Text>);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
