const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const CompressionWebpackPlugin = require('compression-webpack-plugin');

const productionGzipExtensions = ['js', 'css'];

module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  // 静态资源目录
  assetsDir: 'assets',
  // 指定生成的index.html的输出路径
  indexPath: 'index.html',
  // 静态资源文件名是否包含哈希
  filenameHashing: false,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => { // 覆盖webpack配置
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 2000 })); // 小于2k的图片会转化为base64

    config
      .plugin('html')
      .tap(args => {
        args[0].title = '';
        return args;
      });
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    // 忽略/moment/locale下的所有的文件
    config
      .plugin('ignore')
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    // 使用webpack4新特性来拆分代码
    config
      .optimization
      .splitChunks({
        chunks: 'all',
        minSize: 0, // 形成一个代码块的最小体积
        maxAsyncRequests: 5, // 按需加载时最大的并行请求数
        maxInitialRequests: 3, // 最大初始化请求数
        automaticNameDelimiter: '~', // 打包分隔符
        name: true,
        cacheGroups: {
          // default: {
          //   name: 'common',
          //   chunks: 'initial',
          //   minChunks: 1 // 模块被引用2次以上的才抽离
          // },
          elementUi: {
            name: 'elementUi',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
            priority: 30,
            minChunks: 2,
          }
          // quill: {
          //   name: 'quill',
          //   chunks: 'all',
          //   test: /[\\/]node_modules[\\/](quill)[\\/]/,
          //   priority: 31,
          //   minChunks: 2
          // }
        }
      });
  },
  configureWebpack: {
    plugins: [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-manifest.json')
      }),
      new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        // dll 引用路径
        publicPath: '/vendor',
        // dll最终输出的目录
        outputPath: '/vendor'
      }),
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },
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
    hotOnly: false, // 是否只采用热更新方式，禁用模块替换
    // proxy: '', // 设置代理
    before: app => {
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
  // plugins: [
  //   new BundleAnalyzerPlugin({
  //     analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
  //     generateStatsFile: true, // 是否生成stats.json文件
  //   })
  // ]
};
