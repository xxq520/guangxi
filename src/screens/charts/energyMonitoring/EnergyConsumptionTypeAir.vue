<!--
 * @Description: 能耗类型统计
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { energyMonitoringStore } from '@/store/energyMonitoring';

const energyMonitoring = energyMonitoringStore();

const data = computed(() => energyMonitoring?.data?.energyTypeAir || {});
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="能耗类型统计" subTitle="(二号住院楼)">
      <div class="body">
        <div class="title-box">
          <p class="title">{{ data.title }}</p>
          <span v-num-rolling="data.value || 0"></span>
        </div>
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 80px;
  width: 410px;
  pointer-events: all;
  .body {
    @include flex(center, center, row);
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
    }
  }
}
</style>
