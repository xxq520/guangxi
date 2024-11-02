<!--
 * @Description: 院内总资产统计
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

const home = homeStore();

const seriesData = computed(() => home.data.assetStatistics || []);

const total = computed(() => seriesData.value.reduce((prev, next) => prev + next.value, 0));

const colorList = [
  'rgba(83, 241, 214, 1)',
  'rgba(89, 182, 255, 1)',
  'rgba(240, 107, 41, 1)',
  'rgba(255, 199, 79, 1)',
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
    <card-module title="院内总资产统计">
      <div class="asset-statistics-chart">
        <base-chart class="chart" :option="eChartsOption" />
        <div class="total-number">
          <span>{{ total }}</span> <br />
          <span class="total-number-label">总计</span>
        </div>
      </div>

      <div
        class="asset-statistics-label"
        :class="['asset-statistics-label-' + index]"
        v-for="(item, index) in seriesData"
        :key="item.name"
      >
        <div class="asset-statistics-name">
          <div
            class="color-block"
            v-if="index % 2 === 0"
            :style="{ backgroundColor: colorList[index] }"
          ></div>
          <span>{{ item.name }}</span>
          <div
            class="color-block"
            v-if="index % 2 !== 0"
            :style="{ backgroundColor: colorList[index] }"
          ></div>
        </div>
        <div class="asset-statistics-value">
          <span class="value">{{ item.value }}</span>
          <span class="percent">{{ ((item.value / total) * 100).toFixed(0) }}%</span>
        </div>
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.asset-statistics {
  height: 220px;
  width: 495px;
  margin-left: 40px;

  .asset-statistics-chart {
    position: relative;
    width: 158px;
    height: 158px;
    margin: 0 auto;

    .total-number {
      position: absolute;
      left: 0;
      top: 58px;
      width: 158px;
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
      width: 158px;
      height: 158px;
      margin: 0 auto;
      margin-top: 30px;
      background: url('@/assets/img/home/asset-pie-bg.png');
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

  .asset-statistics-label {
    width: 168px;
    height: 60px;
    position: absolute;
  }

  .asset-statistics-name {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: OPPOSans;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);

    .color-block {
      width: 8px;
      height: 8px;
      margin-right: 10px;
      margin-left: 16px;
    }
  }

  .asset-statistics-value {
    padding-top: 14px;
    position: relative;

    .value {
      font-size: 20px;
      font-family: DINPro;
      font-weight: 400;
      color: #ffffff;
      padding-left: 34px;
    }

    .percent {
      font-size: 16px;
      font-family: DINPro;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.7);
      padding-left: 10px;
    }

    &:before {
      content: '';
      background: url('@/assets/img/home/asset-pie-line.png') no-repeat;
      background-size: cover;
      width: 168px;
      height: 35px;
      position: absolute;
    }
  }

  .asset-statistics-label-0 {
    left: -6px;
    top: 64px;

    .asset-statistics-value {
      &:before {
        transform: rotateY(-180deg);
      }
    }
  }

  .asset-statistics-label-1 {
    right: -6px;
    top: 64px;

    .asset-statistics-name {
      justify-content: flex-end;
    }

    .asset-statistics-value {
      text-align: right;
      padding-right: 34px;
    }
  }

  .asset-statistics-label-2 {
    left: -6px;
    bottom: 10px;

    .asset-statistics-value {
      &:before {
        transform: rotateY(-180deg);
      }
    }
  }

  .asset-statistics-label-3 {
    right: -6px;
    bottom: 10px;

    .asset-statistics-name {
      justify-content: flex-end;
    }

    .asset-statistics-value {
      text-align: right;
      padding-right: 34px;
    }
  }
}
</style>
