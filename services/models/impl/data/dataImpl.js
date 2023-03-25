const mysqlConnect = require('../../../database/mysql_config')

class dataImpl {
  constructor() { }
  /*前端根据设备ID和所选日期范围进行数据查询*/
  getDataByIdAndDate({ did, start, end }) {
    const sql = `select * from patient a where a.date between '${start}' and '${end}' and a.did='${did}' and a.enabled = 1`
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

  deletePatientByPid({ pid }) {
    const sql = `update patient set enabled = 0 where patientId='${pid}'`;
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  };
};



module.exports = dataImpl