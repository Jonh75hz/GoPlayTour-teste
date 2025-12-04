document.addEventListener('DOMContentLoaded', () => {
    const chapterCards = document.querySelectorAll('.capitulo-card');

    // Mock de progresso do usuário (ex: capítulos completados)
    // No futuro, isso viria do Firebase
    const userProgress = {
        unlockedChapters: 5 // Exemplo: Desbloqueado até o capítulo 5
    };

    chapterCards.forEach((card, index) => {
        const chapterNumber = index + 1;

        // Adiciona a classe 'unlocked' com base no progresso
        if (chapterNumber <= userProgress.unlockedChapters) {
            card.classList.add('unlocked');
        } else {
            card.classList.remove('unlocked');
        }

        card.addEventListener('click', (e) => {
            // Permite o clique apenas se o capítulo estiver desbloqueado
            if (!card.classList.contains('unlocked')) {
                e.preventDefault();
                e.stopPropagation();
                // Opcional: mostrar uma mensagem de que o capítulo está bloqueado
                alert('Você precisa completar os capítulos anteriores primeiro!');
            } else {
                // O redirecionamento já está no onclick do HTML, mas pode ser movido para cá
                // const chapterFile = `capitulo_${chapterNumber}.html`;
                // window.location.href = chapterFile;
            }
        });
    });
});
