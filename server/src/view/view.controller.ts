import { Controller, Get } from '@nestjs/common';
import { ViewService } from './view.service';
import { UpdateData } from '../database/entities/update.entity';
@Controller(`api`)
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Get(`view`)
  findAll(): Promise<UpdateData[]> {
    return this.viewService.findAll();
  }
}
