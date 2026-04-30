import {
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip content — supplementary info only, never the only means to access critical content. */
  content: React.ReactNode;
  /** Must be a single focusable element that forwards its ref. */
  children: React.ReactElement;
  placement?: TooltipPlacement;
  /** Delay before showing, in ms. Default: 200. */
  delayMs?: number;
}

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (el: T) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(el);
      else if (ref && 'current' in ref)
        (ref as React.MutableRefObject<T>).current = el;
    }
  };
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  delayMs = 200,
}: TooltipProps) {
  const tooltipId = useId();
  const triggerRef = useRef<HTMLElement>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const computeCoords = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    switch (placement) {
      case 'top':
        setCoords({ top: rect.top, left: rect.left + rect.width / 2 });
        break;
      case 'bottom':
        setCoords({ top: rect.bottom, left: rect.left + rect.width / 2 });
        break;
      case 'left':
        setCoords({ top: rect.top + rect.height / 2, left: rect.left });
        break;
      case 'right':
        setCoords({ top: rect.top + rect.height / 2, left: rect.right });
        break;
    }
  }, [placement]);

  const show = useCallback(() => {
    clearTimeout(showTimer.current);
    showTimer.current = setTimeout(() => {
      computeCoords();
      setVisible(true);
    }, delayMs);
  }, [computeCoords, delayMs]);

  const hide = useCallback(() => {
    clearTimeout(showTimer.current);
    setVisible(false);
  }, []);

  // Recompute position on scroll/resize while visible
  useEffect(() => {
    if (!visible) return;
    const update = () => computeCoords();
    window.addEventListener('scroll', update, { capture: true, passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update, { capture: true });
      window.removeEventListener('resize', update);
    };
  }, [visible, computeCoords]);

  const child = cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>, {
    ref: mergeRefs(triggerRef, (children as any).ref),
    'aria-describedby': tooltipId,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      (children.props as React.HTMLAttributes<HTMLElement>).onMouseEnter?.(e as React.MouseEvent<HTMLElement>);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      (children.props as React.HTMLAttributes<HTMLElement>).onMouseLeave?.(e as React.MouseEvent<HTMLElement>);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      (children.props as React.HTMLAttributes<HTMLElement>).onFocus?.(e as React.FocusEvent<HTMLElement>);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      (children.props as React.HTMLAttributes<HTMLElement>).onBlur?.(e as React.FocusEvent<HTMLElement>);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') hide();
      (children.props as React.HTMLAttributes<HTMLElement>).onKeyDown?.(e as React.KeyboardEvent<HTMLElement>);
    },
  });

  const tooltip = (
    <div
      id={tooltipId}
      role="tooltip"
      hidden={!visible}
      style={{ top: coords.top, left: coords.left }}
      className={[
        styles.tooltip,
        styles[placement],
        visible ? styles.visible : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {content}
    </div>
  );

  return (
    <>
      {child}
      {createPortal(tooltip, document.body)}
    </>
  );
}

Tooltip.displayName = 'Tooltip';
