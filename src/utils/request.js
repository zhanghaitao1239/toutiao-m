// 二次封装axios请求
import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://localhost:8080/', // 接口的基准路径
  // baseURL: 'http://toutiao-app.itheima.net/', // 备用接口
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 请求发起会经过这里
    // config 配置对象：本次请求配置对象
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    console.log(config)
    // 注意：这是务必要返回 config 配置对象，否则请求就停在这里出不去了
    return config
  },
  function (error) {
    // 如果请求出错了（还没有发出去）会进行这里
    return Promise.reject(error)
  }
)
// 响应拦截器

// 默认向外导出
export default request
