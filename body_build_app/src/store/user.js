import { reqUserLogin, reqUserRegister, reqUserInfo, reqUpdateAvatar, reqUpdateAccount, reqResetPassword } from "@/api"
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
  // 存放token
  token: getToken(),
  // 用户信息
  userInfo: {},
  // 当前操作用户ID
  curUserId: sessionStorage.getItem('user_id')
}
const mutations = {
  // 提交token
  USERLOGIN(state, token) {
    state.token = token
  },
  // 提交用户信息
  GETUSERINFO(state, data) {
    state.userInfo = data
  }
}
const actions = {
  // 用户登录
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    console.log(result);
    if (result.status == 0) {
      commit('USERLOGIN', result.token)
      // 持久化存储token
      setToken(result.token)
      return 'ok'
    } else {
      // 返回错误对象
      return Promise.reject(new Error(result.message))
    }
  },
  
  // 用户注册
  async userRegister({ commit }, data) {
    let result = await reqUserRegister(data)
    if (result.status == 0) {
      return 'ok'
    } else {
      // 返回错误对象
      return Promise.reject(new Error(result.message))
    }
  },

  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    console.log(result);
    if (result.status == 0) {
      commit('GETUSERINFO', result.data)
      // 持久化存储当前操作用户ID，方便权限管理
      sessionStorage.setItem('user_id', result.data.user_id)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 更新用户头像
  async updateAvatar({ commit }, formData) {
    let result = await reqUpdateAvatar(formData)
    console.log(result);
    if (result.status == 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 更新用户账户信息
  async updateAccount({ commit }, data) {
    let result = await reqUpdateAccount(data)
    console.log(result);
    if(result.status == 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 更新用户密码
  async resetPassword({ commit }, data) {
    let result = await reqResetPassword(data)
    console.log(result);
    if(result.status == 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}