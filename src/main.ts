/*
 * @Description:
 * @Version: 1.0
 * @Autor: yls
 * @Date: 2023-02-28 09:40:51
 * @LastEditors: jiangzhikun
 * @LastEditTime: 2023-03-01 10:44:22
 */
import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
// 全局样式-字体
import '@/assets/css/font.scss';
import '@/assets/css/reset.scss';
import '@/assets/css/global.scss';
import { createPinia } from 'pinia';
import { pinia } from '@/store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './routers/index';
import autoImport from './autoImport';
import { autoRequest } from './request/autoRequest';
import directive from '@/direvtives';
/** css动画库 */
import 'animate.css';

// 加载核心资源

createApp(App)
  .use(autoImport)
  .use(directive)
  .use(ElementPlus, {})
  .use(router)
  .use(createPinia())
  .use(pinia)
  .mount('#app');
