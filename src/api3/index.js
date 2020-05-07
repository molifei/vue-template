/*
 * @author WYK
 * @date 2020-05-07 15:47:21
 * 接口管理文件
 *
 */

// http://localhost:3000/personalized/mv

import {get, post} from "./api"

export const getA = ()=>get("http://localhost:3000/personalized/mv")

export const getB = ()=>post("http://localhost:3000/personalized/mv")
