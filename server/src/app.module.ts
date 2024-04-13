import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UpdateModule } from './update/update.module';

@Module({
  imports: [DatabaseModule, UpdateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
