const express = require("express")
const app     = express()
app.use(express.json())

const baseConsulta = {}

const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = lembrete
    },
    AnotacaoCriada: (anotacao) => {
        const anotacoes = 
        baseConsulta[anotacao.lembreteId]["anotacoes"] || [];
        anotacoes.push(anotacao);
        baseConsulta[anotacao.lembreteId]["anotacoes"] = anotacoes;
    }
}

app.get("/lembretes", (req, res) => {
    res.status(200).send(baseConsulta)
})

app.post("/eventos", (req, res) => {
    funcoes[req.body.tipo](req.body.dados);
    res.status(200).send(baseConsulta)
})

app.listen(6000, () => console.log("Consultas. Porta 6000"))