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

  type ChildElement = React.ReactElement<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>;
  const typedChildren = children as ChildElement;
  // cloneElement requires merging the child's existing ref with triggerRef so both receive the DOM node.
  // In React 19, refs are props, so we access typedChildren.props.ref.
  // eslint-disable-next-line react-hooks/refs -- mergeRefs creates a callback ref; it does not read .current during render
  const child = cloneElement(typedChildren, {
    // eslint-disable-next-line react-hooks/refs -- triggerRef is passed to mergeRefs which only sets .current via a callback, never reads it during render
    ref: mergeRefs(triggerRef, typedChildren.props.ref),
    'aria-describedby': tooltipId,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      typedChildren.props.onMouseEnter?.(e as React.MouseEvent<HTMLElement>);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      typedChildren.props.onMouseLeave?.(e as React.MouseEvent<HTMLElement>);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      typedChildren.props.onFocus?.(e as React.FocusEvent<HTMLElement>);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      typedChildren.props.onBlur?.(e as React.FocusEvent<HTMLElement>);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') hide();
      typedChildren.props.onKeyDown?.(e as React.KeyboardEvent<HTMLElement>);
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
