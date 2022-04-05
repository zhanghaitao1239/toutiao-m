import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由规则数据
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },

  {
    path: '/',
    // name: 'layout',// 如果父路由有默认子路由，那它的name 没有意义
    component: () => import('@/views/Layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home', // 默认子路由
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
      },
      {
        path: 'quesetion',
        name: 'quesetion',
        component: () => import('@/views/Question/index.vue'),
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/Video/index.vue'),
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/My/index.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
