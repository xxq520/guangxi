import router from '@/routers';
import { useAppStore } from '../store/index';

/*
====== thingx-操作集自定义脚本-进入退出桃源院区 ======
{ 
  type: "enter",
  message: "桃源院区"
}
{
  type: "leave",
  message: "桃源院区"
}

====== thingx-全局层级切换触发事件 ======
{ 
  type: "enter",
  message: app.level.current.type
}
{
  type: "leave",
  message: app.level.current.type
}
*/

/**
 * 监听 thing-x 发送过来的消息
 */
export function takeOverMessage(data: any) {
  const store = useAppStore();
  if (data?.message === '桃源院区') {
    if (data?.type === 'enter') {
      router.push('/p/overviewHospital');
    }

    if (data?.type === 'leave') {
      router.push('/p/home');
    }
  }
  if (data?.level) {
    let copyData = { ...data };
    copyData.children = copyData.children ? JSON.parse(copyData.children) : undefined;
    copyData.parent = copyData.parent ? JSON.parse(copyData.parent) : undefined;
    copyData.current = copyData.current ? JSON.parse(copyData.current) : undefined;
    copyData.floor = Array.isArray(copyData.floor)
      ? copyData.floor
      : JSON.parse(copyData.floor || '[]');
    console.log(copyData, 222000);
    store.level = copyData;
  }

  if (data?.type === 'progress') {
    store.setLoadingProgress(Math.floor(data?.data * 100));
  }
}

/**
 * 向 thing-x 发送消息
 */
export function postMessage(data: Record<string, any>) {
  const iframe = document.querySelector('#thing-x') as HTMLIFrameElement;
  if (iframe) {
    iframe.contentWindow?.postMessage(data, '*');
  }
}

/**
 * 飞向孪生体
 */
export function flyToTwin(id: string) {
  postMessage({
    type: 'toLevel',
    data: id,
  });
}

/** 刷新台账数据飞向孪生体 */
export const reloadFlyToTwin = (id: string) => {
  postMessage({
    type: 'reloadToLevel',
    data: id,
  });
};

/** 激活业务 */
export function bussinessActive(business: string) {
  postMessage({
    type: 'bussinessActive',
    data: business,
  });
}
