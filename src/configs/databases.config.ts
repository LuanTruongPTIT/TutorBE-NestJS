import { registerAs } from '@nestjs/config';

export default registerAs(
  'databases',
  (): Record<string, any> => ({
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }),
);
