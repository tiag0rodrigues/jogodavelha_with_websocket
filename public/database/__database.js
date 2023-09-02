import pkg from 'pg'; //biblioteca p/ banco postgres

const { Client } = pkg;

//informações do banco
const client = new Client({
    user: 'tiago',
    host: 'database-1.cotrbiznnqzh.us-east-1.rds.amazonaws.com',
    database: 'jogodavelha',
    password: 'tiago1234',
    port: 5432
})

export {client}

