import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAivwUxV7fz80h3ltd17LnQ6dlnRBM8rtg",
  authDomain: "destination-be920.firebaseapp.com",
  projectId: "destination-be920",
  storageBucket: "destination-be920.firebasestorage.app",
  messagingSenderId: "192037934509",
  appId: "1:192037934509:web:b5653475cb3eff803a3d24",
  measurementId: "G-Q3J4NNCJ4W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable offline persistence and handle connection issues
try {
  // Enable offline persistence for Firestore
  enableNetwork(db).catch((error) => {
    console.warn('Failed to enable Firestore network:', error);
  });
} catch (error) {
  console.warn('Firestore offline persistence setup failed:', error);
}

// Add connection monitoring
let isOnline = navigator.onLine;

const handleOnline = () => {
  isOnline = true;
  enableNetwork(db).catch(console.warn);
};

const handleOffline = () => {
  isOnline = false;
  disableNetwork(db).catch(console.warn);
};

window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);

export { app, isOnline };