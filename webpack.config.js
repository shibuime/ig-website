
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    entry: './app/main.js',
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js',
        //publicPath: ''
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        contentBase: './app',
        port: 8100
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            },
            {
                test: /sorted-array.js/,
                loader: 'imports-loader?define=>false'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=public/fonts/[name].[ext]'
            }
        ]
    },
    watch: true,
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            //assetNameRegExp: /\.optimize\.css$/g,
            //cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        })
    ]
};
