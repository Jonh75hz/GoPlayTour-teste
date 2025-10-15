document.addEventListener('DOMContentLoaded', () => {
    const startChapterBtn = document.getElementById('iniciarCapituloBtn');

    if (startChapterBtn) {
        startChapterBtn.addEventListener('click', () => {
            // Aqui você colocaria a lógica para INICIAR o capítulo/desafio,
            // por exemplo, carregando a primeira charada ou cena do jogo.
            
            alert('Você iniciou o Capítulo 1! Hora de encontrar a primeira pista na Bica do Ipu.');
            
            // Simulação de navegação para a tela de jogo/desafio
            // window.location.href = 'desafio_bica_ipu.html';
        });
    }
});