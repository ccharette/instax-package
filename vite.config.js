import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'InstaxPackage',
      fileName: (format) => `instax-package.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'pinia', 'vue-router', '@heroicons/vue'],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          pinia: 'Pinia',
          'vue-router': 'VueRouter',
          '@heroicons/vue': 'HeroiconsVue',
        },
      },
    },
  },
});
