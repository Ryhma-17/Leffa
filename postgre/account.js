const pgPool = require('./connection');
const bcrypt = require('bcrypt');


const sql = {
    INSERT_ACCOUNT: 'INSERT INTO account (username, email, pw) VALUES ($1, $2, $3)',
    SELECT_ACCOUNT: 'SELECT * FROM account',
    CHECK_ACCOUNT: 'SELECT * FROM account WHERE username = $1'
}

async function getAccount() {
    const result = await pgPool.query(sql.SELECT_ACCOUNT);
    console.log(result.rows);
}

async function addAccount(username, email, plainTextPassword) {
    
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
    await pgPool.query(sql.INSERT_ACCOUNT, [username, email, hashedPassword]);
  }
  
  async function checkAccount(username) {
    try {
      const result = await pgPool.query(sql.CHECK_ACCOUNT, [username]);
  
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const hashedPassword = user.pw;
  
        return { username: user.username, pw: hashedPassword };
      }
      
      return null;
    } catch (error) {
      console.error('Error checking account:', error);
      throw error;
    }
  }
  
  module.exports = {
    addAccount,
    checkAccount,
    getAccount,
  };
//addAccount('Simba','simba@simo.com','1234');

//getAccount();