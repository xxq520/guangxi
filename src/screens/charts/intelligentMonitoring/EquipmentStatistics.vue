<!--
 * @Description: 设备统计(二号住院楼)
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { intelligentMonitoringStore } from '@/store/intelligentMonitoring';
const intelligentMonitoring = intelligentMonitoringStore();
import sensor from '@/assets/img/icon/sensor.png';
import rainGauge from '@/assets/img/icon/rain-gauge.png';
import waterLevelGauge from '@/assets/img/icon/water-level-gauge.png';
import waterGauge from '@/assets/img/icon/water-gauge.png';

const data = computed(() => intelligentMonitoring.data?.equipmentStatistics || {});
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="设备统计" subTitle="(二号住院楼)">
      <div class="body">
        <div class="title-box">
          <p class="title">{{ data.title }}</p>
          <span v-num-rolling="data.value || 0"></span>
        </div>
        <div class="item" v-for="(item, index) in data?.children" :key="index">
          <img class="icon" v-if="item.title?.includes('传感器')" :src="sensor" alt="" />
          <img class="icon" v-else-if="item.title?.includes('雨量计')" :src="rainGauge" alt="" />
          <img
            class="icon"
            v-else-if="item.title?.includes('水位计')"
            :src="waterLevelGauge"
            alt=""
          />
          <img class="icon" v-else-if="item.title?.includes('电子水尺')" :src="waterGauge" alt="" />
          <img class="icon" v-else :src="waterLevelGauge" alt="" />
          <p class="item-title" v-title-show="1">{{ item.title }}</p>
          <p class="item-value" v-num-rolling="item.value || 0">{{ item.value }}</p>
          <p class="item-percent">{{ item.percentage }}</p>
          <div class="item-process">
            <div
              class="item-process-bg"
              :style="{ width: Number(item.percentage || '0') + '%' }"
            ></div>
          </div>
        </div>
      </div>
      <template #right>
        <div class="right">
          <p v-show-time="'yyyy年MM月'" class="day"></p>
        </div>
      </template>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 330px;
  width: 410px;
  pointer-events: all;
  .body {
    background: url('@/assets/img/background/energyManagement/energy-consumption-type.png')
      no-repeat;
    background-size: 100% 100%;
    font-size: 30px;
    font-family: DINPro;
    font-weight: 500;
    color: #ffffff;
    height: 33px;
    margin-top: 30px;
    .title-box {
      margin-top: -10px;
      @include flex(center, center, row);
      .title {
        margin-right: 33px;
        font-size: 16px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #ffffff;
      }
      span {
        margin-top: -10px;
      }
      margin-bottom: 20px;
    }
    .item {
      @include flex(flex-start, center, row);
      background: url('@/assets/img/background/intelligentMonitoring/device-bg.png') no-repeat;
      background-size: 100% 100%;
      width: 411px;
      height: 46px;
      margin-top: 10px;
      .icon {
        width: 24px;
        height: 24px;
        margin: 0 15px;
      }
      .item-title {
        font-size: 14px;
        font-family: OPPOSans;
        font-weight: 400;
        width: 33%;
        padding-left: 12px;
      }
      .item-value {
        font-size: 20px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        width: 14%;
      }
      .item-percent {
        font-size: 20px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        width: 16%;
      }
      .item-process {
        width: 72px;
        height: 8px;
        background: rgba(174, 220, 255, 0.1);
        border-radius: 4px;
        .item-process-bg {
          width: 0%;
          height: 8px;
          background: #39d56c;
          border-radius: 4px;
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
}
</style>
