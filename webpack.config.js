const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    devtool: 'source-map', // 生成单独的完成的source-map文件，方便调试
    devServer: {
        port: 8080, // 开发服务器的端口号
        hot: true, // 启动热更新
        contentBase: path.join(__dirname, 'public'), // 静态文件根目录
        historyApiFallback: { // 因为我们可能会使用浏览器路由，刷新的时候需要重定向到跟文件
            index: './index.html'
        }
    },
    resolve: {
        alias: { // 配置解析的别名，方便我们编写引入的路径
            '@': path.resolve(__dirname, 'src'),
            '~': path.resolve(__dirname, 'node_modules')
        }, // 查找模块的时候的扩展名
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                loader: 'babel-loader', // ts-loader 性能比较差
                options: {
                    presets: [
                        '@babel/preset-env', // 解析 ES+
                        '@babel/preset-react', // 解析React JSX语法的
                        '@babel/preset-typescript', // 解析typescript
                    ],
                    plugins: [ // babel-plugin-import 可以实现按需加载的babel插件
                        ['import', { libraryName: 'antd', style: 'css' }]
                    ]
                },
                include: path.resolve('src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader', // 处理import和url语句
                        options: { importLoaders: 3 } // import的文件要导入之前需要经过几个loader的处理
                    },
                    {
                        loader: 'postcss-loader', // 加入厂商的兼容性前缀
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer']
                            }
                        }
                    },
                    {
                        loader: 'px2rem-loader', // 可以把px单位编程rem单位
                        options: {
                            remUnit: 75, // 1rem对应的是75px
                            remPrecision: 8 // 计算的小数保留8位
                        }
                    },
                    "less-loader" // 把less编译成css
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg)/,
                type: 'asset' // 以前url-loader或者file-loader，现在不需要
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};