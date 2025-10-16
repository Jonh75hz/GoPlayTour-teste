const registerEmailInput = document.getElementById('registerEmail');
const registerPasswordInput = document.getElementById('registerPassword');
const registerBtn = document.getElementById('registerBtn');

const auth = firebase.auth();
const database = firebase.database();

registerBtn.addEventListener('click', () => {
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Save user data to the database
            database.ref('users/' + user.uid).set({
                email: email
            })
            .then(() => {
                alert('Usuário registrado com sucesso!');
                window.location.href = 'login.html';
            })
            .catch((error) => {
                alert('Erro ao salvar dados do usuário: ' + error.message);
            });
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});