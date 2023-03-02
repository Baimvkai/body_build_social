// 导入 express
const express = require('express')
// 创建服务器实例对象
const app = express()
const joi = require('joi')

// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())

// 导入 body—parser并使用解析json数据
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
app.use('/noteData', express.static('./noteData'))
app.use('/secondSortImg', express.static('./secondSortImg'))
app.use('/actionsResource', express.static('./actionsResource'))

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
    // status 默认值为 1，表示失败的情况
    // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({ secret: config.jwtSecreKey }).unless({ path: [/^\/api/] }))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', jsonParser, userRouter)
// 导入并使用用户信息的路由模块
const userInfoRouter = require('./router/userInfo')
app.use('/my', jsonParser, userInfoRouter)
// 导入并使用笔记路由模块
const noteRouter = require('./router/note')
app.use('/note', jsonParser, noteRouter)
// 导入并使用训练路由模块
const trainRouter = require('./router/train')
app.use('/train', jsonParser, trainRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知的错误
    res.cc(err)
})

app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007');
})