import { 
  reqPubNote, 
  reqGetHotNotes, 
  reqGetCurNote, 
  reqPubComment, 
  reqGetComments, 
  reqHandleLike,
  reqComfirmLikeOrNot,
  reqGetLikes,
  reqHandleCollect,
  reqComfirmCollectOrNot,
  reqGetCollections,
  reqGetPersonalNotes,
  reqSearchNotesByKeyword,
  reqDeleteNoteById
} from "@/api"

const state = {
  // 数组存储笔记数据
  noteList: [],
  // 对象存储当前id笔记
  curNote: {},
  // 存储评论列表
  commentList: {},
  // 判断是否点赞
  isLike: null,
  // 数组存储点赞列表
  likeList: [],
  // 判断是否收藏
  isCollect: null,
  // 收藏列表
  collectionList: [],
  // 个人笔记
  personalList: []
}

const mutations = {
  // 热门笔记列表
  GETHOTNOTES(state, data) {
    state.noteList = data
  },
  // 当前笔记详情
  GETCURNOTE(state, data) {
    state.curNote = data
  },
  // 当前笔记评论列表
  GETCOMMENTS(state, data) {
    state.commentList = data
  },
  // 当前笔记是否点赞
  COMFIRMLIKEORNOT(state, isLike) {
    state.isLike = isLike
  },
  // 个人点赞列表
  GETLIKES(state, data) {
    state.likeList = data
  },
  // 清空仓库中当前笔记详情
  CLEARCURNOTE(state) {
    state.curNote = {}
  },
  // 清空仓库的isLike
  CLEARISLIKE(state) {
    state.isLike = null
  },
  // 清空仓库的isCollect
  CLEARISCOLLECT(state) {
    state.isCollect = null
  },
  // 当前笔记是否收藏
  COMFIRMCOLLECTORNOT(state, isCollect) {
    state.isCollect = isCollect
  },
  // 个人收藏列表
  GETCOLLECTIONS(state, data) {
    state.collectionList = data
  },
  // 个人笔记列表
  GETPERSONALNOTES(state, data) {
    state.personalList = data
  }
}
const actions = {
  // 获取热门笔记
  async getHotNotes({commit},params) {
    let result = await reqGetHotNotes(params)
    console.log(result);
    if(result.status == 0) {
      // 提交到mutation
      commit('GETHOTNOTES', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 发表个人笔记
  async pubNote({commit}, formData) {
    let result = await reqPubNote(formData)
    console.log(result);
    if(result.status == 0) {
      // 不需要提交到mutation
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 获取当前id笔记数据
  async getCurNote({commit}, data) {
    let result = await reqGetCurNote(data)
    console.log(result);
    if(result.status == 0) {
      // 提交到mutation
      commit('GETCURNOTE',result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 获取当前笔记的评论
  async getComments({commit}, data) {
    let result = await reqGetComments(data);
    console.log(result);
    if(result.status == 0 ) {
      // 提交到mutation
      commit('GETCOMMENTS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 发布当前笔记的评论
  async pubComment({commit}, data) {
    let result = await reqPubComment(data)
    console.log(result);
    // 如果成功
    if(result.status == 0) {
      return 'ok'
    }
    // 如果失败
    else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 点赞当前笔记
  async handleLike({commit}, data) {
    let result = await reqHandleLike(data)
    console.log(result);
    if(result.status == 0) {
      return 'ok'
    } else {
      // 如果失败
      return Promise.reject(new Error(result.message))
    }
  },

  // 确认是否点赞
  async comfirmLikeOrNot({commit}, data) {
    let result = await reqComfirmLikeOrNot(data)
    console.log(result);
    if(result.status == 0) {
      commit('COMFIRMLIKEORNOT', result.isLike)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 获取点赞过的笔记
  async getLikes({commit}) {
    let result = await reqGetLikes()
    console.log(result);
    if(result.status == 0){
      commit('GETLIKES', result.data)
      return 'ok'
    } else if(!result.data) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 收藏当前笔记
  async handleCollect({commit}, data) {
    let result = await reqHandleCollect(data)
    console.log(result);
    if(result.status == 0) {
      // 成功
      return 'ok'
    } else {
      // 失败
      return Promise.reject(new Error(result.message))
    }
  },

  // 确认是否收藏
  async comfirmCollectOrNot({commit}, data) {
    let result = await reqComfirmCollectOrNot(data)
    console.log(result);
    if(result.status == 0) {
      // 提交
      commit('COMFIRMCOLLECTORNOT', result.isCollect)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 获取收藏过的笔记
  async getCollections({commit}) {
    let result = await reqGetCollections()
    console.log(result);
    if(result.status == 0) {
      commit('GETCOLLECTIONS',result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 获取个人发布的笔记
  async getPersonalNotes({commit}) {
    let result = await reqGetPersonalNotes()
    console.log(result);
    if(result.status == 0) {
      commit('GETPERSONALNOTES', result.data)
    } else {
      return Promise.reject(new Error(result.message))
    }
  },

  // 搜索关键字笔记
  searchNotesByKeyword({commit}, data) {
    let result = reqSearchNotesByKeyword(data)
    console.log(result);
    // 返回Promise对象
    return result
  },

  // 根据ID删除指定笔记
  async deleteNoteById({commit}, data) {
    let result = await reqDeleteNoteById(data)
    console.log(result);
    if(result.status === 0) {
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