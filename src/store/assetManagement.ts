/**
 * @author: xiexiangquan
 * @Date: 2023-04-21 15:00:54
 * 资产管理主题数据状态管理
 */
import { defineStore } from 'pinia';
import { AssetManagement } from '@/request/assetManagement';
export interface AssetManagementType {
  data: AssetManagement;
}

interface AssetManagementGetters {
  [propName: string]: any;
}

interface AssetManagementAction {
  /** 保存数据及处理数据 */
  setData: (data: any) => void;
}

/** 视频巡检功能 */
export const assetManagementStore = defineStore<
  string,
  AssetManagementType,
  AssetManagementGetters,
  AssetManagementAction
>('AssetManagementStore', {
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
      console.log(data, '资产管理图表接口数据');
    },
  },
});
