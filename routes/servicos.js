const express = require('express'); 
const router = express.Router();
const servicoController = require('../Controller/servicosController');
const multer = require('multer');
const { check, validationResult, body } = require('express-validator')
const checs = require('../middleware/produto')
const contato = require('../middleware/contato')
const user = require('../middleware/user')
const loginCheks = require('../middleware/login')
const log = require('../middleware/autenticacao')

 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

router.get('/home', servicoController.home)


router.get('/servicos/lista', log,servicoController.index)
router.get('/servicos', servicoController.sas)
router.get('/servicos/cadastro', servicoController.store)
router.post('/servicos/cadastro', upload.single('img'), checs, servicoController.save)
router.get('/servicos/:id/edit', servicoController.edit)
router.put('/servicos/:id/edit', upload.single('img'), servicoController.update)
router.delete('/servicos/:id', servicoController.delete)



router.get('/contatos', servicoController.contato)
router.post('/contatos', contato, servicoController.entrarContato)


router.get('/cadastro', servicoController.pageCadastroUser)
router.post('/cadastro', user, servicoController.cadastroUser)


router.get('/login', servicoController.pageLogin)
router.post('/login', loginCheks,servicoController.login)


router.get('/usuarios', servicoController.users)



module.exports = router;