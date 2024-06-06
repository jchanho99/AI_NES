import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { FirebaseAdminModule } from 'src/firebase/firebase.module';
@Module({
  imports: [
    FirebaseAdminModule,
    HttpModule,
    JwtModule.registerAsync({
      inject: [ConfigService], // ConfigService 주입
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // 'JWT_CONSTANTS' 대신 정확한 환경 변수 이름 사용
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
