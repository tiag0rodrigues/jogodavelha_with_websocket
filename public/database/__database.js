import pkg from 'pg'; //biblioteca p/ banco postgres

const { Client } = pkg;

//informações do banco
const client = new Client({
    user: 'tiago',
    host: 'database-2.cotrbiznnqzh.us-east-1.rds.amazonaws.com',
    database: 'jogodavelha',
    password: 'tiago12345',
    port: 5432
})

export {client}

