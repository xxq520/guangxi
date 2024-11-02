<!--
 * @Description: 设备统计
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { IntelligentPreventionStore } from '@/store/intelligentPrevention';

const intelligentPrevention = IntelligentPreventionStore();

const data = computed(() => intelligentPrevention?.accessControlSystem?.equipmentStatistics || []);

const totals = computed(() => data.value.reduce((prev, curr) => prev + curr.value, 0));
</script>

<template>
  <div class="asset-statistics">
    <card-module title="设备统计">
      <div class="device-totals">
        <span class="device-totals-label">设备总数</span>
        <span class="device-totals-value" v-num-rolling="totals || 0"></span>
      </div>

      <div class="device-list">
        <div class="device-item" v-for="item in data" :key="item.name">
          <div class="device-name" :title="item.name">{{ item.name }}</div>
          <div class="device-progress">
            <div class="device-progress-bar" :style="{ width: item.percent + '%' }"></div>
          </div>
          <div class="device-progress-value">{{ item.percent }}%</div>

          <div class="split-line"></div>
          <div class="device-number" :title="item.value || 0" v-num-rolling="item.value || 0">
            {{ item.value }}
          </div>
        </div>
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.asset-statistics {
  height: 318px;
  width: 410px;

  .device-totals {
    margin-top: 32px;
    width: 409px;
    height: 30px;
    line-height: 16px;
    background: url('@/assets/img/intelligent-prevention/trapezoid-bg.png') no-repeat center;
    text-align: center;

    .device-totals-label {
      font-size: 16px;
      font-family: OPPOSans;
      font-weight: 400;
      color: #ffffff;
    }

    .device-totals-value {
      font-size: 30px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
      padding-left: 33px;
    }
  }

  .device-list {
    padding-top: 12px;

    .device-item {
      display: flex;
      align-items: center;
      width: 409px;
      height: 31px;
      padding-left: 10px;
      box-sizing: border-box;
      background: rgba(54, 82, 123, 0.15);
      margin-bottom: 10px;

      .device-name {
        @include text-overflow;
        width: 214px;
        flex-shrink: 0;
        flex-shrink: 0;
        font-size: 14px;
        font-family: OPPOSans;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.5);
        padding-right: 10px;
      }

      .device-progress {
        width: 72px;
        height: 8px;
        background: rgba(174, 220, 255, 0.1);
        border-radius: 4px;

        .device-progress-bar {
          width: 0;
          height: 8px;
          background: #39d56c;
          border-radius: 4px;
          transition: width 0.5s ease-in;
        }
      }

      .device-progress-value {
        font-size: 12px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #ffffff;
        margin-left: 8px;
      }

      .split-line {
        width: 2px;
        height: 19px;
        background: rgba(255, 255, 255, 0.1);
        margin-left: 24px;
      }

      .device-number {
        width: 66px;
        text-align: center;
        font-size: 20px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        box-sizing: border-box;
        @include text-overflow;
      }
    }
  }
}
</style>
