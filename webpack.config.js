const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  return {
    entry: {
      demo: path.resolve(__dirname, 'src/demo.ts')
    },
    output: {
      filename: '[name].js'
    },
    mode: env.NODE_ENV,
    devServer: {
      port: 9999,
      open: true
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.ejs')
      })
    ]
  }
}
