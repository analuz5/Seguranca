use('seguranca')
db.alunos.insertOne({
    "nomeAluno": "Ana Clara",
    "raAluno": "1780782",
    "validadeCarteirinha": new Date('2026-05-26'),
    "curso": "GTI",
    "contato": "(11) 9XXXX-XXXX",
    "veiculos": [
        {
            "veiculo": "carro",
            "placa": "XXX0000",
            "marca": "TOYOTA",
            "modelo": "ETIOS SD XPLUS AT",
            "cor": "Prata",
            "proprietario": "Ana Clara Luz",
        }
    ]

})
//Criando um índice para evitar registros duplicados
use('seguranca')
db.alunos.createIndex({ "veiculos.placa": 1, "raAluno": 1 }, { unique: true })

use('seguranca')
//Equivale ao select * from seguranca
db.alunos.find()

use('seguranca')
//select placa, marca, cor from seguranca
db.alunos.find({}, { placa: 1, marca: 1, cor: 1, _id: 0 })

use('seguranca')
db.alunos.insertOne({
    "nomeAluno": "João Felipe",
    "raAluno": "1780782313017",
    "validadeCarteirinha": new Date('2025-12-30'),
    "curso": "GTI",
    "contato": "(11) 9XXXX-XXXX",
    "veiculos": [
        {
            "veiculo": "carro",
            "placa": "XXX0000",
            "marca": "CHEVROLET",
            "modelo": "CRUZE LTZ NB",
            "cor": "Prata",
            "proprietario": "João Maria ",
        },
        {
            "veiculo": "moto",
            "placa": "XXX0000",
            "marca": "HONDA",
            "modelo": "CG 160 START",
            "cor": "Prata",
            "proprietario": "João Felipe",
        }
    ]

})

use('seguranca')
//select marca, raAluno, contato from seguranca
//where marca = 'A Biblia'
db.alunos.find({ "marca": { $eq: "A Biblia" } },
    { marca: 1, raAluno: 1, contato: 1, _id: 0 }
)

use('seguranca')
//select marca, placa, modelo from seguranca
//where cor <= 400
db.alunos.find({ "cor": { $lte: 400 } },
    { marca: 1, placa: 1, modelo: 1, _id: 0 }
)

use('seguranca')
//select placa, marca, cor, modelo from seguranca
//where raAluno = 'Saraiva'
db.alunos.find({ "raAluno": { $eq: "Saraiva" } },
    { placa: 1, marca: 1, cor: 1, modelo: 1, _id: 0 }
)



