const apiUrl = 'http://localhost:4000/api/seguranca'

function carregarInfos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const infosTable = document.getElementById('infosTable').getElementsByTagName('tbody')[0]
            infosTable.innerHTML = '' //limpa a tabela
            data.forEach(seguranca => {
                const linha = infosTable.insertRow()
                linha.innerHTML = `
            <td>${seguranca.RAaluno}</td>
            <td>${seguranca.placa}</td>
            <td>${seguranca.contato}</td>
            <td>${seguranca.validadeCarteirinha}</td>
            <td>${seguranca.nomeAluno}</td>
            <td>${seguranca.curso}</td>
            <td> 
            <button class="delete" onclick="excluirInfos('${seguranca.RAaluno}')">🗑 Excluir</button>

            <button onclick="editarInfos('${seguranca.RAaluno}')">📝 Editar </button>
            </td>
            `
            }) /* fecha o forEach */
        }) /* fecha o then */
        .catch(error => console.error(error.message))
} /* fecha a function */

//Carregar os livros ao carregar a página
window.onload = carregarInfos

function excluirInfos(RAaluno) {
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
            fetch(`${apiUrl}/${RAaluno}`, { method: 'DELETE' })
                .then(() => {
                    Swal.fire(
                        'Excluído!',
                        'O RA foi excluído com sucesso.',
                        'success'
                    )
                    carregarInfos() // Atualiza a tabela
                })
                .catch(error => {
                    console.error('Error:', error)
                    Swal.fire(
                        'Erro!',
                        'Não foi possível excluir o RA.',
                        'error'
                    )
                })
        }
    })
}

// Modificar o event listener do formulário para suportar tanto criação quanto edição
document.getElementById('alunoForm').addEventListener('submit', function (event) {
    event.preventDefault()


    const isEditMode = this.dataset.mode === 'edit'

    document.addEventListener('DOMContentLoaded', function () {
        const alunoForm = document.getElementById('alunoForm');
        alunoForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const isEditMode = this.dataset.mode === 'edit';

    const livro = {
        RAaluno: document.getElementById('raAluno').value,
        placa: document.getElementById('placa').value,
        contato: document.getElementById('contato').value,
        validadeCarteirinha: document.getElementById('validadeCarteirinha').value,
        nomeAluno: document.getElementById('nomeAluno').value,
        curso: document.getElementById('curso').value,
    }

    const method = isEditMode ? 'PUT' : 'POST'
    const url = isEditMode ? `${apiUrl}/${this.dataset.raOriginal}` : apiUrl

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(livro)
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
                text: isEditMode ? 'Infos atualizado com sucesso!' : 'Infos inserido com sucesso!',
                showConfirmButton: false,
                timer: 1500
            })
            carregarInfos()

            // Resetar o formulário e voltar ao modo de criação
            this.reset()
            this.dataset.mode = 'create'
            delete this.dataset.raOriginal

            // Reabilita o campo ISBN e restaura o texto do botão
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
});
function editarInfos(RAaluno) {
    // Busca os dados do livro específico
    fetch(`${apiUrl}/${RAaluno}`)  // Aqui, só usamos o RAaluno diretamente
        .then(response => response.json())
        .then(data => {
            // Pega o primeiro livro do array
            const informacoes = data[0]  // Esta é a mudança principal!

            if (!informacoes) {
                throw new Error('Livro não encontrado')
            }

            // Preenche o formulário com os dados atuais do livro
            document.getElementById('raAluno').value = informacoes.RAaluno || ''
            document.getElementById('placa').value = informacoes.placa || ''
            document.getElementById('contato').value = informacoes.contato || ''
            document.getElementById('validadeCarteirinha').value = informacoes.validadeCarteirinha || ''
            document.getElementById('nomeAluno').value = informacoes.nomeAluno || ''
            document.getElementById('curso').value = Array.isArray(informacoes.curso) ? livro.curso.join(',') : ''
            

            // Modifica o formulário para modo de edição
            const form = document.getElementById('alunoForm')
            form.dataset.mode = 'edit'
            form.dataset.raOriginal = RAaluno

            // Altera o texto do botão de submit
            const submitButton = form.querySelector('button[type="submit"]')
            if (submitButton) {
                submitButton.textContent = '📝 Atualizar Livro'
            }

            // Desabilita o campo RAaluno durante edição
            document.getElementById('raAluno').disabled = true
            // Posiciona no primeiro campo editável
            document.getElementById('placa').focus()
        })
        .catch(error => {
            console.error('Erro ao carregar dados do livro:', error)
            alert('❌ Erro ao carregar dados do livro. Por favor, tente novamente.')
        })
    }
