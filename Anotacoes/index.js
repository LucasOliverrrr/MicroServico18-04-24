const express    = require('express')
const bodyParser = require('body-parser')
const axios      = require("axios")

const app = express()
app.use(bodyParser.json())

const anotacoesPorLembreteId = {}

const {v4 : uuid4} = require('uuid')

app.put('/lembretes/:id/Anotacoes', async (req, res)=>{
    const idAnot = uuid4();
    const {texto} = req.body;
    const anotacoesPorLembrete =  anotacoesPorLembreteId[req.params.id] || [];
    anotacoesPorLembrete.push({id: idAnot, texto})
    anotacoesPorLembreteId[req.params.id] = anotacoesPorLembrete

    await axios.post("http://localhost:10000/eventos", {
        tipo: "AnotacoesCriada", 
        dados:{
                id: idAnot, texto, anotacoesPorLembreteId: req.params.id
        }
    })
    
    res.status(201).send(anotacoesPorLembrete)
})

app.get('/lembretes/:id/Anotacoes', (req, res)=>{
        res.send(anotacoesPorLembreteId[req.params.id] || [])
})

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({msg:"ok"})
})

app.listen(4000, (()=>{
    console.log('Anotacoes - 4000')
}))