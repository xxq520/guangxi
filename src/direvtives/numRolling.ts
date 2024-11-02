/** 数字滚动动画 */

import type { DirectiveBinding } from 'vue';

export default (el: HTMLElement | any, { value, oldValue, arg }: DirectiveBinding) => {
  const dom = el;
  if (value === oldValue) {
    if (!value && dom) {
      dom.innerText = 0;
    }
    return;
  }
  if (dom.dataset.raf) cancelAnimationFrame(dom.dataset.raf);
  let startTime = 0;
  const beginNum = 0;
  let endNum = 0;
  let duration = 1500;
  if (!Number.isNaN(Number(value))) {
    endNum = Number(value);
  } else {
    // throw new Error("the dom number rolling directive 's value require a number");
    console.warn("the dom number rolling directive 's value require a number");
  }
  duration = !Number.isNaN(Number(arg)) ? Number(arg) : 1500;
  const quadEaseInOut = (b: number, c: number, d: number, t: number) => -c * (t /= d) * (t - 2) + b;
  const step = (timestamp: DOMHighResTimeStamp) => {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    if (!dom) return;

    dom.innerText = Math.floor(quadEaseInOut(beginNum, endNum - beginNum, duration, progress)) || 0;
    if (progress <= duration) {
      dom.dataset.raf = requestAnimationFrame(step);
    } else {
      dom.innerText = endNum || 0;
    }
  };
  dom.dataset.raf = requestAnimationFrame(step);
};
