import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  //1. 인가 코드 받기
  async getCode(): Promise<Observable<AxiosResponse<any, any>>> {
    const client_id = this.configService.get<string>('KAKAO_CLIENT_ID');
    const redirect_uri = `http://localhost:3000/auth/getToken`;
    const api_url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    return this.httpService.get(api_url).pipe(map((response) => response.data));
  }
  //2. 토큰 발급
  async getToken(code: string): Promise<any> {
    const client_id = this.configService.get<string>('KAKAO_CLIENT_ID');
    const redirect_uri = `http://localhost:3000`;
    const options = {
      headers: {
        'Content-type': `application/x-www-form-urlencoded;charset=utf-8`,
      },
      body: {
        grant_type: 'authorization_code',
        client_id: this.configService.get<string>('KAKAO_CLIENT_ID'),
        redirect_uri: 'http://localhost:3000',
        code: code,
      },
    };
    const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`;
    const res = this.httpService
      .post(url, { headers: options.headers })
      .pipe(map((response) => response.data));
    if (!res) return 'hello world!';
    else return res;
  }
  //3. 로그인처리 + 사용자 정보 가져오기

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
