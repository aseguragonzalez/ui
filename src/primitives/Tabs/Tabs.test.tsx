import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

function BasicTabs({ defaultValue = 'tab1', onChange }: { defaultValue?: string; onChange?: (v: string) => void }) {
  return (
    <Tabs defaultValue={defaultValue} onChange={onChange}>
      <TabList label="Navegación principal">
        <Tab value="tab1">Pestaña 1</Tab>
        <Tab value="tab2">Pestaña 2</Tab>
        <Tab value="tab3">Pestaña 3</Tab>
      </TabList>
      <TabPanel value="tab1">Contenido 1</TabPanel>
      <TabPanel value="tab2">Contenido 2</TabPanel>
      <TabPanel value="tab3">Contenido 3</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  describe('rendering', () => {
    it('renders a tablist', () => {
      render(<BasicTabs />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders all tabs', () => {
      render(<BasicTabs />);
      expect(screen.getAllByRole('tab')).toHaveLength(3);
    });

    it('renders all tab panels', () => {
      render(<BasicTabs />);
      expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
    });

    it('shows only the active panel', () => {
      render(<BasicTabs defaultValue="tab2" />);
      expect(screen.getByText('Contenido 2')).toBeVisible();
      // Inactive panels stay in the DOM (hidden attribute) for correct ARIA semantics
      expect(screen.getByText('Contenido 1')).not.toBeVisible();
    });

    it('sets aria-label on the tablist', () => {
      render(<BasicTabs />);
      expect(screen.getByRole('tablist', { name: 'Navegación principal' })).toBeInTheDocument();
    });
  });

  describe('ARIA', () => {
    it('marks the active tab as aria-selected="true"', () => {
      render(<BasicTabs defaultValue="tab2" />);
      expect(screen.getByRole('tab', { name: 'Pestaña 2' })).toHaveAttribute('aria-selected', 'true');
    });

    it('marks inactive tabs as aria-selected="false"', () => {
      render(<BasicTabs defaultValue="tab1" />);
      expect(screen.getByRole('tab', { name: 'Pestaña 2' })).toHaveAttribute('aria-selected', 'false');
    });

    it('links tab to its panel via aria-controls / aria-labelledby', () => {
      render(<BasicTabs />);
      const tab = screen.getByRole('tab', { name: 'Pestaña 1' });
      const panelId = tab.getAttribute('aria-controls')!;
      expect(document.getElementById(panelId)).toHaveAttribute('role', 'tabpanel');
    });

    it('active tab has tabIndex=0, others have tabIndex=-1', () => {
      render(<BasicTabs defaultValue="tab1" />);
      const [tab1, tab2] = screen.getAllByRole('tab');
      expect(tab1).toHaveAttribute('tabindex', '0');
      expect(tab2).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('interaction — mouse', () => {
    it('switches the active tab on click', async () => {
      const user = userEvent.setup();
      render(<BasicTabs />);
      await user.click(screen.getByRole('tab', { name: 'Pestaña 2' }));
      expect(screen.getByRole('tab', { name: 'Pestaña 2' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Contenido 2')).toBeVisible();
    });

    it('calls onChange with the new value', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<BasicTabs onChange={onChange} />);
      await user.click(screen.getByRole('tab', { name: 'Pestaña 3' }));
      expect(onChange).toHaveBeenCalledWith('tab3');
    });
  });

  describe('interaction — keyboard', () => {
    it('ArrowRight moves focus to the next tab', async () => {
      const user = userEvent.setup();
      render(<BasicTabs defaultValue="tab1" />);
      screen.getByRole('tab', { name: 'Pestaña 1' }).focus();
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Pestaña 2' })).toHaveFocus();
    });

    it('ArrowLeft moves focus to the previous tab', async () => {
      const user = userEvent.setup();
      render(<BasicTabs defaultValue="tab2" />);
      screen.getByRole('tab', { name: 'Pestaña 2' }).focus();
      await user.keyboard('{ArrowLeft}');
      expect(screen.getByRole('tab', { name: 'Pestaña 1' })).toHaveFocus();
    });

    it('ArrowRight wraps around from last to first', async () => {
      const user = userEvent.setup();
      render(<BasicTabs defaultValue="tab3" />);
      screen.getByRole('tab', { name: 'Pestaña 3' }).focus();
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Pestaña 1' })).toHaveFocus();
    });

    it('Home moves focus to the first tab', async () => {
      const user = userEvent.setup();
      render(<BasicTabs defaultValue="tab3" />);
      screen.getByRole('tab', { name: 'Pestaña 3' }).focus();
      await user.keyboard('{Home}');
      expect(screen.getByRole('tab', { name: 'Pestaña 1' })).toHaveFocus();
    });

    it('End moves focus to the last tab', async () => {
      const user = userEvent.setup();
      render(<BasicTabs defaultValue="tab1" />);
      screen.getByRole('tab', { name: 'Pestaña 1' }).focus();
      await user.keyboard('{End}');
      expect(screen.getByRole('tab', { name: 'Pestaña 3' })).toHaveFocus();
    });

    it('Enter activates the focused tab (manual activation)', async () => {
      const user = userEvent.setup();
      render(<BasicTabs defaultValue="tab1" />);
      screen.getByRole('tab', { name: 'Pestaña 1' }).focus();
      await user.keyboard('{ArrowRight}{Enter}');
      expect(screen.getByRole('tab', { name: 'Pestaña 2' })).toHaveAttribute('aria-selected', 'true');
    });

    it('Space activates the focused tab', async () => {
      const user = userEvent.setup();
      render(<BasicTabs defaultValue="tab1" />);
      screen.getByRole('tab', { name: 'Pestaña 1' }).focus();
      await user.keyboard('{ArrowRight}{ }');
      expect(screen.getByRole('tab', { name: 'Pestaña 2' })).toHaveAttribute('aria-selected', 'true');
    });

    it('ArrowDown moves focus to the next tab (same as ArrowRight)', async () => {
      const user = userEvent.setup();
      render(<BasicTabs defaultValue="tab1" />);
      screen.getByRole('tab', { name: 'Pestaña 1' }).focus();
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('tab', { name: 'Pestaña 2' })).toHaveFocus();
    });

    it('ArrowUp moves focus to the previous tab (same as ArrowLeft)', async () => {
      const user = userEvent.setup();
      render(<BasicTabs defaultValue="tab2" />);
      screen.getByRole('tab', { name: 'Pestaña 2' }).focus();
      await user.keyboard('{ArrowUp}');
      expect(screen.getByRole('tab', { name: 'Pestaña 1' })).toHaveFocus();
    });

    it('ArrowLeft wraps from first to last tab', async () => {
      const user = userEvent.setup();
      render(<BasicTabs defaultValue="tab1" />);
      screen.getByRole('tab', { name: 'Pestaña 1' }).focus();
      await user.keyboard('{ArrowLeft}');
      expect(screen.getByRole('tab', { name: 'Pestaña 3' })).toHaveFocus();
    });
  });

  describe('disabled tabs', () => {
    it('disabled tab cannot be activated by click', async () => {
      const user = userEvent.setup();
      render(
        <Tabs defaultValue="tab1">
          <TabList label="Tabs">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2" disabled>Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Panel 1</TabPanel>
          <TabPanel value="tab2">Panel 2</TabPanel>
        </Tabs>,
      );
      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
    });

    it('keyboard navigation skips disabled tabs', async () => {
      const user = userEvent.setup();
      render(
        <Tabs defaultValue="tab1">
          <TabList label="Tabs">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2" disabled>Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">Panel 1</TabPanel>
          <TabPanel value="tab2">Panel 2</TabPanel>
          <TabPanel value="tab3">Panel 3</TabPanel>
        </Tabs>,
      );
      screen.getByRole('tab', { name: 'Tab 1' }).focus();
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveFocus();
    });
  });

  describe('forwardRef', () => {
    it('forwards ref to the Tabs wrapper div', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <Tabs defaultValue="tab1" ref={ref}>
          <TabList label="Tabs">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Panel 1</TabPanel>
        </Tabs>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('context error', () => {
    it('throws when Tab is rendered outside a Tabs component', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => render(<Tab value="x">Orphan</Tab>)).toThrow(
        'Tabs sub-components must be rendered inside <Tabs>.',
      );
      consoleError.mockRestore();
    });
  });

  describe('controlled usage', () => {
    it('respects the controlled value prop', () => {
      render(
        <Tabs value="tab2">
          <TabList label="Tabs">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Panel 1</TabPanel>
          <TabPanel value="tab2">Panel 2</TabPanel>
        </Tabs>,
      );
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('a11y — axe', () => {
    it('has no violations', async () => {
      const { container } = render(<BasicTabs />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with disabled tab', async () => {
      const { container } = render(
        <Tabs defaultValue="tab1">
          <TabList label="Tabs con deshabilitado">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2" disabled>Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Panel 1</TabPanel>
          <TabPanel value="tab2">Panel 2</TabPanel>
        </Tabs>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
