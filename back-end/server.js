const express = require('express');
const app = express();
const rotas = require('./src/routes/rotas.js');
const environments = require('./src/config/environments.js');

const cors = require('cors');
const PORTA = environments.PORTA;

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log('Cliente consultou a API')
    res.status(200).send('Servidor ativo e funcionando corretamente!');
});

// Rotas da API
app.use('/api', rotas);


(async () => {
    try {
        app.listen(PORTA, () => {
            console.log(`Servidor rodando em http://localhost:${PORTA} `);
        });
    } catch (error) {
        console.error('Erro ao incializar o servidor:', error);
    }
})();