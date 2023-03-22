const express = require('express');
const router = express.Router();
// const handleDate = require('../../utils/handleDate')
// 后台管理员登录
// router.post('/auth/login', async (req, res, next) => {
// const { username, password } = req.body
// // console.log(req.body)
// const userservice = new userService()
// const user = await userservice.findUserByUsername({ username: username })
// if (user.length > 0) {
//   if (await pass.passDecode(user[0].password, password)) {
//     const t = token.sign(username)
//     await userservice.addToken({ token: t, username: username, create_time: handleDate(new Date()) })
//     res.json({ code: 200, token: t, username: username })
//   } else {
//     res.json({ code: 201, msg: '密码错误,请重新输入' })
//   }
// } else {
//   res.json({ code: 202, msg: '该用户不存在,登陆失败' })
// }
// })


module.exports = router;