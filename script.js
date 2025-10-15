document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // --- Lógica do Progresso Baseado em Capítulos --------------------
    // -----------------------------------------------------------------
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const continueLink = document.getElementById('continueLink'); // Referencia o novo link

    // Simulação de estado do jogo (pode vir de um backend real)
    const totalChapters = 5;
    const completedChapters = 2; // Simula 2 capítulos completos

    function calculateProgress() {
        const percentage = Math.round((completedChapters / totalChapters) * 100);
        
        // Aplica a animação (transição CSS)
        progressBar.style.width = percentage + '%'; 
        progressPercentage.textContent = percentage + '%';
        
        // Altera o texto do link quando a investigação estiver completa
        if (completedChapters >= totalChapters) {
            continueLink.textContent = 'Investigação Completa!';
            continueLink.style.backgroundColor = '#4CAF50'; // Cor verde de sucesso
        } else {
            continueLink.textContent = 'Prosseguir Investigação';
        }
    }

    // Inicializa a barra de progresso
    calculateProgress(); 

    // -----------------------------------------------------------------
    // --- Lógica de Animação de Desafios (Scroll Horizontal) ----------
    // -----------------------------------------------------------------
    const challengesList = document.querySelector('.challenges-list');
    const arrowRight = document.querySelector('.arrow-right');
    const arrowLeft = document.querySelector('.arrow-left');

    arrowRight.addEventListener('click', () => {
        challengesList.scrollBy({ left: 250, behavior: 'smooth' });
    });

    arrowLeft.addEventListener('click', () => {
        challengesList.scrollBy({ left: -250, behavior: 'smooth' });
    });
});