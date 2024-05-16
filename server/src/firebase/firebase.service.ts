import { Injectable } from '@nestjs/common';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { firebaseConfig } from './firebase.config';
import firebase from 'firebase/compat/app';
@Injectable()
export class FirebaseService {
  private database: firebase.database.Database;
  private firestore: firebase.firestore.Firestore;

  constructor() {
    let app;
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }

    this.database = getDatabase(app);
    this.firestore = getFirestore(app);
  }

  async addDocument(collectionPath: string, data: any): Promise<void> {
    const collection = this.getFirestore().collection(collectionPath);
    await collection.add(data);
  }

  async getDocuments(collectionPath: string): Promise<any[]> {
    const collection = this.getFirestore().collection(collectionPath);
    const snapshot = await collection.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  getDatabase() {
    return this.database;
  }

  getFirestore() {
    return this.firestore;
  }
}
