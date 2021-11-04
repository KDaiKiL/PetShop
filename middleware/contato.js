const { check } = require('express-validator')

const contato = [
    check('nome', 'O nome precisa ter pelo menos três letras').isLength({ min: 3 }),
    check('email', 'Você precisa digitar um email válido').isEmail(),
    check('mensagem', 'A mensagem precisa conter no máximo 500 caracteres').isLength({ max: 500 }),
    check('mensagem', 'Envie uma mensagem para nós').isLength({ min: 1 })
]

module.exports = contato