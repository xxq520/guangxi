/**
 * @author: xiexiangquan
 * @Date: 2023-04-21 15:00:54
 * 资产管理主题数据状态管理
 */
import { defineStore } from 'pinia';
import {
  IntelligentPrevention,
  AccessControlSystem,
  VideoMonitoring,
  FireProtectionSystem,
  PatrolSystem,
} from '@/request/intelligentPrevention';
export interface IntelligentPreventionType {
  data: IntelligentPrevention;
  /** 消防系统数据 */
  fireProtectionSystem: FireProtectionSystem;
  /** 门禁系统数据 */
  accessControlSystem: AccessControlSystem;
  /** 视频监控数据 */
  videoMonitoring: VideoMonitoring;
  /** 巡更系统数据 */
  patrolSystem: PatrolSystem;
}

interface IntelligentPreventionGetters {
  [propName: string]: any;
}

interface IntelligentPreventionAction {
  /** 保存数据及处理数据 */
  setData: (data: any) => void;
}

/** 视频巡检功能 */
export const IntelligentPreventionStore = defineStore<
  string,
  IntelligentPreventionType,
  IntelligentPreventionGetters,
  IntelligentPreventionAction
>('IntelligentPreventionStore', {
  state: () => ({
    data: {},
    fireProtectionSystem: {},
    accessControlSystem: {},
    videoMonitoring: {},
    patrolSystem: {},
  }),
  getters: {},
  actions: {
    setData(data) {
      this.data = {
        ...this.data,
        ...data,
      };
      console.log(data, '智慧防控图表接口数据');
    },
  },
});
