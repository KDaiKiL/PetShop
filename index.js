const express = require('express');
const methodOverride = require('method-override')
const app = express();
const petsRouter = require('./routes/pets');
const servicosRouter = require('./routes/servicos');
const { check, body, validationResult } = require('express-validator')
const session = require('express-session')


app.use(session({
    secret: "abcdefgh12345",
    resave: true,
    saveUninitialized: true 
}))
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(petsRouter);
app.use(servicosRouter);


app.listen(3000, () => {
    console.log('Servidor rodando')
});