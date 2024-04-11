import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

export const typeormConfig: DataSourceOptions & TypeOrmModuleOptions = {
  entities: [__dirname + '/**/*.entity.js'],
  // migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'luantruong',
  password: '0335219807',
  database: 'group15-tutor',
  migrationsRun: false,
  logging: false,
  // namingStrategy: new SnakeNamingStrategy(),
  // migrationsTransactionMode: 'each',
  synchronize: false,
};
const datasource = new DataSource(typeormConfig);

export default datasource;
