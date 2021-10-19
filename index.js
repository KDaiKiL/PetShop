const express = require('express');
const methodOverride = require('method-override')
const app = express();
const petsRouter = require('./routes/pets');
const servicosRouter = require('./routes/servicos');



app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(petsRouter);
app.use(servicosRouter);


app.use((req, res, next) => {
    return res.status(404).render('not-found')
})

app.listen(3000, () => {
    console.log('Servidor rodando')
});