// 导入数据库
const db = require('../db/index')

// 导入fs模块
const fs = require('fs')

// 导入处理路径的核心模块
const path = require('path')

// 获取热门笔记的处理函数(默认排序)
exports.getHotNotes = (req,res) => {
  // 获取参数
  const id = req.user.user_id
  const {sort} = req.query

  // 定义SQL语句
  let sql = ``

  // 根据sort赋值SQL语句
  if(sort==0) {
    sql = `select notes.note_id,note_title,photo_album,note_like_count,isLike,users.user_id,user_nickname,user_avatar from notes
    inner join users on users.user_id=notes.user_id
    left join (select note_id,isLike from likes
    where user_id=?) as c on c.note_id=notes.note_id
    order by notes.note_id desc`
  } else if(sort == 1) {
    sql = `select notes.note_id,note_title,photo_album,note_like_count,isLike,users.user_id,user_nickname,user_avatar from notes
    inner join users on users.user_id=notes.user_id
    left join (select note_id,isLike from likes
    where user_id=?) as c on c.note_id=notes.note_id
    order by note_like_count desc`
  } else if(sort == 2) {
    sql = `select notes.note_id,note_title,photo_album,note_like_count,isLike,users.user_id,user_nickname,user_avatar from notes
    inner join users on users.user_id=notes.user_id
    left join (select note_id,isLike from likes
    where user_id=?) as c on c.note_id=notes.note_id
    order by note_collection_count desc`
  }
  
  // 执行SQL语句
  db.query(sql, id, (err,result) => {
    // 执行失败
    if(err) return res.cc(err)
    if(result.length==0) return res.cc('获取热门笔记失败')

    // 执行成功
    res.send({
      status: '0',
      message: '获取热门笔记成功',
      data: result
    })
  })

}

// 发布新笔记的处理函数
exports.pubNewNote = (req,res) => {
  // req.body存储文本信息, 获取客户端发送到服务器的表单文本信息
  let { title, content } = req.body
  // req.files存储文件信息
  let files = req.files

  // 判断是否上传了图片
  if (!req.files) return res.cc('请选择图片！')

  // 定义一个数组存放图片链接
  let photo_album = []

  //遍历图片(文件)数组, fs.renameSync(更改之前的名字,更改之后的名字)
  for(let i=0; i<files.length; i++) {
    let oldfile = files[i].path
    let newfile = files[i].path + path.parse(files[i].originalname).ext
    fs.renameSync(oldfile, newfile)

    img_url = 'http://localhost:3007/noteData/' + files[i].filename + path.parse(files[i].originalname).ext

    // 将每张图片链接添加到链接数组中
    photo_album.push(img_url)
  }

  // 定义SQL语句, 插入新的笔记 
  const sql = `insert into notes set note_title=?, note_content=?, photo_album=?, user_id=?, note_date=date_format(now(),'%Y-%m-%d %H:%I')`
  // 将图片数组转换为json字符串
  let photo_album_json = JSON.stringify(photo_album)
  // 调用db.query执行SQL语句
  db.query(sql, [title, content, photo_album_json, req.user.user_id], (err, result) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 影响的行数是否等于 1
    if (result.affectedRows !== 1) return res.cc('发布笔记失败！')
    
    // 发布笔记成功
    res.send({
      status: '0',
      message: '发表笔记成功!'
    })
  })
  
  
}

// 获取当前笔记信息的处理函数
exports.getCurNote = (req,res) => {
  const id = req.body.note_id
  // 定义SQL语句
  const sql = `select * from notes inner join users on notes.user_id=users.user_id where note_id=?`
  // 执行SQL语句
  db.query(sql, id, (err,result) => {

    // 执行SQL语句失败
    if (err) return res.cc(err)
    // 执行SQL语句成功，但查询结果为空
    if (result.length == 0) return res.cc('获取当前id的笔记失败')

    res.send({
      status: '0',
      message: '获取当前笔记成功',
      data: result[0]
    })
  })

}

// 获取当前笔记的评论列表的处理函数
exports.getComments = (req,res) => {
  // 获取笔记id
  const note_id = req.body.note_id
  // 定义SQL语句
  const sql = `select * from comments inner join users on comments.user_id=users.user_id where note_id=?`
  // 执行SQL语句
  db.query(sql, note_id, (err, result) => {

    // 执行SQL语句失败
    if (err) return res.cc(err)
    // 执行SQL语句成功，但查询结果为空，返回一个空数组
    if (result.length == 0) return res.send({
      status: '0',
      message: '评论空空如也',
      data: []
    })

    res.send({
      status: '0',
      message: '获取当前评论列表成功',
      data: result
    })
  })
}

