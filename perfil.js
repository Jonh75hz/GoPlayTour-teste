import { auth, database } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { loadAllProgressFromFirebase } from './progress-manager.js';

// Oculta o conteúdo da página para evitar o "pisca-pisca"
document.documentElement.style.visibility = 'hidden';

onAuthStateChanged(auth, user => {
    if (user) {
        // Usuário está logado, vamos configurar a página.
        const userId = user.uid;
        const userRef = ref(database, 'users/' + userId);

        const fileInput = document.getElementById('fileInput');
        const profilePic = document.getElementById('profilePic');
        const profilePicPlaceholder = document.getElementById('profilePicPlaceholder');
        const logoutButton = document.getElementById('logout-button');
        const userNameElem = document.getElementById('userName');
        const borderSelect = document.getElementById('border-select');
        const settingsIcon = document.getElementById('settingsIcon');
        const borderSelectionContainer = document.getElementById('borderSelectionContainer');

        // Mostra/esconde a seleção de borda
        settingsIcon.addEventListener('click', () => {
            borderSelectionContainer.classList.toggle('show');
        });

        // Carrega a foto de perfil e a borda do localStorage
        const savedProfilePic = localStorage.getItem('profilePic');
        if (savedProfilePic) {
            profilePic.src = savedProfilePic;
            profilePic.style.display = 'block';
            profilePicPlaceholder.style.display = 'none';
        }

        const savedBorder = localStorage.getItem('profilePicBorder');
        if (savedBorder) {
            profilePic.className = 'profile-pic'; // Reseta as classes
            if (savedBorder !== 'none') {
                profilePic.classList.add(`border-${savedBorder}`);
            }
            borderSelect.value = savedBorder;
        }

        const handleData = async (snapshot) => {
            const data = snapshot.val();
            if (data && data.name) {
                userNameElem.textContent = data.name;
            } else {
                userNameElem.textContent = "Perfil não encontrado";
                userNameElem.style.color = "red";
            }

            const allProgress = await loadAllProgressFromFirebase();
            let totalPoints = 0;
            if (allProgress) {
                for (const challengeId in allProgress) {
                    if (allProgress[challengeId].pontosGanhos) {
                        totalPoints += allProgress[challengeId].pontosGanhos;
                    }
                }
            }

            document.getElementById('userPoints').textContent = totalPoints;
            const progress = 48; // This seems to be a hardcoded value, I will leave it for now
            document.getElementById('progressPercentage').textContent = `${progress}%`;
            const progressCircle = document.querySelector('.progress-circle');
            progressCircle.style.setProperty('--progress', progress);
        };

        const handleError = (error) => {
            console.error("Falha ao ler o banco de dados: ", error);
            userNameElem.textContent = "Erro ao carregar perfil";
            userNameElem.style.color = "red";
        };

        onValue(userRef, handleData, handleError);

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const base64String = event.target.result;
                    localStorage.setItem('profilePic', base64String);
                    profilePic.src = base64String;
                    profilePic.style.display = 'block';
                    profilePicPlaceholder.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });

        borderSelect.addEventListener('change', (e) => {
            const selectedBorder = e.target.value;
            localStorage.setItem('profilePicBorder', selectedBorder);
            profilePic.className = 'profile-pic'; // Reseta as classes
            if (selectedBorder !== 'none') {
                profilePic.classList.add(`border-${selectedBorder}`);
            }
        });

        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                signOut(auth).then(() => {
                    window.location.href = 'index.html';
                }).catch((error) => {
                    console.error('Erro no logout:', error);
                });
            });
        }
        
        // Agora que tudo está configurado, torna a página visível
        document.documentElement.style.visibility = 'visible';

    } else {
        // Usuário não está logado. Redireciona para a página de login.
        // A página ainda está invisível, então o usuário não verá nada antes do redirecionamento.
        window.location.replace("login.html");
    }
});
