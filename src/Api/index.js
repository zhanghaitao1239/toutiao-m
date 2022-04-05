// 统一管理请求接口
import { login, sendSms, getUserInfo, getUserChannels } from './user.js'
import { getArticles } from './article.js'

// 默认向外导出
export const loginAPI = login

export const sendSmsAPI = sendSms

export const getUserInfoAPI = getUserInfo

export const getUserChannelsAPI = getUserChannels

export const getArticlesAPI = getArticles
