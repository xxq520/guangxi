/**
 * @author: xiexiangquan
 * @Date: 2023-04-21 15:00:54
 * 能耗监测主题数据状态管理
 */
import { defineStore } from 'pinia';
import { EnergyMonitoring } from '@/request/energyMonitoring';
export interface EnergyMonitoringType {
  data: EnergyMonitoring;
}

interface EnergyMonitoringGetters {
  [propName: string]: any;
}

interface EnergyMonitoringAction {
  /** 保存数据及处理数据 */
  setData: (data: any) => void;
}

/** 视频巡检功能 */
export const energyMonitoringStore = defineStore<
  string,
  EnergyMonitoringType,
  EnergyMonitoringGetters,
  EnergyMonitoringAction
>('EnergyMonitoringStore', {
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
      console.log(data, '能耗监测图表接口数据');
    },
  },
});
