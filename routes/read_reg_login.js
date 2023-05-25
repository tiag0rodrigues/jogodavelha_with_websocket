const express = require('express')
const router = express.Router()
const db = require('../public/database/_database')

router.use(express.json());

router.post('/api/read/login/users', (req, res)=>{
    db.query("SELECT * FROM jogo.registro WHERE usuario= $1", [req.body.input_login], (err, results)=>{
            res.json(results.rows.length)
    })
})

module.exports = router