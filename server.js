const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080

app.use(express.static(__dirname + '/API' + '/Bushido'))

app.get('/*', (req,res) => {
    res.sendFile(__dirname + '/Bushido/src/app/components/crud/crud.component.html')
})

app.listen(PORT, () => {
    console.log(('Servidindo na porta ' + PORT))
})