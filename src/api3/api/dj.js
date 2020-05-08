/*
 * @author WYK
 * 各模块的接口调用
 * Dj
 */

// URL列表
import base from "./base"
// 封装过的axios实例
import ajax from "../http.js"
// QS  序列化参数
import QS from "qs"

const dj = {
    // 获取电台推荐
    getDj() {
        return ajax.get(`${base.dev}/dj/recommend`)
    }
}

export default dj
