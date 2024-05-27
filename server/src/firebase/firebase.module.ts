// firebase-admin.module.ts
import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseController } from './firebase.controller';
import { FirebaseService } from './firebase.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [FirebaseController],
  providers: [
    FirebaseService,
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: async (configService: ConfigService) => {
        const serviceAccount = configService.get<string>(
          'FIREBASE_SERVICE_ACCOUNT_PATH',
        );
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: configService.get<string>('FIREBASE_DATABASE_URL'),
        });
        return admin;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseAdminModule {}
