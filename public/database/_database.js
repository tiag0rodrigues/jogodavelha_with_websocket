const pg = require('pg')

const client = new pg.Client({
    user: 'meubdbd',
    host: 'database-2.cjafgiodewwt.us-east-1.rds.amazonaws.com',
    database: 'jogoVelha',
    password: 'bd123456',
    port: 5432
})

module.exports = client