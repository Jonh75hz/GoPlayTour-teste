document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Para mudar o ícone

            // Trava o scroll do corpo da página quando o menu está ativo
            if (mainNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
                menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Ícone de "X"
            } else {
                body.style.overflow = 'auto';
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Ícone de "hamburger"
            }
        });
    }
});
