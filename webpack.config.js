
const path = require('path');

module.exports = {
    entry: './app/main.js',
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
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
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
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
    }
};
