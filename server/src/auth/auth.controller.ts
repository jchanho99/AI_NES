import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //카카오 소셜 로그인
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req: any) {
    // 카카오 로그인 페이지로 리다이렉트
    console.log(req);
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthRedirect(@Req() req) {
    // 카카오에서 콜백 받은 후 처리
    const user = await this.authService.validateUser(req.user);
    return this.authService.kakaoLogin(user);
  }
}
