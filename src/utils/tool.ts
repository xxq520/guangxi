import { reactive, computed, ref, onUnmounted } from 'vue';
import { useThrottleFn } from '@vueuse/core';

/** 新标签页打开窗口 */
export const openNewPage = (url: string) => {
  window.open(url);
};

const convertSizeProp = [
  'left',
  'right',
  'top',
  'bottom',
  'width',
  'height',
  'fontSize',
  'margin',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'padding',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
];
const notConvertSizeProp = ['zIndex', 'lineHeight', 'fontWeight'];

function convertToRealSize(originSize: string) {
  if (!originSize) return 0;
  if (typeof originSize === 'number') return originSize;
  return parseInt(originSize.split('/')[0].replace('calc(', ''), 10);
}
function convertToCssSize(num: number) {
  return `calc(${num}px / var(--targetWidth) * var(--realWidth))`;
}
function computeToRealSize(num: number) {
  const targetWidth = parseInt(
    document.documentElement.style.getPropertyValue('--targetWidth'),
    10
  );
  const realWidth = parseInt(document.documentElement.style.getPropertyValue('--realWidth'), 10);
  return Math.floor((num / targetWidth) * realWidth);
}

let hasListener = false;
function scaleStyle() {
  const targetWidth = parseInt(
    document.documentElement.style.getPropertyValue('--targetWidth'),
    10
  );
  const realWidth = parseInt(document.documentElement.style.getPropertyValue('--realWidth'), 10);
  const style = reactive({
    transformOrigin: '0 0',
    transform: `scale(${realWidth / targetWidth})`,
  });
  if (!hasListener) {
    window.addEventListener('resize', () => {
      const nTargetWidth = parseInt(
        document.documentElement.style.getPropertyValue('--targetWidth'),
        10
      );
      const nRealWidth = parseInt(
        document.documentElement.style.getPropertyValue('--realWidth'),
        10
      );
      style.transform = `scale(${nRealWidth / nTargetWidth})`;
    });
    hasListener = true;
  }
  return style;
}

function mockData(data: any) {
  return data;
}

/** 是否没有f12查看 */
export const fullWidth = () =>
  (window.innerWidth > 1915 && window.innerWidth <= 1920) ||
  (window.innerWidth > 3835 && window.innerWidth <= 3840);

/** 获取图层配置 */
const getLayout = (title: string) => {
  const innerWidth = ref(window.innerWidth);
  const getWidth = useThrottleFn(() => {
    setTimeout(() => (innerWidth.value = window.innerWidth), 100);
  }, 50);
  window.addEventListener('resize', getWidth);

  onUnmounted(() => {
    window.removeEventListener('resize', getWidth);
  });
  return computed(() => {
    let layout = 'fixed';
    if (innerWidth.value > 1915 && innerWidth.value <= 1920) {
      layout = 'flow';
    }
    if (innerWidth.value > 3835 && innerWidth.value <= 3840) {
      layout = 'flow';
    }
    return {
      width: 3840,
      height: 2160,
      layout,
      title: title,
    };
  });
};

/**
 * 通过相对路径来获取图片的完整路径
 * @param {String} relativePath 图片相对路径，相对 assets/img 的路径
 * @returns {void} void
 * @author liaoJie
 * @example
 * ```
 * getImgUrlByURL('home/system-background.png')
 * ```
 */
export function getImgUrlByURL(relativePath: string) {
  return new URL(`../assets/img/${relativePath}`, import.meta.url).href;
}

export {
  convertSizeProp,
  notConvertSizeProp,
  convertToRealSize,
  convertToCssSize,
  mockData,
  computeToRealSize,
  scaleStyle,
  getLayout,
};
