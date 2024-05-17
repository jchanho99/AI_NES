// firebase-admin.module.ts
import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseController } from './firebase.controller';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [],
  controllers: [FirebaseController],
  providers: [
    FirebaseService,
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: async () => {
        const serviceAccount = require('./oss24-9d001-firebase-adminsdk-fozty-23b8ca9327.json'); // 경로 수정 필요
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: 'https://oss24-9d001-default-rtdb.firebaseio.com/', // Firebase 프로젝트 ID 수정 필요
        });
        return admin;
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseAdminModule {}
// import { Module } from '@nestjs/common';
// import { FirebaseService } from './firebase.service';
// import { FirebaseController } from './firebase.controller';

// @Module({
//   providers: [FirebaseService],
//   controllers: [FirebaseController],
//   exports: [FirebaseService],
// })
// export class FirebaseModule {}
