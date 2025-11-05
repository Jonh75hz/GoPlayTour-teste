document.addEventListener("DOMContentLoaded", () => {
    // Verifique se os elementos do carrossel existem antes de executar o código
    const prevButton = document.getElementById("prevChallenge");
    const nextButton = document.getElementById("nextChallenge");
    const challengeContainer = document.querySelector(".challenge-card-container");

    // Se os botões ou o container não existirem nesta página, não faça nada.
    if (!prevButton || !nextButton || !challengeContainer) {
        return;
    }

    const challenges = document.querySelectorAll(".challenge-card");
    const dots = document.querySelectorAll(".carousel-dots .dot");

    if (challenges.length === 0) {
        return;
    }

    let currentIndex = 0;
    const totalChallenges = challenges.length;
    const challengeWidth = challenges[0].offsetWidth + 20; // Largura do card + gap

    function updateCarousel() {
        const offset = -currentIndex * challengeWidth;
        challengeContainer.style.transform = `translateX(${offset}px)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalChallenges - 1;
        updateCarousel();
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex < totalChallenges - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Inicializa o carrossel
    updateCarousel();
});
