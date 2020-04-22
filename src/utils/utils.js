import { message, Modal } from 'antd';
import ajax from 'components/base/ajax';
import React from 'react';

const _ = {};

const extend = (_.extend = function(o1, o2, override) {
    for (const i in o2) {
        if (o1[i] === undefined || o1[i] === null || o1[i] === '' || override) {
            o1[i] = o2[i];
        }
    }
    return o1;
});

// 类型判断， 同typeof
_.typeOf = function(o) {
    return o == null
        ? String(o)
        : {}.toString
              .call(o)
              .slice(8, -1)
              .toLowerCase();
};

// 深度clone
_.clone = function(obj) {
    const type = _.typeOf(obj);
    switch (type) {
        case 'object': {
            const cloned = {};
            for (const i in obj) {
                cloned[i] = _.clone(obj[i]);
            }
            return cloned;
        }
        case 'array':
            return obj.map(_.clone);
        default:
            return obj;
    }
};

// 合并输入的所有对象
_.combine = function() {
    const args = [].slice.call(arguments, 0);
    return args.reduce((previous, current) => {
        return extend(previous, current);
    }, {});
};

/**
 * 文件下载
 * @param $event        废弃
 * @param targetName
 * @param url
 * @param method        废弃
 * @param propArr       废弃
 * @param queryParam 公共查询条件
 * 备注：
 * 1.导出的是整张表，只与公共三个参数相关：时间，类目，运营方式
 *   而与当前排序方式，当前分页情况没有关系
 * 2.不通过ajax，通过动态的创建一个form表单来提供动态下载
 *   用一个隐藏的iframe做跳转目标，从而实现本页面内的非跳转下载
 */
// TODO 原函数有很多冗余参数和代码, 维护时应逐步替换成exportFile2
_.exportFile = function($event, targetName, url, method, propsArr, queryParam) {
    _.exportFile2({
        url,
        param: queryParam,
        name: targetName
    });
};

/**
 * post文件下载
 * @author wuziran (hzwuziran@corp.netease.com)
 * @param targetName
 * @param url
 * @param queryParam 公共查询条件
 * 备注：
 * 1.导出的是整张表，只与公共三个参数相关：时间，类目，运营方式
 *   而与当前排序方式，当前分页情况没有关系
 * 2.不通过ajax，通过动态的创建一个form表单来提供动态下载
 *   用一个隐藏的iframe做跳转目标，从而实现本页面内的非跳转下载
 */
_.exportFile2 = function(name, url, param, method) {
    const option = name;
    if (typeof option === 'object') {
        url = option.url;
        name = option.name;
        param = option.param;
        method = option.method || 'post';
    }

    // 专门用于跳转的一个iframe
    let div = document.getElementById(`div-${name}`);
    const iframeId = 'iframe4download' + name;
    if (!div) {
        div = document.createElement('div');
        div.setAttribute('id', `div-${name}`);
        div.innerHTML = `<iframe style="display:none;" id="${iframeId}" name="${iframeId}"></iframe>`;
        document.body.appendChild(div);
    }

    // 通过targetName创建一个form来专门提交下载请求
    const formIdPrefix = `${name}auto-gen-form-`;
    const inputIdPrefix = `${name}auto-gen-inp-`;
    const formNodeId = formIdPrefix + name;
    let formNode = document.getElementById(formNodeId);
    if (!formNode) {
        let html = `<form id="${formNodeId}" action="${url}" target="${iframeId}" method="${method}" class="form-hide" style="display:none;">`;
        for (const key in param) {
            if (!Object.prototype.hasOwnProperty.call(param, key)) {
                continue;
            }
            html += `<input name="${key}" type="hidden" value="" id="${inputIdPrefix}${key}"/>`;
        }
        html += '</form>';
        formNode = _.createElementByHTML(html);
        div.appendChild(formNode);
    }

    formNode.encoding = 'application/json';
    formNode.enctype = 'application/json';

    // 2.拼装到form中并提交
    formNode.childNodes.forEach(item => {
        item.value = param[item.name];
    });

    // 3.提交
    formNode.submit();
    formNode.remove();
};

