// vuex容器
import Vue from 'vue'
import Vuex from 'vuex'
// 导入本地存储模块
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER' // token的名字

export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息（token等数据）
    // 当页面初始化时，就先获取本地存储中的token值
    user: getItem(TOKEN_KEY),
  },
  getters: {},
  mutations: {
    // 固定参数
    setUser(state, data) {
      state.user = data
      // 为了防止刷新丢失，我们需要把数据备份到本地存储
      setItem(TOKEN_KEY, state.user)
    },
  },
  actions: {},
  modules: {},
})
