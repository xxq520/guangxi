/** 数字滚动动画 */

import type { DirectiveBinding } from 'vue';

export default (el: HTMLElement | any, { value, oldValue, arg }: DirectiveBinding) => {
  const dom = el;
  dom.title = dom.innerText;

  if (value == 1) {
    dom.style.cssText = `
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
  } else if (value) {
    dom.style.cssText = `
       overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${value};
    `;
  }
};
