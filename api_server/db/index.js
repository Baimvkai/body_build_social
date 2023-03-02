// 导入数据库操作模块
const mysql = require('mysql2')

// 创建数据库连接对象
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'body_build_app'
})

module.exports = db