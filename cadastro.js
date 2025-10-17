import { auth, database } from './firebase-config.js';
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const registerNameInput = document.getElementById('registerName');
const registerEmailInput = document.getElementById('registerEmail');
const registerPasswordInput = document.getElementById('registerPassword');
const registerBtn = document.getElementById('registerBtn');
const messageDiv = document.getElementById('message');

registerBtn.addEventListener('click', () => {
    const name = registerNameInput.value;
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;

    console.log("Attempting to register with email:", email); // Added for debugging

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User created successfully:", user.uid); // Added for debugging

            // Update user profile
            updateProfile(user, {
                displayName: name
            }).then(() => {
                console.log("Profile updated successfully."); // Added for debugging

                // Save user data to the database
                set(ref(database, 'users/' + user.uid), {
                    name: name,
                    email: email
                })
                .then(() => {
                    console.log("User data saved to database successfully."); // Added for debugging
                    messageDiv.innerHTML = 'Usuário registrado com sucesso! Redirecionando para o login...';
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                })
                .catch((error) => {
                    console.error("Error saving user data:", error); // Added for debugging
                    messageDiv.innerHTML = 'Erro ao salvar dados do usuário: ' + error.message;
                    messageDiv.style.color = 'red';
                });
            }).catch((error) => {
                console.error("Error updating profile:", error); // Added for debugging
                messageDiv.innerHTML = 'Erro ao atualizar perfil do usuário: ' + error.message;
                messageDiv.style.color = 'red';
            });
        })
        .catch((error) => {
            console.error("Error creating user:", error); // Added for debugging
            const errorMessage = error.message;
            messageDiv.innerHTML = "Erro ao criar usuário: " + errorMessage; // Added more context to the message
            messageDiv.style.color = 'red';
        });
});