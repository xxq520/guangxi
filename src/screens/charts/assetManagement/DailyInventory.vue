<!--
 * @Description: 每日盘点
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { assetManagementStore } from '@/store/assetManagement';
import { computeToRealSize } from '@/utils/tool';
import { useTimeoutFn } from '@vueuse/core';
import type { ComposeOption } from 'echarts';
import type { PieSeriesOption } from 'echarts/charts';
const assetManagement = assetManagementStore();

const seriesData = computed(() => assetManagement.data?.dailyInventory || []);

const total = computed(() => seriesData.value.reduce((prev, next) => prev + next.value, 0));

const colorList = ['rgba(5, 234, 255, 1)', 'rgba(255, 199, 79, 1)'];

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

        startAngle: 20,
        // center: [computeToRealSize(67), computeToRealSize(68)],
        radius: ['65%', '90%'],
        itemStyle: {
          color(params) {
            return colorList[params.dataIndex];
          },
          borderRadius: 0,
          borderColor: '#05152c',
          borderWidth: 2,
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
  <div class="doctor-patient-analysis">
    <card-module title="每日盘点">
      <div class="body">
        <div class="asset-statistics-chart">
          <base-chart class="chart" :option="eChartsOption" />
          <div class="total-number">
            <span>{{ total }}</span> <br />
            <span class="total-number-label">总计</span>
          </div>
        </div>
        <div class="list">
          <div class="item" v-for="(item, index) in seriesData" :key="index">
            <p class="title" :class="{ right: index }">{{ item.name }}</p>
            <div class="value-box">
              <template v-if="!index">
                <span class="value" v-num-rolling="item.value || 0"></span>
                <span class="percent">{{ ((item.value / total) * 100).toFixed(0) }}%</span>
              </template>
              <template v-else>
                <span class="percent">{{ ((item.value / total) * 100).toFixed(0) }}%</span>
                <span class="value" v-num-rolling="item.value || 0"></span>
              </template>
            </div>
          </div>
        </div>
      </div>
      <template #right>
        <div class="right">
          {{ assetManagement.data?.dailyInventoryTime }}
        </div>
      </template>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 232px;
  width: 410px;
  pointer-events: all;
  .body {
    background: url('@/assets/img/background/assetManagement/daily-inventory-bg.png') center center
      no-repeat;
    background-size: 100% 100%;
    margin-top: -10px;
    position: relative;
  }
  .asset-statistics-chart {
    position: relative;
    width: 158px;
    height: 158px;
    margin: 0 auto;
    transform: translateX(-1px);

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
  .list {
    @include flex(space-between, center, row);
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    .item {
      padding-left: 12px;
      width: 27%;
      padding-right: 12px;
      .title {
        font-size: 14px;
        font-family: OPPOSans;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
      }
      .right {
        text-align: right;
      }
      .value-box {
        margin-top: 8px;
        @include flex(space-between, center, row);
        .value {
          font-size: 20px;
          font-family: DINPro;
          font-weight: 400;
          color: #ffffff;
          .percent {
            font-size: 16px;
            font-family: DINPro;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.7);
          }
        }
      }
    }
  }
  .right {
    @include flex(flex-start, center, row);
    margin-right: -10px;
    font-size: 14px;
    font-family: OPPOSans;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    .time {
      margin-left: 8px;
    }
  }
}
</style>
