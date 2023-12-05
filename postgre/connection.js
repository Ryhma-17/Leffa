require('dotenv').config();
const e = require('cors');
const { Pool } = require('pg');

const pgPool = new Pool({
    host: process.env.LDB_HOST,
    port: process.env.LDB_PORT,
    database: process.env.LDB_DB,
    user: process.env.LDB_USER,
    password : process.env.LDB_PW,
    ssl: true,
});

pgPool.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('PostgreSQL Connected');
    }
})

module.exports = pgPool;