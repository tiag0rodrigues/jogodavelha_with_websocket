//imports necessários
import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import session from 'express-session'
import bodyParser from 'body-parser'
import { client } from '../public/database/__database.js'

const db = client//banco de dados

const app = express()
const serverHttp = http.createServer(app)
const io = new Server(serverHttp)

//ajuda a usar json
app.use(express.json())

//outras configs
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(session({secret:'sdjsladdlasdk563'}))
app.use(bodyParser.urlencoded({extended:true}))

//conectando banco de dados
db.connect()

//rotas
app.get('/start', (req, res)=>{//escolha de sala
    res.render('start')
})

app.get('/', (req, res) => {//login
    if(req.session.login){
        res.redirect('/start')
    }else{
        res.render('index')
    }
});

app.get('/home', (req, res)=>{//renderiza a interface da sala do jogo
    res.render('home')
})

app.post('/api/create/users', (req, res)=>{//p/ add usuario e senha na tabela de registro do banco de dados
    db.query("INSERT INTO jogo.registro VALUES ($1,$2)", [req.body.input_login, req.body.input_password], (err, results)=>{
            res.json(results)
    })
})

app.post('/api/login_session', (req, res)=>{//faz login na sessão 
    req.session.login = req.body.input_login
    res.json({
        'n': 1
    })
})

app.post('/api/read/login/users', (req, res)=>{//p/ buscar usuario na tabela de registro do banco de dados
    db.query("SELECT * FROM jogo.registro WHERE usuario= $1", [req.body.input_login], (err, results)=>{
            res.json(results.rows.length)//retorna o tamanho da tabala retornada
    })
})

app.post('/api/read/password/users', (req, res)=>{//p/ buscar senha na tabela de registro do banco de dados
    db.query("SELECT * FROM jogo.registro WHERE senha= $1", [req.body.input_password], (err, results)=>{
            res.json(results.rows.length)
    })
})

app.get('/register', (req, res)=>{//renderiza a tela de cadastro
    res.render('register')
})

export {serverHttp, io}