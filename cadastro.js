import { auth, database } from './firebase-config.js';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";

const registerNameInput = document.getElementById('registerName');
const registerEmailInput = document.getElementById('registerEmail');
const registerPasswordInput = document.getElementById('registerPassword');
const registerBtn = document.getElementById('registerBtn');
const messageDiv = document.getElementById('message');

registerBtn.addEventListener('click', () => {
    const name = registerNameInput.value;
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Update user profile
            updateProfile(user, {
                displayName: name
            }).then(() => {
                // Save user data to the database
                set(ref(database, 'users/' + user.uid), {
                    name: name,
                    email: email
                })
                .then(() => {
                    messageDiv.innerHTML = 'Usuário registrado com sucesso! Redirecionando para o login...';
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                })
                .catch((error) => {
                    messageDiv.innerHTML = 'Erro ao salvar dados do usuário: ' + error.message;
                    messageDiv.style.color = 'red';
                });
            }).catch((error) => {
                messageDiv.innerHTML = 'Erro ao atualizar perfil do usuário: ' + error.message;
                messageDiv.style.color = 'red';
            });
        })
        .catch((error) => {
            const errorMessage = error.message;
            messageDiv.innerHTML = errorMessage;
            messageDiv.style.color = 'red';
        });
});