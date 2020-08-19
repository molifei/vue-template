import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入常量
import * as CDATA from "@/constant"

Vue.prototype.CDATA = CDATA

// 引入工具函数
import tools from "@/utils/tools"

Vue.prototype.$tools = tools

// 正则
import reg from "@/utils/reg"

Vue.prototype.$reg = reg

// loadsh
import _ from "lodash"

Vue.prototype._ = _

// 引入es6-promise，解决IE不支持的问题
require("es6-promise").polyfill()

// rem
import "@/utils/rem"

// 初始化css
// pc
import "@/assets/css/pc/base.css"
// 移动
// import "@/assets/css/mb/base.css"

// 引入animate.css
import "animate.css/animate.css"

// 滚动条样式
import "@/assets/css/scrollBar.less"

// rem
// import "./utils/rem"

// 按需加载element-UI
import '@/theme/index.css'
import {Button, Message, Notification, Table, TableColumn,} from "element-ui"

Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification;

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

// vue-quill-editor富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)

// 是否显示生产模式的消息
Vue.config.productionTip = false

// 请求文件
import api from "@/api"

Vue.prototype.$api = api

// websocket
import VueNativeSock from 'vue-native-websocket'
// Vue.use(VueNativeSock,base.lkWebSocket,{
//     // 启用Vuex集成,store的值为你的vuex
//     store: store,
//     // 数据发送/接收使用使用json格式
//     format: "json",
//     // 开启自动重连
//     reconnection: true,
//     // 尝试重连的次数
//     reconnectionAttempts: 5,
//     // 重连间隔时间
//     reconnectionDelay: 3000,
//     // 将数据进行序列化，由于启用了json格式的数据传输这里需要进行重写
//     passToStoreHandler: function (eventName, event) {
//         if (!eventName.startsWith('SOCKET_')) { return }
//         let method = 'commit';
//         let target = eventName.toUpperCase();
//         let msg = event;
//         if (this.format === 'json' && event.data) {
//             msg = JSON.parse(event.data);
//             if (msg.mutation) {
//                 target = [msg.namespace || '', msg.mutation].filter((e) => !!e).join('/');
//             } else if (msg.action) {
//                 method = 'dispatch';
//                 target = [msg.namespace || '', msg.action].filter((e) => !!e).join('/');
//             }
//         }
//         this.store[method](target, msg);
//         this.store.state.socket.message = msg;
//     }
// });

// 生产模式不显示调试插件
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//  ┏┓　　　┏┓
//┏┛┻━━━┛┻┓
//┃　　　　　　　┃
//┃　　　━　　　┃
//┃　┳┛　┗┳　┃
//┃　　　　　　　┃
//┃　　　┻　　　┃
//┃　　　　　　　┃
//┗━┓　　　┏━┛
//    ┃　　　┃                  神兽保佑
//    ┃　　　┃                  永无BUG！
//    ┃　　　┗━━━┓
//    ┃　　　　　　　┣┓
//    ┃　　　　　　　┏┛
//    ┗┓┓┏━┳┓┏┛
//      ┃┫┫　┃┫┫
//      ┗┻┛　┗┻┛
