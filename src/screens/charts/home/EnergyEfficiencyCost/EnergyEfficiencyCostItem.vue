<!--
 * @Description: 能效成本
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
defineProps<{
  data: any;
}>();
</script>

<template>
  <div class="energy-efficiency-cost-item">
    <div class="cost-name">{{ data?.title }}</div>
    <div class="cost-col">
      <div class="cost-label">年度用电</div>
      <div class="cost-value" v-title-show="1">
        <span v-num-rolling="data?.ndyd || 0"></span><span class="cost-unit"> 万</span>
      </div>
    </div>

    <div class="cost-col" style="padding-left: 12px">
      <div class="cost-label">同比</div>
      <rate-number :other="true" :value="data.ndydRate" style="top: -2px" />
    </div>

    <div class="cost-col">
      <div class="cost-label">年度用水</div>
      <div class="cost-value" v-title-show="1">
        <span v-num-rolling="data?.ndys || 0"></span><span class="cost-unit"> 万</span>
      </div>
    </div>

    <div class="cost-col" style="padding-left: 12px">
      <div class="cost-label">同比</div>
      <rate-number :other="true" :value="data.ndysRate" style="top: -2px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.energy-efficiency-cost-item {
  height: 82px;
  border-bottom: 1px solid rgba(165, 194, 225, 0.2);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(1, 1fr);
  align-items: center;

  .cost-name {
    height: 54px;
    width: 54px;
    padding: 10px;
    box-sizing: border-box;
    background: url('@/assets/img/home/cost-name-bg.png') no-repeat;
    background-size: cover;
    text-align: center;
    font-size: 16px;
    font-family: OPPOSans;
    font-weight: 400;
    color: #ffffff;
  }

  .cost-col {
    flex: 1;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .cost-label {
      font-size: 14px;
      font-family: OPPOSans;
      font-weight: 400;
      color: #cbe3fd;
    }

    .cost-value {
      font-size: 20px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
    }

    .cost-unit {
      font-size: 14px;
      padding-left: 2px;
    }
  }
}
</style>
