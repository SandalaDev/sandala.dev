import * as migration_20251005_234018 from './20251005_234018';
import * as migration_20251007_010301 from './20251007_010301';

export const migrations = [
  {
    up: migration_20251005_234018.up,
    down: migration_20251005_234018.down,
    name: '20251005_234018',
  },
  {
    up: migration_20251007_010301.up,
    down: migration_20251007_010301.down,
    name: '20251007_010301'
  },
];
