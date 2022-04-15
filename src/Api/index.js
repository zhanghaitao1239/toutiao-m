// 统一管理请求接口
import { login, sendSms, getUserInfo, getUserChannels, addFollowings, deleteFollowings, getuserProfile, updataUserProfile, updataUserPhoto } from './user.js'
import { getArticles, getArticelInfo, addCollect, deleteCollect, addLike, deleteLike } from './article.js'
import { getChannelAll, addUserChannel, deleteUserChannel } from './channel.js'
import { getSearchSuggestion, getSearchResult } from './search.js'
import { getComment, addCommentLikings, deleteCommentLikings, addComment } from './comment.js'

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
// 获取用户个人资料
export const getuserProfileAPI = getuserProfile
// 编辑用户个人资料
export const updataUserProfileAPI = updataUserProfile
// 编辑用户头像资料
export const updataUserPhotoAPI = updataUserPhoto
// 获取文章新闻详情
export const getArticelInfoAPI = getArticelInfo
// 收藏文章
export const addCollectAPI = addCollect
// 取消收藏文章
export const deleteCollectAPI = deleteCollect
// 添加点赞
export const addLikeAPI = addLike
// 取消点赞
export const deleteLikeAPI = deleteLike
// 所有频道列表
export const getChannelAllAPI = getChannelAll
// 添加用户频道
export const addUserChannelAPI = addUserChannel
// 删除用户频道
export const deleteUserChannelAPI = deleteUserChannel
// 搜索建义
export const getSearchSuggestionAPI = getSearchSuggestion
// 搜索结果
export const getSearchResultAPI = getSearchResult
// 关注用户
export const addFollowingsAPI = addFollowings
// 取消关注
export const deleteFollowingsAPI = deleteFollowings
// 获取评论列表
export const getCommentAPI = getComment
// 对评论或评论回复点赞
export const addCommentLikingsAPI = addCommentLikings
// 取消对评论或评论回复点赞
export const deleteCommentLikingsAPI = deleteCommentLikings
// 发布评论或回复评论
export const addCommentAPI = addComment
