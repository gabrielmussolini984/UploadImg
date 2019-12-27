// Imports
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');


// Iniciando o APP.
const app = express();

// Middlewares
// Acesso via URL dos arquivos upados
app.use('/files', express.static(path.resolve(__dirname, './', 'tmp', 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

// Usando as rotas.
app.use(require('./routes/routes'))

const port = 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))