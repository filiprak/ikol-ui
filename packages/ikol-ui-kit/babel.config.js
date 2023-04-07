const package = require('./package.json');

module.exports = {
  assumptions: {
    noDocumentAll: true
  },
  ignore: [/\.d\.ts$/],
  presets: [
    ['@babel/preset-env', {
      modules: false,
    }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['./build/babel/plugins/vue-sfc-plugin', {}],
    ['module-resolver', {
      root: ['.'],
      alias: {
        '@': './src',
      },
    }],
  ],
};
