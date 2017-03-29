var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry:{
		main:'./src/script/main.js',
		a:'./src/script/a.js',
		b:'./src/script/a.js',
		c:'./src/script/a.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name]-[chunkhash].bundle.js',
		publicPath: 'http://cdn.com'
	},
	plugins:[
		// 一个自动化生成HTML的实例
		new htmlWebpackPlugin({
			// 指定和哪个模板文件关联
			template:'index.html',
			filename:'a.html',
			// 文件注入的方式  head|body|false
			inject:false,
			// 自定义的属性
			title:'this is a.html',
			// 定义加载哪些chunk,它会影响到模板输出的htmlWebpackPlugin.files.chunks的值
			chunks:['a','main'],
			// 定义不加载哪些chunks
			//excludeChunks:['b','c']
			// 配置文件压缩方式
			// minify:{
			// 	removeComments: true,
			// 	collapseWhitespace: true
			// }
		}),
		new htmlWebpackPlugin({
			template:'index.html',
			filename:'b.html',
			inject:false,
			chunks:['b','main'],
			title:'this is b.html'
		}),
		new htmlWebpackPlugin({
			template:'index.html',
			filename:'c.html',
			inject:false,
			chunks:['c','main'],
			title:'this is c.html'
		})
	]
}