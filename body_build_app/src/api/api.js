import axios from "axios";

import store from "@/store";

// 用户登录注册(无需携带token)
export const requests = axios.create()
requests.defaults.baseURL = '/api'
requests.defaults.timeout = 5000
// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调：服务器响应的数据回来后，响应拦截器可以检测到并做一些业务
    return res.data
}, (err) => {
    // 响应失败的回调
    return Promise.reject(new Error('faile'))
})

// 请求其他信息(需要携带token)
export const mostRequests = axios.create()
mostRequests.defaults.timeout = 5000
// 请求拦截器
mostRequests.interceptors.request.use((config) => {
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    // 需要携带token给服务器
    if (store.state.user.token) {
        config.headers.Authorization = store.state.user.token
    }
    return config
})
// 响应拦截器
mostRequests.interceptors.response.use((res) => {
    // 成功的回调：服务器响应的数据回来后，响应拦截器可以检测到并做一些业务
    return res.data
}, (err) => {
    // 响应失败的回调
    return Promise.reject(new Error('faile'))
})

let tokenString = localStorage.getItem('token')

// 上传文件(需要携带token)
export const uploadFile = axios.create()
// uploadFile.defaults.baseURL = '/my'
uploadFile.defaults.timeout = 5000
uploadFile.defaults.headers.common['Authorization'] = tokenString
uploadFile.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// 响应拦截器
uploadFile.interceptors.response.use((res) => {
    // 成功的回调：服务器响应的数据回来后，响应拦截器可以检测到并做一些业务
    return res.data
}, (err) => {
    // 响应失败的回调
    return Promise.reject(new Error('faile'))
})
