use('seguranca')

// Inserindo um aluno
// Como combinado em sala não colocamos atributo decimal, porém colocamos mais atributos
db.alunos.insertOne({
    "nomeAluno": "Ana Clara Luz",
    "raAluno": "1780782313029",
    "validadeCarteirinha": new Date('2026-05-26'),
    "curso": "GTI",
    "contato": "11999859321",
    "veiculos": [
        {
            "veiculo": "carro",
            "placa": "QOH5049",
            "marca": "TOYOTA",
            "modelo": "ETIOS SD XPLUS AT",
            "cor": "Prata",
            "proprietario": "Ana Clara Luz",
        }
    ]
})

// Criando um índice para evitar registros duplicados no raAluno
db.alunos.createIndex({ "raAluno": 1 }, { unique: true })

// Exibindo todos os registros - Equivalente ao SELECT * FROM seguranca
db.alunos.find()

// Exibindo apenas as informações de placa, marca e cor dos veículos - Equivalente ao SELECT placa, marca, cor FROM seguranca
db.alunos.find({}, { "veiculos.placa": 1, "veiculos.marca": 1, "veiculos.cor": 1, _id: 0 })

// Inserindo um novo aluno com dois veículos
db.alunos.insertOne({
        "nomeAluno": "João Felipe Ovidio",
        "raAluno": "1780782313017",
        "validadeCarteirinha": new Date('2025-12-30'),
        "curso": "GTI",
        "contato": "11999859322",
        "veiculos": [
            {
                "veiculo": "carro",
                "placa": "FDN1H82",
                "marca": "CHEVROLET",
                "modelo": "CRUZE LTZ NB",
                "cor": "Prata",
                "proprietario": "João Maria Ovidio",
            },
            {
                "veiculo": "moto",
                "placa": "EZX4D27",
                "marca": "HONDA",
                "modelo": "CG 160 START",
                "cor": "Prata",
                "proprietario": "João Felipe Ovidio",
            }
        ]
})

// Consulta por alunos que possuem veículo com marca "TOYOTA"
db.alunos.find({ "veiculos.marca": { $eq: "TOYOTA" } },
    { "veiculos.marca": 1, raAluno: 1, contato: 1, _id: 0 }
)

// Procurando: nome do aluno,placa, marca, cor e modelo de veículos pelo RA do aluno
db.alunos.find({ "raAluno": { $eq: "1780782313029" } },
    { "nomeAluno":1,"veiculos.placa": 1, "veiculos.marca": 1, "veiculos.cor": 1, "veiculos.modelo": 1, _id: 0 }
)
