import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateData } from '../database/entities/update.entity';

@Injectable()
export class ViewService {
  constructor(
    @Inject('UPDATE_REPOSITORY')
    private updateRepository: Repository<UpdateData>,
  ) {}
  async findAll(): Promise<UpdateData[]> {
    return this.updateRepository
      .createQueryBuilder('updateData')
      .select()
      .getMany();
  }
  async getOptions(option: string): Promise<any> {
    const articles = await this.updateRepository.findBy({ section: option });
    return { articles };
  }
}
