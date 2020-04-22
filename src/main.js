import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入常量
import * as CDATA from "./constant"

Vue.prototype.CDATA = CDATA

// 引入工具函数
import * as tools from "./utils/tools.js"

Vue.prototype.tools = tools

// 正则
import * as reg from "./utils/reg"

Vue.prototype.reg = reg

// loadsh
import _ from "lodash"

Vue.prototype._ = _



// 初始化css
// pc
// import "@/assets/css/pc/base.css"
// 移动
// import "@/assets/css/mb/base.css"

// 按需加载element-UI
import {Button, Message} from "element-ui"

Vue.use(Button)
Vue.prototype.$message = Message

// 注册全局过滤器
import * as filter from '@/filters'
// 导出一个对象，循环注册在vue上
Object.keys(filter).forEach(key => {
    Vue.filter(key, filter[key])
})

// 是否显示生产模式的消息
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