_.createElementByHTML = function(html) {
    const buffer = document.createElement('div');
    buffer.innerHTML = html;
    return buffer.childNodes[0];
};

/**
 * 逗号分割数字
 * @param  {value} value 数值
 * @return {string}       转化结果
 */
_.formatNumber = function(value) {
    if (value === undefined) {
        return;
    }
    let head = '';
    if (value < 0) {
        value = -value;
        head = '-';
    }
    value = value + '';
    const body = _.formatInt(value.split('.')[0]);
    let tail = value.split('.')[1];
    if (!tail) {
        tail = '';
        return head + body;
    }
    return [head + body, tail].join('.');
};

/**
 * 逗号分割整数
 * @param  {value} value 数值
 * @return {string}       转化结果
 */
_.formatInt = function(value) {
    if (value === undefined || value === null) {
        return value;
    }
    const num = parseInt(value).toString();
    if (num === 'NaN') {
        return value;
    }
    const parts = num.toString().split('.');
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 从字符串中提取时间数组对象
 * @param  {string} str 时间字符, 格式'2016-01-01~2016-12-30'
 * @return {array|number}     时间数组([起始时间, 结束时间]), -1为存在转化失败
 */
_.extractDatesFromStr = function(str) {
    if (str === null || str === undefined) {
        return -1;
    }
    let valid = true;
    const arr = str.split('~').map(item => {
        const date = new Date(item);
        if (date !== 'Invalid Date') {
            return date;
        }
        valid = false;
        return -1;
    });
    return valid ? arr : -1;
};

/**
 * 转化成中文单位数字
 * @param  {number} value 数值
 * @param  {number} tail 小数点位数
 * @param  {number} tail
 * @return {string}       转化结果
 */
_.formatCN = function(value, tail = 2, comma, round) {
    if (value === '-' || value === undefined || value === null) {
        return value;
    }
    let res;
    let type = 1;
    if (value < 0) {
        type = -1;
    }
    value = Math.abs(value);
    if (value >= 1e4 && value < 1e8) {
        res = (value / 1e4).toFixed(tail);
        return (comma ? _.formatNumber(res * type) : res * type) + '万';
    } else if (value >= 1e8) {
        if (value % 1e8) {
            res = (value / 1e8).toFixed(tail);
            return (comma ? _.formatNumber(res * type) : res * type) + '亿';
        }
        res = parseInt(value / 1e8);
        return (comma ? _.formatNumber(res * type) : res * type) + '亿';
    }
    res = value.toFixed(tail);
    return round ? Math.round(res * type) : comma ? _.formatNumber(res * type) : res * type;
};
/**
 * 根据映射表将src中的属性转成对应的属性名, 并返回新的对象(不是深拷贝)
 * @param  {object} src    源对象
 * @param  {array} mapping 映射表, [{from: 'oldName', to: 'newName'}]
 * @return {object} 映射后的对象
 */
_.mappingToObject = function(src, mapping, filterOutUndefined) {
    const obj = {};
    src = src || {};
    filterOutUndefined = filterOutUndefined === undefined ? true : filterOutUndefined;
    mapping.forEach(mapper => {
        if (filterOutUndefined && src[mapper.from] === undefined) {
            return;
        }
        obj[mapper.to] = src[mapper.from] || null;
    });
    return obj;
};

/**
 * 或者Regular组件方法
 * @param  {object} Target     扩展对象
 * @param  {object} Source     方法来源
 * @param  {array}  methodList 方法列表
 * @return {object} Target     扩展对象
 */
_.mixinRegular = function(Target, Source, methodList) {
    const source = new Source();
    if (methodList.length) {
        const methodMap = {};
        methodList.forEach(methodName => {
            if (source[methodName]) {
                methodMap[methodName] = source[methodName];
            }
        });
        Target.implement(methodMap);
    }
    return Target;
};

// 函数执行频度控制， added by hzliuxinqi refer from underscore
/**
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
_.throttle = function(func, wait, options) {
    let context, args, result;
    let timeout = null;
    // 上次执行时间点
    let previous = 0;
    if (!options) {
        options = {};
    }
    // 延迟执行函数
    const later = function() {
        // 若设定了开始边界不执行选项，上次执行时间始终为0
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) {
            context = args = null;
        }
    };
    return function() {
        const now = +new Date();
        // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
        if (!previous && options.leading === false) {
            previous = now;
        }
        // 延迟执行时间间隔
        const remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
        // remaining大于时间窗口wait，表示客户端系统时间被调整过
        if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
            // 如果延迟执行不存在，且没有设定结尾边界不执行选项
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        传入函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
_.debounce = function(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) {
                    context = args = null;
                }
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
};

_.getYesterday = function() {
    return _.getPeriod(-1, -1);
};

/**
 * 获取指定时间段 'yyyy-MM-dd~yyyy-MM-dd'
 * @param  {number} startFromNow 开始时间距离现在的天数 今天：0，明天：1，昨天：-1
 * @param  {number} endFromNow   结束时间距离现在的天数
 * @return {string}
 */
_.getPeriod = function(startFromNow, endFromNow) {
    return _.getTheDay(startFromNow) + '~' + _.getTheDay(endFromNow);
};
_.formatPeriod = function(period) {
    if (period) {
        const formatPeriod = period.replace(/-/g, '').split('~');
        return formatPeriod;
    }
    return [undefined, undefined];
};

_.getTheDay = function(daysFromNow) {
    const MS_A_DAY = 24 * 3600 * 1000;
    const NOW = new Date();
    return _._$format(new Date(NOW.getTime() + MS_A_DAY * daysFromNow * 1), 'yyyy-MM-dd');
};

_.pathExist = function(obj, path) {
    if (obj === undefined || obj === '') {
        return false;
    }
    if (path === '') {
        return true;
    }

    const keys = path.split(/\[|\]|\./).filter(item => {
        return item !== '';
    });
    let root = obj;
    let res = true;
    keys.every(key => {
        if (/^\d*$/.test(key)) {
            key = parseInt(key);
        }
        if (root[key] === undefined) {
            res = false;
            return false;
        }
        root = root[key];
        return true;
    });
    return res;
};

_.extendPeriodBackward = function(period, days) {
    if (period === undefined) {
        return period;
    }
    const dates = period.split('~');
    dates[0] = new Date(dates[1]);
    dates[1] = new Date(dates[1]);
    dates[0] = dates[0].setDate(dates[0].getDate() - days + 1);
    return _._$format(dates[0], 'yyyy-MM-dd') + '~' + _._$format(dates[1], 'yyyy-MM-dd');
};

/**
 * 页面平平滑滚动到指定位置
 * @param  {Number}   target 指定位置
 * @param  {Number}   speed  速度
 * @param  {Function} cb     滚动完成后的回调
 * @return {void}
 */
_.scrollTo = function(target, speed, cb) {
    let offset = window.scrollY;
    speed = speed || 50;
    const isScrollUp = target <= offset;
    if (isScrollUp) {
        speed = -speed;
    }
    const timer = setInterval(() => {
        offset += speed;
        window.scrollTo(0, offset);
        if ((isScrollUp && offset <= target) || (!isScrollUp && offset >= target)) {
            clearInterval(timer);
            if (typeof cb === 'function') {
                cb();
            }
        }
    }, 16);
};

/**
 * 获取css数值字符串中的数值
 * @param {String} str
 */
_.getNum = function(str) {
    return ('' + str).split('px')[0] - 0;
};

/**
 * 获取元素高度数值
 * @param {Element} elem
 */
_.getElementHeight = function(elem) {
    const computedStyle = window.getComputedStyle(elem);
    const height =
        _.getNum(computedStyle.marginTop) +
        _.getNum(computedStyle.borderTopWidth) +
        _.getNum(elem.offsetHeight) +
        _.getNum(computedStyle.borderBottomWidth) +
        _.getNum(computedStyle.marginBottom);
    return height;
};

/**
 * 获取内容区高度
 * @param {Element} elem
 */
_.getContentHeight = function(elem) {
    return elem.offsetHeight - _.getPaddingHeight(elem);
};

/**
 * 获取累积的padding高度
 * @param {Element} elem
 */
_.getPaddingHeight = function(elem) {
    const computedStyle = window.getComputedStyle(elem);
    const paddingTop = _.getNum(computedStyle.paddingTop);
    const paddingBottom = _.getNum(computedStyle.paddingBottom);

    return paddingTop + paddingBottom;
};

/**
 * 删除数组中所有key==value的对象
 * @author yubaoquan
 */
_.deleteInArray = function(arr, key, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] === value) {
            arr.splice(i, 1);
            i--;
        }
    }
};

