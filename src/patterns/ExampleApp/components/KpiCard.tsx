import { Text } from '../../../primitives/Text/Text';
import { Badge } from '../../../primitives/Badge/Badge';
import type { BadgeVariant } from '../../../primitives/Badge/Badge';
import styles from './KpiCard.module.css';

interface KpiCardProps {
  label: string;
  value: string;
  change?: string;
  changeVariant?: BadgeVariant;
}

export function KpiCard({ label, value, change, changeVariant = 'success' }: KpiCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Text size="sm" color="muted">{label}</Text>
        {change && <Badge variant={changeVariant}>{change}</Badge>}
      </div>
      <p className={styles.value}>{value}</p>
    </div>
  );
}
