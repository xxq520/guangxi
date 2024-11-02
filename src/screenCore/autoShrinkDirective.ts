import { DirectiveBinding } from 'vue';

import { v4 as uuidv4 } from 'uuid';

export interface ScreenConfig {
  width: number;
  height: number;
  layout: 'fixed' | 'flow' | 'expand';
}
const getAdaptorConf = () => {
  const adaptorDom = document.querySelector('#screenCore');
  if (adaptorDom) {
    const conf = (adaptorDom as HTMLElement).dataset.conf;
    if (conf) {
      return JSON.parse(conf);
    }
  } else {
    throw new Error(`Can't find the adaptor HTMLElement`);
  }
};
const getAutoRatioWidth = (conf: ScreenConfig) => {
  const realWidth = document.documentElement.style.getPropertyValue('--realWidth');
  if (conf.layout === 'expand') {
    const computedHeight = (window.innerWidth * conf.height) / conf.width;
    const realHeight = window.innerHeight;
    if (realHeight < computedHeight) {
      return (realHeight / computedHeight) * Number(realWidth);
    }
  }
  return Number(realWidth);
};
const getTargetRatio = (ratio: number) => {
  const realWidth = document.documentElement.style.getPropertyValue('--realWidth');
  return Number(realWidth) * ratio;
};
const setCssVariable = (el: HTMLElement, customRatio?: number) => () => {
  setTimeout(() => {
    const adaptorConf = getAdaptorConf();
    if (customRatio !== undefined) {
      el.style.setProperty('--realWidth', getTargetRatio(customRatio).toString());
    } else {
      el.style.setProperty('--realWidth', getAutoRatioWidth(adaptorConf).toString());
    }
  }, 50);
};
const setCssTransform = (el: HTMLElement, customRatio?: number) => () => {
  setTimeout(() => {
    const adaptorConf = getAdaptorConf();
    if (customRatio !== undefined) {
      el.style.setProperty('transform', getTargetRatio(customRatio).toString());
    } else {
      el.style.setProperty('transform', getAutoRatioWidth(adaptorConf).toString());
    }
  }, 50);
};
const shrinkBinderMap = {};
/**
 * 用于补充在expand模式下，纵向单独缩放以不超出屏幕显示范围，自定义指令
 */
export const vSingleShrink = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const binderId = uuidv4();
    el.dataset.binder = binderId;
    const binderFunc = setCssVariable(el, binding?.value);
    (shrinkBinderMap as Record<string, Function>)[binderId] = binderFunc;
    binderFunc();
    window.addEventListener('resize', binderFunc);
  },
  beforeUnmount(el: HTMLElement) {
    const binderId = el.dataset.binder;
    if (binderId) {
      window.removeEventListener(
        'resize',
        (shrinkBinderMap as Record<string, (this: Window, ev: UIEvent) => any>)[binderId]
      );
      delete (shrinkBinderMap as Record<string, Function>)[binderId];
    }
  },
};