/*
 * 查看数据是否指定类型
 * @param  {Variable} 数据
 * @param  {String}   类型
 * @return {Boolean}  是否指定类型
 */
_._isTypeOf = function(_data, _type) {
    try {
        _type = _type.toLowerCase();
        if (_data === null) return _type === 'null';
        if (_data === undefined) return _type === 'undefined';
        return Object.prototype.toString.call(_data).toLowerCase() === '[object ' + _type + ']';
    } catch (e) {
        return !1;
    }
};

_._$isString = function(_data) {
    return _._isTypeOf(_data, 'string');
};

_._$isDate = function(_data) {
    return _._isTypeOf(_data, 'date');
};

_._$var2date = function(_time) {
    let _date = _time;
    if (_._$isString(_time)) {
        _date = new Date(Date.parse(_time));
    }
    if (!_._$isDate(_date)) {
        _date = new Date(_time);
    }
    return _date;
};

_._$encode = function(_map, _content) {
    _content = '' + _content;
    if (!_map || !_content) {
        return _content || '';
    }
    return _content.replace(_map.r, $1 => {
        const _result = _map[!_map.i ? $1.toLowerCase() : $1];
        return _result != null ? _result : $1;
    });
};

_._$format = (function() {
    const _map = { i: !0, r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g };
    const _12cc = ['上午', '下午'];
    const _12ec = ['A.M.', 'P.M.'];
    const _week = ['日', '一', '二', '三', '四', '五', '六'];
    const _cmon = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    const _emon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const _fmtnmb = function(_number) {
        _number = parseInt(_number) || 0;
        return (_number < 10 ? '0' : '') + _number;
    };
    const _fmtclc = function(_hour) {
        return _hour < 12 ? 0 : 1;
    };
    return function(_time, _format, _12time) {
        if (!_time || !_format) return '';
        _time = _._$var2date(_time);
        _map.yyyy = _time.getFullYear();
        _map.yy = ('' + _map.yyyy).substr(2);
        _map.M = _time.getMonth() + 1;
        _map.MM = _fmtnmb(_map.M);
        _map.eM = _emon[_map.M - 1];
        _map.cM = _cmon[_map.M - 1];
        _map.d = _time.getDate();
        _map.dd = _fmtnmb(_map.d);
        _map.H = _time.getHours();
        _map.HH = _fmtnmb(_map.H);
        _map.m = _time.getMinutes();
        _map.mm = _fmtnmb(_map.m);
        _map.s = _time.getSeconds();
        _map.ss = _fmtnmb(_map.s);
        _map.ms = _time.getMilliseconds();
        _map.w = _week[_time.getDay()];
        const _cc = _fmtclc(_map.H);
        _map.ct = _12cc[_cc];
        _map.et = _12ec[_cc];
        if (_12time) {
            _map.H = _map.H % 12;
        }
        return _._$encode(_map, _format);
    };
})();

