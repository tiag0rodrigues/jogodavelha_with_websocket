const express = require('express');
const app = express();
const home = require('./routes/home')

app.set('view engine', 'ejs')
//rotas
app.use(home)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
});

//porta padrão ou 3000
app.listen(process.env.port || 3000, () => {
    console.log('Api on')
});