/*
 * @author WYK
 * @date 2020-05-07 15:47:03
 * axios封装文件
 *
 */

// 引入axios文件
import axios from 'axios'
// vuex
import store from '../store/index'
import Vue from 'vue'
import router from '../router';

const _this = Vue.prototype

// 跳转登录页面  携带当前跳转页面的路由，以便登录完成之后返回原页面
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 请求失败之后的统一处理
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
  case 401: // 未登录
    toLogin()
    break;
  case 402: // token过期
    _this.$message.warning('登录过期，请重新登录')
    // 将vuex中的token更新
    // ......

    // 跳转至登录页面
    setTimeout(function() {
      toLogin()
    }, 1000)
    break
  case 404:
    _this.$message.error('未找到资源')
    break
  case 500:
    _this.$message.error('服务器错误')
    break
  }
}

// 创建一个axios实例
const ajax = axios.create({
  timeout: 10000000000
})

ajax.defaults.withCredentials = true

// 设置post请求头
ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
ajax.interceptors.request.use(
  (config) => {
    // do sth
    // 每次请求的请求头携带token，先从local中  或者vuex中获取token
    // const token = store.state.token
    // token && (config.headers.Authorization = token)

    return config
  },
  (error) => {
    // do sth

    return Promise.reject(error)
  }
)

// 响应拦截器
ajax.interceptors.response.use(
  // 请求成功时
  (response) => {
    // 响应
    // 状态码为200
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      // do sth

      return Promise.reject(response)
    }
  },
  // 请求失败的时候
  (error) => {
    // do sth

    // 从错误中提取response
    const { response } = error

    if (response) {
      // 当请求发出，但是状态码不是 2XX
      errorHandle(response.status, response.data.message)
      return Promise.reject(response);
    } else {
      // 断网
      if (!window.navigator.onLine) {
        _this.$message.error('断网了哦')
      } else {
        return Promise.reject(error)
      }
    }
    return Promise.reject(error.response)
  }
)

export default ajax
