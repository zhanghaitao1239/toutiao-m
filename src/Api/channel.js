// 频道请求模块
import request from '@/utils/request'

// 获取所有频道列表
export const getChannelAll = () =>
  request({
    method: 'GET',
    url: '/v1_0/channels',
  })

// 设置用户的频道（部分覆盖）
export const addUserChannel = (channel) =>
  request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel],
    },
  })
// 删除用户指定频道请求方式
export const deleteUserChannel = (channelId) =>
  request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`,
  })
