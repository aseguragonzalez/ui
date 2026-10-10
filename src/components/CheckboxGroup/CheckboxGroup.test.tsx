import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { CheckboxGroup } from './CheckboxGroup';

const TOPIC_OPTIONS = [
  { value: 'news', label: 'News' },
  { value: 'offers', label: 'Offers' },
  { value: 'events', label: 'Events' },
];

describe('CheckboxGroup', () => {
  describe('rendering', () => {
    it('renders a fieldset with legend', () => {
      render(<CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} />);
      const group = screen.getByRole('group', { name: 'Topics' });
      expect(group.tagName).toBe('FIELDSET');
    });

    it('renders all checkbox options', () => {
      render(<CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} />);
      expect(screen.getByRole('checkbox', { name: 'News' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Offers' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Events' })).toBeInTheDocument();
    });

    it('renders React node labels', () => {
      const options = [{ value: 'terms', label: <>I accept the <a href="/terms">terms</a></> }];
      render(<CheckboxGroup legend="Legal" name="legal" options={options} />);
      expect(screen.getByRole('checkbox', { name: 'I accept the terms' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'terms' })).toBeInTheDocument();
    });

    it('renders hint text', () => {
      render(<CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} hint="Pick any" />);
      expect(screen.getByText('Pick any')).toBeInTheDocument();
    });

    it('renders error and hides hint', () => {
      render(
        <CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} hint="Pick any" error="Pick one" />,
      );
      expect(screen.getByText('Pick one')).toBeInTheDocument();
      expect(screen.queryByText('Pick any')).not.toBeInTheDocument();
    });
  });

  describe('controlled behaviour', () => {
    it('checks the options in value', () => {
      render(<CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} value={['news', 'events']} />);
      expect(screen.getByRole('checkbox', { name: 'News' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Offers' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Events' })).toBeChecked();
    });

    it('calls onChange with the option added, in options order', async () => {
      const onChange = vi.fn();
      render(
        <CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} value={['events']} onChange={onChange} />,
      );
      await userEvent.click(screen.getByRole('checkbox', { name: 'News' }));
      expect(onChange).toHaveBeenCalledWith(['news', 'events']);
    });

    it('calls onChange with the option removed', async () => {
      const onChange = vi.fn();
      render(
        <CheckboxGroup
          legend="Topics"
          name="topics"
          options={TOPIC_OPTIONS}
          value={['news', 'events']}
          onChange={onChange}
        />,
      );
      await userEvent.click(screen.getByRole('checkbox', { name: 'News' }));
      expect(onChange).toHaveBeenCalledWith(['events']);
    });

    it('does not change its checked state without a new value', async () => {
      render(<CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} value={[]} onChange={() => {}} />);
      await userEvent.click(screen.getByRole('checkbox', { name: 'News' }));
      expect(screen.getByRole('checkbox', { name: 'News' })).not.toBeChecked();
    });

    it('reflects the value held by the parent', async () => {
      function Parent() {
        const [value, setValue] = useState<string[]>(['offers']);
        return <CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} value={value} onChange={setValue} />;
      }
      render(<Parent />);
      await userEvent.click(screen.getByRole('checkbox', { name: 'Events' }));
      await userEvent.click(screen.getByRole('checkbox', { name: 'Offers' }));
      expect(screen.getByRole('checkbox', { name: 'Events' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Offers' })).not.toBeChecked();
    });
  });

  describe('uncontrolled behaviour', () => {
    it('checks the options in defaultValue and toggles on click', async () => {
      const onChange = vi.fn();
      render(
        <CheckboxGroup
          legend="Topics"
          name="topics"
          options={TOPIC_OPTIONS}
          defaultValue={['offers']}
          onChange={onChange}
        />,
      );
      expect(screen.getByRole('checkbox', { name: 'Offers' })).toBeChecked();
      await userEvent.click(screen.getByRole('checkbox', { name: 'News' }));
      expect(screen.getByRole('checkbox', { name: 'News' })).toBeChecked();
      expect(onChange).toHaveBeenCalledWith(['news', 'offers']);
    });

    it('submits every checked option under the group name', async () => {
      render(
        <form data-testid="form">
          <CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} defaultValue={['news']} />
        </form>,
      );
      await userEvent.click(screen.getByRole('checkbox', { name: 'Events' }));
      const data = new FormData(screen.getByTestId('form') as HTMLFormElement);
      expect(data.getAll('topics')).toEqual(['news', 'events']);
    });
  });

  describe('accessibility wiring', () => {
    it('disables all checkboxes when disabled prop is true', () => {
      render(<CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} disabled />);
      screen.getAllByRole('checkbox').forEach((checkbox) => expect(checkbox).toBeDisabled());
    });

    it('disables individual options', () => {
      const options = [
        { value: 'news', label: 'News' },
        { value: 'offers', label: 'Offers', disabled: true },
      ];
      render(<CheckboxGroup legend="Topics" name="topics" options={options} />);
      expect(screen.getByRole('checkbox', { name: 'Offers' })).toBeDisabled();
      expect(screen.getByRole('checkbox', { name: 'News' })).not.toBeDisabled();
    });

    it('connects fieldset with hint via aria-describedby', () => {
      render(<CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} hint="Pick any" />);
      const describedBy = screen.getByRole('group').getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy!)).toHaveTextContent('Pick any');
    });

    it('connects fieldset with error via aria-describedby', () => {
      render(<CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} error="Pick one" />);
      const describedBy = screen.getByRole('group').getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy!)).toHaveTextContent('Pick one');
    });

    it('has no aria-describedby when neither hint nor error is provided', () => {
      render(<CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} />);
      expect(screen.getByRole('group')).not.toHaveAttribute('aria-describedby');
    });

    it('sets aria-invalid on all checkboxes when error is present', () => {
      render(<CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} error="Pick one" />);
      screen.getAllByRole('checkbox').forEach((checkbox) => expect(checkbox).toHaveAttribute('aria-invalid', 'true'));
    });
  });

  describe('a11y — axe', () => {
    it('has no violations — base', async () => {
      const { container } = render(<CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with selected values', async () => {
      const { container } = render(
        <CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} value={['news']} onChange={() => {}} />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with hint', async () => {
      const { container } = render(
        <CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} hint="Pick any" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with error', async () => {
      const { container } = render(
        <CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} error="Pick one" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — disabled', async () => {
      const { container } = render(
        <CheckboxGroup legend="Topics" name="topics" options={TOPIC_OPTIONS} defaultValue={['news']} disabled />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
