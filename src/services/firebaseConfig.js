import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCZe-e9mEvX3-9Rh6ENsy2-w5uumjNwZrE",
  authDomain: "neigbourhelp-75c1c.firebaseapp.com",
  projectId: "neigbourhelp-75c1c",
  storageBucket: "neigbourhelp-75c1c.firebasestorage.app",
  messagingSenderId: "844833593686",
  appId: "1:844833593686:web:a104ad2386793114bd9ef7",
  measurementId: "G-HCW5P6PGSR"
};

// Uygulamayı başlatırken hata almamak için kontrol yapıyoruz
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth ve Firestore referanslarını dışa aktaralım
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);