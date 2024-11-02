/**
 * @author: xiexiangquan
 * @Date: 2023-04-21 15:00:54
 * 院区总览主题数据状态管理
 */
import { defineStore } from 'pinia';
import { OverviewHospital } from '@/request/overviewHospital';
export interface OverviewHospitalType {
  data: OverviewHospital;
}

interface OverviewHospitalGetters {
  [propName: string]: any;
}

interface OverviewHospitalAction {
  /** 保存数据及处理数据 */
  setData: (data: any) => void;
}

/** 视频巡检功能 */
export const overviewHospitalStore = defineStore<
  string,
  OverviewHospitalType,
  OverviewHospitalGetters,
  OverviewHospitalAction
>('OverviewHospitalStore', {
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
      console.log(data, '院区总览图表接口数据');
    },
  },
});
