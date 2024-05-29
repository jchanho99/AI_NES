import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('getCode')
  async getCode() {
    return this.authService.getCode();
  }

  @Post('getToken')
  async getToken(@Body() auth_code: any) {
    console.log(auth_code);
    return this.authService.getToken(auth_code);
  }
  @Post('getUser')
  async getUser(@Body() data: { access_token: string }) {
    return this.authService.getUser(data.access_token);
  }
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body() data: { access_token: string }) {
    return this.authService.kakaoLogout(data.access_token);
  }
  @Post('signup')
  async signup(@Body() data: any) {
    return this.authService.signup(data);
  }
  @Post('login')
  async login(@Body() data: any) {
    return this.authService.login(data);
  }
}
