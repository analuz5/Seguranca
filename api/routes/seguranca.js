import express from 'express'
/* Importar a biblioteca do MongoDB */
import { MongoClient } from 'mongodb'
/* Importar o express-validator */
import { check, validationResult } from 'express-validator'
 
/* Definido as variáveis de conexão */
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)
const dbName = 'seguranca'
const router = express.Router()
// Função para conectar no banco de dados
async function connectToDatabase() {
    try {
        await client.connect()
        console.log(`Conectado ao database ${dbName}`)
    } catch (err) {
        console.error(`Erro ao conectar: ${err.message}`)
    }
}
 
 
/* Definindo a rota /seguranca via método GET */
router.get('/', async (req, res) => {
    try {
        await connectToDatabase()
        const db = client.db(dbName)
        const alunos = db.collection('seguranca')
        let result = await seguranca.find().toArray()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ "error": `${err.message}` })
    }
})
 
/* Definindo a rota /seguranca/:raAluno via método GET */
router.get('/id/:id', async (req, res) => {
    try {
        await connectToDatabase()
        const db = client.db(dbName)
        const seguranca = db.collection('seguranca')
        let result = await seguranca.find({ 'raAluno': req.params.id }).toArray()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ "error": `${err.message}` })
    }
})
 
const validaSeguranca = [
    //Validações da collection seguranca
    check('raAluno').isString({ min: 13, max: 13 })
        .withMessage('O raAluno deve ter 13 números'),
    check('placa').notEmpty()
        .withMessage('A placa do veículo é obrigatória'),
    check('contato').isString({ min: 11, max: 11 })
        .withMessage('O número de contato deve estar tudo junto, com DDD, sem espaço e sem caracteres especiais'),
    check('validadeCarteirinha').isISO8601()
        .withMessage('A data deve estar no formato YYYY-MM-DD'),
    check('nomeAluno').notEmpty()
        .withMessage('O nome do Aluno é obrigatório'),
    check('curso').notEmpty()
        .withMessage('O nome do curso é obrigatório e deve estar abreviado. Ex: GTI'),
   
]
 
/* Definindo a rota /seguranca via método POST */
router.post('/', validaSeguranca, async (req, res) => {
    //Verificando os eventuais erros
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        await connectToDatabase()
        const db = client.db(dbName)
        const seguranca = db.collection('seguranca')
        //Obtendo os dados que vem na requisição
        const novoSeguranca = req.body
        //Inserindo um novo veiculo no MongoDB
        const result = await seguranca.insertOne(novoSeguranca)
        //Retornamos uma mensagem de sucesso
        res.status(201).json({
            message: `Novo veículo inserido com sucesso
              com o  ${result.insertedId}`
        })
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
})
 
/* Definindo a rota /alunos via método DELETE */
router.delete('/:raAluno', async (req, res) => {
    try {
        await connectToDatabase()
        const db = client.db(dbName)
        const alunos = db.collection('alunos')
        //Obtendo o raAluno da requisição
        const { raAluno } = req.params
        //Deletando o Aluno no MongoDB
        const result = await
            alunos.deleteOne({ raAluno: raAluno })
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'Aluno não encontrado!'
            })
        }
        //retornando uma resposta de sucesso
        res.status(200).json({
            message: 'Aluno removido com sucesso'
        })
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
})
 
 
router.put('/:raAluno', validaSeguranca, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        await connectToDatabase()
        const db = client.db(dbName)
        const alunos = db.collection('alunos')
        // obtendo os dados para alteração
        const { raAluno } = req.params
        const dadosAtualizados = req.body
        //atualizar os dados no banco
        const result = await alunos.updateOne(
            { raAluno: raAluno },
            { $set: dadosAtualizados }
        )
        if (result.matchedCount === 0) {
            return res.status(404).json(
                { message: 'Dados não encontrado' }
            )
        }
        //retornamos a mensagem q deu certo
        res.status(200).json(
            { message: 'Dados atualizados com sucesso' }
        )
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
 
}
 
)

export default router