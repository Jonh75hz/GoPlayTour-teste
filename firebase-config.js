import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKureWtIWTNWhznUJFf7B2ZlcuyQrBiU4",
  authDomain: "goplaytour-3363c.firebaseapp.com",
  projectId: "goplaytour-3363c",
  storageBucket: "goplaytour-3363c.firebasestorage.app",
  messagingSenderId: "625428505391",
  appId: "1:625428505391:web:eb05e2c26a4a3065f737da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };