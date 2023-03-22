const jwt = require('jsonwebtoken')
const my_token = 'promptApp'

class Token {
  sign(username) {
    let expiresIn = { expiresIn: 60 * 60 * 24 }
    return jwt.sign({ username: username }, my_token, { expiresIn: expiresIn.expiresIn })
  }
  verify(token, username) {
    if (!token) {
      return false
    } else {
      return new Promise((resolve, reject) => {
        jwt.verify(token, my_token, function (err, result) {
          if (err) {
            reject(err)
          } else {
            resolve(result.username.toString() === username.toString())
          }
        })
      })
    }
  }
}

module.exports = new Token()