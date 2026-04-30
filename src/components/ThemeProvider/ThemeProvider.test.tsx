import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';

function mockMatchMedia(prefersDark = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: query.includes('dark') ? prefersDark : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

function mockMatchMediaWithChangeSupport(prefersDark = false): { fireChange: (dark: boolean) => void } {
  const listeners: Array<(e: { matches: boolean }) => void> = [];
  let currentMatches = prefersDark;

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn((query: string) => ({
      get matches() { return query.includes('dark') ? currentMatches : false; },
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_: string, handler: (e: { matches: boolean }) => void) => {
        listeners.push(handler);
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  return {
    fireChange: (dark: boolean) => {
      currentMatches = dark;
      listeners.forEach((h) => h({ matches: dark }));
    },
  };
}

function TestConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme('dark')}>dark</button>
      <button onClick={() => setTheme('light')}>light</button>
      <button onClick={() => setTheme('system')}>system</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    vi.restoreAllMocks();
    mockMatchMedia(false);
  });

  it('applies light theme by default when defaultTheme is light', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(screen.getByTestId('resolved').textContent).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('applies dark theme when defaultTheme is dark', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('changes theme and persists to localStorage', async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <TestConsumer />
      </ThemeProvider>,
    );

    await userEvent.click(screen.getByText('dark'));

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(localStorage.getItem('ds-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('restores theme from localStorage', () => {
    localStorage.setItem('ds-theme', 'dark');
    render(
      <ThemeProvider defaultTheme="light">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  it('removes data-theme attribute in system mode', async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <TestConsumer />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByText('dark'));
    await userEvent.click(screen.getByText('system'));

    expect(screen.getByTestId('theme').textContent).toBe('system');
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });

  it('accepts a custom storageKey', async () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="my-theme">
        <TestConsumer />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByText('dark'));
    expect(localStorage.getItem('my-theme')).toBe('dark');
  });

  it('system theme resolves to dark when OS prefers dark', () => {
    mockMatchMedia(true);
    render(
      <ThemeProvider defaultTheme="system">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('resolved').textContent).toBe('dark');
  });

  it('resolvedTheme updates when OS preference changes while in system mode', () => {
    const { fireChange } = mockMatchMediaWithChangeSupport(false);
    render(
      <ThemeProvider defaultTheme="system">
        <TestConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('resolved').textContent).toBe('light');
    act(() => fireChange(true));
    expect(screen.getByTestId('resolved').textContent).toBe('dark');
  });

  it('useTheme throws outside ThemeProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      'useTheme must be used inside a <ThemeProvider>',
    );
    consoleError.mockRestore();
  });
});
