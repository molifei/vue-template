// 过滤器
import moment from "moment";
import {getType} from "@/utils/tools.js"

// 时间过滤
/*
*
* format 想要的时间格式
* cn:是否设置中文，默认否
*
* */
const getDate = (value, cn = false, format = "YYYY MM DD hh:mm:ss") => {
    function chinese() {
        return moment.locale('zh-cn', {
            months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
            monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
            weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
            weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
            weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
            longDateFormat: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY-MM-DD',
                LL: 'YYYY年MM月DD日',
                LLL: 'YYYY年MM月DD日Ah点mm分',
                LLLL: 'YYYY年MM月DD日ddddAh点mm分',
                l: 'YYYY-M-D',
                ll: 'YYYY年M月D日',
                lll: 'YYYY年M月D日 HH:mm',
                llll: 'YYYY年M月D日dddd HH:mm'
            },
            meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
            meridiemHour: function (hour, meridiem) {
                if (hour === 12) {
                    hour = 0;
                }
                if (meridiem === '凌晨' || meridiem === '早上' ||
                    meridiem === '上午') {
                    return hour;
                } else if (meridiem === '下午' || meridiem === '晚上') {
                    return hour + 12;
                } else {
                    // '中午'
                    return hour >= 11 ? hour : hour + 12;
                }
            },
            meridiem: function (hour, minute, isLower) {
                const hm = hour * 100 + minute;
                if (hm < 600) {
                    return '凌晨';
                } else if (hm < 900) {
                    return '早上';
                } else if (hm < 1130) {
                    return '上午';
                } else if (hm < 1230) {
                    return '中午';
                } else if (hm < 1800) {
                    return '下午';
                } else {
                    return '晚上';
                }
            },
            calendar: {
                sameDay: '[今天]LT',
                nextDay: '[明天]LT',
                nextWeek: '[下]ddddLT',
                lastDay: '[昨天]LT',
                lastWeek: '[上]ddddLT',
                sameElse: 'L'
            },
            dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
            ordinal: function (number, period) {
                switch (period) {
                    case 'd':
                    case 'D':
                    case 'DDD':
                        return number + '日';
                    case 'M':
                        return number + '月';
                    case 'w':
                    case 'W':
                        return number + '周';
                    default:
                        return number;
                }
            },
            relativeTime: {
                future: '%s内',
                past: '%s前',
                s: '几秒',
                ss: '%d秒',
                m: '1分钟',
                mm: '%d分钟',
                h: '1小时',
                hh: '%d小时',
                d: '1天',
                dd: '%d天',
                M: '1个月',
                MM: '%d个月',
                y: '1年',
                yy: '%d年'
            },
            week: {
                // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
                dow: 1, // Monday is the first day of the week.
                doy: 4  // The week that contains Jan 4th is the first week of the year.
            }
        })
    }

    cn ? chinese() : ""
    return moment().format(format);
}

// 字数过滤
/*
*
* end :结束的字数
* start :开始的字数
*
* */
const wordLimit = (value, end = 10, start = 0) => {
    // 判断传入的数据类型 如果是数字，转换为字符串，其他的报错
    if (getType(value) === "Number") {
        value += ""
    }else if(getType(value) === "String"){
        return `${value.slice(start, end)}...`
    }else {
        throw Error("参数类型必为数字或字符串")
    }

}

// 切换大小写字母
/*
*
* type：想要切换的类型 默认1
* 1:首字母大写(不管后面字母的大小写)
* 2:首字母大写(后面字母统一小写)
* 3.首字母小写(不管后面字母的大小写)
* 4.大小写互换
* 5.全部大写
* 6.全部小写
*
* */
const getLetter = (value, type = 1) => {
    // console.log(value)
    // 去空格
    value = value.trim()
    switch (type) {
        case 1:
            return value.split("").reduce((prev, item, index) => {
                if (index === 0) {
                    item = item.toUpperCase()
                }
                return prev + item
            }, "");
        case 2:
            return value.split("").reduce((prev, item, index) => {
                if (index === 0) {
                    item = item.toUpperCase()
                } else {
                    item = item.toLowerCase()
                }
                return prev + item
            }, "");
        case 3:
            return value.split("").reduce((prev, item, index) => {
                if (index === 0) {
                    item = item.toLowerCase()
                }
                return prev + item
            }, "");
        case 4:
            return value.split("").reduce((prev, item, index) => {
                // 判断大写正则
                let upReg = /^[A-Z]+$/;
                // let lowReg = "^[a-z]+$"; //用一个即可
                upReg.test(item) ? item = item.toLowerCase() : item = item.toUpperCase()
                return prev + item
            }, "");
        case 5:
            return value.split("").reduce((prev, item, index) => {
                // 判断大写正则
                let upReg = /^[A-Z]+$/;
                // let lowReg = "^[a-z]+$"; //用一个即可
                upReg.test(item) ? item = item : item = item.toUpperCase()
                return prev + item
            }, "");
        case 6:
            return value.split("").reduce((prev, item, index) => {
                // 判断大写正则
                let upReg = /^[A-Z]+$/;
                // let lowReg = "^[a-z]+$"; //用一个即可
                upReg.test(item) ? item = item.toLowerCase() : item = item
                return prev + item
            }, "");
    }
}

// 手机号码，身份证号码等数字类隐藏
/*
*
* start 开头几个数字或字数
* end 结尾几个数字或字数
*
* */
const hideNum = (value, start = 0, end = 0) => {
    // 先判断传入的数据类型 若是数字，转换为字符串
    if (typeof value === "number") {
        // value += ""
        value = value.toString()
    }
    let hide = value.length - start - end

    let str = ""
    for (let i = 0; i < hide; i++) {
        str += "*"
    }
    let regNum = new RegExp(`(\\d{${start}})(\\d{${hide}})(\\d{${end}})`);
    return value.replace(regNum, `$1${str}$3`)
}


export {
    getDate,
    wordLimit,
    getLetter,
    hideNum,
}
