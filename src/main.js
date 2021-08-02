import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 请求文件
import api from '@/api';
// 引入常量
import * as CONSTANT from '@/constant';
// 引入工具函数
import tools from '@/utils/tools';
// 正则
import reg from '@/utils/reg';
// lodash
import _ from 'lodash';
// 引入es6-promise，解决IE不支持的问题
require('es6-promise').polyfill();
// rem(pc端可忽略)
import '@/utils/rem';
// 初始化css
import '@/assets/css/pc/base.css';
// 引入animate.css
import 'animate.css/animate.css';
// 滚动条样式
// import '@/assets/css/scrollBar.less'
// vue-quill-editor富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
// 拖拽插件
import VueDND from 'awe-dnd';
// 图片懒加载，使用本地图片需require()
import vueLazyLoad from 'vue-lazyload';

// ======== 使用
Vue.prototype.$api = api;
Vue.prototype.$C = CONSTANT;
Vue.prototype.$tools = tools;
Vue.prototype.$reg = reg;
Vue.prototype._ = _;
Vue.use(VueQuillEditor);
Vue.use(VueDND);

// 按需加载element-UI
import '@/theme/index.css'; // 自定义主题
import {
  Button,
  Message,
  Notification,
  Table,
  TableColumn,
  Upload,
  MessageBox,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
} from 'element-ui';

Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Upload);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(vueLazyLoad, {
  error: require('@/assets/img/error.jpg'),
  loading: require('@/assets/img/load4.gif')
});

// 注册全局过滤器
import * as filter from '@/filters';
// 导出一个对象，循环注册在vue上
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key]);
});

// 是否显示生产模式的消息
Vue.config.productionTip = false;
// 生产模式不显示调试插件
Vue.config.devtools = process.env.NODE_ENV === 'development';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

//  ┏┓　　　┏┓
// ┏┛┻━━━┛┻┓
// ┃　　　　　　　┃
// ┃　　　━　　　┃
// ┃　┳┛　┗┳　┃
// ┃　　　　　　　┃
// ┃　　　┻　　　┃
// ┃　　　　　　　┃
// ┗━┓　　　┏━┛
//    ┃　　　┃                  神兽保佑
//    ┃　　　┃                  永无BUG！
//    ┃　　　┗━━━┓
//    ┃　　　　　　　┣┓
//    ┃　　　　　　　┏┛
//    ┗┓┓┏━┳┓┏┛
//      ┃┫┫　┃┫┫
//      ┗┻┛　┗┻┛
