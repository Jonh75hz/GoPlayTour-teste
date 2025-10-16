import { auth } from './firebase-config.js';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = '/index.html';
  }
});