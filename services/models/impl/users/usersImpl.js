const mysqlConnect = require('../../../database/mysql_config')

class userImpl {
  constructor() { }
  getUserByUsername({ username }) {
    const sql = `select username,password,orgName from users where username = '${username}'`
    console.log(sql)
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

  addToken(data) {
    const sql = `insert into tokens set ?`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

  addUser(data) {
    const sql = `INSERT INTO users SET ?`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = userImpl