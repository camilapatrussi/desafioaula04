const express = require("express")
const itens = require("../dados.json")
const cors = require("cors")


const cadastrarItem = (req, res) => {

    if (req.body) {

        const novoItem = {
            id: itens.length + 1,
            item: req.body.item,
            local: req.body.local,
            dataRegistro: req.body.dataRegistro,
            valor: req.body.valor,
            patrimonio: req.body.patrimonio
        }

        itens.push(novoItem)

        res.send("Item cadastrado com sucesso")

    } else {

        res.send("Erro ao cadastrar item")

    }

};

const listarItens = (req, res) => {

    res.send(itens)

};


const consultarItem = (req, res) => {

    const id = req.query.id;

    itens.forEach((item) => {

        if (item.id == id) {

            res.send(item)

        }

    });

};

const atualizarItem = (req, res) => {
    const id = req.params.id;
    const dados = req.body;

    itens.forEach((item) => {
        if(item.id == id) {
            item.item = dados.item;
            item.local = dados.local;
            item.dataRegistro = dados.dataRegistro;
            item.valor = dados.valor;
            item.patrimonio = dados.patrimonio
        }
    });
    res.send("Item atulizado com sucesso");
};

const excluirItem = (req, res) => {

    const id = req.params.id;

    itens.forEach((item, indice) => {

        if (item.id == id) {

            itens.splice(indice, 1);

        }

    });

    res.send("Item excluido com sucesso.");

};

//Configurações do servidor
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 5000

//Rotas
app.post("/", cadastrarItem);
app.get("/", listarItens);
app.get("/", consultarItem);
app.put("/:id", atualizarItem);
app.delete("/:id", excluirItem);


app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})