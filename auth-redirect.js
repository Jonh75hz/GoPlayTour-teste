import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const profileLink = document.querySelector('a[href="login.html"]');

    if (profileLink) {
        onAuthStateChanged(auth, user => {
            if (user) {
                profileLink.href = 'perfil.html';
            } else {
                profileLink.href = 'cadastro.html';
            }
        });
    }
});