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

// 引入es6-promise，解决IE不支持的问题
require("es6-promise").polyfill()


// 初始化css
// pc
import "@/assets/css/pc/base.css"
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

// 图片懒加载
// 使用本地图片需require()
import vueLazyLoad from "vue-lazyload"

Vue.use(vueLazyLoad, {
    error: require("@/assets/img/error.jpg"),
    loading: require("@/assets/img/load4.gif")
})

// 引入进度条
import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from , next) => {
    // 每次切换页面时，调用进度条
    NProgress.start();
    next();
});

router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})


// vue-quill-editor富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);

// 是否显示生产模式的消息
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
