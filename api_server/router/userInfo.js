// 导入express
const express = require('express')
const router = express.Router()

// 导入处理函数模块
const userInfo_handler = require('../router_handler/userInfo')

// 导入处理路径的核心模块
const path = require('path')
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({
    // 文件上传的位置
    dest: path.join(__dirname, '../uploads'),
    /* fileFilter(req, file, callback) {
        // 解决中文名乱码的问题
        file.originalname = Buffer.from(file.originalname, "latin1").toString(
            "utf8"
        );
        callback(null, true);
    } */
})

// 获取用户信息
router.get('/userinfo', userInfo_handler.getUserInfo)

// 更新头像
router.post('/update/avatar', upload.single('avatar_img'), userInfo_handler.updateAvatar)

// 更新用户信息
router.post('/update/account', userInfo_handler.updateAccount)

// 更新密码
router.post('/resetPass', userInfo_handler.resetPassword)

module.exports = router