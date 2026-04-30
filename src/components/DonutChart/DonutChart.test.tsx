import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { DonutChart } from './DonutChart';

const segments = [
  { label: 'Basic', value: 600 },
  { label: 'Pro', value: 300 },
  { label: 'Enterprise', value: 100 },
];

describe('DonutChart', () => {
  it('renders an SVG with role="img"', () => {
    render(<DonutChart title="Users by plan" segments={segments} />);
    expect(screen.getByRole('img', { name: 'Users by plan' })).toBeInTheDocument();
  });

  it('renders a title element for accessibility', () => {
    const { container } = render(<DonutChart title="Users by plan" segments={segments} />);
    expect(container.querySelector('title')).toHaveTextContent('Users by plan');
  });

  it('renders one circle per segment plus track ring', () => {
    const { container } = render(<DonutChart title="Chart" segments={segments} />);
    // track ring + one per segment
    expect(container.querySelectorAll('circle')).toHaveLength(segments.length + 1);
  });

  it('renders a legend with all segment labels', () => {
    render(<DonutChart title="Users by plan" segments={segments} />);
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders center label when provided', () => {
    render(<DonutChart title="Chart" segments={segments} centerLabel="1,000" />);
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  it('renders empty state when no segments provided', () => {
    render(<DonutChart title="Empty" segments={[]} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  describe('a11y — axe', () => {
    it('has no violations', async () => {
      const { container } = render(<DonutChart title="Users by plan" segments={segments} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — with center label', async () => {
      const { container } = render(
        <DonutChart title="Users" segments={segments} centerLabel="1,000" centerSubLabel="Total" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
