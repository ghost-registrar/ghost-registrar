let nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'null-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'istanbul-instrumenter-loader',
                    options: {esModules: true},
                },
            },
        ],
    },
};
