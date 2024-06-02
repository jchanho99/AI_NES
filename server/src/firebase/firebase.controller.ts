// app.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('api')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear(); // 년도 가져오기
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 가져오기, 월은 0부터 시작하므로 1을 더합니다.
    const day = date.getDate().toString().padStart(2, '0'); // 일 가져오기
  
    return `${year}_${month}_${day}`; // 문자열 형식으로 반환
  }

  @Post('setData')
  async setData(@Body() body: any): Promise<void> {
    await this.firebaseService.setValue('/path', body);
  }

  @Get('getData')
  async getData(): Promise<any> {
    return this.firebaseService.getValue(
      `/${this.getCurrentDate()}`,
    );
  }
}
