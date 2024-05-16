// some.controller.ts
import { Controller, Get } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('example')
export class FirebaseController {
  constructor(private firebaseService: FirebaseService) {}

  @Get('data')
  async getData() {
    return await this.firebaseService.getDocuments('your-collection-path');
  }
}
