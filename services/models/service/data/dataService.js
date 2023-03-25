const dataImpl = require("../../impl/data/dataImpl");

class dataService {
  constructor() {
    this.dataService = new dataImpl();
  }

  getDataByIdAndDate(data) {
    return this.dataService.getDataByIdAndDate(data);
  }

  deletePatientByPid(data) {
    return this.dataService.deletePatientByPid(data);
  }
}

module.exports = dataService;
