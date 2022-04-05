import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import '@/styles/index.less'
// 引入vant组件库
import Vant from 'vant'
// 引入vant全局样式
import 'vant/lib/index.css'
// 加载动态设置 REM 基准值
import 'amfe-flexible'
// 导入axios 解决跨域问题
// import axios from 'axios'
// 注册使用vant组件库
Vue.use(Vant)
// 配置根路径
// axios.defaults.baseURL = 'http://localhost:8080'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
