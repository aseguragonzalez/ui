import { createRef } from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Tooltip } from './Tooltip';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

function getTooltip() {
  return screen.getByRole('tooltip', { hidden: true });
}

describe('Tooltip', () => {
  describe('rendering', () => {
    it('renders the trigger child', () => {
      render(
        <Tooltip content="Ayuda">
          <button>Acción</button>
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Acción' })).toBeInTheDocument();
    });

    it('tooltip is hidden initially', () => {
      render(
        <Tooltip content="Ayuda">
          <button>Acción</button>
        </Tooltip>,
      );
      expect(getTooltip()).not.toBeVisible();
    });

    it('injects aria-describedby on the trigger pointing to the tooltip id', () => {
      render(
        <Tooltip content="Ayuda">
          <button>Acción</button>
        </Tooltip>,
      );
      const trigger = screen.getByRole('button');
      const tooltipId = trigger.getAttribute('aria-describedby')!;
      expect(tooltipId).toBeTruthy();
      expect(document.getElementById(tooltipId)).toHaveAttribute('role', 'tooltip');
    });
  });

  describe('visibility — mouse', () => {
    it('shows after mouseenter + delay', () => {
      render(
        <Tooltip content="Ayuda" delayMs={200}>
          <button>Acción</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      expect(getTooltip()).not.toBeVisible();
      act(() => vi.advanceTimersByTime(200));
      expect(getTooltip()).toBeVisible();
    });

    it('does not show before the delay fires', () => {
      render(
        <Tooltip content="Ayuda" delayMs={200}>
          <button>Acción</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(199));
      expect(getTooltip()).not.toBeVisible();
    });

    it('hides on mouseleave', () => {
      render(
        <Tooltip content="Ayuda" delayMs={200}>
          <button>Acción</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(200));
      expect(getTooltip()).toBeVisible();
      fireEvent.mouseLeave(screen.getByRole('button'));
      expect(getTooltip()).not.toBeVisible();
    });

    it('cancels the delay on mouseleave before it fires', () => {
      render(
        <Tooltip content="Ayuda" delayMs={200}>
          <button>Acción</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(100));
      fireEvent.mouseLeave(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(200));
      expect(getTooltip()).not.toBeVisible();
    });
  });

  describe('visibility — keyboard (focus)', () => {
    it('shows on focus after delay', () => {
      render(
        <Tooltip content="Ayuda" delayMs={200}>
          <button>Acción</button>
        </Tooltip>,
      );
      fireEvent.focus(screen.getByRole('button'));
      expect(getTooltip()).not.toBeVisible();
      act(() => vi.advanceTimersByTime(200));
      expect(getTooltip()).toBeVisible();
    });

    it('hides on blur', () => {
      render(
        <Tooltip content="Ayuda" delayMs={200}>
          <button>Acción</button>
        </Tooltip>,
      );
      fireEvent.focus(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(200));
      expect(getTooltip()).toBeVisible();
      fireEvent.blur(screen.getByRole('button'));
      expect(getTooltip()).not.toBeVisible();
    });
  });

  describe('Escape key', () => {
    it('hides a visible tooltip when Escape is pressed', () => {
      render(
        <Tooltip content="Help text" delayMs={0}>
          <button>Action</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(getTooltip()).toBeVisible();
      fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });
      expect(getTooltip()).not.toBeVisible();
    });

    it('calls the child onKeyDown handler alongside Escape handling', () => {
      const onKeyDown = vi.fn();
      render(
        <Tooltip content="Help text" delayMs={0}>
          <button onKeyDown={onKeyDown}>Action</button>
        </Tooltip>,
      );
      fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });
      expect(onKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('placement variants', () => {
    it('renders with placement="bottom"', () => {
      render(
        <Tooltip content="Bottom tip" placement="bottom" delayMs={0}>
          <button>Action</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(getTooltip()).toBeVisible();
    });

    it('renders with placement="left"', () => {
      render(
        <Tooltip content="Left tip" placement="left" delayMs={0}>
          <button>Action</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(getTooltip()).toBeVisible();
    });

    it('renders with placement="right"', () => {
      render(
        <Tooltip content="Right tip" placement="right" delayMs={0}>
          <button>Action</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(getTooltip()).toBeVisible();
    });
  });

  describe('delayMs=0', () => {
    it('shows immediately when delayMs is 0', () => {
      render(
        <Tooltip content="Ayuda" delayMs={0}>
          <button>Acción</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(getTooltip()).toBeVisible();
    });
  });

  describe('existing event handlers are preserved', () => {
    it('calls child onMouseEnter alongside showing', () => {
      const onMouseEnter = vi.fn();
      render(
        <Tooltip content="Ayuda" delayMs={0}>
          <button onMouseEnter={onMouseEnter}>Acción</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('calls child onMouseLeave alongside hiding', () => {
      const onMouseLeave = vi.fn();
      render(
        <Tooltip content="Ayuda" delayMs={0}>
          <button onMouseLeave={onMouseLeave}>Acción</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      fireEvent.mouseLeave(screen.getByRole('button'));
      expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('calls child onFocus alongside showing', () => {
      const onFocus = vi.fn();
      render(
        <Tooltip content="Ayuda" delayMs={0}>
          <button onFocus={onFocus}>Acción</button>
        </Tooltip>,
      );
      fireEvent.focus(screen.getByRole('button'));
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('calls child onBlur alongside hiding', () => {
      const onBlur = vi.fn();
      render(
        <Tooltip content="Ayuda" delayMs={0}>
          <button onBlur={onBlur}>Acción</button>
        </Tooltip>,
      );
      fireEvent.focus(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      fireEvent.blur(screen.getByRole('button'));
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('content', () => {
    it('renders string content inside the tooltip', () => {
      render(
        <Tooltip content="Mensaje de ayuda" delayMs={0}>
          <button>Acción</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(getTooltip()).toHaveTextContent('Mensaje de ayuda');
    });

    it('renders ReactNode content', () => {
      render(
        <Tooltip content={<strong>Negrita</strong>} delayMs={0}>
          <button>Acción</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(getTooltip().querySelector('strong')).toBeInTheDocument();
    });
  });

  describe('scroll and resize repositioning', () => {
    it('recomputes position on scroll when visible without errors', () => {
      render(
        <Tooltip content="Help" delayMs={0} placement="top">
          <button>Action</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(getTooltip()).toBeVisible();
      act(() => window.dispatchEvent(new Event('scroll')));
      expect(getTooltip()).toBeVisible();
    });

    it('recomputes position on resize when visible without errors', () => {
      render(
        <Tooltip content="Help" delayMs={0} placement="bottom">
          <button>Action</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      expect(getTooltip()).toBeVisible();
      act(() => window.dispatchEvent(new Event('resize')));
      expect(getTooltip()).toBeVisible();
    });

    it('removes scroll listener when tooltip is hidden', () => {
      const removeEventListener = vi.spyOn(window, 'removeEventListener');
      render(
        <Tooltip content="Help" delayMs={0}>
          <button>Action</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => vi.advanceTimersByTime(0));
      fireEvent.mouseLeave(screen.getByRole('button'));
      expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { capture: true });
      removeEventListener.mockRestore();
    });
  });

  describe('child ref forwarding (mergeRefs)', () => {
    it('populates an existing ref passed to the child element', () => {
      const childRef = createRef<HTMLButtonElement>();
      render(
        <Tooltip content="Help" delayMs={0}>
          <button ref={childRef}>Action</button>
        </Tooltip>,
      );
      expect(childRef.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('populates a callback ref passed to the child element', () => {
      let captured: HTMLButtonElement | null = null;
      render(
        <Tooltip content="Help" delayMs={0}>
          <button ref={(el) => { captured = el; }}>Action</button>
        </Tooltip>,
      );
      expect(captured).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations when hidden', async () => {
      vi.useRealTimers();
      const { container } = render(
        <Tooltip content="Ayuda">
          <button>Acción</button>
        </Tooltip>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations when visible', async () => {
      vi.useRealTimers();
      const { container } = render(
        <Tooltip content="Ayuda" delayMs={0}>
          <button>Acción</button>
        </Tooltip>,
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
