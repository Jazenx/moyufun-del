const { resolve } = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const hash = require('hash-sum')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  output: {
    path: resolve(__dirname, '../app'),
    filename: 'js/[name].[chunkHash:8].js',
    chunkFilename: 'chunk/[name].[chunkHash:8].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      filename: resolve(__dirname, '../app/index.html'),
      template: 'index.html',
      inject: true,
      favicon: resolve('favicon.ico'),
      title: '摸魚樂',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: /runtime\..*\.js$/
    }),
    // 稳定module.id
    new webpack.NamedChunksPlugin(chunk => {
      if(chunk.name) {
        return chunk.name
      }
      const modules = Array.from(chunk.modulesIterable)
      if(modules.length > 1) {
        const joinedHash = hash(modules.map(m => m.id).join('_'))
        let len = 4
        let seen = new Set()
        while (seen.has(joinedHash.substr(0, len))) len++
        seen.add(joinedHash.substr(0, len))
        return `chunk-${joinedHash.substr(0, len)}`
      } else {
        return modules[0].id
      }
    }),
    new webpack.HashedModuleIdsPlugin({
      hashDigest: 'hex' // 替换掉base64，减少一丢丢时间
    }),
    new CopyWebpackPlugin([
      { 
        from: resolve(__dirname, '../src/static'),
        to: 'static',
      }
    ]),
    new BundleAnalyzerPlugin({ analyzerPort: 3088 })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'), // 可自定义拓展你的规则
          minChunks: 3, // 最小公用次数
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  }
})