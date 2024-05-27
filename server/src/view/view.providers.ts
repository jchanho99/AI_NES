import { DataSource } from 'typeorm';
import { UpdateData } from '../database/entities/update.entity';

export const viewProviders = [
  {
    provide: 'UPDATE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UpdateData),
    inject: ['DATA_SOURCE'],
  },
];
