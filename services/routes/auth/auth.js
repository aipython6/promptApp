const express = require('express');
const router = express.Router();
const { handleDate } = require('../../utils/handleDate')
const userService = require('../../models/service/users/userService')
const pass = require('../../utils/password')
const token = require('../../utils/token')
const URL = require('../../utils/url')


// 后台管理员登录
router.post('/login', async (req, res) => {
  const { username, password, orgName } = req.body
  console.log(req.body)
  const userservice = new userService()
  const user = await userservice.getUserByUsername({ username: username })
  // console.log(user)
  if (user.length > 0) {
    if (await pass.passDecode(user[0].password, password)) {
      if (orgName === user[0].orgName) {
        const t = token.sign(username)
        await userservice.addToken({ token: t, username: username, createTime: handleDate(new Date()) })
        res.json({ data: { role: ['admin'], accessToken: t, username: username, expires: '2023/03/31 23:59:59', refreshToken: t + 'Refresh' } })
      } else {
        res.json({ code: 201, msg: '该组织下不存在该用户,请重新登录' })
      }
    } else {
      res.json({ code: 201, msg: '密码错误,请重新输入' })
    }
  } else {
    res.json({ code: 202, msg: '该用户不存在,登陆失败' })
  }
})

router.post('/addUser', async (req, res) => {
  const { username, deptid, orgName, userCode } = req.body
  // 默认密码
  const password = '123456admin'
  const userservice = new userService()
  const user = await userservice.getUserByUsername({ username: username })
  // 用户名不能相同
  if (user.length === 0) {
    const passEncode = await pass.passEncode(password)
    const insert = {
      username: username, userCode: userCode, password: passEncode,
      deptid: deptid, updateTime: handleDate(new Date()),
      enabled: 1, createTime: handleDate(new Date()),
      avatar: URL.avatarDefaultUrl, orgName: orgName
    }
    const result = await userservice.addUser(insert)
    if (result.affectedRows > 0) {
      res.json({ code: 200, msg: '添加成功,初始密码为123456admin' })
    } else {
      res.json({ code: 200, msg: '程序错误,添加失败' })
    }
  } else {
    res.json({ code: 201, msg: '添加失败,要添加的用户已经存在,请重新添加' })
  }
})


module.exports = router;