// 发布当前笔记评论的处理函数
exports.pubComment = (req, res) => {
  // 获取评论相关数据
  const { comment_content, note_id } = req.body
  const user_id = req.user.user_id
  // 定义SQL语句
  const sql = `insert into comments set user_id=?, note_id=?, comment_content=?, comment_date=date_format(now(),'%Y-%m-%d %H:%I')`
  // 调用db.query执行SQL语句
  db.query(sql, [ user_id, note_id, comment_content ], (err,result)=>{
    // 执行SQL语句失败
    if (err) return res.cc(err)
    // 执行SQL语句成功，影响行数是否为1
    if (result.affectedRows !== 1) return res.cc('发布笔记评论失败')

    // 执行成功, 定义更新对应笔记评论数的语句(评论数在notes表中)
    const updateSQL =  `UPDATE notes AS a SET note_comment_count = (select count(*) FROM comments WHERE note_id=a.note_id)`

    // 执行更新语句
    db.query(updateSQL, (err, result) => {
      // 执行SQL语句失败
      if (err) return res.cc(err)
      // 执行SQL语句成功，影响行数为0
      if (result.affectedRows == 0) return res.cc('更新该笔记的评论数失败')

      // 返回结果
      res.send({
        status: '0',
        message: '发布评论成功'
      })
    })

    
  })
}

// 点赞或取消点赞的处理函数
exports.handleLike = (req,res) => {
  // 获取客户端信息
  const {note_id,isLike} = req.body
  // 定义SQL语句
  let sql = ``
  // 根据isLike确定SQL语句
  if(isLike) {
    // 如果isLike为1，即点赞，则定义插入语句
    sql = `insert into likes set note_id=?, user_id=?`
  } else {
    // 如果isLike为0，即取消点赞，则定义删除语句
    sql = `delete from likes where note_id=? and user_id=?`
  }

  // 执行SQL语句
  db.query(sql, [ note_id, req.user.user_id ], (err,result) => {

    // 执行SQL语句失败
    if(err) return res.cc(err)
    // 执行成功，但是影响行数不为1
    if(result.affectedRows !== 1) return res.cc('点赞或取消点赞失败')

    // 执行成功，定义统计并更新点赞数(note_like_count)的SQL语句(note_like_count在notes表中)
    const updateSQL = `update notes as a set note_like_count = ( select count(*) from likes where note_id = a.note_id)`

    // 执行更新语句
    db.query(updateSQL, (err,result) => {
      // 执行SQL语句失败
      if (err) return res.cc(err)
      // 执行SQL语句成功，但是影响行数为0
      if (result.affectedRows == 0) return res.cc('更新该笔记的点赞数失败')

      // 返回结果
      res.send({
        status: '0',
        message: isLike ? '点赞成功':'取消点赞成功'
      })
    })
  })
}

// 确认当前用户是否点赞的处理函数
exports.comfirmLike = (req,res) => {
  // 定义点赞标识符
  var isLike
  // 获取数据
  const note_id = req.body.note_id
  // 定义查询的SQL语句
  const sql = `select * from likes where note_id=? and user_id=?`
  // 执行SQL语句
  db.query(sql, [note_id, req.user.user_id],(err,result) => {
    // 执行语句失败
    if(err) return res.cc(err)
    // 执行成功，但是结果为空(即没有点赞)
    if(result.length == 0) {
      isLike = false
    } else {
      isLike = true
    }

    // 返回数据
    res.send({
      status: '0',
      message: isLike? '用户已点赞' : '用户未点赞',
      isLike
    })
  })
}

// 获取当前用户的喜欢列表的处理函数
exports.getLikes = (req, res) => {
  // 解析参数 当前账号id
  const id = req.user.user_id
  // 定义查询SQL语句 三表连接
  const sql = `select notes.note_id,note_title,photo_album,isLike,note_like_count,users.user_id,user_nickname,user_avatar from notes
    inner join likes on notes.note_id=likes.note_id 
    inner join users on users.user_id=notes.user_id
    where likes.user_id=?`
  // 执行SQL语句
  db.query(sql, id, (err,result) => {
    if(err) return res.cc(err)
    if(result.length === 0) return res.cc('点赞列表为空', 0)

    res.send({
      status: 0,
      message: '获取点赞列表成功！',
      data: result
    })
  })
}

// 收藏或取消收藏的处理函数
exports.handleCollect = (req, res) => {
  // 获取客户端信息
  const {note_id,isCollect} = req.body
  // 定义SQL语句
  let sql = ``

  // 根据isLike确定SQL语句
  if(isCollect) {
    // 如果isCollect为1，即收藏，则定义插入语句
    sql = `insert into collections set note_id=?, user_id=?`
  } else {
    // 如果isCollect为0，即取消收藏，则定义删除语句
    sql = `delete from collections where note_id=? and user_id=?`
  }

  // 执行SQL语句
  db.query(sql, [ note_id, req.user.user_id ], (err,result) => {

    // 执行SQL语句失败
    if(err) return res.cc(err)
    // 执行成功，但是影响行数不为1
    if(result.affectedRows !== 1) return res.cc('收藏或取消收藏失败')

    // 执行成功，定义统计并更新收藏数(note_collection_count)的SQL语句(note_like_count在notes表中)
    const updateSQL = `update notes as a set note_collection_count = ( select count(*) from collections where note_id = a.note_id)`

    // 执行更新语句
    db.query(updateSQL, (err,result) => {
      // 执行SQL语句失败
      if (err) return res.cc(err)
      // 执行SQL语句成功，但是影响行数为0
      if (result.affectedRows == 0) return res.cc('更新该笔记的收藏数失败')

      // 返回结果
      res.send({
        status: '0',
        message: isCollect ? '收藏成功':'取消收藏成功'
      })
    })
  })
}

