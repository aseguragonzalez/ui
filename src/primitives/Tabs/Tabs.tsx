import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import styles from './Tabs.module.css';

/* ------------------------------------------------------------------ */
/*  Context                                                             */
/* ------------------------------------------------------------------ */

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  getTabId: (value: string) => string;
  getPanelId: (value: string) => string;
  tabValuesRef: React.MutableRefObject<string[]>;
  tabRefsRef: React.MutableRefObject<Map<string, HTMLButtonElement>>;
  disabledTabsRef: React.MutableRefObject<Set<string>>;
  registerTab: (value: string) => () => void;
  registerTabRef: (value: string, el: HTMLButtonElement | null) => void;
  setTabDisabled: (value: string, disabled: boolean) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs sub-components must be rendered inside <Tabs>.');
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Tabs (root)                                                         */
/* ------------------------------------------------------------------ */

export interface TabsProps {
  children: React.ReactNode;
  /** Controlled active tab value. */
  value?: string;
  /** Initial active tab for uncontrolled usage. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, value: controlledValue, defaultValue = '', onChange, className }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeTab = controlledValue ?? internalValue;

    const baseId = useId();
    const getTabId = useCallback((v: string) => `${baseId}-tab-${v}`, [baseId]);
    const getPanelId = useCallback((v: string) => `${baseId}-panel-${v}`, [baseId]);

    const tabValuesRef = useRef<string[]>([]);
    const tabRefsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
    const disabledTabsRef = useRef<Set<string>>(new Set());

    const setActiveTab = useCallback(
      (v: string) => {
        if (controlledValue === undefined) setInternalValue(v);
        onChange?.(v);
      },
      [controlledValue, onChange],
    );

    const registerTab = useCallback((value: string) => {
      tabValuesRef.current = [...tabValuesRef.current, value];
      return () => {
        tabValuesRef.current = tabValuesRef.current.filter((v) => v !== value);
      };
    }, []);

    const registerTabRef = useCallback(
      (value: string, el: HTMLButtonElement | null) => {
        if (el) tabRefsRef.current.set(value, el);
        else tabRefsRef.current.delete(value);
      },
      [],
    );

    const setTabDisabled = useCallback((value: string, disabled: boolean) => {
      if (disabled) disabledTabsRef.current.add(value);
      else disabledTabsRef.current.delete(value);
    }, []);

    return (
      <TabsContext.Provider
        value={{
          activeTab,
          setActiveTab,
          getTabId,
          getPanelId,
          tabValuesRef,
          tabRefsRef,
          disabledTabsRef,
          registerTab,
          registerTabRef,
          setTabDisabled,
        }}
      >
        <div
          ref={ref}
          className={[styles.tabs, className ?? ''].filter(Boolean).join(' ')}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

/* ------------------------------------------------------------------ */
/*  TabList                                                             */
/* ------------------------------------------------------------------ */

export interface TabListProps {
  children: React.ReactNode;
  /** Accessible label for the tab list — required by ARIA. */
  label: string;
  className?: string;
}

const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, label, className }, ref) => (
    <div
      ref={ref}
      role="tablist"
      aria-label={label}
      className={[styles.tabList, className ?? ''].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  ),
);
TabList.displayName = 'TabList';

/* ------------------------------------------------------------------ */
/*  Tab                                                                 */
/* ------------------------------------------------------------------ */

export interface TabProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, children, disabled = false, className }, ref) => {
    const ctx = useTabsContext();
    const {
      activeTab,
      setActiveTab,
      getTabId,
      getPanelId,
      tabValuesRef,
      tabRefsRef,
      disabledTabsRef,
      registerTab,
      registerTabRef,
      setTabDisabled,
    } = ctx;

    const isSelected = activeTab === value;

    // Register value for keyboard nav order
    useEffect(() => registerTab(value), [value, registerTab]);

    // Sync disabled state
    useEffect(() => {
      setTabDisabled(value, disabled);
      return () => setTabDisabled(value, false);
    }, [value, disabled, setTabDisabled]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const navigable = tabValuesRef.current.filter(
        (v) => !disabledTabsRef.current.has(v),
      );
      const idx = navigable.indexOf(value);

      const focusTab = (target: string) => {
        tabRefsRef.current.get(target)?.focus();
      };

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          if (idx !== -1) focusTab(navigable[(idx + 1) % navigable.length]);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          if (idx !== -1)
            focusTab(navigable[(idx - 1 + navigable.length) % navigable.length]);
          break;
        case 'Home':
          e.preventDefault();
          focusTab(navigable[0]);
          break;
        case 'End':
          e.preventDefault();
          focusTab(navigable[navigable.length - 1]);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (!disabled) setActiveTab(value);
          break;
      }
    };

    return (
      <button
        ref={(el) => {
          registerTabRef(value, el);
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        role="tab"
        id={getTabId(value)}
        aria-selected={isSelected}
        aria-controls={getPanelId(value)}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={() => !disabled && setActiveTab(value)}
        onKeyDown={handleKeyDown}
        className={[styles.tab, className ?? ''].filter(Boolean).join(' ')}
      >
        {children}
      </button>
    );
  },
);
Tab.displayName = 'Tab';

/* ------------------------------------------------------------------ */
/*  TabPanel                                                            */
/* ------------------------------------------------------------------ */

export interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, children, className }, ref) => {
    const { activeTab, getTabId, getPanelId } = useTabsContext();
    const isActive = activeTab === value;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={getPanelId(value)}
        aria-labelledby={getTabId(value)}
        tabIndex={0}
        hidden={!isActive}
        className={[styles.tabPanel, className ?? ''].filter(Boolean).join(' ')}
      >
        {children}
      </div>
    );
  },
);
TabPanel.displayName = 'TabPanel';

/* ------------------------------------------------------------------ */
/*  Exports                                                             */
/* ------------------------------------------------------------------ */

export { Tabs, TabList, Tab, TabPanel };
