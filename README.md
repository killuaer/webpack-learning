感谢qbaty提供的[视频教程](http://www.imooc.com/learn/802213),以下是个人笔记总结

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



















