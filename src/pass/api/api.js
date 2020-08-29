/*
*
* 旧
*
* 发送ajax请求的模块
*   函数的返回值是promise对象
*
*   优化1：统一处理请求异常
*       在外层包裹一个自己的promise对象
*       请求出错时，不reject(err),而是显示错误提示
*
*   优化2：异步得到的不是res,而是res.data
*       请求成功resolve的时候，resolve(res.data)
*
* */

import axios from 'axios'

import Vue from 'vue';

axios.defaults.baseURL='https://manage.zhou-yuanwai.com/comprehens'

function ajax(url, data = {}, type = 'get') {

  // 处理请求异常
  return new Promise(((resolve, reject) => {
    let promise;
    // 1.执行异步ajax请求
    if (type === 'get') { // 若请求方式是get
      promise = axios.get(url, {
        params: data
      })
    } else if (type === 'post') { // 若请求方式是get
      promise = axios.post(url, data)
    }

    // 2.如果成功了，调用resolve(value)
    promise.then(res => {
      resolve(res)
    }).catch(err => {
      // 3.如果失败了，不调用reject(value)，显示提示异常信息
      Message.error('请求异常，请刷新重试')
    })
  }));
}

export default ajax