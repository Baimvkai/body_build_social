import Vue from 'vue'
import Vuex from 'vuex'
// 注册插件
Vue.use(Vuex)

// 引入小仓库
import user from './user'
import note from './note'
import train from './train'

// 对外暴露
export default new Vuex.Store({
    modules: {
        user,
        note,
        train
    }
})