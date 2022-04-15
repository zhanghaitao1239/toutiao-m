// 用户相关请求模块
import request from '@/utils/request'
// import store from '@/store/index.js'
// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data,
  })
}
// 发送验证码
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`,
  })
}
// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user',
    // // 发送请求头数据 要求身份令牌
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  })
}
// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels',
  })
}
// 关注用户
export const addFollowings = (target) =>
  request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target,
    },
  })
// 取消关注用户
export const deleteFollowings = (target) =>
  request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`,
  })
// 获取用户个人资料
export const getuserProfile = () =>
  request({
    method: 'GET',
    url: '/v1_0/user/profile',
  })
// 编辑用户个人资料
export const updataUserProfile = (data) =>
  request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data,
  })
// 编辑用户头像资料
export const updataUserPhoto = (data) =>
  request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data,
  })
