/*
 * @author WYK
 * 各模块的接口调用
 * Music
 */

// URL列表
import base from '../base'
// 封装过的axios实例
import ajax from '../http.js'
// QS  序列化参数
import qs from 'qs'

const host = base.dev

const music = {
  // 获取mv
  getMv() {
    return ajax.get(`${host}/personalized/mv`)
  },
  // 获取排行榜
  getList(params) {
    return ajax.post(`${host}/toplist`, qs.stringify(params))
  },
  // 获取排行榜
  getList2(params) {
    return ajax.post(`${host}/toplist`, qs.stringify(params, { arrayFormat: 'repeat' })) // 传数组需要此配置
  },
}

export default music
