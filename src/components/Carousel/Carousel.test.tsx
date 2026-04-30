import { render, screen, within, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Carousel } from './Carousel';

/* matchMedia is not implemented in jsdom */
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

function renderCarousel(props: Partial<React.ComponentProps<typeof Carousel>> = {}) {
  return render(
    <Carousel aria-label="Test carousel" {...props}>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>,
  );
}

describe('Carousel', () => {
  describe('rendering', () => {
    it('renders all slides', () => {
      renderCarousel();
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      expect(screen.getByText('Slide 2')).toBeInTheDocument();
      expect(screen.getByText('Slide 3')).toBeInTheDocument();
    });

    it('renders the region with aria-label', () => {
      renderCarousel();
      expect(screen.getByRole('region', { name: 'Test carousel' })).toBeInTheDocument();
    });

    it('renders prev and next buttons', () => {
      renderCarousel();
      expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    });

    it('renders one dot per slide', () => {
      renderCarousel();
      const dotList = screen.getByRole('list', { name: 'Slides' });
      expect(within(dotList).getAllByRole('button')).toHaveLength(3);
    });

    it('marks first dot as active initially', () => {
      renderCarousel();
      const dots = screen.getAllByRole('button', { name: /^Go to slide/ });
      expect(dots[0]).toHaveAttribute('aria-current', 'true');
      expect(dots[1]).not.toHaveAttribute('aria-current');
    });

    it('forwards ref to root div', () => {
      const ref = { current: null };
      render(
        <Carousel ref={ref} aria-label="ref test">
          <div>Slide</div>
        </Carousel>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes native HTML attributes', () => {
      renderCarousel({ 'data-testid': 'carousel', id: 'my-carousel' } as Parameters<typeof renderCarousel>[0]);
      const el = screen.getByTestId('carousel');
      expect(el).toHaveAttribute('id', 'my-carousel');
    });

    it('uses custom prevLabel and nextLabel', () => {
      renderCarousel({ prevLabel: 'Anterior', nextLabel: 'Siguiente' });
      expect(screen.getByRole('button', { name: 'Anterior' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Siguiente' })).toBeInTheDocument();
    });
  });

  describe('navigation — buttons', () => {
    it('previous button is disabled at the first slide', () => {
      renderCarousel();
      expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    });

    it('next button is enabled at the first slide', () => {
      renderCarousel();
      expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
    });

    it('advances to the next slide on Next click', async () => {
      const user = userEvent.setup();
      renderCarousel();
      await user.click(screen.getByRole('button', { name: 'Next' }));
      const dots = screen.getAllByRole('button', { name: /^Go to slide/ });
      expect(dots[1]).toHaveAttribute('aria-current', 'true');
    });

    it('goes back on Prev click after advancing', async () => {
      const user = userEvent.setup();
      renderCarousel();
      await user.click(screen.getByRole('button', { name: 'Next' }));
      await user.click(screen.getByRole('button', { name: 'Previous' }));
      const dots = screen.getAllByRole('button', { name: /^Go to slide/ });
      expect(dots[0]).toHaveAttribute('aria-current', 'true');
    });

    it('next button is disabled at the last slide', async () => {
      const user = userEvent.setup();
      renderCarousel();
      await user.click(screen.getByRole('button', { name: 'Next' }));
      await user.click(screen.getByRole('button', { name: 'Next' }));
      expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });
  });

  describe('navigation — dots', () => {
    it('navigates directly to a slide via dot click', async () => {
      const user = userEvent.setup();
      renderCarousel();
      const dots = screen.getAllByRole('button', { name: /^Go to slide/ });
      await user.click(dots[2]);
      expect(dots[2]).toHaveAttribute('aria-current', 'true');
    });
  });

  describe('navigation — keyboard', () => {
    it('ArrowRight advances to the next slide', () => {
      renderCarousel();
      const region = screen.getByRole('region', { name: 'Test carousel' });
      fireEvent.keyDown(region, { key: 'ArrowRight' });
      const dots = screen.getAllByRole('button', { name: /^Go to slide/ });
      expect(dots[1]).toHaveAttribute('aria-current', 'true');
    });

    it('ArrowLeft goes back after advancing', () => {
      renderCarousel();
      const region = screen.getByRole('region', { name: 'Test carousel' });
      fireEvent.keyDown(region, { key: 'ArrowRight' });
      fireEvent.keyDown(region, { key: 'ArrowLeft' });
      const dots = screen.getAllByRole('button', { name: /^Go to slide/ });
      expect(dots[0]).toHaveAttribute('aria-current', 'true');
    });
  });

  describe('loop prop', () => {
    it('prev button is enabled at index 0 when loop=true', () => {
      renderCarousel({ loop: true });
      expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled();
    });

    it('next button is enabled at last slide when loop=true', async () => {
      const user = userEvent.setup();
      renderCarousel({ loop: true });
      await user.click(screen.getByRole('button', { name: 'Next' }));
      await user.click(screen.getByRole('button', { name: 'Next' }));
      expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
    });

    it('wraps from last slide to first on Next when loop=true', async () => {
      const user = userEvent.setup();
      renderCarousel({ loop: true });
      // advance past end (3 slides → wraps to 0)
      await user.click(screen.getByRole('button', { name: 'Next' }));
      await user.click(screen.getByRole('button', { name: 'Next' }));
      await user.click(screen.getByRole('button', { name: 'Next' }));
      const dots = screen.getAllByRole('button', { name: /^Go to slide/ });
      expect(dots[0]).toHaveAttribute('aria-current', 'true');
    });
  });

  describe('autoplay', () => {
    it('auto-advances slides at the given interval', async () => {
      vi.useFakeTimers();
      try {
        renderCarousel({ autoplay: 1000, loop: true });
        await act(async () => { vi.advanceTimersByTime(1000); });
        const dots = screen.getAllByRole('button', { name: /^Go to slide/ });
        expect(dots[1]).toHaveAttribute('aria-current', 'true');
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe('visibleSlides', () => {
    it('renders correct number of dots for visibleSlides=2', () => {
      renderCarousel({ visibleSlides: 2 });
      // 3 slides, 2 visible → 2 dot positions (maxIndex = 1, dotsCount = 2)
      expect(screen.getAllByRole('button', { name: /^Go to slide/ })).toHaveLength(2);
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — default (single slide, no loop)', async () => {
      const { container } = renderCarousel();
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — loop=true', async () => {
      const { container } = renderCarousel({ loop: true });
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — visibleSlides=2', async () => {
      const { container } = renderCarousel({ visibleSlides: 2 });
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — after navigating to second slide', async () => {
      const user = userEvent.setup();
      const { container } = renderCarousel();
      await user.click(screen.getByRole('button', { name: 'Next' }));
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
