const { check } = require('express-validator')

const checs = [
    check('nome', 'O nome precisa ter mais que 3 caracteres').isLength({ min: 4 }),
    check('descricao', 'A descrição do produto precisa ter mais do que 10 caracteres').isLength({ min: 11 }),
    check('valor', 'O preço do produto deve ser um número').isNumeric()
]

module.exports = checs;