const pets = [
    { nome: "Derik", especie: "cachorro" },
    { nome: "Kiara", especie: "gato" },
    { nome: "Book", especie: "cachorro" },
    { nome: "Lion", especie: "cachorro" },
    { nome: "Bills", especie: "cachorro" },
    { nome: "Yakult", especie: "cachorro" },
    { nome: "Lua", especie: "gato" },
];

const petsController = {
    index: (req, res) => {
        return res.json(pets)
    }
}

module.exports = petsController;