import { Controller, Get } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('3')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  getHello(): string {
    return this.summaryService.getHello();
  }
}
