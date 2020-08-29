import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/lazy',
    name: 'Lazy',
    component: () => import('../views/Lazy/Lazy'),
    children: [
      {
        path: '/lazy/son',
        name: 'lazy-son',
        component: () => import('../views/Lazy/LazySon'),
      }
    ]
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('../views/Edit/Edit')
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import('../views/Music/Music')
  },
  {
    path: '/ws',
    name: 'Ws',
    component: () => import('../views/WebSocket/WebSocket')
  },
  {
    path: '/st',
    name: 'StoreTest',
    component: () => import('../views/StoreTest/StoreTest')
  },
  {
    path: '/move',
    name: 'Move',
    component: () => import('../views/Move/Move')
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/chart',
    component: () => import('../Layout/Layout'),
    children: [
      {
        path: '/chart',
        name: 'Chart',
        component: () => import('../views/Chart/Chart')
      },
      {
        path: '/table',
        name: 'Table',
        component: () => import('../views/TableShow/TableShow')
      },
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound/NotFound')
  },
]

const router = new VueRouter({
  // mode: 'hash',
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router
