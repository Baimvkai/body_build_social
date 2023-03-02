const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const note_handler = require('../router_handler/note')

// 导入处理路径的核心模块
const path = require('path')

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')

//一次最多上传3个文件
const upload = multer({dest: path.join(__dirname, '../noteData')});

// 获取热门笔记
router.get('/hot', note_handler.getHotNotes)

// 发布新笔记, upload.any()可接收一切类型的数据(文本或文件)，文本在req.body中, 文件在req.files中
router.post('/publish', upload.any(), note_handler.pubNewNote)

// 获取当前笔记基础信息
router.post('/current', note_handler.getCurNote)

// 获取当前笔记的评论
router.post('/comments', note_handler.getComments)

// 发布新评论
router.post('/pubComment', note_handler.pubComment)

// 点赞或取消点赞的操作
router.post('/handleLike', note_handler.handleLike)

// 确认是否点赞
router.post('/comfirmLike', note_handler.comfirmLike)

// 获取喜欢列表
router.get('/likes', note_handler.getLikes)

// 收藏或取消收藏的操作
router.post('/handleCollect', note_handler.handleCollect)

// 确认是否点赞
router.post('/comfirmCollect', note_handler.comfirmCollect)

// 获取收藏列表
router.get('/collections', note_handler.getCollections)

// 获取个人笔记列表
router.get('/personal', note_handler.getPersonalNotes)

// 关键字搜索
router.post('/search', note_handler.searchByKeyword)

// 根据Id删除笔记
router.post('/delete', note_handler.deleteNoteById)

module.exports = router