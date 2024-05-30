// firebase.service.ts
import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';

@Injectable()
export class FirebaseService {
  private db: admin.database.Database;

  constructor(@Inject('FIREBASE_ADMIN') private readonly admin: admin.app.App) {
    this.db = this.admin.database();
  }
  async signin(id_token: any): Promise<any> {
    // Build Firebase credential with the Google ID token.
    const credential = GoogleAuthProvider.credential(id_token);

    // Sign in with credential from the Google user.
    const auth = getAuth();
    return signInWithCredential(auth, credential).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
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
