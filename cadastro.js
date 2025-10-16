const registerEmailInput = document.getElementById('registerEmail');
const registerPasswordInput = document.getElementById('registerPassword');
const registerBtn = document.getElementById('registerBtn');

const auth = firebase.auth();

registerBtn.addEventListener('click', () => {
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Usuário registrado com sucesso!');
            window.location.href = 'login.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});