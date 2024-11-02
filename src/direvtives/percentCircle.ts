/** 环形图表 */

import type { DirectiveBinding } from 'vue';

export default (el: HTMLElement | any, { value, oldValue, arg }: DirectiveBinding) => {
  const dom = el;
  if (value === oldValue) return;
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
    if (progress <= duration) {
      const percent = quadEaseInOut(0, value, duration, progress);
      dom.style[
        '-webkit-mask'
      ] = `conic-gradient(from 0deg at center, rgba(255, 255, 255, 1) 0%, #fff ${percent}%, transparent ${percent}% , transparent 100%)`;
      dom.dataset.raf = requestAnimationFrame(step);
    } else {
      dom.style[
        '-webkit-mask'
      ] = `conic-gradient(from 0deg at center, rgba(255, 255, 255, 1) 0%, #fff ${value}%, transparent ${value}% , transparent 100%)`;
    }
  };
  dom.dataset.raf = requestAnimationFrame(step);
};
