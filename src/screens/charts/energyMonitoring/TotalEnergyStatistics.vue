<!--
 * @Description: 总能效统计
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { energyMonitoringStore } from '@/store/energyMonitoring';

const energyMonitoring = energyMonitoringStore();

const data = computed(() => energyMonitoring.data?.totalEnergyStatistics || []);
</script>

<template>
  <div class="total-energy-statistics">
    <card-module title="总能效统计" subTitle="(桃源院区)">
      <div class="total-energy-box">
        <div class="total-energy-card" v-for="item in data" :key="item.name">
          <div class="card-title">{{ item.name }}</div>
          <div class="card-value" :title="(item.value || 0) + item.unit">
            <span v-num-rolling="item.value || 0"></span
            ><span class="card-unit">{{ item.unit }}</span>
          </div>
          <div class="card-rate">
            <span class="yoy">同比</span>
            <rate-number :other="true" :value="item.rate" />
          </div>
        </div>
      </div>
      <template #right>
        <div class="right">
          <p v-show-time="'yyyy年'" class="day"></p>
        </div>
      </template>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.total-energy-statistics {
  height: 370px;
  width: 410px;
  pointer-events: all;
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
  .total-energy-box {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 23px;
    grid-row-gap: 10px;
    text-align: center;

    .total-energy-card {
      width: 197px;
      height: 141px;
      background: url('@/assets/img/energy/energy-total-bg.png') no-repeat;
      background-size: cover;

      .card-title {
        height: 14px;
        font-size: 14px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #cbe3fd;
        margin-top: 20px;
      }

      .card-value {
        @include text-overflow;
        padding: 0 14px;
        height: 30px;
        line-height: 30px;
        font-size: 30px;
        margin-top: 21px;
        font-family: DINPro-Medium;
        font-weight: 500;
        color: #ffffff;
      }

      .card-unit {
        font-size: 16px;
        font-family: OPPOSans-R;
      }

      .card-rate {
        display: flex;
        justify-content: center;
        margin-top: 16px;
        .yoy {
          font-size: 12px;
          font-family: OPPOSans;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          padding-right: 3px;
          margin-top: 2px;
        }
      }
    }
  }
}
</style>
