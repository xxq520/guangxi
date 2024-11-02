<!--
 * @author: xiexiangquan
 * @Date: 2022-03-21 09:09:15
 * @description: 自动滚动表格组件
-->
<template>
  <div class="table-and-pagination">
    <div class="custom-table" ref="container">
      <el-table
        style="width: '100%'"
        @row-click="rowClick"
        @cell-click="cellClick"
        v-bind="props"
        :data="customPageData ? data : getCurrentPageData"
      >
        <el-table-column
          v-for="(item, index) in getColumns"
          :key="index"
          :prop="item.key"
          :label="item.title"
          :width="item.width"
          v-bind="item"
        >
          <template v-if="item.type === 'select'" #header="scope">
            <slot :name="`header-${item.key}`" :column="scope.column"></slot>
          </template>
          <!-- 插槽定义 -->
          <template #default="scope">
            <slot :name="item.key" :row="scope.row">
              <div :title="scope.row[item.key]">
                {{ item.key === 'index' ? (scope.$index + 1) : scope.row[item.key] }}
              </div>
            </slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
/*
const data = ref([
  {
    pm: 1,
    code: 'MG-569246S',
    num: 361331,
    time: '4.496',
  },
  {
    pm: 2,
    code: 'MG-569246S',
    num: 361332,
    time: '5.496',
  },
]);
const columns = ref([
  {
    key: 'index',
    title: '下标',
    align: 'center',
    width: 60,
  },
  {
    title: '功能号',
    key: 'code',
    align: 'left',
    width: 150,
  },
]);
使用:
<xxv-scroll-table :height="200" :data="data" :columns="columns" />
*/

