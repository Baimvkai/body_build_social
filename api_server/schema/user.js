// 导入定义验证规则的包
const joi = require('joi')

// 定义手机号和密码的校验规则
const user_phone = joi.string().pattern(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/).required()
const user_password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义昵称的校验规则
const user_nickname = joi.string().pattern(/^[a-zA-Z0-9_-]{4,8}$/).required()

// 定义验证登录表单数据的规则对象
exports.login_schema = {
  body: {
    user_phone,
    user_password,
  },
}

// 定义验证注册表单数据的规则对象
exports.register_schema = {
  body: {
    user_phone,
    user_password,
    user_nickname
  }
}
