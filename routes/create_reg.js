const express = require('express')
const router = express.Router()
const db = require('../public/database/_database')

router.use(express.json());

router.post('/api/create/users', (req, res)=>{
    db.query("INSERT INTO jogo.registro VALUES ($1,$2)", [req.body.input_login, req.body.input_password], (err, results)=>{
            res.json(results)
    })
})

module.exports = router