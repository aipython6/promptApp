const express = require('express');
const router = express.Router();
const dataService = require('../../models/service/data/dataService')

router.post('/getData', async (req, res) => {
  const { did, startDate, endDate } = req.body
  const ds = new dataService();
  const data = await ds.getDataByIdAndDate({ did: did, start: startDate, end: endDate })
  res.json({ code: 200, data: data })
})

module.exports = router;