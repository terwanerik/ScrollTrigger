const webpack = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const libraryName = 'ScrollTrigger'

var plugins = []
var outputFile = libraryName + '.js'

const dev = process.env.NODE_ENV !== 'production'

if (!dev) {
	plugins.push(new uglifyJsPlugin({ minimize: true }))

	outputFile = libraryName + '.min.js'
} else {
	plugins.push(new htmlWebpackPlugin({
		inject: "body",
		template: 'src/index.html'
	}))

	outputFile = libraryName + '.js?[hash]'
}

module.exports = {
  entry: dev ? __dirname + '/src/main.js' : __dirname + '/src/ScrollTrigger.js',
	devtool: 'source-map',
	output: {
		path: __dirname + '/lib',
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	plugins: plugins,
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		modules: [__dirname, 'node_modules'],
		extensions: ['.js'],
		alias: {
			'~': path.resolve(__dirname, 'src')
		}
	},
	devServer: {
		contentBase: 'src',
		host: '127.0.0.1',
		port: 8010
	}
}