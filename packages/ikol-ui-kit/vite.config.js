import vue from '@vitejs/plugin-vue';
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
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
