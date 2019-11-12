const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const libraryName = 'ScrollTrigger'

let plugins = []
let outputFile = libraryName + '.js'

const dev = process.env.NODE_ENV !== 'production'
const demo = process.env.NODE_ENV === 'demo'

if (!dev) {
	plugins.push(new UglifyJsPlugin({ minimize: true }))

	outputFile = libraryName + '.min.js'
} else {
	plugins.push(new HtmlWebpackPlugin({
		inject: 'body',
		template: demo ? 'demo/index.html' : 'dev/index.html'
	}))

	outputFile = libraryName + '.js?[hash]'
}

module.exports = {
  entry: dev ? __dirname + (demo ? '/demo/main.js' : '/dev/main.js') : __dirname + '/src/ScrollTrigger.js',
	devtool: 'source-map',
	output: {
		path: demo ? __dirname + '/public' : __dirname + '/dist',
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
		contentBase: demo ? 'demo' : 'dev',
		host: '127.0.0.1',
		port: 8010
	}
}
