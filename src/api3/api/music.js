/*
 * @author WYK
 * 各模块的接口调用
 * Music
 */

// URL列表
import base from "./base"
// 封装过的axios实例
import ajax from "../http.js"
// QS  序列化参数
import QS from "qs"

const music = {
    // 获取mv
    getMv() {
        return ajax.get(`${base.dev}/personalized/mv`)
    },
    // 获取排行榜
    getList() {
        return ajax.post(`${base.dev}/toplist`)
    }
}

export default music
