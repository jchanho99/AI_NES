import { Module } from '@nestjs/common';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';
import { viewProviders } from './view.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ViewController],
  providers: [...viewProviders, ViewService],
})
export class ViewModule {}
