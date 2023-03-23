const express = require('express');
const router = express.Router();
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile)
const URL = require('../../utils/url')
// const routerService = require('../../models/service/router/routerService')

router.get('/getAsyncRoutes', async (req, res) => {
  // const rs = new routerService();
  const data = await readFile(URL.Jsondata, 'utf-8')
  res.json({ success: true, data: [JSON.parse(data)] });
})

module.exports = router;