// 确认当前用户是否收藏当前笔记的处理函数
exports.comfirmCollect = (req, res) => {
  // 定义点赞标识符
  var isCollect
  // 获取数据
  const note_id = req.body.note_id
  // 定义查询的SQL语句
  const sql = `select * from collections where note_id=? and user_id=?`
  // 执行SQL语句
  db.query(sql, [note_id, req.user.user_id],(err,result) => {
    // 执行语句失败
    if(err) return res.cc(err)
    // 执行成功，但是结果为空(即没有点赞)
    if(result.length == 0) {
      isCollect = false
    } else {
      isCollect = true
    }

    // 返回数据
    res.send({
      status: '0',
      message: isCollect? '用户已收藏' : '用户未收藏',
      isCollect
    })
  })
}

// 获取当前用户收藏列表的处理函数
exports.getCollections = (req, res) => {
  // 获取当前用户Id
  const id = req.user.user_id
  // 定义查询SQL语句
  const sql = `select notes.note_id,note_title,photo_album,note_like_count,users.user_id,user_nickname,user_avatar from notes
    inner join collections on notes.note_id=collections.note_id
    inner join users on users.user_id=notes.user_id
    left join (select isLike,note_id from likes where likes.user_id=?) as d on d.note_id=collections.note_id
    where collections.user_id=?`
  // 执行SQL语句
  db.query(sql, [id,id], (err,result) => {
    if(err) return res.cc(err)
    if(result.length === 0) return res.cc('收藏列表为空', 0)

    res.send({
      status: 0,
      message: '获取收藏列表成功！',
      data: result
    })
  }) 
}

// 获取个人发布的笔记的处理函数
exports.getPersonalNotes = (req, res) => {
  // 获取参数
  const id = req.user.user_id
  // 定义查询语句
  const sql = `select notes.note_id,note_title,photo_album,note_like_count,isLike,user_avatar,user_nickname from notes 
    left join likes on likes.note_id=notes.note_id and likes.user_id=?
    inner join users on notes.user_id=users.user_id
    where notes.user_id=?`
  // 执行SQL
  db.query(sql, [id,id], (err,result) => {
    // 执行语句失败
    if(err) return res.cc(err)
    // 查询结果为空
    if(result.length === 0) return res.cc('个人笔记列表为空！')

    // 查询结果不为空
    res.send({
      status: '0',
      message: '获取个人笔记列表成功',
      data: result
    })
  })
}

// 模糊搜索的处理函数
exports.searchByKeyword = (req, res) => {
  // 获取数据
  const {keyword} = req.body
  // 定义SQL语句
  const sql = `select notes.note_id,note_title,photo_album,note_like_count,users.user_id,user_nickname,user_avatar from notes 
    inner join users on notes.user_id=users.user_id 
    where note_title like "%${keyword}%"`
  // 执行SQL语句
  db.query(sql, (err,result) => {

    if(err) return res.cc(err)
    if(result.length === 0) return res.cc('没有相关结果',0)

    res.send({
      status: '0',
      message: '查询成功！',
      data: result
    })
  })
}

// 删除指定Id笔记的处理函数
exports.deleteNoteById = (req, res) => {
  // 获取body中的Id
  const {note_id} = req.body
  // 定义删除表notes中数据的SQL语句
  const sql = `delete from notes where notes.note_id=?`
  // 执行语句
  db.query(sql, note_id, (err,result) => {
    // 执行错误
    if(err) return res.cc(err)
    // 影响行数为0
    if(result.affectedRows == 0) return res.cc('删除笔记表数据失败！')
    
    // 定义删除likes表中数据的SQL语句
    const deleteLikeSql = `delete from likes where likes.note_id=?`
    // 执行语句
    db.query(deleteLikeSql, note_id, (err,result) => {
      // 执行错误
      if(err) return res.cc(err)

      // 定义删除collections表数据的SQL语句
      const deleteCollectionSql = `delete from collections where collections.note_id=?`
      // 执行语句
      db.query(deleteCollectionSql, note_id, (err,result) => {
        // 执行错误
        if(err) return res.cc(err)

        // 执行成功
        res.cc('删除笔记成功！', 0)
      })
    })
    
  })
}