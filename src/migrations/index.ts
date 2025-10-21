import * as migration_20251020_161558 from './20251020_161558';
import * as migration_20251021_143206 from './20251021_143206';

export const migrations = [
  {
    up: migration_20251020_161558.up,
    down: migration_20251020_161558.down,
    name: '20251020_161558',
  },
  {
    up: migration_20251021_143206.up,
    down: migration_20251021_143206.down,
    name: '20251021_143206'
  },
];
