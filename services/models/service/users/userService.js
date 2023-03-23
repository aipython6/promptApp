const userImpl = require('../../impl/users/usersImpl')

class userService {
  constructor() {
    this.userImpl = new userImpl()
  }

  getUserByUsername(data) {
    return this.userImpl.getUserByUsername(data)
  }

  addToken(data) {
    return this.userImpl.addToken(data)
  }

  addUser(data) {
    return this.userImpl.addUser(data)
  }

}

module.exports = userService