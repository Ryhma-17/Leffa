const pgPool = require('./connection');

const sql = {
    INSERT_ACCOUNT: 'INSERT INTO account (username, email, pw) VALUES ($1, $2, $3)',
    SELECT_ACCOUNT: 'SELECT * FROM account'
}

async function getAccount() {
    const result = await pgPool.query(sql.SELECT_ACCOUNT);
    console.log(result.rows);
}

async function addAccount(username, email, pw) {
    await pgPool.query(sql.INSERT_ACCOUNT, [username, email, pw]);
}

//addAccount('Simba','simba@simo.com','1234');

//getAccount();