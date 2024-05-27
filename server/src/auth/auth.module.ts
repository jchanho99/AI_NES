import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { authProviders } from './auth.providers';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { FirebaseAdminModule } from 'src/firebase/firebase.module';
// import { KakaoStrategy } from './kakao.strategy';
@Module({
  imports: [
    FirebaseAdminModule,
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
