var path = require('path')
var webpack = require('webpack')

var isProd = process.env.NODE_ENV === 'production'

module.exports = {
	entry: {
		build: './src/app.js',
		vendor: ['vue', 'axios']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: isProd ? '/' : '/dist/',
		filename: 'js/[name].js?[hash]',
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
		}, {
			test: /\.css$/,
			loader: !isProd ? 'style-loader!css-loader' : ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
		}, {
			test: /\.(scss|sass)$/,
			loader: !isProd ? 'style-loader!css-loader!sass-loader' : ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
		}, {
			test: /\.(eot|ttf|woff|woff2)$/,
			loader: 'file-loader',
			options: {
				name: 'font/[name].[ext]?[hash]',
			},
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: 'img/[name].[ext]?[hash]',
			},
		}],
	},
	resolve: {
		extensions: ['.js', '.json', '.scss', '.css'],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		hot: true,
		inline: true,
	},
	performance: {
		hints: false,
	},
	devtool: '#eval-source-map',
}

if (isProd) {
	module.exports.devtool = ''
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
		new webpack.optimize.UglifyJsPlugin({ sourceMap: true, compress: { warnings: false } }),
		new webpack.optimize.CommonsChunkPlugin({ names: ['vendor'] }),
		new webpack.LoaderOptionsPlugin({ minimize: true }),
		new ExtractTextPlugin('css/style.css'),
		new htmlWebpackPlugin({
			title: '{{name}}',
			filename: 'index.html', //通过模板生成的文件名
			template: 'index.html', //模板路径
			inject: 'body', //是否自动在模板文件添加 自动生成的js文件链接
			hash: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
			}
		})
	])
} else {
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.HotModuleReplacementPlugin()
	])	
}