import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  private db: admin.database.Database;
  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
    private configService: ConfigService,
    @Inject('FIREBASE_ADMIN')
    private readonly admin: admin.app.App,
  ) {
    this.db = this.admin.database();
  }

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
      redirect_uri: `https://ai-nes.vercel.app/login/kakao`,
      code: code,
    };
    const params = new URLSearchParams(qeury).toString();
    return this.httpService
      .post(url, params, { headers })
      .pipe(map((response) => response.data));
  }
  //3. 카카오 로그인처리 + 사용자 정보 가져오기
  //사용자 정보 반환과 함께, 로그인 처리 -> jwtToken도 동시에 발급
  async getUser(token: string): Promise<any> {
    const ref = this.db.ref(`/users/kakao`);
    const url =
      'https://kapi.kakao.com/v2/user/me?property_keys=["kakao_account.email","kakao_account.gender"]';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    return this.httpService.get(url, { headers }).pipe(
      map(async (response) => {
        console.log(response);
        const payload = {
          type: 'kakao',
          id: response.data.id,
          email: response.data.kakao_account.email,
        };
        const jwt_token = this.jwtService.sign(payload); // JWT 생성
        //DB에 정보 저장
        const snapshot = await ref
          .orderByChild('id')
          .equalTo(response.data.id)
          .once('value');
        if (snapshot.exists()) {
          const userKey = Object.keys(snapshot.val())[0];
          const userRef = ref.child(userKey);
          await userRef.update({ jwt_token: jwt_token });
        } else {
          await ref.push({
            id: response.data.id,
            email: response.data.kakao_account.email,
            jwt_token: jwt_token,
          });
        }
        return { ...response.data, jwt_token }; // 기존 데이터에 access_token 추가하여 반환
      }),
    );
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

  //자체 회원가입
  async signup(data: any): Promise<any> {
    const ref = this.db.ref(`/users/normal`);
    //중복확인
    const snapshot = await ref
      .orderByChild('id')
      .equalTo(data.id)
      .once('value');
    if (snapshot.exists()) {
      throw new HttpException(
        'User with the same id already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }
    //비밀번호 해쉬 후 푸쉬
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltOrRounds);
    await ref.push({
      id: data.id,
      email: data.email,
      password: hashPassword,
    });
    return true;
  }

  //자체 로그인
  async login(data: any): Promise<any> {
    const ref = this.db.ref(`/users/normal`);
    const snapshot = await ref
      .orderByChild('id')
      .equalTo(data.id)
      .once('value');
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const userKey = Object.keys(userData)[0];
      const user = userData[userKey];
      const userRef = ref.child(userKey);
      const hashedPassword = user.password;
      const isMatch = bcrypt.compareSync(data.password, hashedPassword);
      if (isMatch) {
        const payload = {
          type: 'normal',
          id: data.id,
          email: data?.email,
        };
        const jwt_token = this.jwtService.sign(payload);
        await userRef.update({ jwt_token: jwt_token });
        return jwt_token;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  async userInformSave(data: any): Promise<any> {
    const ref = this.db.ref(`/users/google`);
    const payload = {
      type: 'google',
      id: data.id,
      email: data?.email,
    };
    const jwt_token = this.jwtService.sign(payload);
    try {
      const snapshot = await ref
        .orderByChild('id')
        .equalTo(data.id)
        .once('value');
      if (snapshot.exists()) {
        const userKey = Object.keys(snapshot.val())[0];
        const userRef = ref.child(userKey);
        await userRef.update({
          jwt_token: jwt_token,
          original_token: data.token,
        });
      } else {
        await ref.push({
          id: data.id,
          email: data.email,
          original_token: data.token,
          jwt_token: jwt_token,
        });
      }
      return jwt_token;
    } catch (error) {
      console.error('Error updating the user information:', error);
      throw new Error('Failed to save user information');
    }
  }
}
