const express = require('express');
const session = require('express-session')
const app = express();
const home = require('./routes/home')
const register = require('./routes/register')
const read_reg = require('./routes/read_reg')
const create_reg = require('./routes/create_reg')
const bodyParser = require('body-parser')
const db = require('./public/database/_database')
//const {validateLogin} = require('./public/js-files/d-index')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(session({secret:'sdjsladdlasdk563'}))
app.use(bodyParser.urlencoded({extended:true}))
//rotas
app.use(home)
app.use(register)
app.use(read_reg)
app.use(create_reg)

db.connect()

app.post('/', (req, res) => {
    //conexão com banco
    db.query("SELECT * FROM jogo.registro WHERE usuario= $1", [req.body.login], (err, results)=>{
        if(err){
            console.error('Erro ao executar a consulta:', err);
        }
        if(results.rows.length==0){//se não existe
            res.render('index')       
        }else{//se existe
            req.session.login = req.body.login
            res.render('start')
        }
        console.log('Registros encontrados:', results.rows);
    })
});

/* ou
app.post('/', (req, res) => {
    db.connect()
    db.query("SELECT * FROM jogo.registro")
    .then(results=>{ 
        let resultado = results.rows
        console.log(resultado) 
    })
    .finally( ()=> db.end() )
});*/

app.get('/', (req, res) => {
    if(req.session.login){
        res.render('start')
    }else{
        res.render('index')
    }
});

//porta padrão ou 3000
app.listen(process.env.port || 3000, () => {
    console.log('Api on')
});