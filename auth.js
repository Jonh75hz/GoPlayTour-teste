import { auth } from './firebase-config.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

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