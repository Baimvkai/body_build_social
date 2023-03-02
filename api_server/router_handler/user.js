// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcryptjs 加密包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局配置文件
const config = require('../config')

// 注册的处理函数
exports.regUser = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userInfo = req.body
  // 定义SQL语句，查询手机号是否被占用
  const sql = 'select * from users where user_phone=?'

  db.query(sql, userInfo.user_phone, (err, result) => {
    // 执行sql语句失败
    if (err) return res.cc(err)
    // 判断手机号是否被占用
    if (result.length > 0) return res.cc('用户名被占用，请更换其他用户名')

    // 调用bcrypt.hashSync()对密码加密
    userInfo.user_password = bcrypt.hashSync(userInfo.user_password, 10)

    // 定义插新用户的SQL语句
    const sql = 'insert into users set ?'
    // 调用db.query()执行SQL语句
    db.query(sql, userInfo, (err, result) => {
      // 判断sql语句是否成功
      if (err) return res.cc(err)
      // 判断影响行数是否为1
      if (result.affectedRows != 1) return res.cc('注册用户失败，请稍后重试！')
      // 注册用户成功
      res.cc('注册成功！', 0)
    })
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  // 接收表单数据
  const userInfo = req.body
  // 定义sql语句
  const sql = 'select * from users where user_phone=?'
  // db.query执行SQL语句
  db.query(sql, userInfo.user_phone, (err, result) => {
    // sql语句执行失败
    if (err) return res.cc(err)
    // 执行成功，但是获取到的数据条数不等于1
    if (result.length != 1) return res.cc('用户不存在！')

    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(userInfo.user_password, result[0].user_password)
    if (!compareResult) return res.cc('密码错误！')

    // 在服务器端生成token
    const user = { ...result[0], user_password: '', user_avatar: '' }
    // 对用户的信息进行加密，生成token
    const tokenStr = jwt.sign(user, config.jwtSecreKey, { expiresIn: config.expiresIn })
    // 将token响应给客户端
    res.send({
      status: 0,
      message: '登录成功！',
      token: 'Bearer ' + tokenStr
    })

  })
}