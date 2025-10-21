import { auth, database } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const profilePic = document.getElementById('profilePic');
    const profilePicPlaceholder = document.getElementById('profilePicPlaceholder');

    onAuthStateChanged(auth, user => {
        if (user) {
            const userId = user.uid;
            const userRef = ref(database, 'users/' + userId);
            const storage = getStorage();

            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    document.getElementById('userName').textContent = data.name || 'Nome não encontrado';
                    if (data.profilePic) {
                        profilePic.src = data.profilePic;
                        profilePic.style.display = 'block';
                        profilePicPlaceholder.style.display = 'none';
                    } else {
                        profilePic.style.display = 'none';
                        profilePicPlaceholder.style.display = 'flex';
                    }
                    document.getElementById('userPoints').textContent = '120';
                    const progress = 48;
                    document.getElementById('progressPercentage').textContent = `${progress}%`;
                    const progressCircle = document.querySelector('.progress-circle');
                    progressCircle.style.setProperty('--progress', progress);
                }
            });

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const imageRef = storageRef(storage, `profile_images/${userId}/${file.name}`);
                    uploadBytes(imageRef, file).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((downloadURL) => {
                            update(userRef, { profilePic: downloadURL });
                            profilePic.src = downloadURL;
                            profilePic.style.display = 'block';
                            profilePicPlaceholder.style.display = 'none';
                        }).catch(error => {
                            console.error("Erro ao obter URL de download:", error);
                        });
                    }).catch(error => {
                        console.error("Erro no upload do arquivo:", error);
                    });
                }
            });

        } else {
            window.location.href = 'login.html';
        }
    });

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth).then(() => {
                window.location.href = 'index.html';
            }).catch((error) => {
                console.error('Logout error:', error);
            });
        });
    }
});