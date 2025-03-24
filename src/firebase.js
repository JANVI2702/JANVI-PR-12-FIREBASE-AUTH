import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyWJU72lqt6QaWQ-lw74sTF3mERewnFws",
  authDomain: "fir-web-e3ad3.firebaseapp.com",
  projectId: "fir-web-e3ad3",
  storageBucket: "fir-web-e3ad3.firebasestorage.app",
  messagingSenderId: "959435740226",
  appId: "1:959435740226:web:f0c26281947f60a9e309db",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;