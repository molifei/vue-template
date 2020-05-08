module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    // 输出文件目录
    outputDir: 'output',
    // 静态资源目录
    assetsDir: "assets",
    // 指定生成的index.html的输出路径
    indexPath: "index.html",
    // 静态资源文件名是否包含哈希
    filenameHashing: true,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {
    },
    configureWebpack: () => {
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        // extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: true // 此项设置false会使ele按需加载失败
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-d - server 相关配置
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 2500,
        https: false,
        hot: true, // 是否采取热更新
        hotOnly: true, // 是否只采用热更新方式，禁用模块替换
        // proxy: 'http://127.0.0.1:3000', // 设置代理
        before: app => {
        }
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {limit: 2000})) // 小于2k的图片会转化为base64
    }
}