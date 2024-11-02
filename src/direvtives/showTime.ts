/** 
经常在项目中会使用到自动显示时间的功能，但是每次样式都不同，
因此抽离出来成为单独指令功能，只负责显示时间的内容显示，样式由CSS控制。
自动在dom的内容里显示相应时间字段文本，并按秒实时更新
本指令为自更新，不会和其他数据更新冲突。

<!--简单用法-->

<div style="font-size: 28px;color: skyblue;" v-show-time="'星期w HH:mm:ss'"></div>
*/
import type { DirectiveBinding } from 'vue';

const ShowTime = (el: HTMLElement | any, { value }: DirectiveBinding) => {
  if (el.dataset.timeInterval) {
    clearInterval(el.dataset.timeInterval);
  }
  let getTime = new Date();
  const format = value;
  function formatDate(t: Date, str: string) {
    const obj: {
      [propsName: string]: any;
    } = {
      yyyy: t.getFullYear(),
      yy: t.getFullYear().toString().slice(-2),
      M: t.getMonth() + 1,
      MM: `0${t.getMonth() + 1}`.slice(-2),
      d: t.getDate(),
      dd: `0${t.getDate()}`.slice(-2),
      H: t.getHours(),
      HH: `0${t.getHours()}`.slice(-2),
      h: t.getHours() % 12,
      hh: `0${t.getHours() % 12}`.slice(-2),
      m: t.getMinutes(),
      mm: `0${t.getMinutes()}`.slice(-2),
      s: t.getSeconds(),
      ss: `0${t.getSeconds()}`.slice(-2),
      w: ['日', '一', '二', '三', '四', '五', '六'][t.getDay()],
    };
    return str.replace(/([a-z]+)/gi, ($1: string) => obj[$1]);
  }
  const setHtml = () => {
    getTime = new Date();
    el.innerHTML = formatDate(getTime, format);
  };
  setHtml();
  el.dataset.timeInterval = setInterval(() => {
    setHtml();
  }, 1000);
};

export default ShowTime;
