import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody, ApiResponse, ApiExcludeEndpoint, ApiProduces, ApiConsumes} from '@nestjs/swagger'
import { KakaoAuthDto } from './dto/kakaoAuth.dto';
import { SignUpDto, GoogleSaveDto, LoginDto } from './dto/auth.dto';


@ApiTags('인증 요청 API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiExcludeEndpoint()
  @Get('getCode')
  async getCode() {
    return this.authService.getCode();
  }

  @ApiProduces('application/json')
  @ApiConsumes('application/json')
  @ApiOperation({ summary: '특정 조건에 따라 항목 가져오기' })
  @ApiBody({
    description: '카카오 인증 코드 포함',
    type: KakaoAuthDto,
  })
  @Post('getToken')
  async getToken(@Body() data: KakaoAuthDto) {
    return this.authService.getToken(data.auth_code);
  }

  @ApiProduces('application/json')
  @ApiConsumes('application/json')
  @ApiOperation({ summary: '인증 토큰으로 사용자 정보 가져오기' })
  @ApiBody({
    description: '카카오 엑세스 토큰 포함',
    type: KakaoAuthDto,
  })
  @Post('getUser')
  async getUser(@Body() data: KakaoAuthDto) {
    return this.authService.getUser(data.access_token);
  }

  @ApiBearerAuth()
  @ApiConsumes('application/json')
  @ApiOperation({ summary: '인증 토큰으로 로그아웃' })
  @ApiBody({
    description: '카카오 엑세스 토큰 포함',
    type: KakaoAuthDto,
  })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body() data:KakaoAuthDto) {
    return this.authService.kakaoLogout(data.access_token);
  }

  @ApiProduces('application/json')
  @ApiConsumes('application/json')
  @ApiOperation({ summary: '일반 사용자 회원가입' })
  @ApiBody({
    description: '회원가입에 필요한 정보',
    type: SignUpDto,
  })
  @Post('signup')
  async signup(@Body() data: SignUpDto) {
    return this.authService.signup(data);
  }

  @ApiProduces('application/json')
  @ApiConsumes('application/json')
  @ApiOperation({ summary: '일반 사용자 로그인' })
  @ApiBody({
    description: '정보 확인에 필요한 데이터',
    type: LoginDto,
  })
  @Post('login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @ApiProduces('application/json')
  @ApiConsumes('application/json')
  @ApiOperation({ summary: '구글 사용자 정보 저장 및 JWT 토큰 발급' })
  @ApiBody({
    description: '구글 사용자 정보와 토큰',
    type: GoogleSaveDto,
  })
  @Post('save')
  async userInformSave(@Body() data: GoogleSaveDto) {
    return this.authService.userInformSave(data);
  }
}
