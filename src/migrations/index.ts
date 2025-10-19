import * as migration_20251005_234018 from './20251005_234018';
import * as migration_20251007_010301 from './20251007_010301';
import * as migration_20251009_203745 from './20251009_203745';
import * as migration_20251009_214500 from './20251009_214500';
import * as migration_20251012_152201 from './20251012_152201';
import * as migration_20251012_152842 from './20251012_152842';
import * as migration_20251013_035855 from './20251013_035855';
import * as migration_20251013_161956 from './20251013_161956';
import * as migration_20251014_203000_change_project_date_year_type from './20251014_203000_change_project_date_year_type';
import * as migration_20251014_203000_versioning_table_fix from './20251014_203000_versioning_table_fix';
import * as migration_20251016_211343 from './20251016_211343';
import * as migration_20251017_154918 from './20251017_154918';
import * as migration_20251019_001608 from './20251019_001608';

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
    name: '20251013_161956',
  },
  {
    up: migration_20251014_203000_change_project_date_year_type.up,
    down: migration_20251014_203000_change_project_date_year_type.down,
    name: '20251014_203000_change_project_date_year_type',
  },
  {
    up: migration_20251014_203000_versioning_table_fix.up,
    down: migration_20251014_203000_versioning_table_fix.down,
    name: '20251014_203000_versioning_table_fix',
  },
  {
    up: migration_20251016_211343.up,
    down: migration_20251016_211343.down,
    name: '20251016_211343',
  },
  {
    up: migration_20251017_154918.up,
    down: migration_20251017_154918.down,
    name: '20251017_154918',
  },
  {
    up: migration_20251019_001608.up,
    down: migration_20251019_001608.down,
    name: '20251019_001608'
  },
];
