import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "firebase/auth";

const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const messageDiv = document.getElementById('message');

loginBtn.addEventListener('click', () => {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('User signed in:', user);
            window.location.href = 'capitulos.html'; // Redirect to a protected page
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            messageDiv.innerHTML = errorMessage;
        });
});