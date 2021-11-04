const { check } = require('express-validator')

const user = [
    check('nome', 'O nome precisa ter pelo menos 3 caracteres').isLength({ min: 3 }),
    check('email', 'O campo email é obrigatório').isLength({ min: 1 }),
    check('email', 'Escreva um email válido').isEmail(),
    check('senha', 'A senha precisa conter pelo menos 6 carasteres').isLength({ min: 6 })
]

module.exports = user