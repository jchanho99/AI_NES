import { Controller, Get, Body, Post } from '@nestjs/common';
import { ViewService } from './view.service';
import { UpdateData } from '../database/entities/update.entity';
@Controller(`1`)
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Get(`view`)
  findAll(): Promise<UpdateData[]> {
    return this.viewService.findAll();
  }

  @Post('getOptions')
  async getOptions(@Body() data: any) {
    if (data.options) {
      return this.viewService.getOptions(data.options);
    }
    // 기본적으로 정의되지 않은 조건에 대해 처리
    return { error: 'Invalid request data' };
  }
}
