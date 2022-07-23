import { getApps } from 'firebase-admin/app';

var admin = require('firebase-admin');

var serviceAccount = require('./firebase-keys.json');

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firestore = admin.firestore();
