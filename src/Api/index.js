// 统一管理请求接口
import { login, sendSms, getUserInfo, getUserChannels } from './user.js'
import { getArticles } from './article.js'
import { getChannelAll } from './channel.js'

// 默认向外导出
// 登录
export const loginAPI = login
// 验证码
export const sendSmsAPI = sendSms
// 用户基本信息
export const getUserInfoAPI = getUserInfo
// 用户频道
export const getUserChannelsAPI = getUserChannels
// 用户文章列表
export const getArticlesAPI = getArticles
// 所有频道列表
export const getChannelAllAPI = getChannelAll
