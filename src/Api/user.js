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