_.merge = function(obj1, obj2) {
    const type1 = _.typeOf(obj1);
    const type2 = _.typeOf(obj2);

    if (type1 !== type2) return obj2;
    switch (type2) {
        case 'object':
            for (const i in obj2) {
                if (Object.prototype.hasOwnProperty.call(obj2, i)) {
                    obj1[i] = _.merge(obj1[i], obj2[i]);
                }
            }
            break;
        case 'array':
            for (let i = 0, len = obj2.length; i < len; i++) {
                obj1[i] = _.merge(obj1[i], obj2[i]);
            }
            obj1.length = obj2.length;
            break;
        default:
            return obj2;
    }
    return obj1;
};

_.mergeList = function(list, list2, ident) {
    ident = ident || 'id';
    let len = list.length;
    for (; len--; ) {
        for (let i = 0, len1 = list2.length; i < len1; i++) {
            if (list2[i][ident] != null && list2[i][ident] === list[len][ident]) {
                list.splice(len, 1, _.merge(list2[i], list[len]));
                break;
            }
        }
    }
};

_._$object2query = function(obj) {
    let res = '';

    Object.keys(obj).forEach(key => {
        res += `${key}=${encodeURIComponent(obj[key])}&`;
    });
    return res.slice(0, -1);
};

_._$query2object = function(_query) {
    return _._$string2object(_query, '&');
};

