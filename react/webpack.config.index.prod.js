var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractSass = new ExtractTextPlugin("index.css");

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
		}),
		extractSass
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
				test: /\.css$/,
				include: [path.join(__dirname, "index.css")],
				use: extractSass.extract({ loader: "css-loader", options: { minimize: true } })
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
			ServerURL: "http://onepace.net/php"
		})
	}
};
