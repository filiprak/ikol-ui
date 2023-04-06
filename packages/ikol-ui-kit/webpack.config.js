const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'production',
  entry: './src/components/IkLoaderCircle/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: {
      name: 'bundle',
      type: 'commonjs-static',
    },
  },
  resolve: {
    extensions: ['.ts', '.json', '.js', '.vue', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true }
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
