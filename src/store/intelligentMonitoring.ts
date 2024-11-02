/**
 * @author: xiexiangquan
 * @Date: 2023-04-21 15:00:54
 * 资产管理主题数据状态管理
 */
import { defineStore } from 'pinia';
import { IntelligentMonitoring } from '@/request/intelligentMonitoring';
export interface IntelligentMonitoringType {
  data: IntelligentMonitoring;
}

interface IntelligentMonitoringGetters {
  [propName: string]: any;
}

interface IntelligentMonitoringAction {
  /** 保存数据及处理数据 */
  setData: (data: any) => void;
}

/** 视频巡检功能 */
export const intelligentMonitoringStore = defineStore<
  string,
  IntelligentMonitoringType,
  IntelligentMonitoringGetters,
  IntelligentMonitoringAction
>('IntelligentMonitoringStore', {
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
      console.log(data, '智慧监测图表接口数据');
    },
  },
});
