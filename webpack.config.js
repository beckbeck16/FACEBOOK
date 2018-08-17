const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './js/mainJS.js',
    output: {
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            }
        ]
    },
    devtool: 'source-map',
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin()
    ]
};


// npm i -g webpack-serve
// npm i -g webpack-dev-server
// npm i html-webpack-plugin
// npm install style-loader --save-dev
// npm install --save-dev css-loader
// npm install node-sass