/** element样式引入 */
import { ElTable, ElTableColumn } from 'element-plus';
import 'element-plus/theme-chalk/base.css';
import 'element-plus/theme-chalk/el-table.css';
import 'element-plus/theme-chalk/el-scrollbar.css';
import { onMounted, ref, onUnmounted, computed, watch, defineComponent } from 'vue';
export default defineComponent({
  name: 'ScrollTable',
  components: {
    ElTable,
    ElTableColumn,
  },
  props: {
    /** 表格的高度设置 */
    height: {
      type: [String, Number],
      default: '100%',
    },
    /** 表格数据(array) */
    data: {
      type: Array,
      default: () => [],
    },
    /** 表头设置(array) */
    columns: {
      type: Array,
      default: () => [],
    },
    /** 是否显示表头(boolean) */
    showHeader: {
      type: Boolean,
      default: true,
    },
    /** 内容超出视高后自动滚动(自动轮播)(boolean) */
    autoPlay: {
      type: Boolean,
      default: false,
    },
    /** 表格的滚动配置(object) */
    scrollConfig: {
      type: Object,
      default: () => ({
        duration: 500,
        interval: 3000,
      }),
    },
    /** 空数据时显示的文本内容 */
    emptyText: {
      type: String,
      default: '暂无数据可显示',
    },
    /** 每页展示的数量 */
    pageSize: {
      default: 5,
      type: Number,
    },
    /** 只有一页数据时是否隐藏分页器 */
    hideSingle: {
      default: true,
      type: Boolean,
    },
    /** 当前的页码 */
    currentPage: {
      default: 1,
      type: Number,
    },
    /** 总的数据条数 */
    dataTotal: {
      type: Number,
      default: 0,
    },
    /** 自定义每页的数据，就代表着表格中展示的数据就是传入的data完整数据，该组件内部不做分页处理 */
    customPageData: {
      default: true,
      type: Boolean,
    },
    /** 是否带斑马纹(boolean) */
    stripe: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['row-click', 'cell-click', 'page-change'] as Array<string>,
  setup(props, content) {
    /** 当前的页码 */
    const currentPage = ref(props.currentPage || 1);
    watch(
      () => props.currentPage,
      (newPage: number) => {
        /** 通知父组件页码发生变化 */
        currentPage.value = newPage;
      }
    );
    /** 通知父组件页码发生变化 */
    watch(currentPage, (newPage: number) => content.emit('page-change', newPage));

    /** 获取表头内容 */
    const getColumns = computed(() => props.columns as any);
    const container = ref();
    /** 表格内容容器 */
    const tableContent = ref();
    /** 表格主体包裹每一行的容器 */
    const tableRow = ref();
    /** 滚动定时器 */
    let autoPlayTimer: any = null;
    let intersectionObserver: any = null;

    /** 获取表格中每行的高度 */
    const getRowHeight = () => {
      const table = tableContent.value;
      /** 有表头的话需要除去表头的高度 */
      return (table.scrollHeight || table.offsetHeight) / props.data.length;
    };

    /** 设置表格自动滚动 */
    const setTableAutoPlay = () => {
      /**
       * 每次获取dom为了确保dom更新后数量是最新的
       * 表格所有行的容器tbody */
      tableRow.value = container.value
        .getElementsByClassName('el-table__body')[0]
        .getElementsByTagName('tbody')[0];
      let tableBody = tableRow.value;

      /** 可视高度及包含滚动高度 */
      const { offsetHeight, scrollHeight } = tableContent.value;
      /** 判断当前是否有滚动区域，有才进行滚动 */
      if (!tableRow.value.children.length || !(offsetHeight <= scrollHeight)) return;
      autoPlayTimer && clearTimeout(autoPlayTimer);

      /** 进行自动滚动操作(整体滚动) */
      autoPlayTimer = setTimeout(() => {
        /** 是否触底判断 */
        let isDiBottom = false;
        /** 监听元素前，先把上一次监听的事件销毁 */
        intersectionObserver?.disconnect();
        intersectionObserver = new IntersectionObserver((entries) => {
          if (entries[0].intersectionRatio >= 0.7) {
            isDiBottom = true;
            setTableBackTop();
          }
        });
        /** 监听是否触底 */
        intersectionObserver.observe(tableBody.children[tableBody.children.length - 1]);
        /** 没有触底，继续滚动下一行 */
        !isDiBottom && scrollLine();
      }, props.scrollConfig.interval);
    };

    /** 表格回到顶部 */
    const setTableBackTop = () => {
      let table = tableContent.value;
      clearTimeout(autoPlayTimer);
      /** 判断当前容器是否已经回到顶部（回到顶部） */
      if (table.scrollTop <= 0) return setTimeout(setTableAutoPlay.bind(this), 1000);
      /** 重新开始向下滚动 */
      autoPlayTimer = setTimeout(() => {
        table.scrollTop -= table.scrollTop / 10;
        setTableBackTop();
      }, 10);
    };

    /** 单行滚动 */
    const scrollLine = () => {
      let tableBody = tableRow.value;
      let table = tableContent.value as HTMLDivElement;
      /** 获取滚动单行的行高 */
      const lineHeight = getRowHeight();
      /** 获取当前滚动的行 */
      const nowLine = Math.round(table.scrollTop / lineHeight);
      /** 滚动到多少进行停止滚动 */
      const stopHeight = tableBody.children[nowLine].offsetTop + lineHeight;
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
        }, props.scrollConfig.duration / lineHeight);
      };
      handle();
    };

    /** 设置表格自适应css样式（仅在大屏自适应框架中生效） */
    const setTableAutoPage = () => {
      let targetWidth = getComputedStyle(document.documentElement).getPropertyValue(
        '--targetWidth'
      );
      if (!targetWidth) return;
      const colgroup = container.value.getElementsByTagName('colgroup');
      for (let i = 0; i < colgroup.length; i++) {
        let colgroupItem = colgroup[i].getElementsByTagName('col');
        for (let j = 0; j < colgroupItem.length; j++) {
          colgroupItem[
            j
          ].style.cssText = `width: calc(${colgroupItem[j].width}px / var(--targetWidth) * var(--realWidth)) !important`;
        }
      }
    };

    /** 初始化表格监听事件 */
    const init = () => {
      /** 移入事件 */
      container.value.addEventListener('mouseenter', () => clearTimeout(autoPlayTimer));
      /** 移出事件 */
      container.value.addEventListener('mouseleave', () => props.autoPlay && setTableAutoPlay());

      /** 表格容器 */
      tableContent.value = container.value.getElementsByClassName('el-scrollbar__wrap')[0];

      tableContent.value?.addEventListener('wheel', (e: any) => {
        e.preventDefault();
      });

      /** 设置自动轮播 */
      props.autoPlay && setTimeout(setTableAutoPlay, 100);

      /** 设置表格的自适应 */
      setTimeout(setTableAutoPage, 100);
    };

    /** 表格行点击事件触发 */
    const rowClick = (...arg: any) => {
      content.emit('row-click', ...arg);
    };
    /** 表格单元格被单击 */
    const cellClick = (...arg: any) => {
      content.emit('cell-click', ...arg);
    };

    /** 获取表格当前页展示的数据 */
    const getCurrentPageData = computed(() => {
      const startDataIndex = props.pageSize * (currentPage.value - 1);
      return props.data.slice(startDataIndex, startDataIndex + props.pageSize);
    });

    onMounted(() => {
      init();
    });

    onUnmounted(() => clearTimeout(autoPlayTimer));
    return {
      rowClick,
      cellClick,
      props,
      getCurrentPageData,
      getColumns,
      currentPage,
      container,
    };
  },
});
</script>

