const { v4: uuid } = require('uuid');

const servicos = [
    { id: uuid(), nome: "Banho", valor: 40, file:"gatinho.jpg", img: '/img/gatinho.jpg' },
    { id: uuid(), nome: "Tosa", valor: 50, file:"gatinho.jpg", img: '/img/gatinho.jpg' },
    { id: uuid(), nome: "Pedicure", valor: 10, file:"gatinho.jpg", img: '/img/gatinho.jpg' },
    { id: uuid(), nome: "Denticure", valor: 130, file:"gatinho.jpg", img: '/img/gatinho.jpg' },
    { id: uuid(), nome: "Clínica", valor: 150, file:"gatinho.jpg", img: '/img/gatinho.jpg' },
]

const servicoController = {
    index: (req, res) => {
        return res.render('servicos/lista', {servicos})
    },
    sas: (req, res) => {
        return res.render('servicos', { servicos })
    },
    store: (req, res) => {
        return res.render('servicos/cadastro')
    },
    save: (req, res) => {
        const { nome, valor } = req.body;
        const img = "/" + req.file.fieldname + "/upload/" + req.file.filename
        servicos.push({ id: uuid(), nome, valor: Number(valor), img });
        return res.redirect('/servicos');
    },
    edit: (req, res) => {
        const { id } = req.params
        const servico = servicos.find(servico => servico.id == id)

        return res.render('servicos/edit', { servico })
    },
    update: (req, res) => {
        const { nome, valor } = req.body
        const { id } = req.params
        const file = req.file.filename
        const img = "/" + req.file.fieldname + "/upload/" + file
        const servicoIndex = servicos.findIndex(servico => servico.id == id)

        const servicoAtualizado = {
            id,
            nome,
            valor: Number(valor),
            file,
            img
        }

        console.log(servicoAtualizado)

        servicos[servicoIndex] = servicoAtualizado

        return res.redirect('/servicos')
    },
    delete: (req, res) => {
        const { id } = req.params

        const servicoIndex = servicos.findIndex(servico => servico.id == id)

        servicos.splice(servicoIndex, 1);


        return res.redirect('/servicos')
    },
    home: (req, res) => {
        res.render('index', { servicos })
    }
};

module.exports = servicoController;