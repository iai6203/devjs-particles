const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'particles.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'particles',
    libraryTarget: 'umd',
    globalObject: 'this',
    clean: true,
  },
}