const challengeCards = document.querySelectorAll('.challenge-card');
const dots = document.querySelectorAll('.carousel-dots .dot');
const prevArrow = document.querySelector('.carousel-arrow.prev');
const nextArrow = document.querySelector('.carousel-arrow.next');

const totalPages = 2;
let currentPage = 0;

function showPage(page) {
    // Oculta todos os cards removendo a classe 'active'
    challengeCards.forEach(card => card.classList.remove('active'));

    // Determina quais cards exibir
    const startIndex = page === 0 ? 0 : 3;
    const endIndex = page === 0 ? 3 : challengeCards.length;

    for (let i = startIndex; i < endIndex; i++) {
        if (challengeCards[i]) {
            challengeCards[i].classList.add('active');
        }
    }

    // Atualiza os pontos de navegação
    dots.forEach((dot, index) => {
        if (index === page) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Event Listeners para as setas
nextArrow.addEventListener('click', () => {
    currentPage = (currentPage + 1) % totalPages;
    showPage(currentPage);
});

prevArrow.addEventListener('click', () => {
    currentPage = (currentPage - 1 + totalPages) % totalPages;
    showPage(currentPage);
});

// Event listeners para os pontos de navegação
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showPage(index);
        currentPage = index; // Atualiza a página atual quando um ponto é clicado
    });
});

// Exibição inicial
showPage(0);
