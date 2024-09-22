import * as migration_20240825_130008 from './20240825_130008';
import * as migration_20240918_082250 from './20240918_082250';
import * as migration_20240922_132921 from './20240922_132921';

export const migrations = [
  {
    up: migration_20240825_130008.up,
    down: migration_20240825_130008.down,
    name: '20240825_130008',
  },
  {
    up: migration_20240918_082250.up,
    down: migration_20240918_082250.down,
    name: '20240918_082250',
  },
  {
    up: migration_20240922_132921.up,
    down: migration_20240922_132921.down,
    name: '20240922_132921'
  },
];
