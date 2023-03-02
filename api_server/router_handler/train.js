// 导入数据库操作模块
const db = require('../db/index')

// 导入fs模块
const fs = require('fs')

// 导入处理路径的核心模块
const path = require('path')

// 客户端

// 获取训练分类的处理函数
exports.getSort = (req, res) => {
  // 定义SQL语句
  const sql = `select * from first_sort`
  // 执行SQL语句
  db.query(sql, (err, result) => {

    if(err) return res.cc(err)
    if(!result.length) return res.cc('查询训练分类失败！')

    res.send({
      status: 0,
      message: '查询训练分类数据成功！',
      data: result
    })

  })
}

// 获取当前分类下具体数据的处理函数
exports.getSecondSort = (req, res) => {
  // 获取GET参数
  const { first_sort_id } = req.query

  // 定义SQL语句
  const sql = `select second_sort_id, second_sort_name, second_sort_img from second_sort where first_sort_id=?`
  // 执行SQL语句
  db.query(sql, first_sort_id, (err,result) => {
    // 执行失败
    if(err) return res.cc(err)
    // 执行成功但是长度为0
    if(!result.length) return res.cc('获取当前分类下数据失败！')

    res.send({
      status: 0,
      message: '获取当前分类数据成功！',
      data: result
    })
  })
}

// 获取当前二级分类的数据的处理函数
exports.getSecondSortDesc = (req, res) => {
  // 获取参数
  const { second_sort_id } = req.body

  // 定义SQL语句
  const sql = `select * from second_sort where second_sort_id=?`
  // 执行SQL语句
  db.query(sql, second_sort_id, (err,result) => {
    // 执行失败
    if(err) return res.cc(err)
    // 执行成功但是结果为空
    if(!result.length) return res.cc('获取当前二级分类数据失败！')

    res.send({
      status: 0,
      message: '获取当前二级分类数据成功！',
      data: result[0]
    })
  })
}

// 获取当前二级分类的动作库
exports.getActions = (req, res) => {
  // 获取GET参数
  const {second_sort_id} = req.query
  // 定义SQL查询语句
  const sql = `select * from actions where second_sort_id=?`
  // 执行SQL语句
  db.query(sql, second_sort_id, (err,result) => {
    // 失败
    if(err) return res.cc(err)
    // 动作库为空
    if(result.length === 0) return res.cc('动作查询失败')

    // 动作库不为空
    res.send({
      status: 0,
      message: '获取动作列表成功!',
      data: result
    })
  })

}

// 后台管理系统

// 添加二级分类的处理函数
exports.addSecondSort = (req, res) => {
  // 获取传递过来的参数
  const {second_sort_name, first_sort_id, second_sort_desc} = req.body

  // 获取图片文件
  const files = req.files

  // 判断是否上传了新头像
  if (!files) return res.cc('请选择二级分类图片！')

  //fs.renameSync(更改之前的名字,更改之后的名字)
  let oldfile = files[0].path
  let newfile = files[0].path + path.parse(files[0].originalname).ext
  fs.renameSync(oldfile, newfile)

  img_url = 'http://localhost:3007/secondSortImg/' + files[0].filename + path.parse(files[0].originalname).ext

  // 定义插入语句
  const sql = `insert into second_sort set second_sort_name=?, second_sort_img=?, first_sort_id=?, second_sort_desc=?`
  // 执行SQL语句
  db.query(sql, [second_sort_name, img_url, first_sort_id, second_sort_desc], (err,result) => {

    // 执行SQL失败
    if(err) return res.cc(err)
    if(result.affectedRows !== 1) return res.cc('添加二级分类失败！')

    // 执行SQL成功
    res.cc('添加二级分类成功！', 0)
  })
}

// 添加动作进入动作库的处理函数
exports.addAction = (req, res) => {
  // 解析POST参数
  const { action_name, action_difficulty, action_resource, second_sort_id } = req.body

  // 获取图片和资源
  const files = req.files

  // 判断是否上传了新头像
  if (!files) return res.cc('请选择动作图片！')

  //fs.renameSync(更改之前的名字,更改之后的名字)
  let oldfile = files[0].path
  let newfile = files[0].path + path.parse(files[0].originalname).ext
  fs.renameSync(oldfile, newfile)

  img_url = 'http://localhost:3007/actionsResource/' + files[0].filename + path.parse(files[0].originalname).ext 

  // 定义插入语句
  const sql = `insert into actions set action_name=?,action_difficulty=?,action_img=?,action_resource=?,second_sort_id=?`
  // 执行SQL语句
  db.query(sql, [action_name, action_difficulty, img_url, action_resource, second_sort_id], (err,result) => {
    // 执行失败
    if(err) return res.cc(err)
    if(result.affectedRows !== 1) return res.cc('添加新动作失败！')

    // 添加成功
    res.cc('添加新动作成功！',0)
  })
}