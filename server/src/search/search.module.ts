import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
