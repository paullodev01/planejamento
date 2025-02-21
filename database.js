const { Sequilize } = require('sequilize');
require('dotenv').config();

const sequilize = new Sequilize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

sequilize.authenticate()
    .then(() => console.log('Banco de dados conctado'))
    .catch(() => console.log('Erro ao conectar ao DB:'), err)

module.exports = sequilize;