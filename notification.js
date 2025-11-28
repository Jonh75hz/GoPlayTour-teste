export function showUnlockNotification(challengeName = 'desafio', xpAmount = 40) {
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.innerHTML = `Um novo ${challengeName} foi desbloqueado<br>+ ${xpAmount} XP`;
    
    // Injetar CSS se não estiver carregado
    if (!document.querySelector('link[href*="notification.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'notification.css';
        document.head.appendChild(link);
    }
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos (duração total da animação)
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
