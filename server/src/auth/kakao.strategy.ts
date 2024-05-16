// kakao.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET, // 일부 앱에서는 필요하지 않을 수 있습니다.
      callbackURL: 'http://localhost:3000/auth/kakao/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { id, username, _json } = profile;
    const user = {
      kakaoId: id,
      email: _json.kakao_account.email,
      name: username,
      accessToken,
    };
    done(null, user);
  }
}
