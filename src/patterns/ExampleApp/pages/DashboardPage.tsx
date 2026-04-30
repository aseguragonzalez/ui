import { useState } from 'react';
import { Heading } from '../../../primitives/Heading/Heading';
import { Text } from '../../../primitives/Text/Text';
import { Button } from '../../../primitives/Button/Button';
import { Badge } from '../../../primitives/Badge/Badge';
import { BarChart } from '../../../components/BarChart/BarChart';
import { DonutChart } from '../../../components/DonutChart/DonutChart';
import { Card } from '../../../components/Card/Card';
import { Banner } from '../../../components/Banner/Banner';
import { Carousel } from '../../../components/Carousel/Carousel';
import { KpiCard } from '../components/KpiCard';
import { USERS, MONTHLY_REVENUE_SERIES, USER_BY_PLAN_SEGMENTS } from '../mockData';

const totalUsers = USERS.length;
const activeUsers = USERS.filter((u) => u.status === 'active').length;

const PLANS = [
  {
    name: 'Basic',
    price: '€9',
    description: 'For individuals and small teams getting started.',
    features: ['Up to 5 users', '10 GB storage', 'Email support'],
    badge: null as null | string,
    badgeVariant: 'brand' as const,
    cta: 'Get started',
    variant: 'outlined' as const,
  },
  {
    name: 'Pro',
    price: '€29',
    description: 'For growing teams that need more power and flexibility.',
    features: ['Up to 25 users', '100 GB storage', 'Priority support', 'Analytics'],
    badge: 'Most popular',
    badgeVariant: 'brand' as const,
    cta: 'Start free trial',
    variant: 'elevated' as const,
  },
  {
    name: 'Enterprise',
    price: '€99',
    description: 'For large organisations with advanced needs.',
    features: ['Unlimited users', '1 TB storage', 'Dedicated support', 'SSO & SAML', 'Audit logs'],
    badge: null,
    badgeVariant: 'brand' as const,
    cta: 'Contact sales',
    variant: 'outlined' as const,
  },
];

export function DashboardPage() {
  const [bannerDismissed, setBannerDismissed] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-6)' }}>
      <Heading level={1} size="xl">Dashboard</Heading>

      {!bannerDismissed && (
        <Banner
          variant="promotional"
          headline="Enterprise Analytics is now available."
          description="Unlock advanced dashboards, custom reports, and team-level insights. Upgrade your plan to get started."
          actions={
            <Button size="sm" variant="outline">Upgrade now</Button>
          }
          onDismiss={() => setBannerDismissed(true)}
        />
      )}

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--ds-space-4)' }}>
        <KpiCard label="Total Users" value={String(totalUsers)} change="+2 this month" changeVariant="success" />
        <KpiCard label="Active Users" value={String(activeUsers)} change={`${Math.round((activeUsers / totalUsers) * 100)}% active`} changeVariant="brand" />
        <KpiCard label="Monthly Revenue" value="€29,800" change="+18%" changeVariant="success" />
      </div>

      {/* Charts row — using Card */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 'var(--ds-space-4)' }}>
        <Card variant="elevated" padding="md">
          <Card.Body>
            <BarChart title="Monthly Revenue" series={MONTHLY_REVENUE_SERIES} />
          </Card.Body>
        </Card>
        <Card variant="elevated" padding="md">
          <Card.Body>
            <DonutChart
              title="Users by plan"
              segments={USER_BY_PLAN_SEGMENTS}
              centerLabel="1,722"
              centerSubLabel="Total users"
            />
          </Card.Body>
        </Card>
      </div>

      {/* Plans section — Card showcase */}
      <div>
        <Heading level={2} size="lg" style={{ marginBottom: 'var(--ds-space-4)' }}>Plans</Heading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--ds-space-4)', alignItems: 'start' }}>
          {PLANS.map((plan) => (
            <Card key={plan.name} variant={plan.variant} padding="md">
              <Card.Header>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--ds-space-1)' }}>
                  <Heading level={3} size="md">{plan.name}</Heading>
                  {plan.badge && <Badge variant={plan.badgeVariant}>{plan.badge}</Badge>}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--ds-space-1)' }}>
                  <span style={{ fontSize: 'var(--ds-font-size-3xl)', fontWeight: 'var(--ds-font-weight-bold)', color: 'var(--ds-color-text-default)' }}>
                    {plan.price}
                  </span>
                  <Text size="sm" color="muted">/month</Text>
                </div>
                <Text size="sm" color="muted" style={{ marginTop: 'var(--ds-space-2)' }}>{plan.description}</Text>
              </Card.Header>
              <Card.Body>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-2)' }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-space-2)' }}>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="var(--ds-color-text-success)" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z" clipRule="evenodd" />
                      </svg>
                      <Text size="sm">{f}</Text>
                    </li>
                  ))}
                </ul>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" style={{ width: '100%' }}>{plan.cta}</Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>

      {/* Team highlights — Carousel showcase */}
      <div>
        <Heading level={2} size="lg" style={{ marginBottom: 'var(--ds-space-4)' }}>Team highlights</Heading>
        <Carousel aria-label="Team highlights" loop>
          {USERS.filter((u) => u.status === 'active').map((user) => (
            <Card key={user.id} variant="elevated" padding="md">
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Heading level={3} size="md">{user.name}</Heading>
                    <Badge variant="brand">{user.role}</Badge>
                  </div>
                  <Text size="sm" color="muted">{user.email}</Text>
                  <Text size="sm" color="muted">Joined {user.joined}</Text>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
