import { defineStore } from 'pinia';

const enum StoreId {
  THING = 'thing',
}

/**
 * 3D 场景相关全局状态选项 - state
 */
interface ThingStoreState {
  /** 地图加载进度 */
  progress: number;
  PointsLayer: null | CMAP.ThingLayer;
  LineLayer: null | CMAP.ThingLayer;
  /** 当前场景层级 */
  currentLevel: Record<string, any>;
  /** 存储地图中所有关于业务的图层 */
  /** ue场景是否正在播放 */
  uePlayRoam: boolean;
  themeButtonCode: null | ThemeItem;
}

/** 当前主题右上角按钮选择的孪生体 */
type ThemeItem = {
  icon: string;
  name: string;
  twinClassCode: string;
};

/**
 * 3D 场景相关全局状态选项 - action
 */
interface ThingStoreAction {
  /**
   * 设置进度
   * @param data 进度，0 ~ 1
   */
  setProgress: (data: number) => void;
  togglePointsLayer: (status: boolean) => void;
  toggleLineLayer: (status: boolean) => void;
}

/**
 *3D 场景相关全局状态选项 - getters
 */
interface ThingStoreGetters {
  [k: string]: (...args: any[]) => any;
}

/** 图层的名称 */
export enum LayerNames {
  模型点位 = 'pointModelLayer',
  综合飞线 = 'comprehensiveFlyLine',
  综合基础光纤 = 'comprehensiveLine',
  综合点位顶牌 = 'comprehensivePointMarker',
  资产点位顶牌 = 'assetsPointMarker',
  监控点位顶牌 = 'MonitorPointMarker',
  安全点位顶牌 = 'SecurityPointMarker',
}

export const useThing = defineStore<StoreId, ThingStoreState, ThingStoreGetters, ThingStoreAction>(
  StoreId.THING,
  {
    state: () => ({
      progress: 0,
      PointsLayer: null,
      LineLayer: null,
      layers: [],
      currentLevel: {},
      uePlayRoam: false,
      themeButtonCode: null,
    }),
    actions: {
      setProgress(data: number) {
        this.progress = data;
      },
      togglePointsLayer(status: boolean) {
        if (this.PointsLayer) {
          this.PointsLayer.visible = status;
        }
      },
      toggleLineLayer(status: boolean) {
        if (this.LineLayer) {
          this.LineLayer.visible = status;
        }
      },
    },
  }
);
