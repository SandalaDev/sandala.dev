import * as migration_20251005_234018 from './20251005_234018';
import * as migration_20251007_010301 from './20251007_010301';
import * as migration_20251009_203745 from './20251009_203745';
import * as migration_20251009_214500 from './20251009_214500';
import * as migration_20251012_152201 from './20251012_152201';
import * as migration_20251012_152842 from './20251012_152842';
import * as migration_20251013_035855 from './20251013_035855';
import * as migration_20251013_161956 from './20251013_161956';

export const migrations = [
  {
    up: migration_20251005_234018.up,
    down: migration_20251005_234018.down,
    name: '20251005_234018',
  },
  {
    up: migration_20251007_010301.up,
    down: migration_20251007_010301.down,
    name: '20251007_010301',
  },
  {
    up: migration_20251009_203745.up,
    down: migration_20251009_203745.down,
    name: '20251009_203745',
  },
  {
    up: migration_20251009_214500.up,
    down: migration_20251009_214500.down,
    name: '20251009_214500',
  },
  {
    up: migration_20251012_152201.up,
    down: migration_20251012_152201.down,
    name: '20251012_152201',
  },
  {
    up: migration_20251012_152842.up,
    down: migration_20251012_152842.down,
    name: '20251012_152842',
  },
  {
    up: migration_20251013_035855.up,
    down: migration_20251013_035855.down,
    name: '20251013_035855',
  },
  {
    up: migration_20251013_161956.up,
    down: migration_20251013_161956.down,
    name: '20251013_161956'
  },
];
