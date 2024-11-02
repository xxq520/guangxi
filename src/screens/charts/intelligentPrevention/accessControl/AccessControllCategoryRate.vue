<!--
 * @Description: 类别占比
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { computeToRealSize } from '@/utils/tool';
import { useTimeoutFn } from '@vueuse/core';
import type { ComposeOption } from 'echarts';
import type { PieSeriesOption } from 'echarts/charts';
import { homeStore } from '@/store/home';
import { IntelligentPreventionStore } from '@/store/intelligentPrevention';

const intelligentPrevention = IntelligentPreventionStore();

const home = homeStore();

const seriesData = computed(() => intelligentPrevention?.accessControlSystem?.categoryRate || []);

const total = computed(() => seriesData.value.reduce((prev, next) => prev + next.value, 0));

const colorList = [
  'rgba(89, 182, 255, 1)',
  'rgba(240, 107, 41, 1)',
  'rgba(255, 199, 79, 1)',
  'rgba(83, 241, 214, 1)',
];

const eChartsOption = computed(() => {
  const eChartsOption: ComposeOption<PieSeriesOption> = {
    legend: {
      show: false,
    },
    colorList,
    grid: {
      top: '0%',
      left: '0%',
      right: '0',
      bottom: '0',
      containLabel: true,
    },
    series: [
      {
        type: 'pie',
        radius: ['65%', '90%'],
        itemStyle: {
          color(params) {
            return colorList[params.dataIndex];
          },
        },
        label: {
          show: false,
        },
        data: seriesData.value,
      },
    ],
  };
  return eChartsOption;
});
</script>

<template>
  <div class="asset-statistics">
    <card-module title="类别占比">
      <div class="asset-statistics-chart-box">
        <div class="asset-statistics-chart">
          <base-chart class="chart" :option="eChartsOption" />
          <div class="total-number">
            <span>{{ total }}</span> <br />
            <span class="total-number-label">总数</span>
          </div>
        </div>

        <div class="chart-label">
          <div class="chart-label-item" v-for="(item, index) in seriesData" :key="item.name">
            <div class="chart-label-name">
              <div class="color-block" :style="{ background: colorList[index] }"></div>
              {{ item.name }}
            </div>
            <div class="chart-label-value" v-num-rolling="item.value || 0">{{ item.value }}</div>
          </div>
        </div>
      </div>

      <template #right>
        <div class="right">
          <p v-show-time="'yyyy年M月'" class="day"></p>
        </div>
      </template>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.asset-statistics {
  height: 271px;
  width: 410px;

  .asset-statistics-chart-box {
    display: flex;
  }

  .asset-statistics-chart {
    position: relative;
    width: 188px;
    height: 188px;

    .total-number {
      position: absolute;
      left: 0;
      top: 100px;
      width: 188px;
      font-size: 24px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
    }

    .total-number-label {
      font-size: 14px;
      font-family: OPPOSans;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.5);
      position: relative;
      top: -8px;
    }

    .chart {
      width: 188px;
      height: 188px;
      margin: 0 auto;
      margin-top: 30px;
      background: url('@/assets/img/intelligent-prevention/asset-pie-bg.png');
      background-size: cover;

      :deep(div) {
        width: 100% !important;
        height: 100% !important;

        canvas {
          width: 100% !important;
          height: 100% !important;
        }
      }

      :after {
        content: '';
        position: absolute;
        width: 125px;
        height: 125px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        left: 50%;
        top: 50%;
        margin: 0 auto;
        transform: translate(-50%, -50%);
      }
    }
  }

  .chart-label {
    margin-left: 60px;
    margin-top: 30px;
  }

  .chart-label-item {
    display: flex;
    width: 150px;
    height: 30px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: space-between;

    .chart-label-name {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: OPPOSans;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);

      .color-block {
        width: 8px;
        height: 8px;
        background: #59b6ff;
        margin-right: 8px;
      }
    }

    .chart-label-value {
      font-size: 20px;
      font-family: DINPro;
      font-weight: 400;
      color: #ffffff;
    }
  }

  .day {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    font-family: OPPOSans;
  }
}
</style>
