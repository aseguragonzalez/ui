import { forwardRef, useState, useEffect, useLayoutEffect, useRef, useCallback, Children } from 'react';
import { Button } from '../../primitives/Button/Button';
import styles from './Carousel.module.css';

export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label'> {
  /** Required accessible name for the region landmark. */
  'aria-label': string;
  /** Wrap around from last to first and vice versa. */
  loop?: boolean;
  /** Auto-advance interval in ms. Pauses on hover/focus and when prefers-reduced-motion is set. */
  autoplay?: number;
  /** Number of slides visible at once. */
  visibleSlides?: 1 | 2 | 3;
  /** Accessible label for the previous button. */
  prevLabel?: string;
  /** Accessible label for the next button. */
  nextLabel?: string;
}

const PrevIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const NextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      'aria-label': ariaLabel,
      loop = false,
      autoplay,
      visibleSlides = 1,
      prevLabel = 'Previous',
      nextLabel = 'Next',
      className,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const slides = Children.toArray(children);
    const n = slides.length;
    const v = Math.min(visibleSlides, n);
    const maxIndex = Math.max(0, n - v);
    const dotsCount = maxIndex + 1;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [skipTransition, setSkipTransition] = useState(false);
    const isHovered = useRef(false);
    const isFocused = useRef(false);

    // Re-enable transition after the browser paints the instant-jump frame.
    useLayoutEffect(() => {
      if (!skipTransition) return;
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setSkipTransition(false)),
      );
      return () => cancelAnimationFrame(id);
    }, [skipTransition]);

    const goTo = useCallback(
      (index: number) => {
        if (loop) {
          const wraps = index < 0 || index >= n;
          if (wraps) setSkipTransition(true);
          setCurrentIndex(((index % n) + n) % n);
        } else {
          setCurrentIndex(Math.max(0, Math.min(maxIndex, index)));
        }
      },
      [loop, n, maxIndex],
    );

    const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
    const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

    // Auto-advance
    useEffect(() => {
      if (!autoplay) return;
      const id = setInterval(() => {
        if (isHovered.current || isFocused.current) return;
        if (loop) {
          goTo(currentIndex + 1);
        } else {
          setCurrentIndex((i) => (i < maxIndex ? i + 1 : 0));
        }
      }, autoplay);
      return () => clearInterval(id);
    }, [autoplay, currentIndex, goTo, loop, maxIndex]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowLeft')  { e.preventDefault(); goPrev(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
        onKeyDown?.(e);
      },
      [goPrev, goNext, onKeyDown],
    );

    const atStart = !loop && currentIndex === 0;
    const atEnd   = !loop && currentIndex >= maxIndex;

    // Transform: move track by (currentIndex / n) * 100% of its own width
    const translatePct = n > 0 ? (currentIndex / n) * 100 : 0;
    const trackWidthPct = n > 0 ? (n / v) * 100 : 100;
    const slideWidthPct = n > 0 ? 100 / n : 100;

    const classNames = [styles.root, className ?? ''].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        className={classNames}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => { isHovered.current = true; }}
        onMouseLeave={() => { isHovered.current = false; }}
        onFocus={() => { isFocused.current = true; }}
        onBlur={() => { isFocused.current = false; }}
        {...rest}
      >
        {/* Screen-reader live region */}
        <span className={styles.srOnly} aria-live="polite" aria-atomic="true">
          {`Slide ${currentIndex + 1} of ${n}`}
        </span>

        {/* Slide viewport */}
        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{
              width: `${trackWidthPct}%`,
              transform: `translateX(-${translatePct}%)`,
              ...(skipTransition ? { transition: 'none' } : {}),
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i + 1} of ${n}`}
                className={styles.slide}
                style={{ width: `${slideWidthPct}%` }}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {/* Controls row */}
        <div className={styles.controls}>
          <Button
            variant="secondary"
            size="sm"
            aria-label={prevLabel}
            disabled={atStart}
            onClick={goPrev}
            className={styles.navBtn}
          >
            <PrevIcon />
          </Button>

          <ul className={styles.dots} aria-label="Slides">
            {Array.from({ length: dotsCount }).map((_, i) => (
              <li key={i}>
                <button
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === currentIndex ? true : undefined}
                  className={[styles.dot, i === currentIndex ? styles.dotActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => goTo(i)}
                />
              </li>
            ))}
          </ul>

          <Button
            variant="secondary"
            size="sm"
            aria-label={nextLabel}
            disabled={atEnd}
            onClick={goNext}
            className={styles.navBtn}
          >
            <NextIcon />
          </Button>
        </div>
      </div>
    );
  },
);

Carousel.displayName = 'Carousel';

export { Carousel };
