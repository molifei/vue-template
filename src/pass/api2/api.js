/*
 * @author WYK
 * @date 2020-05-07 15:47:03
 * axios封装文件
 *
 */

// 引入axios文件
import axios from "axios"
// QS  序列化参数
import QS from "qs"
// vuex
import store from "../../store"
import Vue from "vue"

const _this = Vue.prototype

// 环境切换时的公共地址切换
if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
} else if (process.env.NODE_ENV === "production") {
    axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
}

// 请求超时时间
axios.defaults.timeout = 10000;

axios.defaults.withCredentials = true;// 跨域携带cookie

// post请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    function (config) {
        // do sth

        return config
    },
    function (error) {
        // do sth

        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    function (response) {
        // 响应
        // 状态码为200
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            // do sth

            return Promise.reject(response)
        }
    },
    function (error) {
        // do sth

        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    router.replace({
                        path: "/login"
                    })
                    break
            }
        }

        return Promise.reject(error.response)
    }
)

/*
 * get请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @return {Promise}
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => reject(err))
    })
}

/*
 * post请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @return {Promise}
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res)
            })
            .catch(err => reject(err))
    })
}
