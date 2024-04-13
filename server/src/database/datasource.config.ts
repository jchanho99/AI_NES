// datasource.config.ts
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'oss',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});
