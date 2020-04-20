// 工具函数

// 测试
import th from "element-ui/src/locale/lang/th";

const test = function () {
    // console.log("utils is ok")
}

// 判断类型
const getType = function (data) {
    // data = "你好 小明"
    // let reg = / ^\s]$/gi;
    // console.log(data.match(reg));
    return Object.prototype.toString.call(data).split(" ")[1].split("]")[0]
}

// 防抖
/*
*
* func：执行函数
* wait：等待时间
* immediate：是否立即执行函数
*
* */
const debounce = function (func, wait, immediate) {
    if (!typeof func === "function" && !typeof wait === "number" && !typeof immediate === "boolean") throw new Error("error:Wrong arguments type")

    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
        return result;
    };

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

// 节流：持续触发事件，每隔一段时间，只触发一次事件
/*
*
* func：执行函数
* wait：等待时间
* options：
*         leading：false 表示禁用第一次执行
*         railing: false 表示禁用停止触发的回调
*
* */
const throttle = function (func, wait, options) {

    if (!typeof func === "function" && !typeof wait === "number" && !(typeof options) === Object) throw new Error("error:Wrong arguments type")

    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function () {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function () {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}

/* 用法示例 */
// container.onmousemove = throttle(getUserAction, 1000);
// container.onmousemove = throttle(getUserAction, 1000, {
//     leading: false
// });
// container.onmousemove = throttle(getUserAction, 1000, {
//     trailing: false
// });

// 数组去重
/*
*
* arr：需去重的数组
*
* */
const removeRepeat = function (arr) {
    if (!Array.isArray(arr)) throw new Error("type error:argument must be a Array")

    // console.log(arr);
    let target = [arr[0]]
    for (let i = 1; i < arr.length; i++) {
        target.indexOf(arr[i]) === -1 ? target.push(arr[i]) : ""
    }
    return target
}

// 获取地址栏参数
/*
*
* 若未传参数，默认解析当前url
*
* */
const getURL = function (url) {
    if (arguments.length === 0) {
        url = window.location.href
    }
    return url
}

// 深拷贝
const deepCopy = function (data) {
    // 判断传入参数类型
    let type = getType(data)
    if (type !== "Object" && type !== "Array") {
        throw new Error("参数需为对象或数组")
    }

    // 设置具体类型
    let target = type === "Array" ? [] : {}

    for (let key in data) {
        // console.log(data[key])
        // 判断每一项是否还是数组或者对象
        if (data[key === "object"]) {
            deepCopy(data[key])
        } else {
            target[key] = data[key]
        }
    }
    return target
}

// 分割数组
/*
*
* type：按什么方式分割
*       1：每组要几个
*       2：我要几组
*
* */
const breakArr = function (arr, type = 1, num = 1) {
    // 判断参数类型
    if (getType(arr) !== "Array") throw new Error("请传入一个数组")
    switch (type) {
        case 1:
            let len = arr.length
            // console.log(len)
            // 若是一个子数组的个数 > 原数组长度，报错
            if (num > len) throw new Error("超过原数组长度")
            let target = []
            let newArr = []
            for (let i = 0; i < len; i++) {
                console.log(arr[i])
            }
            break;
    }
}

export {
    test,
    getType,
    debounce,
    throttle,
    removeRepeat,
    getURL,
    deepCopy,
    breakArr
}
