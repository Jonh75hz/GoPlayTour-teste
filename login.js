import { auth } from './firebase-config.js';
import { onAuthStateChanged, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Adicionado para verificar se o usuário já está logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Se o usuário estiver logado, redireciona para a página de perfil
    window.location.href = 'perfil.html';
  }
  // Se não estiver logado, a página de login continua normalmente.
});

const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const messageDiv = document.getElementById('message');

const loginUser = async () => {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    if (!email || !password) {
        messageDiv.innerHTML = "Por favor, preencha todos os campos.";
        return;
    }

    try {
        // Manter o usuário conectado mesmo depois de fechar o navegador
        await setPersistence(auth, browserLocalPersistence);
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed in:', user);
        window.location.href = 'perfil.html';
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorCode, errorMessage);

        if (errorCode === 'auth/user-not-found') {
            messageDiv.innerHTML = "Usuário não encontrado. Verifique o e-mail e tente novamente.";
        } else if (errorCode === 'auth/wrong-password') {
            messageDiv.innerHTML = "Senha incorreta. Tente novamente.";
        } else {
            messageDiv.innerHTML = "Ocorreu um erro ao fazer login. Tente novamente mais tarde.";
        }
    }
};

loginBtn.addEventListener('click', loginUser);
