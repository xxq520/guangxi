<!--
 * @Description: 空气质量趋势(门诊楼)
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
import { intelligentMonitoringStore } from '@/store/intelligentMonitoring';
const intelligentMonitoring = intelligentMonitoringStore();

const energyMonitoring = energyMonitoringStore();

const data = computed(() => intelligentMonitoring.data?.airQualityTrends || {});

const colorList = ['#F9DA4B'];

const yAxisData = computed(() => data.value?.dataList || []);
const xAxisData = computed(() => data.value?.date);

const eChartsOption = computed(() => {
  const current = yAxisData.value[select?.value];
  const series: LineSeriesOption = {
    name: `${current?.name}`,
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
            color: hexToRgba(colorList[0], 0.35),
          },
          {
            offset: 1,
            color: hexToRgba(colorList[0], 0),
          },
        ],
        global: false,
      },
    },
    lineStyle: {
      width: 1.2,
    },
    label: {
      show: false,
    },
    itemStyle: {
      color: colorList[0],
      borderWidth: 10,
    },
    data: current?.data || [],
  };

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
      show: false,
      // icon: 'circle',
      top: 0,
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
      top: '10%',
      left: '1%',
      right: '0%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: xAxisData.value,
      axisLabel: {
        fontSize: 11,
        padding: [0, 0, 0, 0],
        fontFamily: 'DINPro',
        color: 'rgba(123, 157, 190, 1)',
        interval: 0,
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
        padding: [0, 0, 0, 0],
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

const select = ref(0);
</script>

<template>
  <div class="personnel-statistics">
    <card-module title="空气质量趋势" subTitle="(门诊楼)">
      <div class="body">
        <div class="btn-list">
          <div
            class="btn-item"
            :class="{ active: index == select }"
            v-for="(item, index) in data?.dataList"
            :key="index"
            @click="select = index"
          >
            {{ item.name }}
          </div>
        </div>
        <base-chart class="chart" :option="eChartsOption" />
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.personnel-statistics {
  height: 262px;
  width: 410px;
  pointer-events: all;
  margin-top: 14px;
  .body {
    .btn-list {
      @include flex(center, center, row);
      margin-top: 14px;
      .btn-item {
        @include flex(center, center, row);
        width: 94px;
        height: 28px;
        border-radius: 3px;
        margin: 0 5px;
        font-size: 14px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #6a9bbf;
        cursor: pointer;
        background-image: url('@/assets/img/home/tab-bg.png');
        background-size: 100% 100%;
        &.active {
          font-size: 14px;
          font-family: OPPOSans;
          font-weight: 400;
          color: #ffffff;
          background-image: url('@/assets/img/home/tab-bg-active.png');
          background-size: 100% 100%;
        }
      }
    }
  }
  .chart {
    width: 100%;
    height: 190px;
  }
}
</style>
