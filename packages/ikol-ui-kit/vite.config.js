import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import css from './build/plugins/rollup-plugin-css';
import path from 'path';
import { defineConfig } from 'vite'

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
        './src/components/IkIcon/index.ts',
        './src/components/IkLoaderCircle/index.ts',
      ],
      external: ['vue'],
      output: {
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
