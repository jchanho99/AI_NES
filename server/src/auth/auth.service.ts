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
    const redirect_uri = `http://localhost:3000`;
    const api_url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    return this.httpService.get(api_url).pipe(map((response) => response.data));
  }
  //2. 토큰 발급
  async getToken(code: string): Promise<Observable<AxiosResponse<any, any>>> {
    const url = 'https://kauth.kakao.com/oauth/token?';
    const data = {
      grant_type: 'authorization_code',
      client_id: this.configService.get<string>('KAKAO_CLIENT_ID'),
      redirect_uri: `http://localhost:3000`,
      code: code,
    };
    const params = new URLSearchParams(data).toString();
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    return this.httpService
      .post(url, params, { headers })
      .pipe(map((response) => response.data));
  }
  //3. 로그인처리 + 사용자 정보 가져오기
  async getUser(token: string): Promise<Observable<AxiosResponse<any, any>>> {
    const url = 'https://kapi.kakao.com/v2/user/me';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    return this.httpService
      .post(url, { headers })
      .pipe(map((response) => response.data));
  }
  //4. 로그아웃
  async kakaoLogout(
    token: string,
  ): Promise<Observable<AxiosResponse<any, any>>> {
    const url = `https://kapi.kakao.com/v1/user/logout`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.httpService
      .post(url, { headers })
      .pipe(map((response) => response.data));
  }
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
