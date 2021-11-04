const { check } = require('express-validator');

const loginCheks = [
    check('email', 'Ecreva um email válido').isEmail(),
    check('email', 'O campo email é obrigatório').isLength({ min: 1 }),
    check('senha', 'A senha precisa conter pelo menos 6 caracteres').isLength({ min: 6 })
]

module.exports = loginCheks