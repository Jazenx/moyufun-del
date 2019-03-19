const { resolve } = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
  mode: 'development', // 环境
  devtool: 'cheap-module-eval-source-map', // 此选项控制是否生成，以及如何生成 source map
  devServer: {
    clientLogLevel: 'warning', // 控制台显示错误的级别
    historyApiFallback: true, // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    hot: true, // 启用 webpack 的模块热替换特性
    compress: true, // 一切服务都启用 gzip 压缩
    host: '127.0.0.1',
    port: '8888',
    open: true, // 启用 open 后，dev server 会打开浏览器
    overlay: { // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: true,
      errors: true
    },
    publicPath: '/', // 此路径下的打包文件可在浏览器中访问
    proxy: {}, // 代理
    quiet: true, // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
    watchOptions: { // 与监视文件相关的控制选项。
      poll: false
    }
  },
  plugins: [
    new webpack.DefinePlugin({ // 允许创建一个在编译时可以配置的全局常量
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(), // 启用HMR
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true, // 所有的js资源打包在body底部
      favicon: resolve('./favicon.ico'),
      // title: '摸魚樂'
      title: 'Fun'
    })
  ]
})