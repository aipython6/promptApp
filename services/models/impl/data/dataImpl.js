const mysqlConnect = require('../../../database/mysql_config')

class dataImpl {
  constructor() { }
  /*前端根据设备ID和所选日期范围进行数据查询*/
  getDataByIdAndDate({ did, start, end }) {
    const sql = `select a.*,b.name from inpatient a left join devices b on a.did = b.did where a.date between '${start}' and '${end}' and a.did='${did}'`
    mysqlConnect.query(sql, (err, result) => {
      return new Promise((resolve, reject) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = dataImpl