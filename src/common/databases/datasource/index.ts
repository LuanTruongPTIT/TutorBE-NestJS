import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

export const typeormConfig: DataSourceOptions & TypeOrmModuleOptions = {
  entities: [__dirname + '/**/*.entity.js'],
  // migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: 3306,
  username: process.env.MYSQL_USERNAME || 'luantruong',
  password: process.env.MYSQL_PASSWORD || '0335219807',
  database: process.env.MYSQL_DATABASE || 'group15-tutor',
  migrationsRun: false,
  logging: false,
  // namingStrategy: new SnakeNamingStrategy(),
  // migrationsTransactionMode: 'each',
  synchronize: true,
};
const datasource = new DataSource(typeormConfig);

export default datasource;
