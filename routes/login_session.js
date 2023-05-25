const express = require('express')
const router = express.Router()
const session = require('express-session')

router.use(express.json())
router.use(session({secret:'sdjsladdlasdk563'}))

router.post('/api/login_session', (req, res)=>{
    req.session.login = req.body.input_login
    res.json({
        'n': 1
    })
})

module.exports = router
