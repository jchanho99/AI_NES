import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
// import { LocalAuthGuard } from './local-auth.guard';
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

  @Post('signup')
  signUp(
    @Body()
    data: {
      id: string;
      nickname: string;
      password: string;
      pwcheck: string;
    },
  ): any {
    return this.authService.saveUserInformation(
      data.id,
      data.nickname,
      data.password,
    );
  }
  //발견된 버그
  //db에 저장시 0으로 시작하는 경우 0 다음문자열부터 저장됨.
  @Post('idvalidcheck')
  idValidCheck(@Body() data: { id: string }): any {
    console.log(data.id);
    return this.authService.idValidCheck(data.id);
  }
  @Post('login')
  login(@Body() data: { id: string; password: string }): any {
    return this.authService.login(data.id, data.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Body() data: { token: any }): any {
    return this.authService.logout(data.token);
  }
}
