import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateData } from '../database/entities/update.entity';

@Injectable()
export class UpdateService {
  constructor(
    @Inject('UPDATE_REPOSITORY')
    private updateRepository: Repository<UpdateData>,
  ) {}

  async updateData(articleData: UpdateData): Promise<UpdateData> {
    const { link, title, content, press, section } = articleData;
    console.log(articleData);
    const query = this.updateRepository.createQueryBuilder();
    const result = await query
      .insert()
      .into(UpdateData)
      .values({ link, title, content, press, section })
      .orUpdate({
        conflict_target: ['link'],
        overwrite: ['title', 'content', 'press', 'section'],
      })
      .execute();
    console.log(result);
    return this.updateRepository.findOneBy({ link });
  }
}
