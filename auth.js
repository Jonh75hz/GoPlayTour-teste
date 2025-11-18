import { auth } from './firebase-config.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      signOut(auth).then(() => {
        // Limpar localStorage dos desafios ao fazer logout
        localStorage.removeItem('unlocked_praca_iracema');
        localStorage.removeItem('unlocked_bica_ipu');
        localStorage.removeItem('unlocked_estacao');
        localStorage.removeItem('unlocked_casa_cultura');
        localStorage.removeItem('unlocked_igrejinha_ceu');
        
        // Limpar sessionStorage para forçar recarga do cache ao novo login
        sessionStorage.removeItem('lastLoggedInUserId');
        
        window.location.href = '/index.html';
      }).catch((error) => {
        console.error('Erro ao fazer logout:', error);
      });
    });
  }
});