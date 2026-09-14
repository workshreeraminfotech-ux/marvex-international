import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Default project configuration for Marvex International
export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCajpspEvX7TZlQH1lS1Y_4daW1836YWa8",
  authDomain: "marvex-international.firebaseapp.com",
  projectId: "marvex-international",
  storageBucket: "marvex-international.firebasestorage.app",
  messagingSenderId: "480232597181",
  appId: "1:480232597181:web:99c24af7c436945199f9d4",
  measurementId: "G-50L4SPW9DS"
};

const STORAGE_KEY = 'marvex_firebase_custom_config';

export function getActiveFirebaseConfig() {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.projectId && parsed.apiKey) {
          return parsed;
        }
      }
    }
  } catch (e) {}

  // Check Vite environment variables
  if (import.meta.env.VITE_FIREBASE_PROJECT_ID && import.meta.env.VITE_FIREBASE_API_KEY) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
    };
  }

  // Built-in project default
  return DEFAULT_FIREBASE_CONFIG;
}

export function isFirebaseConfigured() {
  const cfg = getActiveFirebaseConfig();
  return Boolean(cfg && cfg.projectId && cfg.apiKey && !cfg.projectId.includes('your-project-id'));
}

export function saveCustomFirebaseConfig(configObj) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configObj));
      window.location.reload();
      return true;
    }
  } catch (e) {
    console.error('Failed to save firebase config:', e);
  }
  return false;
}

export function clearCustomFirebaseConfig() {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  } catch (e) {}
}

let app = null;
let db = null;
let storage = null;

try {
  const config = getActiveFirebaseConfig();
  if (config && config.projectId && config.apiKey) {
    app = getApps().length === 0 ? initializeApp(config) : getApp();
    db = getFirestore(app);
    try {
      storage = getStorage(app);
    } catch (sErr) {}
  }
} catch (err) {
  console.warn('Firebase initialization notice:', err);
}

export { app, db, storage };
