import { DEFINITIONS as CORE_DEFINITIONS } from '../Wrapper';

import DatabaseService from '../Service/Database.service';

// Define Definitions
const definitions = {
  AUTH0: 'AUTH0',
  DATABASE: 'DATABASE',
};

const coreDefinitions = CORE_DEFINITIONS;
export const DEFINITIONS = { ...definitions, ...coreDefinitions };

// Define Dependencies
export const DEPENDENCIES = {
  [DEFINITIONS.DATABASE]: DatabaseService,
};


// Define Tables
export const TABLE_DEFINITIONS = {
  STATION_TABLE: 'STATION_TABLE',
  SENSOR_TABLE: 'SENSOR_TABLE',
  PLOT_TABLE: 'PLOT_TABLE',
  USER_TABLE: 'USER_TABLE',
  VARIETY_TABLE: 'VARIETY_TABLE',
  CHILD_TABLE: 'CHILD_TABLE',
  AGE_TABLE: 'AGE_TABLE',
};

export const TABLES = {
  [TABLE_DEFINITIONS.STATION_TABLE]: typeof process.env.STATION_TABLE !== 'undefined' ? process.env.STATION_TABLE : '',
  [TABLE_DEFINITIONS.SENSOR_TABLE]: typeof process.env.SENSOR_TABLE !== 'undefined' ? process.env.SENSOR_TABLE : '',
  [TABLE_DEFINITIONS.PLOT_TABLE]: typeof process.env.PLOT_TABLE !== 'undefined' ? process.env.PLOT_TABLE : '',
  [TABLE_DEFINITIONS.USER_TABLE]: typeof process.env.USER_TABLE !== 'undefined' ? process.env.USER_TABLE : '',
  [TABLE_DEFINITIONS.VARIETY_TABLE]: typeof process.env.VARIETY_TABLE !== 'undefined' ? process.env.VARIETY_TABLE : '',
  [TABLE_DEFINITIONS.CHILD_TABLE]: typeof process.env.CHILD_TABLE !== 'undefined' ? process.env.CHILD_TABLE : '',
  [TABLE_DEFINITIONS.AGE_TABLE]: typeof process.env.AGE_TABLE !== 'undefined' ? process.env.AGE_TABLE : '',
};


// Define Configuration
export default {
  DEFINITIONS,
  DEPENDENCIES,
  TABLE_DEFINITIONS,
  TABLES
};
