<!--
 * @Description: 空调温度趋势
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { energyMonitoringStore } from '@/store/energyMonitoring';
import { useTimeoutFn } from '@vueuse/core';
import type { ComposeOption } from 'echarts';
import type { BarSeriesOption } from 'echarts/charts';

const energyMonitoring = energyMonitoringStore();

const data = computed(() => energyMonitoring.data?.airTemperatureTrend || {});

const yAxisData = computed(() => data.value?.dataList);
const xAxisData = computed(() => data.value?.date);

const eChartsOption = computed(() => {
  console.log(data, 99555);
  const series: BarSeriesOption = {
    name: ``,
    type: 'bar',
    stack: 'Total',
    label: {
      show: true,
      position: 'top',
      color: '#fff',
      fontSize: 10,
    },
    barWidth: 8,
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 1,
            color: 'rgba(75, 175, 249, 1)',
          },
          {
            offset: 0,
            color: 'rgba(75, 222, 249, 1)',
          },
        ],
        global: false,
      },
    },
    data: yAxisData.value,
  };

  const eChartsOption: ComposeOption<BarSeriesOption> = {
    tooltip: {
      showContent: true,
      trigger: 'axis',
      backgroundColor: 'rgba(15, 25, 39, 0.8)',
      borderColor: 'rgba(145, 161, 180, 0.8)',
      textStyle: {
        color: '#fff',
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
        fontFamily: 'DINPro-Regular',
        color: 'rgba(123, 157, 190, 1)',
      },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '℃',
      axisLabel: {
        padding: [0, 6, 0, 0],
        fontSize: 14,
        fontFamily: 'DINPro-Regular',
        color: 'rgba(123, 157, 190, 1)',
      },
      nameTextStyle: {
        align: 'right',
        color: 'rgba(123, 157, 190, 1)',
        fontSize: 14,
        fontFamily: 'DINPro-Regular',
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
    <card-module title="空调温度趋势" subTitle="(二号住院楼7-16F)">
      <base-chart class="chart" :option="eChartsOption" />
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.personnel-statistics {
  height: 230px;
  width: 410px;
  pointer-events: all;

  .chart {
    width: 100%;
    height: 185px;
  }
}
</style>
