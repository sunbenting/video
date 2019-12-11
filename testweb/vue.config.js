const path = require('path')
const webpack = require('webpack');
const resolve = dir => {
    return path.join(__dirname, dir)
}
const BASE_URL = process.env.NODE_ENV === "production" ? "/" : '/'
module.exports = {
    // baseURL: BASE_URL,
    lintOnSave: false, //禁用eslint
    publicPath: './', //打包文件根目录
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src')).set('_c', resolve('src/components'))
    },
    productionSourceMap: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                __DEV__: false
            })
            return {
                plugins: [
                    new webpack.ProvidePlugin({
                        $: "jquery",
                        jQuery: "jquery",
                        "windows.jQuery": "jquery"
                    })
                ],
            }
        } else {
            // 为开发环境修改配置...
            new webpack.DefinePlugin({
                __DEV__: true
            })
            return {
                plugins: [
                    new webpack.ProvidePlugin({
                        $: "jquery",
                        jQuery: "jquery",
                        "windows.jQuery": "jquery"
                    })
                ],
            }
        }
    },
    devServer: {
        disableHostCheck: true,
        open: true, //配置自动启动浏览器
        host: 'localhost',
        port: 8080, // 端口号
        https: false,
        hotOnly: false, // https:{type:Boolean}
        overlay: { //禁用eslint
            warning: false,
            errors: false
        },

        proxy: { // 配置跨域
            '/api': {
                target: '192.168.3.97:10205', //源地址
                changeOrigin: true, //改变源
                ws: true, //是否代理websockets
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/bpi': {
                target: 'https://open.ys7.com/api/lapp', //源地址
                changeOrigin: true, //改变源
                ws: true, //是否代理websockets
                pathRewrite: {
                    '^/bpi': ''
                }
            }
        }, // 配置跨域处理,只有一个代理
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {}
}