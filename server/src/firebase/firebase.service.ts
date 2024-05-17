// firebase.service.ts
import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private db: admin.database.Database;

  constructor(@Inject('FIREBASE_ADMIN') private readonly admin: admin.app.App) {
    this.db = this.admin.database();
  }

  async setValue(path: string, value: any): Promise<void> {
    const ref = this.db.ref(path);
    await ref.set(value);
  }

  async getValue(path: string): Promise<any> {
    const ref = this.db.ref(path);
    const snapshot = await ref.once('value');
    return snapshot.val();
  }
}

// import { Injectable } from '@nestjs/common';
// import { initializeApp, getApp, getApps } from 'firebase/app';
// import { getDatabase } from 'firebase/database';
// import { firebaseConfig } from './firebase.config';
// import firebase from 'firebase/compat/app';
// @Injectable()
// export class FirebaseService {
//   private database: firebase.database.Database;
//   constructor() {
//     let app;
//     if (getApps().length === 0) {
//       app = initializeApp(firebaseConfig);
//     } else {
//       app = getApp();
//     }

//     const database = getDatabase(app);
//   }

//   getDatabase() {
//     return this.database;
//   }
// }
