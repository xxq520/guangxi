/**
 * @author: xiexiangquan
 * @Date: 2023-04-21 15:00:54
 * 园区概览主题数据状态管理
 */
import { defineStore } from 'pinia';
import { UrbanSurvey } from '../request/urbanSurvey';

export interface UrbanSurveyType {
  data: UrbanSurvey;
}

interface UrbanSurveyGetters {
  [propName: string]: any;
}

interface UrbanSurveyAction {
  /** 保存数据及处理数据 */
  setData: (data: UrbanSurvey) => void;
}

/** 视频巡检功能 */
export const urbanSurveyStore = defineStore<
  string,
  UrbanSurveyType,
  UrbanSurveyGetters,
  UrbanSurveyAction
>('urbanSurveyStore', {
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
      console.log(data, '医院概览图表接口数据');
    },
  },
});
