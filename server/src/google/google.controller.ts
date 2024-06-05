import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from './google.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async google(@Req() req) {
    // 요청은 Google으로 리다이렉트됩니다.
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req) {
    return this.googleService.validateUser(req.user);
  }
}
