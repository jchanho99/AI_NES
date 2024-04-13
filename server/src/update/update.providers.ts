import { DataSource } from 'typeorm';
import { UpdateData } from './update.entity';

export const updateProviders = [
  {
    //해당 provider형식으로 db의 테이블을 데이터소스로서 가져온다
    provide: 'UPDATE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UpdateData),
    inject: ['DATA_SOURCE'],
  },
];
