/*
 * @Description:
 * @Version: 1.0
 * @Autor: yls
 * @Date: 2023-02-28 09:40:51
 * @LastEditors: jiangzhikun
 * @LastEditTime: 2023-03-03 16:41:30
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// eslint-disable-next-line import/no-unresolved
import AutoImport from 'unplugin-auto-import/vite';
// eslint-disable-next-line import/no-unresolved
import Components from 'unplugin-vue-components/vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    viteCommonjs(),
    /** 自动引入插件 */
    AutoImport({
      dts: 'typings/auto-imports.d.ts',
      imports: ['vue'],
    }),
    /** 组件自动导入 */
    Components({
      dirs: ['src/components', 'src/screens/charts'],
    }),
  ],
  build: {
    assetsInlineLimit: 0, // 打包时禁用图片转为base64
  },
  css: {
    preprocessorOptions: {
      /** 混入到各个SCSS文件中 */
      scss: {
        charset: false,
        additionalData: '@import "@/assets/css/utils.scss";',
      },
    },
  },
  resolve: {
    extensions: ['.js', '.ts', 'vue', 'json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  base: './',
});
