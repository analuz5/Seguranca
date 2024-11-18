// Seleciona o botão de voltar
const btnVoltar = document.querySelector('.btn-voltar');
// Verifica se há uma página anterior no histórico
if (btnVoltar) {
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
} else {
    console.error("Botão de voltar não encontrado.");
}

const apiUrl = 'http://localhost:4000/api/'



function carregarAlunos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const alunosTable = document.getElementById('alunosTable').getElementsByTagName('tbody')[0]
            alunosTable.innerHTML = '' //limpa a tabela
            data.forEach(aluno => {
                const linha = alunosTable.insertRow()
                linha.innerHTML = `
            <td>${validaSeguranca.raAluno}</td>
            <td>${valudaSeguranca.placa}</td>
            <td>${seguranca.paginas}</td>
            <td>${seguranca.generos}</td>
            <td> 
            <button class="delete" onclick="excluirAluno('${seguranca.raAluno}')">🗑 Excluir</button>

            <button onclick="editarAluno('${seguranca.raAluno}')">📝 Editar </button>
            </td>
            `
            }) /* fecha o forEach */
        }) /* fecha o then */
        .catch(error => console.error(error.message))
} /* fecha a function */

//Carregar os livros ao carregar a página
window.onload = carregarAlunos()

function excluirAluno(raAluno) {
    // Primeiro mostra o diálogo de confirmação
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter esta ação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Se o usuário confirmou, faz a exclusão
            fetch(`${apiUrl}/${raAluno}`, { method: 'DELETE' })
                .then(() => {
                    Swal.fire(
                        'Excluído!',
                        'O aluno foi excluído com sucesso.',
                        'success'
                    )
                    carregarAlunos() // Atualiza a tabela
                })
                .catch(error => {
                    console.error('Error:', error)
                    Swal.fire(
                        'Erro!',
                        'Não foi possível excluir o aluno.',
                        'error'
                    )
                })
        }
    })
}

// Modificar o event listener do formulário para suportar tanto criação quanto edição
document.getElementById('alunoForm').addEventListener('submit', function(event) {
    event.preventDefault()
    

    
    const isEditMode = this.dataset.mode === 'edit'
    
    const validaSeguranca = {
        raAluno: document.getElementById('raAluno').value,
        placa: document.getElementById('titulo').value,
        contato: document.getElementById('tituloEs').value,
        validadeCarteirinha: document.getElementById('paginas').value,
        nomeAluno: document.getElementById('lancamento').value,
        generos: document.getElementById('generos').value.split(',').filter(g => g.trim() !== ''),
        curso: document.getElementById('editora').value,
    }

    const method = isEditMode ? 'PUT' : 'POST'
    const url = isEditMode ? `${apiUrl}/${this.dataset.raAlunonOriginal}` : apiUrl

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validaSeguranca)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                throw {
                    status: response.status,
                    errors: errData.errors
                }
            })
        }
        return response.json()
    })
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: isEditMode ? 'Livro atualizado com sucesso!' : 'Livro inserido com sucesso!',
            showConfirmButton: false,
            timer: 1500
        })
        carregarLivros()
        
        // Resetar o formulário e voltar ao modo de criação
        this.reset()
        this.dataset.mode = 'create'
        delete this.dataset.raAlunoOriginal
        
        // Reabilita o campo raAluno e restaura o texto do botão
        document.getElementById('raAluno').disabled = false
        this.querySelector('button[type="submit"]').textContent = '💾 Salvar Livro'
    })
    .catch(error => {
        if (error.status === 400 && error.errors) {
            const primeiroErro = error.errors[0]
            Swal.fire({
                icon: 'error',
                title: 'Erro de validação',
                text: primeiroErro.msg
            })
        } else {
            console.error('Erro ao salvar:', error)
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao salvar o livro'
            })
        }
    })
})
function editarLivro(raAluno) {
    // Busca os dados do livro específico
    fetch(`${apiUrl}/id/${raAluno}`)
        .then(response => response.json())
        .then(data => {
            // Pega o primeiro livro do array
            const livro = data[0]  // Esta é a mudança principal!
            
            if (!livro) {
                throw new Error('Livro não encontrado')
            }

            // Preenche o formulário com os dados atuais do livro
            document.getElementById('raAluno').value = seguranca.raAluno || ''
            document.getElementById('titulo').value = livro.titulo || ''
            document.getElementById('tituloEs').value = livro.tituloEs || ''
            document.getElementById('paginas').value = livro.paginas || ''
            document.getElementById('lancamento').value = livro.lancamento || ''
            document.getElementById('generos').value = Array.isArray(livro.generos) ? livro.generos.join(',') : ''
            document.getElementById('editora').value = livro.editora || ''
            document.getElementById('autores').value = Array.isArray(livro.autores) ? livro.autores.join(',') : ''
            
        

            // Modifica o formulário para modo de edição
            const form = document.getElementById('alunoForm')
            form.dataset.mode = 'edit'
            form.dataset.raAlunoOriginal = raAluno

            // Altera o texto do botão de submit
            const submitButton = form.querySelector('button[type="submit"]')
            if (submitButton) {
                submitButton.textContent = '📝 Atualizar Livro'
            }

            // Desabilita o campo raAluno durante edição
            document.getElementById('raAluno').disabled = true
            // Posiciona no primeiro campo editável
            document.getElementById('titulo').focus()
        })
        .catch(error => {
            console.error('Erro ao carregar dados do livro:', error)
            alert('❌ Erro ao carregar dados do livro. Por favor, tente novamente.')
        })
}