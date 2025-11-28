import { database } from './firebase-config.js';
import { ref, get } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

document.addEventListener('DOMContentLoaded', async () => {
    const rankingList = document.getElementById('rankingList');

    try {
        const usersRef = ref(database, 'users');
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
            const usersData = snapshot.val();
            const rankedUsers = [];

            for (const userId in usersData) {
                const user = usersData[userId];
                let totalPoints = 0;

                if (user.progress) {
                    for (const challengeId in user.progress) {
                        if (user.progress[challengeId].pontosGanhos) {
                            totalPoints += user.progress[challengeId].pontosGanhos;
                        }
                    }
                }

                rankedUsers.push({ name: user.name, points: totalPoints });
            }

            rankedUsers.sort((a, b) => b.points - a.points);

            rankedUsers.forEach((user, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span class="rank">${index + 1}</span>
                    <span class="name">${user.name}</span>
                    <span class="points">${user.points}</span>
                `;
                rankingList.appendChild(listItem);
            });
        } else {
            rankingList.innerHTML = '<li>Nenhum jogador encontrado.</li>';
        }
    } catch (error) {
        console.error('Erro ao carregar o ranking:', error);
        rankingList.innerHTML = '<li>Erro ao carregar o ranking.</li>';
    }
});
