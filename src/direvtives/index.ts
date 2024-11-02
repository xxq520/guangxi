import ShowTime from './showTime';
import NumRolling from './numRolling';
import percentCircle from './percentCircle';
import TitleShow from './titleShow';
import { App } from 'vue';
//封装成函数
const getKebabCase = (str: string | any) => {
  const arr = str.split('');
  //使用循环遍历字符串
  str = arr.map((item: string, index: number) => {
    if (item.toUpperCase() === item) {
      //使用toUpperCase()方法检测当前字符是否为大写
      return (index ? '-' : '') + item.toLowerCase();
      //大写就在前面加上-，并用toLowerCase()将当前字符转为小写
    } else {
      return item;
    }
  });
  return str.join('');
};

/** 指令集合统一导出 */
export const directives: {
  [propsName: string]: any;
} = {
  ShowTime,
  NumRolling,
  percentCircle,
  TitleShow,
};

export default {
  /** 使用use的方式注册所有的指令 */
  install: (app: App) => {
    for (const key in directives) {
      if (Object.prototype.hasOwnProperty.call(directives, key)) {
        app.directive(getKebabCase(key), directives[key]);
      }
    }
  },
};
