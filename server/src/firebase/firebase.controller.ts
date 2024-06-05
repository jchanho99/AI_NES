// app.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiBody, ApiConsumes, ApiExcludeEndpoint, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { FirebaseDto } from './fireabse.dto';

@ApiTags('데이터 끌어오기 요청 API')
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
  @ApiExcludeEndpoint()
  @Post('setData')
  async setData(@Body() body: any): Promise<void> {
    await this.firebaseService.setValue('/path', body);
  }

  @ApiProduces('application/json')
  @ApiOperation({ summary: '모든 항목 가져오기' })
  @Get('getData')
  async getData(): Promise<any> {
    return this.firebaseService.getValue(`/news_data/${this.getCurrentDate()}`);
  }

  @ApiProduces('application/json')
  @ApiConsumes('application/json')
  @ApiOperation({ summary: '특정 조건에 따라 항목 가져오기' })
  @ApiBody({
    description: '조건에 따른 끌어오기 요청',
    type: FirebaseDto,
  })
  @Post('getData')
  async postData(@Body() body: FirebaseDto): Promise<any> {
    if (!body.date) {
      return this.firebaseService.getValue(
        `/news_data/${this.getCurrentDate()}/${body.index}`,
      );
    } else {
      return this.firebaseService.getSpecificValue(body);
    }
  }
}
