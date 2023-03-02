const express = require('express')
const router = express.Router()

// 导入处理函数对应模块
const train_handler = require('../router_handler/train')

// 导入处理路径的核心模块
const path = require('path')

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')

// 二级分类文件上传
const secondUpload = multer({dest: path.join(__dirname, '../secondSortImg')});

// 动作文件上传
const actionUpload = multer({dest:path.join(__dirname, '../actionsResource')})

/* 客户端 */

// 获取一级分类数据
router.get('/sort', train_handler.getSort)
// 获取当前一级分类的二级分类列表
router.get('/secondSort', train_handler.getSecondSort)
// 获取当前二级分类的数据
router.post('/secondSortDesc', train_handler.getSecondSortDesc)
// 获取当前二级分类的动作库
router.get('/actions', train_handler.getActions)


/* 后台管理 */

// 添加二级分类, upload.any()可接收一切类型的数据(文本或文件)，文本在req.body中, 文件在req.files中
router.post('/addSecondSort', secondUpload.any(), train_handler.addSecondSort)

// 添加新动作
router.post('/addAction', actionUpload.any(), train_handler.addAction)

module.exports = router