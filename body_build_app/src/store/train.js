import { reqGetFirstSort,reqGetSecondSort,reqGetSecondSortDesc,reqGetActions } from '@/api/index'

const state = {
  // 标签页
  tabs: [],
  // 标签下的二级分类列表
  trainList: [],
  // 当前二级分类界面
  curTrain: {},
  // 存储动作库
  actions: []
}
const mutations = {
  // 提交标签页数据
  GETFIRSTSORT(state, tabs) {
    state.tabs = tabs
  },
  // 提交当前标签页下的二级分类
  GETSECONDSORT(state, trainList) {
    state.trainList = trainList
  },
  // 提交二级分类的相关数据
  GETSECONDSORTDESC(state, curTrain) {
    state.curTrain = curTrain
  },
  // 提交二级分类下的动作库
  GETACTIONS(state, actions) {
    state.actions = actions
  },
  // 清空curTrain上次留下的数据
  CLEARCURTRAIN(state) {
    state.curTrain = {}
  },
}

const actions = {
  // 获取一级分类
  async getFirstSort({commit}) {
    let result = await reqGetFirstSort()
    console.log(result);
    if(result.status == 0) {
      // 提交到mutation
      commit('GETFIRSTSORT', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 获取当前一级分类下的二级分类
  async getSecondSort({commit}, params) {
    let result = await reqGetSecondSort(params)
    console.log(result);
    if(result.status == 0) {
      commit('GETSECONDSORT', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 获取二级分类的简要信息
  async getSecondSortDesc({commit}, data) {
    let result = await reqGetSecondSortDesc(data)
    console.log(result);
    if(result.status == 0) {
      commit('GETSECONDSORTDESC', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 清空curTrain
  clearCurTrain({commit}) {
    // console.log('清空curTrain，防止闪回');
    commit('CLEARCURTRAIN')
    return 'ok'
  },
  // 获取动作列表
  async getActions({commit}, params) {
    let result = await reqGetActions(params)
    console.log(result);
    // 成功获取数据
    if(result.status == 0) {
      commit('GETACTIONS',result.data)
      return 'ok'
    }
    // 数据结果为空
    else if(!result.data) {
      return 'ok'
    }
    // 执行SQL错误错误 
    else {
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