import * as migration_20240825_130008 from './20240825_130008';

export const migrations = [
  {
    up: migration_20240825_130008.up,
    down: migration_20240825_130008.down,
    name: '20240825_130008'
  },
];
