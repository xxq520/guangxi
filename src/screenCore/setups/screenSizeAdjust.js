import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

function SetScreenSize(screenConfig) {
  const standardWidth = screenConfig.width;
  const standardHeight = screenConfig.height;
  // 判断布局类型，固定比例 fixed，有高度；流式布局 flow， 没有高度，根据屏幕宽度缩放， 不是这两种的就报错
  switch (screenConfig.layout) {
    case 'fixed':
      break;
    case 'flow':
      break;
    case 'expand':
      break;
    default:
      throw new Error(`screen config don't supported layout of ${screenConfig.layout}`);
  }
  // 根据自定义的宽度来设置对应高度
  const customWidth = window.innerWidth;
  const customHeight = window.innerHeight;
  // 设置目标宽度的css变量
  document.documentElement.style.setProperty('--targetWidth', standardWidth.toString());
  // 流式布局进行缩放
  if (screenConfig.layout === 'flow') {
    if (customWidth <= standardWidth) {
      // 小于目标宽度 以小的为宽，并塞入实际宽度的css变量
      document.documentElement.style.setProperty('--realWidth', customWidth.toString());
      const centerLeft = (window.innerWidth - customWidth) / 2;
      return {
        width: `${customWidth}px`,
        height: `${customHeight}px`,
        top: '0',
        left: `${centerLeft}px`,
      };
    }
    // 大于目标宽度 以目标为宽，并塞入目标宽度的css变量
    document.documentElement.style.setProperty('--realWidth', standardWidth.toString());
    const centerLeft = (window.innerWidth - standardWidth) / 2;
    return {
      width: `${standardWidth}px`,
      height: `${customHeight}px`,
      // 设置水平居中
      top: '0',
      left: `${centerLeft}px`,
    };
  }

  if (screenConfig.layout === 'expand') {
    // 大于目标宽度 以目标为宽，并塞入目标宽度的css变量
    document.documentElement.style.setProperty('--realWidth', customWidth.toString());
    const centerLeft = (window.innerWidth - customWidth) / 2;
    return {
      width: `${customWidth}px`,
      height: `${customHeight}px`,
      top: '0',
      left: `${centerLeft}px`,
    };
  }

  // 固定比例布局进行缩放
  if (customHeight >= (standardHeight / standardWidth) * customWidth) {
    // 实际高宽比例 > 目标高宽比例，宽度以实际的为主,高度进行计算，并把屏幕居中
    document.documentElement.style.setProperty('--realWidth', customWidth.toString());
    const centerLeft = (window.innerWidth - customWidth) / 2;
    const centerTop = (window.innerHeight - (standardHeight / standardWidth) * customWidth) / 2;
    return {
      width: `${customWidth}px`,
      height: `${((standardHeight / standardWidth) * customWidth).toFixed(3)}px`,
      // 水平垂直居中
      left: `${centerLeft}px`,
      top: `${centerTop}px`,
    };
  }
  // 实际高宽比例 < 目标高宽比例，宽度以实际的为主,高度进行计算，然后进行比例缩放
  const realWidth = (standardWidth / standardHeight) * customHeight;
  document.documentElement.style.setProperty('--realWidth', realWidth.toString());
  const centerLeft = (window.innerWidth - realWidth) / 2;
  const centerTop =
    window.innerHeight - (standardHeight / standardWidth) * customWidth > 0
      ? (window.innerHeight - (standardHeight / standardWidth) * customWidth) / 2
      : 0;
  return {
    width: `${realWidth}px`,
    height: `${customHeight}px`,
    left: `${centerLeft}px`,
    top: `${centerTop}px`,
  };
}

/**
 * 屏幕自适应的setup
 * 用于屏幕自适应，绑定resize，也可以提供固定宽度来调整
 * @returns {{layoutConfig: Ref<UnwrapRef<{layout: string, width: number, height: number}>>, sizeStyle: Ref<UnwrapRef<{}>>, screenSizeSet: screenSizeSet}}
 */
export default function screenSizeAdjust() {
  const sizeStyle = ref({});
  const layoutConfig = ref({
    width: 1920,
    height: 1080,
    layout: 'flow',
  });
  const scrollerStyle = ref({});
  function screenSizeSet(screenConfigSet) {
    sizeStyle.value = SetScreenSize(screenConfigSet);
    if (screenConfigSet.layout === 'flow') {
      const realWidth = parseFloat(sizeStyle.value.width);
      scrollerStyle.value = {
        height: `${screenConfigSet.height * (realWidth / screenConfigSet.width)}px`,
      };
    } else {
      scrollerStyle.value = {};
    }
    const resizeStyle = useDebounceFn(() => {
      sizeStyle.value = SetScreenSize(screenConfigSet);
      if (screenConfigSet.layout === 'flow') {
        const realWidth = Number(sizeStyle.value.width);
        scrollerStyle.value = {
          height: `${screenConfigSet.height * (realWidth / screenConfigSet.width)}px`,
        };
      } else {
        scrollerStyle.value = {};
      }
    }, 50);
    window.removeEventListener('resize', resizeStyle);
    window.addEventListener('resize', resizeStyle);
  }
  return {
    layoutConfig,
    sizeStyle,
    screenSizeSet,
    scrollerStyle,
  };
}
