import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  //1. 인가 코드 받기
  //2. 토큰 발급
  //3. 로그인처리

  //Kakao 소셜 로그인
  async validateUser(userData: any): Promise<any> {
    // 사용자 데이터베이스에 저장하거나 업데이트
    return userData;
  }

  async kakaoLogin(user: any) {
    const payload = { email: user.email, sub: user.kakaoId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
