/**
 * @author: xiexiangquan
 * @Date: 2023-04-21 15:00:54
 * 首页数据状态管理
 */
import { defineStore } from 'pinia';
import { Home } from '@/request/home';
export interface HomeType {
  data: Home;
}

interface HomeGetters {
  [propName: string]: any;
}

interface HomeAction {
  /** 保存数据及处理数据 */
  setData: (data: any) => void;
}

/** 视频巡检功能 */
export const homeStore = defineStore<string, HomeType, HomeGetters, HomeAction>('HomeStore', {
  state: () => ({
    data: {},
  }),
  getters: {},
  actions: {
    setData(data) {
      this.data = {
        ...this.data,
        ...data,
      };
      console.log(data, '首页图表接口数据');
    },
  },
});
