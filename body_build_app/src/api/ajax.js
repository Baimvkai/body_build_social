// 对axios进行二次封装
import axios from "axios";

// 在当前模块中引入store
import store from "@/store";

// 1.利用axios对象的手法create，去创建一个axios实例
// 2.request就是axios，不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求时，路径当中会出现api
    baseURL: '/api',
    // 代表请求超时的时间5s
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    // 需要携带token给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调：服务器响应的数据回来后，响应拦截器可以检测到并做一些业务
    return res.data
}, (err) => {
    // 响应失败的回调
    return Promise.reject(new Error('faile'))
})

export default requests