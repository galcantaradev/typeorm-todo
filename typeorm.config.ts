import { ConnectionOptions } from 'typeorm';

import { Todo } from './src/entities';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'typeorm',
  synchronize: true,
  logging: false,
  entities: [Todo]
} as ConnectionOptions;
