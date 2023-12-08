const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    password: "2441",
    host: "localhost",
    database: "taller",
    port: "5432"
})

module.exports = { pool }
