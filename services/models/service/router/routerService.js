const routerImpl = require('../../impl/router/routerImpl')

class routerService {
  constructor() {
    this.routerImpl = new routerImpl()
  }
  getRouter(data) {
    this.routerImpl.getRouter(data)
  }
}

module.exports = routerService