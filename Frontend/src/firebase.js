import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpAiupq7yS2jyBiutAB1tiCVcUCeLYpO4",
  authDomain: "hostelhub-702df.firebaseapp.com",
  projectId: "hostelhub-702df",
  storageBucket: "hostelhub-702df.firebasestorage.app",
  messagingSenderId: "48583417794",
  appId: "1:48583417794:web:94c2c215c5d5ebf51a405b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
