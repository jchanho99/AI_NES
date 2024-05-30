// app.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('api')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('setData')
  async setData(@Body() body: any): Promise<void> {
    await this.firebaseService.setValue('/path', body);
  }

  @Get('getData')
  async getData(): Promise<any> {
    return this.firebaseService.getValue(
      '/2024년05월22일 , 10시26분56초 네이버 기사 헤드라인',
    );
  }

  @Post('signin')
  async signin(@Body() data: { token: string }): Promise<any> {
    return this.firebaseService.signin(data.token);
  }
}
