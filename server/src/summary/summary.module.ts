import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { summaryProviders } from './summary.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SummaryController],
  providers: [...summaryProviders, SummaryService],
})
export class SummaryModule {}
