import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { authProviders } from './auth.providers';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';
// import { KakaoStrategy } from './kakao.strategy';
@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [...authProviders, AuthService, JwtStrategy],
})
export class AuthModule {}
