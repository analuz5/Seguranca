// Verifica se há uma página anterior no histórico
if (window.history.length > 1) {
    // Se houver, adiciona a ação de voltar
    btnVoltar.addEventListener('click', function() {
        window.history.back('categoriaAdm.html');
    });
} else {
    // Se não houver, redireciona para a página inicial ou outra página
    btnVoltar.addEventListener('click', function() {
        window.location.href = 'loginSeg.html';  // Redireciona para a página inicial
    });
}