<style lang="scss" scoped>
// 表格样式定制
:deep(.el-table) {
  background: transparent;
}
:deep(.el-table tr),
:deep(.el-table tr.el-table__row--striped),
:deep(.el-table tr.el-table__row--striped td.el-table__cell),
:deep(.el-table th),
:deep(.el-table__inner-wrapper::before),
:deep(.el-table--fit),
:deep(.el-table th.el-table__cell) {
  background: transparent;
}
:deep(.el-scrollbar__wrap) {
}
:deep(.el-table tr) {
  min-height: 36px;
}
:deep(.el-table th.el-table__cell) {
  padding: 0;
}
:deep(.content-container) {
  margin: 0;
}
:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf),
:deep(.el-table th.el-table__cell.is-leaf) {
  // border-bottom: 1px solid #e8ebef;
  border-bottom: none;
}
:deep(.el-table .el-table__header) {
  th.el-table-fixed-column--left,
  th.el-table-fixed-column--right {
    background: #f2f6fc;
    z-index: 2;
  }
}
:deep(.el-table .el-table-fixed-column--left) {
  background: #ffffff;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell),
:deep(tr) {
  background: none;
}
:deep(.el-table__header) {
  tr {
    height: 50px;
    background: transparent;
  }
}

:deep(.el-table--fit),
:deep(.el-table th.el-table__cell > .cell) {
  font-size: 14px;
  font-family: AlibabaPuHuiTi;
  color: #ffffff99;
  font-weight: normal;
}
:deep(.el-table--fit) {
  cursor: pointer;
  font-weight: 400;
}

:deep(.el-table--striped .el-table__body) {
  border-collapse: separate;
  // border-spacing: 0px 7px;
  tr td.el-table__cell {
    background: #00ffff1a;
  }
  tr.el-table__row--striped td.el-table__cell {
    background: transparent;
  }
}
:deep(.el-table__body tr td) {
  font-size: 14px;
  font-family: AlibabaPuHuiTi;
  font-weight: 400;
  color: #fff;
}

:deep(.el-table .el-table__row--striped) {
  .el-table__cell {
    background: transparent;
  }
}

:deep(.el-pagination.is-background .el-pager li),
:deep(.el-pagination.is-background .btn-prev),
:deep(.el-pagination.is-background .btn-next) {
  background: transparent;
  border: 1px solid rgba(71, 166, 255, 0.5);
  border-radius: 3px;
  font-size: 14px;
  font-family: Alibabar;
  font-weight: 400;
  color: #d9edff;
  min-width: 24px;
  height: 24px;
}
:deep(.el-table .cell) {
  padding: 0 7px;
}
:deep(.el-table .el-table__cell) {
  padding: 7px 0px 7px 0;
}

:deep(.el-table__body) {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 7px;
    width: 100%;
    height: 1px;
    background-size: 100% 100%;
  }
}
// 排序颜色
:deep(.el-table .descending .sort-caret.descending) {
  border-top-color: rgba(61, 91, 128, 1);
}
:deep(.el-table .ascending .sort-caret.ascending) {
  border-bottom-color: rgba(61, 91, 128, 1);
}
.custom-table {
  width: auto;
  overflow-y: hidden;
  // 总的高度减去分页的高度，这样分页就是固定在下方
  height: 100%;
}
.custom-table table {
  margin: 0;
}
// 单行文本溢出显示省略号
:deep(.line-overflow) {
  :nth-child(1) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
:deep(.line-overflow2, .line-overflow3) {
  // 两行文本溢出显示省略号
  :nth-child(1) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical; /*设置对齐模式*/
    -webkit-line-clamp: 2; /*设置多行的行数*/
  }
  // 三行文本溢出显示省略号
  &.line-overflow3 {
    :nth-child(1) {
      -webkit-line-clamp: 3; /*设置多行的行数*/
    }
  }
}
// 分页
.table-pagination {
  padding: 10px 0 30px 0;
  position: relative;
}
:deep(.el-table__empty-block) {
  max-height: 100% !important;
}
:deep(.el-table__body .el-table__row) {
  height: 49px;
  padding: 6px 0;
}
:deep(.el-table--striped .el-table__body tr td.el-table__cell) {
  background: rgba(54, 82, 123, 0.2);
}
</style>
