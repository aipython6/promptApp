const express = require('express');
const router = express.Router();
const dataService = require('../../models/service/data/dataService');
const { formatDate } = require("../../utils/handleDate");
router.post('/getData', async (req, res) => {
  const { deviceId, dateRange } = req.body;
  // console.log(req.body);
  const ds = new dataService();
  const data = await ds.getDataByIdAndDate({ did: Number.parseInt(deviceId), start: dateRange[0], end: dateRange[1] });
  const result = data.map(e => {
    return {
      patientId: e.patientId,
      EEG: e.EEG,
      HRV: e.HRV,
      CBF: e.CBF,
      MEG: e.MEG,
      HR: e.HR,
      RR: e.RR,
      EMG: e.EMG,
      symptom: e.symptom,
      mentality: e.mentality,
      QOL: e.QOL,
      CF: e.CF,
      EA: e.EA,
      date: formatDate(e.date)
    }
  })
  res.json({ success: true, data: result });
});

router.post("/deletePatientByPid", async (req, res) => {
  const { pid } = req.body;
  const ds = new dataService();
  const data = await ds.deletePatientByPid({ pid: Number.parseInt(pid) });
  // console.log(data);
  res.json({ success: true, data: data });
})

module.exports = router;