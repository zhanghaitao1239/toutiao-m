// 二次封装axios请求
import axios from 'axios'
import store from '@/store'
// 导入处理大数字问题的包
import JSONBig from 'json-bigint'

// JSONBig 可以处理数据中超出 JavaScript 案例整数范围的问题
// JSONBig.parse() //把JSON 格式的字符串转为JavaScript对象
// JSONBig.stringify() // JavaScript对象 转为JSON 格式的字符串转
const request = axios.create({
  baseURL: 'http://localhost:8080/', // 接口的基准路径
  // 自定义后端返回的原始数据
  // data:后端返回的原始数据，说白了就是JSON 格式的字符串
  transformResponse: [
    function (data) {
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }
      // axios 默认会在内部这样来处理后端返回的数据
    },
  ],
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
    // console.log(config)
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
