# template

## 安装
```
npm install
cnpm i
yarn
```

### 启动
```
npm run serve
```

### 打包
```
npm run build
```


### 涉及
```
各类工具函数
```


### 运行
```
127.0.0.1:2500
```

问题
-
* elementUI按需加载失效（全加载样式也无效）：vue.config.js的css字段中的requireModuleExtension属性设置为false，应为true
* 后台接收数组使用@RequestParam List<Long>格式问题：api文件qs模块序列化参数时，如传参为数组，应在序列化的参数之后设置{arrayFormat: 'repeat'}

