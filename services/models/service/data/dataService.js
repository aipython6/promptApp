const dataImpl = require("../../impl/data/dataImpl");

class dataService {
  constructor() {
    this.dataService = new dataImpl();
  }

  getDataByIdAndDate(data) {
    return this.dataService.getDataByIdAndDate(data);
  }
}

module.exports = dataService;
