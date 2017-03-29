感谢qbaty提供的[视频教程](http://www.imooc.com/learn/802213),以下是个人笔记总结(webpack2.0)

## webpack基本介绍
1. 模块的打包器，它会把每个文件当成模块，再根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。
2. 代码分割，切分依赖树到不同的代码块里，然后按需进行加载，好比是懒加载。
3. Loader转换器，它可以将各种类型的资源转换成JavaScript模块，这样就方便webpack处理
4. 插件系统，它可以开发和使用开源的webpack插件，来满足各式各样的需求
5. 智能解析，它几乎可以处理任何第三方库，无论它们的模块是什么规范的(CommonJs、AMD还是普通的JS文件)。


## webpack安装和命令行 
1. 安装前确认目录下有package.json文件，否则用`npm init`生成，默认一直回车，后续可以修改的
2. `npm install webpack --save-dev`，添加webpack到开发依赖中
3. `npm install css-loader style-loader --save-dev`，添加css-loader和style-loader，css-loader是把CSS文件变成可被webpack处理的模块，而style-loader是把css中的样式可以应用到页面上
4. `webpack src.js out.bundle.js`，在命令行上输入，指定要打包的源文件和输出的打包后的文件
5. 当要打包的文件存在依赖(require)时，层次越深的会越优先加载，类似于递归(闭包?)的形式.
6. 当引入css文件时，需要用css-loader加载文件，再用style-loader应用样式，目前有以下两种方式：
	1. `require(style-loader!css-loader!./style.css)`,手动配置loader加载文件，切记style-loader在前面和css-loader在后面
	2. `webpack src.js out.bundle.js --module-bind "css=style-loader!css-loader"`，通过命令行，给全部css文件指定用什么loader加载(Windows系统下用双引号)
7. 命令行下，添加参数`--watch`，可以自动检测文件变动并重新打包，添加参数`--progress`,可以看打包的读条进度，添加参数`--display-modules`，可以把引用的所有模块都列出来。

## webpack基本配置
1. 在命令行中使用`webpack`,它默认调用当前目录下的webpack.config.js文件，若不存在会提示没找到默认配置项，通过`--help`参数查看配置选项。
2. `webpack --config webpack.dev.config.js`，它可以设置命令行默认读取的配置文件。
3. 若想使用webpack的其他参数，可以通过npm的脚本来做到。
```
	package.json
	...,

	"script": {
		"webpack": "webpack --config webpack.config.js --progress --display-modules --colors "
	},

	...,
```
最后通过`npm run webpack`来运行
4. 在webpack.config.js基本配置中：
```
var path = require('path');
module.exports = {
	entry: './src/script/main.js',
	output: {
		path: path.resolve(__dirname, 'dist/js'),
		filename: 'bundle.js'
	}
}
```
它有两个必填的选项：entry和output。
	entry(入口):
		1. 它指定了要打包文件的路径，其值可以为字符串、字符串数组和对象。
		2. 当值为字符串数组时，代表多个入口打包在一起(require)。
		3. 当值为对象时，通常用于多页面应用打包出多个文件，这也是推荐使用的配置，便于扩展。 
	output(输出):
		1. 它有两个必要的属性path(文件路径)和filename(文件名).
		2. path的推荐写法为：require('path')和`path:path.resolve(__dirname,'输出文件的目录路径')`
		3. filename是输出文件的文件名，它有三种名字占位符---[name]、[hash]和[chunkhash],分别解释为入口文件的key(默认为打包的文件名)、编译器打包时的hash和每个chunk的hash(类似文件唯一标识)，文件没有变化时hash是不会变的。
		4. 当入口为多页面应用打包时，必须为每个文件指定不同的名字(通过名字占位符)，否则会报错，提示文件被覆盖。


## 自动化生成项目中的html页面
1. `npm install html-webpack-plugin --save-dev`，安装html-webpack-plugin插件来实现自动化生成html
2. html-webpack-plugin插件的使用：
	1. 在webpack的plugins中初始化一个插件，它生成的html文件会自动对输出的js文件进行引用，可它和自定义的index.html之间没有任何联系
	```
		plugins:[
			new htmlWebpackPlugin()
		]
	```
	2. 生成的文件的保存位置是通过output中的path属性确定的，所以它应该设为公有路径
	3. 给插件传递一个配置对象参数，template属性可以指定生成的html和哪个模板文件关联，filename属性可以定义生成的html的名字(相对路径、占位符),inject属性可以指定脚本的插入的位置(head|body|false),minify属性可以配置生成文件的压缩方式,chunks属性可以定义需要加载哪些chunk，excludeChunks属性可以定义不加载哪些chunk
	4. 插件中自定义的属性可以传递到模板文件中，通过ejs模板语言来获取，`<%= %>`用于取值到页面， `<% %>`之间可以包含js代码
	5. 自定义模板的主要目的是，能够加载指定的js、css文件和插入位置。其中inject属性的值要为false,阻止自动注入。
3. output下的publicPath属性，它类似占位符，会添加到页面的资源文件路径的前面，相当于项目上线的项目地址
4. 内联脚本到页面可以减少HTTP请求和加快页面的加载速度，这就需要用到webpack暴露出来的`compilation.asset[ chunk路径 ].source()`方法






























