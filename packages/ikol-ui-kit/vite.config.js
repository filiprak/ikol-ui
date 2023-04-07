import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'path';

export default {
  build: {
    minify: false,
    target: 'esnext',
    lib: {
      name: 'abcde',
      entry: './src/index.ts',
      formats: ['esm'],
    },
  },
  rollupOptions: {
    input: {
      IkLoaderCircle: './src/components/IkLoaderCircle/index.ts',
      IkIcon: './src/components/IkIcon/index.ts',
    },
    external: ['vue'],
    output: {
      preserveModules: true,
    },
  },
  plugins: [
    vue(),
    dts(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
