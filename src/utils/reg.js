// 匹配邮箱
let regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

// 匹配手机号
let regPhone = /^1[0-9]{10}$/;

// 匹配8-16位数字和字母密码的正则表达式
let regPsw = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

// 匹配国内电话号码 0510-4305211
let regCall = /\d{3}-\d{8}|\d{4}-\d{7}/;

// 匹配身份证号码
let regId=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

// 匹配腾讯QQ号
let regQQ = /[1-9][0-9]{4,}/;

// 匹配ip地址
let regIp = /\d+\.\d+\.\d+\.\d+/;

// 匹配中文
let regCn = /^[\u4e00-\u9fa5]*$/;

export {
    regEmail,
    regPhone,
    regPsw,
    regCall,
    regId,
    regQQ,
    regIp,
    regCn,
}
