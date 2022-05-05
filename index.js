//Esta é a tentativa par servir as duas pastas, com um servuidor externo!

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", function (req,res) {
    res.send('Servindo?')
})

app.listen(port, () => [
    console.info(`Aplicação rodando em http://localhost:${PORT}`)
])