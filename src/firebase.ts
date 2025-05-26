import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVz9mRAeRVd8ygoV_VI9b6FylNhjV0j2U",
  authDomain: "mybestshoe-4e406.firebaseapp.com",
  projectId: "mybestshoe-4e406",
  storageBucket: "mybestshoe-4e406.firebasestorage.app",
  messagingSenderId: "610777144469",
  appId: "1:610777144469:web:a1d5746e665157a6820f9c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
