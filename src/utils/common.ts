import { AnyMxRecord } from 'dns';
import { useAppStore } from '../store/index';
/**
 * @author xiexiangquan
 * @date 2022/10/09
 * @Description: 生成随机字符串
 * @param {number} len 字符串长度
 */
export const randomString = (len: number) => {
  len = len || 32;
  let $chars =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/** 保留小数位 */
export const tofix = (value: number | string) => {
  value = value + '';
  if (value?.includes('.')) {
    let res = value.slice(0, value.indexOf('.') + 2);
    if (res[res.length - 1] === '0') {
      return value.slice(0, value.indexOf('.'));
    } else {
      return res;
    }
  }
  return value || 0;
};

/** 加载script文件 */
export const loadScript = (url: string, callback: Function, flag?: string) => {
  const script: any = document.createElement('script');
  if (flag) {
    script.class = flag;
  }
  if (script.readyState) {
    // IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // 其他浏览器
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

/** 将传入的孪生体的父级都更改为当前场景层级 */
export const setParentLevel = (twins: any[]) => {
  twins?.forEach((item) => {
    item.setParent(uino.app.level.current);
    uino.app.level.current.add(item);
    item.visible = true;
  });
};

// 销毁不是当前层级的孪生体
export const destroyNotCurrentLevelTwins = () => {
  const currentLevel = uino.app.level.current;
  uino.app
    .query('.Thing')
    .query(`[userData/parentId=${currentLevel.uuid}]`)
    .query(`[userData/cb_building_id!=${currentLevel.parent.uuid}]`)
    .destroyAll();
};

/** 定位到孪生体 */
export const flyTo = (twinObj: any, options: Record<string, any> = {}) => {
  uino.app?.camera?.flyTo({
    object: twinObj,
    radius: 20,
    ...(options || {}),
  });
};

/** 层级切换管理器 */
export const changeLevel = async (parent: any) => {
  return new Promise((resolve) => {
    uino.app.level.change(parent, {
      complete: () => {},
      flyComplete: () => resolve(true),
    });
  });
};

/** 跳转楼层 */
export const localFloor = (uuid: string) => {
  const campus = uino.app.level.current.parents.query('.Campus');
  if (campus[0]) campus[0].type = 'Campus';
  let building = uino.app.level?.current?.parents?.objects?.find(
    (item: any) => (item.type = 'Building')
  );
  if (uino.app.level.current.type == 'Building') building = uino.app.level.current;
  if (building) {
    /** 在basex楼层数据中找到孪生体编码对应的楼层 */
    const currentFloor = building
      ?.query('.Floor')
      ?.objects?.find((item: Record<string, any>) => item.uuid == uuid);

    if (!currentFloor) return;
    const campus = uino.app.level.current.parents.query('.Campus');
    /** 层级切换的路径 */
    if (campus?.length) {
      currentFloor.brothers.visible = false;
      uino.app.level.change(currentFloor);
      setTimeout(() => {
        currentFloor.brothers.visible = false;
      });
      campus[0].type = 'Campus';
    }
  }
};

/** 设置建筑透明度 */
export const setBuildingOpacity = (opacity: number, write: boolean) => {
  uino.app.query('.Building').style.opacity = opacity;
  const ground = uino.app.query('.Campus')?.query('*')[0]?.query('.Ground')[0];
  ground.style.opacity = opacity;
  if (ground) {
    ground.node.getMaterials()?.forEach((item: any) => {
      // if (
      //   [
      //     'JYA1',
      //     'glass',
      //     '111',
      //     'Material__4834214',
      //     'Material__4834214_重复26',
      //     'JYA1_重复16',
      //     'wall1',
      //     'SM_BuildingA01911A',
      //     'SM_BuildingA01911B',
      //     'SM_BuildingA01911C',
      //     'SM_BuildingA01911D',
      //     'SM_BuildingA01911E',
      //     'SM_BuildingA01911F',
      //     'SM_BuildingA01911G',
      //     'SM_BuildingA01911H',
      //     'SM_BuildingA01911I',
      //   ].includes(item.name)
      // ) {
      if (!item.name.includes('wall1')) {
        item.depthWrite = write;
        item.opacity = opacity;
        // item.visible = write;
        // }
      }
    });
  }
};

export function hexToRgba(hex: string, opacity: number) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hex.replace(rgx, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!rgb) {
    return hex;
  }
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
}

/** 千分位 */
export function regexHandleNum(num: number, fix = 2) {
  let str = String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 3是千分位，4是万分位
  let fixIndex = str.indexOf('.');
  if (fixIndex > -1) {
    if (fix == 0) {
      str = str.split('.')[0];
    } else {
      str = str.slice(0, fixIndex + fix + 1);
    }
  }
  return str;
}

export const percentaga = (current: number, total: number) => {
  let num = ((current / total) * 100).toFixed(2);
  return num == 'Infinity' ? 0 : Number(num);
};

/**
 * 获取当前层级的孪生体
 * @param {Object} twinsObj 孪生体集合对象
 * @param {Object} currentLevel 当前场景层级
 * @return returnDataType
 */
export const getCurrentTwins = (twinsObj: Record<string, any>): any => {
  twinsObj = (twinsObj as any) == '{}' ? {} : twinsObj;
  const store = useAppStore();
  let arr: any = [];
  const handle = (obj: any) => {
    if (!obj) return;
    for (let key in obj) {
      arr.push(...(obj[key] || []));
    }
  };

  let currentLevel = (store.level as any)?.current || {};
  let parentLevel = (store.level as any)?.parent || {};
  console.log(currentLevel, parentLevel, 1111);
  if (['Campus', 'GeoBasePoint'].includes(currentLevel?.type)) {
    for (let key in twinsObj) {
      handle(twinsObj[key]);
    }
  } else if (twinsObj[currentLevel.id] && currentLevel?.type == 'Building') {
    handle(twinsObj[currentLevel.id]);
  } else if (twinsObj[parentLevel.id] && currentLevel?.type == 'Floor') {
    let current = twinsObj[parentLevel.id][currentLevel.id];
    if (current) handle({ floor: current });
  } else if (['Thing', 'Device'].includes(currentLevel?.type)) {
    let newArr = [];
    for (let key in twinsObj) {
      if (twinsObj[key]) {
        for (let itemKey in twinsObj[key]) {
          twinsObj[key][itemKey] && newArr.push(...(twinsObj[key][itemKey] || []));
        }
      }
    }
    let currentTwin = newArr?.find((item: any) => item.twin == currentLevel.id);
    if (currentTwin) arr.push(currentTwin);
  }
  return arr;
};
