import type { BarChartSeries } from '../../components/BarChart/BarChart';
import type { DonutSegment } from '../../components/DonutChart/DonutChart';

export type Page = 'dashboard' | 'users' | 'settings';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

export const USERS: User[] = [
  { id: 1,  name: 'Alice Johnson',  email: 'alice@acme.com',   role: 'Admin',  status: 'active',   joined: '2023-01-15' },
  { id: 2,  name: 'Charles Davis',  email: 'charles@acme.com', role: 'Editor', status: 'active',   joined: '2023-03-22' },
  { id: 3,  name: 'Maria Chen',     email: 'maria@acme.com',   role: 'Viewer', status: 'inactive', joined: '2023-06-10' },
  { id: 4,  name: 'James Martin',   email: 'james@acme.com',   role: 'Editor', status: 'active',   joined: '2024-01-05' },
  { id: 5,  name: 'Laura Torres',   email: 'laura@acme.com',   role: 'Admin',  status: 'active',   joined: '2024-02-14' },
  { id: 6,  name: 'Ben Williams',   email: 'ben@acme.com',     role: 'Viewer', status: 'active',   joined: '2024-03-01' },
  { id: 7,  name: 'Sofia Patel',    email: 'sofia@acme.com',   role: 'Editor', status: 'inactive', joined: '2024-04-12' },
  { id: 8,  name: 'Noah Kim',       email: 'noah@acme.com',    role: 'Viewer', status: 'active',   joined: '2024-05-20' },
  { id: 9,  name: 'Olivia Brown',   email: 'olivia@acme.com',  role: 'Admin',  status: 'active',   joined: '2024-06-08' },
  { id: 10, name: 'Ethan White',    email: 'ethan@acme.com',   role: 'Editor', status: 'active',   joined: '2024-07-19' },
  { id: 11, name: 'Ava Garcia',     email: 'ava@acme.com',     role: 'Viewer', status: 'inactive', joined: '2024-08-03' },
  { id: 12, name: 'Liam Scott',     email: 'liam@acme.com',    role: 'Viewer', status: 'active',   joined: '2024-09-25' },
];

export const MONTHLY_REVENUE_SERIES: BarChartSeries[] = [
  {
    id: 'revenue',
    label: 'Monthly Revenue (€)',
    data: [
      { label: 'Jan', value: 4200 },
      { label: 'Feb', value: 3800 },
      { label: 'Mar', value: 5100 },
      { label: 'Apr', value: 4700 },
      { label: 'May', value: 6200 },
      { label: 'Jun', value: 5800 },
    ],
  },
];

export const USER_BY_PLAN_SEGMENTS: DonutSegment[] = [
  { label: 'Basic',      value: 1240 },
  { label: 'Pro',        value: 430  },
  { label: 'Enterprise', value: 52   },
];

export const ROLE_OPTIONS = [
  { value: 'viewer', label: 'Viewer' },
  { value: 'editor', label: 'Editor' },
  { value: 'admin',  label: 'Admin'  },
];

export const NOTIFICATION_OPTIONS = [
  { value: 'all',      label: 'All notifications' },
  { value: 'mentions', label: 'Mentions only'      },
  { value: 'none',     label: 'None'               },
];
