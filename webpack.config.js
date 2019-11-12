const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')

const libraryName = 'ScrollTrigger'

let plugins = [new UnminifiedWebpackPlugin()]
let mode = 'development'
let entry = __dirname + '/src/ScrollTrigger.js'
let outputFile = libraryName + '.js?[hash]'
let outputPath = __dirname + '/dist'
let contentBase = 'dev'

switch (process.env.NODE_ENV) {
    case 'demo':
        entry = __dirname + '/demo/main.js'
        outputPath = __dirname + '/public'
        contentBase = 'demo'

        plugins.push(new HtmlWebpackPlugin({
            inject: 'body',
            template: 'demo/index.html'
        }))

        break
    case 'development':
        entry = __dirname + '/dev/main.js'

        plugins.push(new HtmlWebpackPlugin({
            inject: 'body',
            template: 'dev/index.html'
        }))

        break
    default:
        outputFile = libraryName + '.min.js'
        mode = 'production'

        break
}

module.exports = {
    entry: entry,
    mode: mode,
	devtool: 'source-map',
	output: {
        path: outputPath,
        filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
	devServer: {
		contentBase: contentBase,
		host: '127.0.0.1',
		port: 8010
	}
}
