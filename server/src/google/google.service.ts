// auth.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleService {
  async validateUser(token: string): Promise<any> {
    // 사용자 인증 로직 구현
    
    return { token };
  }
}
