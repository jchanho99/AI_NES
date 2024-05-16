import { Injectable } from '@nestjs/common';

@Injectable()
export class SummaryService {
  getHello(): string {
    return 'Hello World!';
  } 
}
