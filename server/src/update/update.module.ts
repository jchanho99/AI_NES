import { Module } from '@nestjs/common';
import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';
import { updateProviders } from './update.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UpdateController],
  providers: [...updateProviders, UpdateService],
})
export class UpdateModule {}
