import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('getCode')
  async getCode() {
    return this.authService.getCode();
  }

  @Post('getToken')
  async getToken(@Body() data: { code: string }) {
    console.log(data);
    return this.authService.getToken(data.code);
  }
  @Post('getUser')
  async getUser(@Body() data: { token: string }) {
    return this.authService.getUser(data.token);
  }
  @Post('logout')
  async logout(@Body() data: { token: string }) {
    return this.authService.kakaoLogout(data.token);
  }

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
