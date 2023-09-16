import express from 'express';
import { Router } from 'express';
import session from 'express-session'
import bodyParser from 'body-parser'
import { client } from '../public/database/__database.js'

const router = Router()

router.use(session({
    secret:'sdjsladdlasdk563',
    resave: false, // Atualizado para false
    saveUninitialized: false, // Atualizado para false

}))
router.use(bodyParser.urlencoded({extended:true}))

//ajuda a usar json
router.use(express.json())

//banco de dados
const db = client

//conectando banco de dados
db.connect()

//rotas
router.get('/start', (req, res)=>{//escolha de sala
    res.render('start')
})

router.get('/', (req, res) => {//login
    if(req.session.login){
        res.redirect('/start')
    }else{
        res.render('index')
    }
});

router.get('/home', (req, res)=>{//renderiza a interface da sala do jogo
    res.render('home')
})

router.post('/api/create/users', (req, res)=>{//p/ add usuario e senha na tabela de registro do banco de dados
    db.query("INSERT INTO jogo.registro VALUES ($1,$2)", [req.body.input_login, req.body.input_password], (err, results)=>{
            res.json(results)
    })
})

router.post('/api/login_session', (req, res)=>{//faz login na sessão 
    req.session.login = req.body.input_login
    res.json({
        'n': 1
    })
})

router.post('/api/read/login/users', (req, res)=>{//p/ buscar usuario na tabela de registro do banco de dados
    db.query("SELECT * FROM jogo.registro WHERE usuario= $1", [req.body.input_login], (err, results)=>{
            res.json(results.rows.length)//retorna o tamanho da tabela retornada
    })
})

router.post('/api/read/password/users', (req, res)=>{//p/ buscar senha na tabela de registro do banco de dados
    db.query("SELECT * FROM jogo.registro WHERE senha= $1", [req.body.input_password], (err, results)=>{
            res.json(results.rows.length)
    })
})

router.get('/register', (req, res)=>{//renderiza a tela de cadastro
    res.render('register')
})

router.get('/start/wait_room', (req, res)=>{//renderiza a tela de sala de espera dos jogadores
    res.render('wait_room')
})

export {router}