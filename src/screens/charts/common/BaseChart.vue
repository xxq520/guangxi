<template>
  <div ref="chartRef" class="chart-ref"></div>
</template>

<script setup lang="ts">
/**
 * 基础图表组件。根据配置初始化，监听配置变化进行刷新
 * @author liaoJie
 * @since 2022-02-17 11:43:30
 * @example
 * ```
 * <base-chart :option="echartsOption" :echarts-init-opts="echartsInitOpts" />
 *
 * const echartsInitOpts: EChartsInitOpts = {
 *   width: 300,
 *   height: 300,
 * };
 *
 * const data = ref([
 *   { value: 1048, name: 'Search Engine' },
 *   { value: 735, name: 'Direct' },
 *   { value: 580, name: 'Email' },
 *   { value: 484, name: 'Union Ads' },
 *   { value: 300, name: 'Video Ads' },
 * ]);
 *
 * const echartsOption = <ComposeOption<PieSeriesOption>>({
 *   series: [
 *     {
 *       name: 'Access From',
 *       type: 'pie',
 *       radius: '50%',
 *       data: data.value,
 *       emphasis: {
 *         itemStyle: {
 *           shadowBlur: 10,
 *           shadowOffsetX: 0,
 *           shadowColor: 'rgba(0, 0, 0, 0.5)',
 *         },
 *       },
 *     },
 *   ],
 * });
 * ```
 */
import { EChartsInitOpts, echarts } from '@/lib/echarts';
import { onMounted, ref, toRefs, watch, UnwrapRef } from 'vue';
import type { ECBasicOption } from 'echarts/types/dist/shared';
import { EChartsOption } from 'echarts';
import { EChartsType } from 'echarts/core';
import { useEventListener } from '@vueuse/core';
import { EChartsExtensionInstaller, EChartsExtension } from 'echarts/types/src/extension';

interface BaseChartExpose {
  /** 获取 echarts 实例对象 */
  getEchartsInstance: () => any;
}

type Nullable<T> = T | null;

interface BaseChartProps {
  /** 图表配置 */
  option: ECBasicOption | UnwrapRef<ECBasicOption>;
  /** 图表容器初始化配置 */
  echartsInitOpts?: EChartsInitOpts;
  extendEcharts?:
    | EChartsExtensionInstaller
    | EChartsExtension
    | (EChartsExtensionInstaller | EChartsExtension)[]
    | any;
}

const props = defineProps<BaseChartProps>();
const chartRef = ref<HTMLElement>();
const { option } = toRefs(props);
let chartInstance: Nullable<EChartsType> = null;

if (props.extendEcharts) {
  echarts.use(props.extendEcharts);
}

function getEchartsInstance() {
  return chartInstance;
}

defineExpose<BaseChartExpose>({
  getEchartsInstance,
});

onMounted(() => {
  chartInstance = echarts.init(chartRef.value as HTMLElement) as unknown as EChartsType;
  chartInstance.setOption(props.option as EChartsOption);
});

watch(
  option,
  () => {
    chartInstance?.setOption(props.option as EChartsOption, {
      notMerge: true,
    });
  },
  {
    deep: true,
  }
);
useEventListener('resize', () => {
  setTimeout(() => chartInstance?.resize(), 110);
});
</script>

<style lang="scss" scoped>
.chart-ref {
  width: 100%;
  height: 100%;
}
</style>
