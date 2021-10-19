const express = require('express'); 
const router = express.Router();
const servicoController = require('../Controller/servicosController');
const multer = require('multer');

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


router.get('/servicos/lista', servicoController.index)
router.get('/servicos', servicoController.sas)
router.get('/servicos/cadastro', servicoController.store)
router.post('/servicos/cadastro', upload.single('img'), servicoController.save)
router.get('/servicos/:id/edit', servicoController.edit)
router.put('/servicos/:id/edit', upload.single('img'), servicoController.update)
router.delete('/servicos/:id', servicoController.delete)


module.exports = router;