import { onMounted, nextTick, onUnmounted, Ref } from 'vue';
/**
 * getRowHeight:放回一个数值，该数值作为每次滚动的距离
 */
export default function useAutoScroll(
  container: Ref<HTMLElement>,
  //   options: { length: number; }
  getRowHeight: () => number
) {
  /** 滚动定时器 */
  let autoPlayTimer: any = null;
  let intersectionObserver: any = null;

  /** 获取表格中每行的高度 */
  //   const getRowHeight = () => {
  //     const table = container.value;

  //     // if (options.length) {
  //       return (table.scrollHeight || table.offsetHeight) / options.length;
  //     // }
  //     // return options.scorllHeight ?? 10;
  //   };

  /** 设置表格自动滚动 */
  const setTableAutoPlay = () => {
    if (!container.value) return;
    /** 可视高度及包含滚动高度 */
    const { offsetHeight, scrollHeight } = container.value;
    /** 判断当前是否有滚动区域，有才进行滚动 */
    if (!container.value.children.length || !(offsetHeight <= scrollHeight)) return;
    autoPlayTimer && clearTimeout(autoPlayTimer);

    /** 进行自动滚动操作(整体滚动) */
    autoPlayTimer = setTimeout(() => {
      if (!container.value) return;
      /** 是否触底判断 */
      let isDiBottom = false;
      /** 监听元素前，先把上一次监听的事件销毁 */
      intersectionObserver?.disconnect();
      intersectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio >= 0.9) {
          isDiBottom = true;
          setTableBackTop();
        }
      });
      /** 监听是否触底 */
      intersectionObserver.observe(container.value?.children[container.value.children.length - 1]);
      /** 没有触底，继续滚动下一行 */
      !isDiBottom && scrollLine();
    }, 1000);
  };

  /** 表格回到顶部 */
  const setTableBackTop = () => {
    let table = container.value;

    clearTimeout(autoPlayTimer);

    if (!table) return;
    /** 判断当前容器是否已经回到顶部（回到顶部） */
    /**修改为小于1，防止因为精度问题滚动距离除以10时出现无限小数，使得滚动会顶部时只会无限接近于零*/
    if (table.scrollTop <= 1) {
      // table.scrollTop = 0
      return setTimeout(() => {
        setTableAutoPlay();
      }, 1000);
    }

    /** 重新开始向下滚动 */
    autoPlayTimer = setTimeout(() => {
      table.scrollTop -= table.scrollTop / 10;
      setTableBackTop();
    }, 10);
  };

  /** 单行滚动 */
  const scrollLine = () => {
    let tableBody = container.value;
    let table = container.value as HTMLDivElement;
    /** 获取滚动单行的行高 */
    const lineHeight = getRowHeight();
    /** 获取当前滚动的行 */
    // const nowLine = Math.round(table.scrollTop / lineHeight);

    // console.log("滚动",(tableBody.children[nowLine] as any).offsetTop,tableBody.children[nowLine],nowLine)
    /** 滚动到多少进行停止滚动 */
    const stopHeight = table.scrollTop + lineHeight;
    /** 上一次滚动的位置 */
    let prevScroll = table.scrollTop;
    const handle = () => {
      clearTimeout(autoPlayTimer);
      /** 单行滚动已经结束，开始下一行的滚动 */
      if (table.scrollTop >= stopHeight) return setTableAutoPlay();

      /** 继续单行滚动 */
      autoPlayTimer = setTimeout(() => {
        table.scrollTop += 1;

        /** 相同位置则判断为到底了 */
        if (table.scrollTop === prevScroll) return setTableAutoPlay();
        prevScroll = table.scrollTop;
        handle();
      }, 500 / lineHeight);
    };
    handle();
  };

  onMounted(() => {
    nextTick(() => {
      /** 移入事件 */
      container.value.addEventListener('mouseenter', () => clearTimeout(autoPlayTimer));
      /** 移出事件 */
      container.value.addEventListener('mouseleave', () => setTableAutoPlay());

      /** 设置自动轮播 */
      setTimeout(setTableAutoPlay, 1000);
    });
  });

  return {};
}
