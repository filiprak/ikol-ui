import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import multiInput from 'rollup-plugin-multi-input';
import css from './.build/plugins/rollup-plugin-css';
import translator from './.build/plugins/rollup-plugin-translator';

export default defineConfig({
  build: {
    outDir: './lib',
    lib: {
      entry: './src/index.ts',
      formats: ['esm'],
      fileName: (format, entryAlias) => {
        if (entryAlias.includes('.css')) {
          return `${entryAlias}`;
        } else {
          return `${entryAlias}.mjs`;
        }
      },
    },
    cssCodeSplit: true,
    minify: false,
    target: 'esnext',
    rollupOptions: {
      input: [
        './src/index.ts',
        './src/**/index.ts',
      ],
      external: ['vue'],
      output: {
        preserveModules: true,
      },
    }
  },
  plugins: [
    multiInput(),
    translator(),
    vue(),
    css(),
    !process.env.SKIP_VITE_DTS ? dts({
      entryRoot: './src',
      cleanVueFileName: true,
    }) : false,
  ].filter(i => i),
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, 'src'),
      'moment-timezone': 'moment-timezone/builds/moment-timezone-with-data.min.js',
    },
  },
});
