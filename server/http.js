//imports necessários
import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

//importar rotas
import { router } from '../routes/all_routes.js'

const all_routes = router

const app = express()
const serverHttp = http.createServer(app)
const io = new Server(serverHttp)

//outras configs
app.set('view engine', 'ejs')
app.use(express.static('public'))

//usando rotas
app.use(all_routes)

export {serverHttp, io}