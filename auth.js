import { auth } from './firebase-config.js';
import { signOut } from 'firebase/auth';

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      signOut(auth).then(() => {
        window.location.href = '/index.html';
      }).catch((error) => {
        console.error('Erro ao fazer logout:', error);
      });
    });
  }
});