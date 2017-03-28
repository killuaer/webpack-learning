var path = require('path');
module.exports = {
	entry:{
		main:'./src/script/main.js'	
	},
	output: {
		path: path.resolve(__dirname, 'dist/js'),
		filename: '[hash].bundle.js'
	}
}