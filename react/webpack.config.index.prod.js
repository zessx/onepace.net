var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: "./js/components/Index.jsx",
	output: {
		path: path.join(__dirname, "../"),
		filename: "index.js"
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({ minimize: true }),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			jquery: "jquery"
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		})
	],
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			root: path.join(__dirname, ""),
			appRoot: path.join(__dirname, "js")
		}
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				include: [path.join(__dirname, "js"), path.join(__dirname, "node_modules/reflux-core")],
				options: {
					presets: ["react", "es2015", "stage-1", "stage-2"]
				}
			}
		]
	},
	externals: {
		"webpack-config": JSON.stringify({
			ServerURL: "https://onepace.net/php"
		})
	}
};
