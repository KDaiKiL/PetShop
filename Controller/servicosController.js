const { validationResult } = require('express-validator');
const { v4: uuid } = require('uuid');
const fs = require('fs')
const bcrypt = require('bcrypt')
const session = require('express-session')

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
        const listaDeError = validationResult(req)
        if (!listaDeError.isEmpty()) {
            res.render('servicos/cadastro', {errors: listaDeError.errors})
        } else {
            const { nome, valor } = req.body;
            const img = '/img/gatinho.jpg'
            if (req.file != undefined) {
                img = "/" + req.file.fieldname + "/upload/" + req.file.filename
            } 

            servicos.push({ id: uuid(), nome, valor: Number(valor), img: img });
            return res.redirect('/servicos'); 
        }

    },
    edit: (req, res) => {
        const { id } = req.params
        const servico = servicos.find(servico => servico.id == id)

        return res.render('servicos/edit', { servico })
    },
    update: (req, res) => {
        const { nome, valor } = req.body
        const { id } = req.params
        const servicoIndex = servicos.findIndex(servico => servico.id == id)

        const img = servicos[servicoIndex].img
        const file = servicos[servicoIndex].file

        if (req.file != undefined) {
            img = '/img/' + req.file.filename
            file = req.file.filename
        } 

        const servicoAtualizado = {
            id,
            nome,
            valor: Number(valor),
            file: file,
            img: img
        }

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
    },
    contato: (req, res) => {
        res.render('contato')
    },
    entrarContato: (req, res) => {
        let erro = validationResult(req)
        if (!erro.isEmpty()) {
            res.render('contato', ({errors: erro.errors}))
        } else {
            res.json(req.body)
        }
    },
    pageCadastroUser: (req, res) => {
        res.render('cadastroUser')
    },
    cadastroUser: (req, res) => {
        let errors = validationResult(req)
        let {nome, email, senha, confirmarSenha} = req.body

        if(!errors.isEmpty() || confirmarSenha !== senha) {
            res.render('cadastroUser', ({ errors: errors.errors, confirmarSenha: confirmarSenha, senha: senha }))
        } else {
    
            let content = fs.readFileSync("usuarios.json", "utf8")
            let usuarios = JSON.parse(content)
            const hash = bcrypt.hashSync(senha, 10)
    
            usuarios.push({nome, email, senha: hash})
    
            content = JSON.stringify(usuarios)
            fs.writeFileSync("usuarios.json", content, "utf8")
            res.redirect('/usuarios')
        }
    }, 
    users: (req, res) => {
        let content = fs.readFileSync("usuarios.json", "utf8")
        let usuarios = JSON.parse(content)
        return res.json(usuarios)
    },
    pageLogin: (req, res) => {
        const sas = ''
        const user = 'normal'
        res.render('login', {sas: sas, user: user})
    },
    login: (req, res) => {
        let erros = validationResult(req)
        const { email, senha } = req.body
        
        let content = fs.readFileSync("usuarios.json", "utf8")
        let usuarios = JSON.parse(content)

        let user = usuarios.find((user) => user.email == email)

        let sas = ''

        if (!erros.isEmpty()) {
            res.render('login', {errors: erros.errors, sas: sas, user: user})
        } else {
            if (user == undefined) {
                res.render('login', {user: user, sas: sas})
            } else {
                if (bcrypt.compareSync(senha, user.senha) ) {
                    req.session.logado = req.body
                    res.redirect('/home')
                } else {
                    sas = 'nsenha'
                    res.render('login', {sas: sas, user: user})
                }
            }
        }
        

        
    }
};

module.exports = servicoController;