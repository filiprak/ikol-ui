import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript';
import alias from 'rollup-plugin-alias';
import css from "rollup-plugin-import-css";

export default {
  input: 'src/components/IkLoaderCircle/IkLoaderCircle.vue',
  output: {
    format: 'esm',
    file: 'dist/IkLoaderCircle.js'
  },
  external: ['vue'],
  plugins: [
    alias({
      '@': __dirname + '/src'
    }),
    typescript({
      experimentalDecorators: true,
      module: 'es2015'
    }),
    css(),
    vue()
  ]
}
