const { resolve } = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: resolve(__dirname, '../'), // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和loader
  entry: ('./src/index.jsx'), // 入口
  output: {
    path: resolve(__dirname, '../app'), // 打包输出目录
    filename: '[name].bundle.js', // 入口文件打包输出的文件名
    chunkFilename: 'chunks/[name].[hash:8].js', // 按需加载的文件名
    publicPath: '/' // 静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
  },
  resolve: { // 配置依赖
    extensions: ['.js', '.jsx', '.styl']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              root: resolve(__dirname, 'src'),
              attrs: ['img:src', 'link:href']
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          fix: true,
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('../package.json').version) // 控制台打印版本号
    }),
    new webpack.HashedModuleIdsPlugin(),// 避免缓存失败
    new CleanWebpackPlugin(['app'], { // 清理打包文件 production
      root: resolve(__dirname, '..'),
      verbose: true,   // Write logs to console
      dry: false
    })
  ]
}
