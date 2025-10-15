document.addEventListener('DOMContentLoaded', () => {
    const riddleInput = document.getElementById('riddleInput');
    const sendAnswerBtn = document.getElementById('sendAnswerBtn');
    const showTipBtn = document.getElementById('showTipBtn');
    const taskRiddle = document.getElementById('taskRiddle');
    const feedbackMessage = document.getElementById('feedbackMessage');

    // Resposta correta (em minúsculas e sem acentos para simplificar a verificação)
    const correctAnswer = 'cachoeira';
    let tipShown = false;

    // Função para mostrar feedback ao usuário
    function showFeedback(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `feedback-message ${type}`;
        feedbackMessage.style.display = 'block';
    }

    // Função para normalizar a resposta do usuário
    function normalizeAnswer(answer) {
        return answer.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    }

    // Lógica de Enviar Resposta
    sendAnswerBtn.addEventListener('click', () => {
        const userAnswer = normalizeAnswer(riddleInput.value);

        if (userAnswer === '') {
            showFeedback('Por favor, digite uma resposta.', 'error');
            return;
        }

        if (userAnswer === correctAnswer) {
            showFeedback('Parabéns! Charada resolvida. Nova pista desbloqueada!', 'success');
            taskRiddle.checked = true;
            // Desabilita a charada após a resolução
            riddleInput.disabled = true;
            sendAnswerBtn.disabled = true;
            showTipBtn.disabled = true;

            // Aqui você pode adicionar a lógica para avançar no jogo, como liberar o próximo desafio.
            
        } else {
            showFeedback('Resposta incorreta. Tente novamente ou peça uma dica.', 'error');
        }
    });

    // Lógica de Mostrar Dica
    showTipBtn.addEventListener('click', () => {
        if (!tipShown) {
            alert('Dica: Pense no nome do local onde você está! É um fenômeno natural.');
            tipShown = true;
            showTipBtn.textContent = 'Dica Mostrada';
            showTipBtn.disabled = true;
        }
    });
});