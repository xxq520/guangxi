import { loadScript } from './common';

const effectData: any[] = [];

/** 存储监听场景加载完成的回调事件 */
const listenMapLoadedFn: Function[] = [];

/** 是否加载完建筑 */
let loadedBuilding = false;
const listenBuildingLoadedFn: any[] = [];
/** 场景园区是否加载成功 */
export const listenBuildingLoaded = (fn: Function) => {
  loadedBuilding ? fn && fn() : listenBuildingLoadedFn.push(fn);
};

/** 触发园区场景监听的所有方法 */
export const emitBuildingListen = () => {
  if (!loadedBuilding) {
    listenBuildingLoadedFn.map((item) => item && item());
  }
  loadedBuilding = true;
};

export default () => {};
