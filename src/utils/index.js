// 工具函数

// 测试
const test = function () {
    // console.log("utils is ok")
};

// 判断类型
const getType = function (data) {
    // data = "你好 小明"
    // let reg = / ^\s]$/gi;
    // console.log(data.match(reg));
    return Object.prototype.toString.call(data).split(" ")[1].split("]")[0]
};

// 防抖
/*
*
* func：执行函数
* wait：等待时间
* immediate：是否立即执行函数
*
* */
const debounce = function (func, wait, immediate) {
    if (!typeof func === "function" && !typeof wait === "number" && !typeof immediate === "boolean") throw new Error("error:Wrong arguments type");

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
            }, wait);
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
};

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

    if (!typeof func === "function" && !typeof wait === "number" && !(typeof options) === Object) throw new Error("error:Wrong arguments type");

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
};

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
    if (!Array.isArray(arr)) throw new Error("type error:argument must be a Array");

    // console.log(arr);
    let target = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        target.indexOf(arr[i]) === -1 ? target.push(arr[i]) : ""
    }
    return target
};

// 获取地址栏参数,转化为对象
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
};

// 深拷贝
const deepCopy = function (data) {
    // 判断传入参数类型
    let type = getType(data);
    if (type !== "Object" && type !== "Array") {
        throw new Error("参数需为对象或数组")
    }

    // 设置具体类型
    let target = type === "Array" ? [] : {};

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
};

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
    if (getType(arr) !== "Array") throw new Error("请传入一个数组");
    // 报错处理
    switch (type) {
        case 1:
            if (num > len) throw new Error("单个数组长度超过原数组长度");
            break;
        case 2:
            // 若是子数组的个数 > 原数组长度，报错
            if (num > len) throw new Error(`最少分为${len}组`);
            break;
    }

    let len = arr.length;
    let target = [];

    // 如果指定个数，先获取组数
    if (type === 2) {
        // 向上取整
        num = Math.ceil(len / num)
    }

    // 按照每组个数循环
    for (let i = 0; i < len; i += num) {
        target.push(arr.slice(i, i + num))
    }

    return target


    // switch (type) {
    //     case 1:
    //         // console.log(len)
    //         // 若是一个子数组的个数 > 原数组长度，报错
    //         if (num > len) throw new Error("单个数组长度超过原数组长度")
    //
    //         for (let i = 0; i < len; i += num) {
    //             target.push(arr.slice(i, i + num))
    //         }
    //         // console.log(target)
    //         return target
    //     case 2:
    //         // 若是子数组的个数 > 原数组长度，报错
    //         if (num > len) throw new Error(`最少分为${len}组`)
    //         let group = Math.ceil(len / num)
    //         console.log(group)
    //
    //         for (let i = 0; i < len; i += group) {
    //             target.push(arr.slice(i, i + group))
    //         }
    //         return target
    // }
}

// 本地存储类
/*
*
* type:
*      1.localStorage
*      2.sessionStorage
*
* */

// 判断是否支持storage
function isSupport(type) {
    if (arguments.length === 0) throw  new Error("请传入参数，以便判断浏览器是否支持web存储")
    console.log(type);
    switch (type) {
        case 1:
            if (!window.localStorage) {
                throw  new Error("浏览器不支持localStorage")
            }
            break;
        case 2:
            if (!window.sessionStorage) {
                throw  new Error("浏览器不支持sessionStorage")
            }
            break;
    }
}

// 存储类型
function sType(type = 1) {
    let store;
    switch (type) {
        case 1:
            store = window.localStorage;
            break;
        case 2:
            store = window.sessionStorage;
            break;
    }
    return store
}

// 存
const saveS = function (key, value, type = 1) {
    // 判断浏览器是否支持存储
    isSupport(type);

    // 判断类型  如果不是字符类型，转换为字符串
    // if (getType(value) !== "String") value = JSON.stringify(value);// 会自动转换

    let store = sType(type)

    switch (type) {
        case 1:
            store.setItem(key, value);
            break;
        case 2:
            store.setItem(key, value);
            break;
    }
};

// 取
const getS = function (key, type = 1) {
    let store = sType(type)
    return JSON.parse(store.getItem(key))
};

// 删
const delS = function (key, type = 1) {
    let store = sType(type)
    store.removeItem(key)
};

// 全删
/*
*
* type:
*      1.删除localStorage (默认)
*      2.删除sessionStorage
*
* */
const delA = function (type = 1) {
    let store = sType(type);
    store.clear()
};

// 敏感符号转义 xss
const entities = function (value) {
    let list = {
        '"': '&quot;',
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return value.replace(/["<>&]/g, target => {
        return list[target]
    })
};

// 判断是否苹果设备
const isIos = function () {
    let u = navigator.userAgent;
    console.log(u)
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        // return "Android";
        return false
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        // return "iPhone";
        return true
    } else if (u.indexOf('iPad') > -1) {//iPad
        // return "iPad";
        return false
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
        // return "Windows Phone";
        return false
    } else {
        return false
    }
};

// 判断是否是PC端
const isPC = function () {
    let userAgentInfo = navigator.userAgent,
        Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"],
        flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};

const browserType = function () {
    let userAgent = navigator.userAgent, //取得浏览器的userAgent字符串
        isOpera = userAgent.indexOf("Opera") > -1, //判断是否Opera浏览器
        isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera, //判断是否IE浏览器
        isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1,
        isEdge = userAgent.indexOf("Edge") > -1 && !isIE, //判断是否IE的Edge浏览器
        isFF = userAgent.indexOf("Firefox") > -1, //判断是否Firefox浏览器
        isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1, //判断是否Safari浏览器
        isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion === 7) return "IE7";
        else if (fIEVersion === 8) return "IE8";
        else if (fIEVersion === 9) return "IE9";
        else if (fIEVersion === 10) return "IE10";
        else return "IE7以下"//IE版本过低
    }
    if (isIE11) return 'IE11';
    if (isEdge) return "Edge";
    if (isFF) return "FireFox";
    if (isOpera) return "Opera";
    if (isSafari) return "Safari";
    if (isChrome) return "Chrome";
};

export {
    test,
    getType,
    debounce,
    throttle,
    removeRepeat,
    getURL,
    deepCopy,
    breakArr,
    saveS,
    getS,
    entities,
    isIos,
    isPC,
    browserType,
}
