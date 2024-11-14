document.getElementById('loginFormSeg').addEventListener('submit', function (event) {
    event.preventDefault() //evita o recarregamento
    const usuario = document.getElementById('usuarioSeg').value
    const senha = document.getElementById('senhaSeg').value
    if (btoa(usuario) === 'YWRtaW4=' && btoa(senha) === 'MTIzNA==') {
        window.location.href = 'alunos.html'//abre a página
    } else {
        document.getElementById('error-message').textContent = '❌Usuário ou senha informados estão incorretos!'
    }
})

// Seleciona o botão de voltar
const btnVoltar = document.querySelector('.btn-voltar');
// Verifica se há uma página anterior no histórico
if (window.history.length > 1) {
    // Se houver, adiciona a ação de voltar
    btnVoltar.addEventListener('click', function() {
        window.history.back();
    });
} else {
    // Se não houver, redireciona para a página inicial ou outra página
    btnVoltar.addEventListener('click', function() {
        window.location.href = 'index.html';  // Redireciona para a página inicial
    });
}