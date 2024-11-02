/*
 * @Description:
 * @Version: 1.0
 * @Autor: jiangzhikun
 * @Date: 2023-02-28 16:22:09
 * @LastEditors: jiangzhikun
 * @LastEditTime: 2023-03-01 13:52:45
 */
import { defineStore, createPinia } from 'pinia';
import { useRoute } from 'vue-router';
// import { communityMassif } from '../utils/twins/communityMassif';
import { listenCampusLoaded } from '../utils/initScene';
// import { intelligentDeviceTwins } from '../utils/twins/intelligentDevice';
// import { callBackPad } from '../utils/padControl/linkSocket';

export const pinia = createPinia();

interface Level {
  /** 当前层级下的子对象 */
  children: THING.BaseObject[];
  /** 当前层级的对象 */
  current: THING.BaseObject;
  /** 当前层级类型字符串 */
  level: string;
  /** 楼层列表，当前层级是楼层或者建筑的时候才有 */
  floor: THING.BaseObject[];
  /** 当前层级的父对象 */
  parent: THING.BaseObject;
  /** 进入还是离开 */
  type: 'enter' | 'leave';
}

export const useAppStore = defineStore('app', {
  state: () => ({
    campusLoaded: false, // 场景是否加载完成
    menusInfo: [], // 菜单信息
    activeMenuInfo: {} as any,
    activeSubMenuInfo: {} as any,
    /* 面板数据 */
    panel: {
      /* 组件名称 */
      id: '',
      /* 要传得数据 */
      data: {},
    },
    preview: {
      prevPosition: [],
      prevTarget: [],
      useful: false,
    },
    /** 禁止切换菜单 */
    stopToggleMenu: false,
    /** 是否可添加视频监控的操作 */
    editVideo: false,
    /** 当前场景层级信息 */
    level: {} as Level,
    /** 加载进度 */
    loadingProgress: 5,
    /** 是否显示加载中组件 */
    showLoading: true,
  }),
  actions: {
    setCampusLoaded(val: boolean) {
      this.campusLoaded = val;
    },
    setMenusInfo(val: any) {
      this.menusInfo = val;
      this.stopToggleMenu = false;
    },
    routerSetMenu() {
      const route = useRoute();
      const current =
        this.menusInfo?.find((item: any) => item.router === route?.params?.screenName) || {};
      this.activeMenuInfo = current as any;
      console.log(route?.params?.screenName, 9966);
    },
    setMenuInfo(val: any) {
      this.activeMenuInfo = val;
      this.activeSubMenuInfo = {};
    },
    setSubMenuInfo(val: any) {
      this.activeSubMenuInfo = val;
    },
    /**
     * @param {String} id 面板的id
     * 可根据id关闭面板，如果不传id则直接关闭面板，不管当前展示的是个id的面板
     */
    closePanel: function (id?: string) {
      if (!id) {
        this.panel = { id: '', data: {} };
      } else if (this.panel.id === id) {
        this.closePanel();
      }
    },

    setLoadingProgress(payload: number) {
      this.loadingProgress = payload;
      if (payload === 100) {
        this.setShowLoading(false);
      } else {
        this.setShowLoading(true);
      }
    },

    setShowLoading(payload: boolean) {
      this.showLoading = payload;
    },
  },
});