_._$string2object = function(_string, _split) {
    const _obj = {};
    (_string || '').split(_split).forEach(_name => {
        const _brr = _name.split('=');
        if (!_brr || !_brr.length) return;
        const _key = _brr.shift();
        if (!_key) return;
        _obj[decodeURIComponent(_key)] = decodeURIComponent(_brr.join('='));
    });
    return _obj;
};

_.getStringLength = str => {
    return str.replace(/[\u4e00-\u9fa5]/g, 'aa').length;
};

_.copy = text => {
    const copyFrom = document.createElement('textarea');
    const body = document.getElementsByTagName('body')[0];
    copyFrom.textContent = text;
    body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    body.removeChild(copyFrom);
    message.success('复制成功', 5);
};

_.convertNumToSymbol = num => {
    const result = [];
    while (num) {
        let t = num % 26;
        if (!t) {
            t = 26;
            --num;
        }
        result.push(String.fromCodePoint(t + 64));
        num = ~~(num / 26);
    }
    return result.reverse().join('');
};

// alias
_.format = _._$format;

_.strip = (num, precision = 12) => {
    return +parseFloat(num.toPrecision(precision));
};

_.percentFormat = (num, tail = 2, precision = 12) => {
    if (num == null) {
        return null;
    }
    const tmp = typeof num === 'string' ? Number(num) : num;
    return +parseFloat(tmp.toPrecision(precision) * 100).toFixed(tail) + '%';
};

_.formatDateLabel = dateStr => {
    const date = dateStr.slice(-2);
    const month = dateStr.slice(-4, -2);
    const year = dateStr.slice(0, 4);
    return `${year}-${month}-${date}`;
};

_.logTable = info => {
    console.log(
        info,
        'background:#35495e ; padding: 4px; border-radius: 0;  color: #fff',
        'background:#41b883 ; padding: 4px; border-radius: 0;  color: #fff',
        'background:transparent'
    );
};

// 新导出功能
_.newExportFile = async ({ url, param }) => {
    const modal = Modal.info({
        okButtonProps: {
            loading: true
        },
        width: 550,
        icon: null,
        centered: true,
        content: '正在上传玄机藏',
        okText: '确定'
    });

    try {
        const result = await ajax.request({
            url,
            method: 'post',
            data: param,
            // timeout: 1
            timeout: 20 * 1000
        });

        if (result.code === 200) {
            modal.update({
                okButtonProps: {
                    loading: false
                },
                content: React.createElement('div', {}, [
                    React.createElement('p', { key: 0 }, '上传成功：'),
                    React.createElement(
                        'a',
                        {
                            className: 'u-clickable',
                            key: 1,
                            href: result.data,
                            target: '_blank'
                        },
                        [result.data]
                    )
                ])
            });
        } else {
            throw new Error(result.message);
        }
    } catch (e) {
        const isTimeout = /timeout/.test(e.message);
        if (isTimeout) {
            modal.update({
                okButtonProps: {
                    loading: false
                },
                content: React.createElement('div', {}, [React.createElement('p', { key: 0 }, '上传时间过长，下载链接将通过邮件发送')])
            });
        } else {
            modal.update({
                okButtonProps: {
                    loading: false
                },
                content: React.createElement('div', {}, [React.createElement('p', { key: 0 }, '导出失败')])
            });
        }
    } finally {
        console.log('清除超时定时器');
    }
};

export default _;
