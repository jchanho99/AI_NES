import { Controller, Body, Post } from '@nestjs/common';
import { UpdateService } from './update.service';
import { UpdateData } from '../database/entities/update.entity';

@Controller('api')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Post('update')
  updateData(@Body() articlesData: UpdateData[]): Promise<UpdateData[]> {
    return Promise.all(
      articlesData.map((article) => this.updateService.updateData(article)),
    );
  }
}
