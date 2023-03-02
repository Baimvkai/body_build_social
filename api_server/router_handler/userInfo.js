// 导入数据库
const db = require('../db/index')

// 导入bcryptjs
const bcrypt = require('bcryptjs')

// 导入fs模块
const fs = require('fs')

// 导入处理路径的核心模块
const path = require('path')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    // 定义SQL语句
    const sql = `select user_id,user_phone,user_nickname,user_avatar,user_desc from users where user_id=?`
    // 调用执行SQL语句
    db.query(sql, req.user.user_id, (err, result) => {
        // 执行SQL语句失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但是查询结果可能为空
        if (result.length != 1) return res.cc('获取用户信息失败')

        // 用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: result[0]
        })
    })
}

// 更新头像的处理函数
exports.updateAvatar = (req, res) => {
    // 判断是否上传了新头像
    if (!req.file || req.file.fieldname != 'avatar_img') return res.cc('请选择头像图片！')

    //fs.renameSync(更改之前的名字,更改之后的名字)
    let oldfile = req.file.path
    let newfile = req.file.path + path.parse(req.file.originalname).ext
    fs.renameSync(oldfile, newfile)

    img_url = 'http://localhost:3007/uploads/' + req.file.filename + path.parse(req.file.originalname).ext

    // 定义SQL语句
    const sql = 'update users set user_avatar=? where user_id=?'
    // 执行SQL语句
    db.query(sql, [img_url, req.user.user_id], (err, result) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 影响的行数是否等于 1
        if (result.affectedRows !== 1) return res.cc('更换头像失败！')
        // 成功
        res.cc('更换头像成功！', 0)
    })
}

// 更新用户信息的处理函数
exports.updateAccount = (req,res) => {
  // 提取body中的数据
  const {user_nickname, user_desc} = req.body

  // 定义SQL语句
  const sql = 'update users set user_desc=?, user_nickname=? where user_id=?'
  // 执行SQL语句
  db.query(sql, [user_desc, user_nickname, req.user.user_id], (err,result) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 影响的行数是否等于 1
    if (result.affectedRows !== 1) return res.cc('更换头像失败！')
    // 成功
    res.cc('更新信息成功！', 0)
  })
}

// 更改密码的处理函数
exports.resetPassword = (req,res) => {
  // 获取body中的参数
  let {oldPassword,newPassword} = req.body
  // 定义查询当前用户密码的SQL语句
  const sql = `select user_password from users where user_id=?`
  // 执行查询语句
  db.query(sql, req.user.user_id, (err,result) => {
    // 执行错误
    if(err) return res.cc(err)
    // 查询结果为空
    if(result.length == 0)  return res.cc('获取该用户旧密码失败！')

    // 判断旧密码是否与数据库中的一致
    const compareResult = bcrypt.compareSync(oldPassword, result[0].user_password)
    if (!compareResult) return res.cc('密码错误！')

    // 密码正确 定义更新密码的SQL语句
    const updateSQL = `update users set user_password=? where user_id=?`

    // 调用bcrypt.hashSync()对新密码加密
    newPassword = bcrypt.hashSync(newPassword, 10)

    // 执行SQL语句
    db.query(updateSQL, [newPassword, req.user.user_id], (err,result) => {
      if(err) return res.cc(err)
      if(result.affectedRows != 1) return res.cc('更新密码失败！')

      // 成功
      res.cc('更新密码成功！', 0)
    })
    
  })
  
  
}