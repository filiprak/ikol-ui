import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import css from './build/plugins/rollup-plugin-css';
import path from 'path';
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: (format, entryAlias) => {
        console.log(entryAlias)
        return `${entryAlias}.mjs`;
      },
    },
    cssCodeSplit: true,
    minify: false,
    target: 'esnext',
    rollupOptions: {
      input: [
        './src/index.ts',
        './src/components/IkIcon/index.ts',
        './src/components/IkLoaderCircle/index.ts',
      ],
      external: ['vue'],
      output: {
        dir: './dist',
        preserveModules: true,
      },
    },
  },
  plugins: [
    vue(),
    css(),
    dts({
      beforeWriteFile: (filePath, content) => {
        return { filePath: `${filePath}`, content };
      },
      cleanVueFileName: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
