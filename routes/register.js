const express = require('express')
const router = express.Router()
const db = require('../public/database/_database')

//app.use(bodyParser.urlencoded({extended:true}))

router.get('/register', (req, res)=>{
    res.render('register')
})

/*
router.post('/register', (req, res)=>{
    db.query("SELECT * FROM jogo.registro WHERE usuario= $1", [req.body.login], (err, results)=>{
        if(err){
            console.error('Erro ao executar a consulta:', err);
        }
        if(results.rows.length==0){//se não existe
            db.query('INSERT INTO jogo.registro VALUES ($1,$2)', [req.body.login, req.body.password])
            res.redirect('/')
        }
        console.log('Registros encontrados:', results.rows);
    })
})*/

module.exports = router