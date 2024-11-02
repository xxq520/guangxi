<!--
 * @Description: 使用趋势
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { energyMonitoringStore } from '@/store/energyMonitoring';
import { hexToRgba } from '@/utils/common';
import { useTimeoutFn } from '@vueuse/core';
import type { ComposeOption } from 'echarts';
import type { LineSeriesOption } from 'echarts/charts';

const energyMonitoring = energyMonitoringStore();

const data = computed(() => energyMonitoring?.data?.usageTrends || {});

const colorList = ['#4BAFF9', '#F9DA4B', '#4BF3F9', '#A3D8FF'];

const yAxisData = computed(() => data.value?.dataList);
const xAxisData = computed(() => data.value?.date);

const eChartsOption = computed(() => {
  const series: LineSeriesOption[] = yAxisData.value?.map((item, idx) => {
    return {
      name: `${item.name}`,
      type: 'line',
      showSymbol: false,
      smooth: true,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: hexToRgba(colorList[idx], 0.2),
            },
            {
              offset: 1,
              color: hexToRgba(colorList[idx], 0),
            },
          ],
          global: false,
        },
      },

      label: {
        show: false,
      },
      itemStyle: {
        color: colorList[idx],
        borderWidth: 1,
      },
      data: item.data,
    };
  });

  const eChartsOption: ComposeOption<LineSeriesOption> = {
    tooltip: {
      showContent: true,
      trigger: 'axis',
      backgroundColor: 'rgba(15, 25, 39, 0.8)',
      borderColor: 'rgba(145, 161, 180, 0.8)',
      textStyle: {
        color: '#fff',
      },
    },
    legend: {
      show: true,
      // icon: 'circle',
      top: 8,
      // right: 100,
      itemGap: 40,
      itemWidth: 16,
      itemHeight: 6,
      textStyle: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'OPPOSans',
        fontWeight: 400,
        padding: [0, 0, 0, 0],
      },
    },
    grid: {
      top: '22%',
      left: '3%',
      right: '0%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: xAxisData.value,
      axisLabel: {
        fontSize: 14,
        padding: [4, 0, 0, 0],
        fontFamily: 'DINPro',
        color: 'rgba(123, 157, 190, 1)',
      },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '',
      // nameGap: 30,
      // interval: 5,
      axisLabel: {
        padding: [0, 10, 0, 0],
        fontSize: 14,
        fontFamily: 'DINPro',
        color: 'rgba(123, 157, 190, 1)',
      },
      splitLine: {
        lineStyle: {
          width: 1,
          color: 'rgba(123, 157, 190, 0.3)',
        },
      },
    },

    series,
  };
  return eChartsOption;
});
</script>

<template>
  <div class="personnel-statistics">
    <card-module title="使用趋势" subTitle="(二号住院楼)">
      <div class="chart-unit">{{ data.chartUnit }}</div>
      <base-chart class="chart" :option="eChartsOption" />
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.personnel-statistics {
  height: 255px;
  width: 410px;
  pointer-events: all;
  position: relative;
  .chart-unit {
    position: absolute;
    left: 10px;
    top: 44px;
    font-size: 14px;
  }
  .chart {
    width: 100%;
    height: 210px;
  }
}
</style>
