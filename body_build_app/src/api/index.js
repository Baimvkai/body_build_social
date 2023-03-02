// 引入二次封装好的axios
import axios from 'axios'
import { requests,mostRequests,uploadFile } from './api'

// 用户注册
export const reqUserRegister = (data) => requests({
    url: '/register',
    method: 'POST',
    data
})

// 用户登录
export const reqUserLogin = (data) => requests({
    url: '/login',
    method: 'POST',
    data
})

// 获取用户信息
export const reqUserInfo = () => mostRequests({
    url: '/my/userinfo',
    method: 'GET'
})

// 更新用户头像
export const reqUpdateAvatar = (formData) => uploadFile({
    url: '/my/update/avatar',
    method: 'POST',
    data: formData,
    processData: false,
    contentType: false,
})

// 更新用户账户信息
export const reqUpdateAccount = (data) => mostRequests({
  url: '/my/update/account',
  method: 'POST',
  data
})

// 更改用户密码
export const reqResetPassword = (data) => mostRequests({
  url: '/my/resetPass',
  method: 'POST',
  data
})

// 获取热门笔记
export const reqGetHotNotes = (params) => mostRequests({
  url: '/note/hot',
  method: 'GET',
  params
})

// 发布个人笔记
export const reqPubNote = (formData) => uploadFile({
  url: '/note/publish',
  method: 'POST',
  data: formData,
  processData: false,
  contentType: false,
})

// 获取当前笔记
export const reqGetCurNote = (data) => mostRequests({
  url: '/note/current',
  method: 'POST',
  data
})

// 获取当前笔记的评论列表
export const reqGetComments = (data) => mostRequests({
  url: '/note/comments',
  method: 'POST',
  data
})

// 发布笔记评论
export const reqPubComment = (data) => mostRequests({
  url: '/note/pubComment',
  method: 'POST',
  data
})

// 点赞或取消点赞
export const reqHandleLike = (data) => mostRequests({
  url: '/note/handleLike',
  method: 'POST',
  data
})

// 确定当前是否点赞
export const reqComfirmLikeOrNot = (data) => mostRequests({
  url: '/note/comfirmLike',
  method: 'POST',
  data
})

// 获取一级分类
export const reqGetFirstSort = () => mostRequests({
  url: '/train/sort',
  method: 'GET'
})

// 获取当前分类下的二级分类
export const reqGetSecondSort = (params) => mostRequests({
  url: '/train/secondSort',
  method: 'GET',
  params
})

// 获取当前二级分类数据
export const reqGetSecondSortDesc = (data) => mostRequests({
  url: '/train/secondSortDesc',
  method: 'POST',
  data
})

// 获取当前动作库
export const reqGetActions = (params) => mostRequests({
  url: '/train/actions',
  method: 'GET',
  params
})

// 获取点赞列表
export const reqGetLikes = () => mostRequests({
  url: '/note/likes',
  method: 'GET'
})

// 收藏或取消收藏
export const reqHandleCollect = (data) => mostRequests({
  url: '/note/handleCollect',
  method: 'POST',
  data
})

// 确认是否收藏
export const reqComfirmCollectOrNot = (data) => mostRequests({
  url: '/note/comfirmCollect',
  method: 'POST',
  data
})

// 获取收藏列表
export const reqGetCollections = () => mostRequests({
  url: '/note/collections',
  method: 'GET'
})

// 获取个人发布的笔记
export const reqGetPersonalNotes = () => mostRequests({
  url: '/note/personal',
  method: 'GET'
})

// 获取关键字笔记
export const reqSearchNotesByKeyword = (data) => mostRequests({
  url: '/note/search',
  method: 'POST',
  data
})

// 删除指定ID的笔记
export const reqDeleteNoteById = (data) => mostRequests({
  url: '/note/delete',
  method: 'POST',
  data
})