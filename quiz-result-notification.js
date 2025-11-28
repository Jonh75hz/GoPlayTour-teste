// Função para mostrar notificação de resultado (acerto/erro)
export function showResultNotification(isCorrect, message = null) {
    const notification = document.createElement('div');
    notification.className = `result-notification ${isCorrect ? 'success' : 'error'}`;
    
    if (isCorrect) {
        notification.innerHTML = message || '✓ Resposta Correta!<br>+100 Pontos';
    } else {
        notification.innerHTML = message || '✗ Resposta Incorreta<br>Tente Novamente!';
    }
    
    // Injetar CSS se não estiver carregado
    if (!document.querySelector('link[href*="quiz-result.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'quiz-result.css';
        document.head.appendChild(link);
    }
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos (duração total da animação)
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
