use('seguranca')
db.carros.insertOne({
    "placa": "9780807286005",
    "marca" : "Harry Potter e a Pedra Filosofal",
    "modelo" : "Harry Potter e la pietra filosofale",
    "cor": 304,
    "proprietario": new Date('2014-07-02'),
    "nomeAluno": ["infantil","fantasia","ação"],
    "raAluno": "Saraiva",
    "contato": ["São Mateus","São Lucas"],

})
//Criando um índice para evitar registros duplicados
use('seguranca')
db.carros.createIndex({placa:1},{unique:true})

use('seguranca')
//Equivale ao select * from seguranca
db.carros.find()

use('seguranca')
//select placa, marca, cor from seguranca
db.carros.find({},{placa:1, marca:1, cor:1,_id:0})

use('seguranca')
db.carros.insertOne({
    "placa": "9780807286006",
    "marca" : "A Biblia",
    "modelo" : "La Biblia",
    "cor": 1803,
    "proprietario": new Date('2010-07-02'),
    "nomeAluno": ["religioso","fantasia","ação"],
    "raAluno": "Aparecida",
    "contato": ["São Mateus","São Lucas"],
})

use('seguranca')
//select marca, raAluno, contato from seguranca
//where marca = 'A Biblia'
db.carros.find({"marca": {$eq: "A Biblia"}},
               {marca:1, raAluno:1, contato:1,_id:0}
)

use('seguranca')
//select marca, placa, modelo from seguranca
//where cor <= 400
db.carros.find({"cor": {$lte: 400}},
               {marca:1, placa:1, modelo:1, _id:0}
)

use('seguranca')
//select placa, marca, cor, modelo from seguranca
//where raAluno = 'Saraiva'
db.carros.find({"raAluno": {$eq: "Saraiva"}},
          {placa:1, marca:1, cor:1, modelo:1,_id:0}
)



