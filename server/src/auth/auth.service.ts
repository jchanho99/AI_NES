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
  //1. 카카오 인가 코드 받기
  async getCode(): Promise<Observable<AxiosResponse<any, any>>> {
    const client_id = this.configService.get<string>('KAKAO_CLIENT_ID');
    const redirect_uri = `http://localhost:3000`;
    const api_url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=account_email,gender`;
    return this.httpService.get(api_url).pipe(map((response) => response.data));
  }
  //2. 인가코드로 카카오 토큰 발급
  async getToken(code: string): Promise<Observable<AxiosResponse<any, any>>> {
    const url = 'https://kauth.kakao.com/oauth/token?';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const qeury = {
      grant_type: 'authorization_code',
      client_id: this.configService.get<string>('KAKAO_CLIENT_ID'),
      redirect_uri: `http://localhost:3000`,
      code: code,
    };
    const params = new URLSearchParams(qeury).toString();
    return this.httpService
      .post(url, params, { headers })
      .pipe(map((response) => response.data));
  }
  //3. 카카오 로그인처리 + 사용자 정보 가져오기
  //사용자 정보 반환과 함께, 로그인 처리 -> jwtToken도 동시에 발급
  async getUser(token: string): Promise<Observable<AxiosResponse<any, any>>> {
    const url = 'https://kapi.kakao.com/v2/user/me?property_keys=["kakao_account.email","kakao_account.gender"]';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    // const query = {
    //   property_keys: `['kakao_account.gender','kakao_accout.email]`,
    // };
    // const params = new URLSearchParams(query).toString();
    const payload = { id: "idid" };
    const access_token = this.jwtService.sign(payload);
    console.log(access_token);

    return this.httpService
      .get(url ,{ headers })
      .pipe(map((response) => response.data));
  }
  //4. 카카오 로그아웃
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
